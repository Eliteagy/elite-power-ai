#!/usr/bin/env python3
"""Gera uma biblioteca de efeitos sonoros ORIGINAIS (sintetizados, livres de direitos) para edição de vídeo.

Uso:  python gerar_sfx.py PASTA_SAIDA [--sr 48000]
Cria subpastas por categoria com WAV estéreo 24-bit, picos a -1 dBFS.
Tudo é síntese procedural (ruído filtrado, osciladores, envelopes, reverb por convolução) — pode ser usado
em trabalhos comerciais sem atribuição. Seeds fixos = resultado reprodutível.
"""
import argparse, os, wave
import numpy as np
from scipy import signal

ap = argparse.ArgumentParser(); ap.add_argument("out"); ap.add_argument("--sr", type=int, default=48000)
a = ap.parse_args(); SR = a.sr

def t_(d): return np.arange(int(d * SR)) / SR
def rng(s): return np.random.default_rng(s)
def noise(d, s=0): return rng(s).standard_normal(int(d * SR))
def env_adsr(n, a_, d_, s_, r_):
    A, D, R = int(a_ * SR), int(d_ * SR), int(r_ * SR); S = max(n - A - D - R, 0)
    e = np.concatenate([np.linspace(0, 1, A, endpoint=False) ** 2, np.linspace(1, s_, D, endpoint=False),
                        np.full(S, s_), s_ * np.linspace(1, 0, R) ** 1.5])
    return np.pad(e, (0, max(0, n - len(e))))[:n]
def expdec(n, tau): return np.exp(-np.arange(n) / (tau * SR))
def bp_sweep(x, f0, f1, q=2.0, steps=64):
    """band-pass com frequência central a varrer f0->f1 (exponencial), por blocos com overlap-add"""
    n = len(x); out = np.zeros(n); hop = n // steps + 1; win = np.hanning(2 * hop)
    for i in range(steps + 1):
        c = i * hop; fc = f0 * (f1 / f0) ** (min(c, n) / n); fc = min(max(fc, 30), SR / 2.3)
        b, a_ = signal.iirpeak(fc, q, SR) if False else signal.butter(2, [fc / (1 + 1 / q), min(fc * (1 + 1 / q), SR / 2.1)], "band", fs=SR)
        s0 = max(0, c - hop); s1 = min(n, c + hop)
        if s1 <= s0: continue
        seg = signal.lfilter(b, a_, x[max(0, s0 - 2000):s1])[-(s1 - s0):]
        w = win[(s0 - (c - hop)):(s0 - (c - hop)) + (s1 - s0)]
        out[s0:s1] += seg * w
    return out
def lp(x, f, o=4): return signal.sosfilt(signal.butter(o, f, "low", fs=SR, output="sos"), x)
def hp(x, f, o=4): return signal.sosfilt(signal.butter(o, f, "high", fs=SR, output="sos"), x)
def bp(x, f0, f1, o=4): return signal.sosfilt(signal.butter(o, [f0, f1], "band", fs=SR, output="sos"), x)
def chirp(d, f0, f1, kind="exp", wave_="sine", ph=0):
    tt = t_(d)
    if kind == "exp": k = (f1 / f0) ** (1 / d); phase = 2 * np.pi * f0 * (k ** tt - 1) / np.log(k) if f1 != f0 else 2 * np.pi * f0 * tt
    else: phase = 2 * np.pi * (f0 * tt + (f1 - f0) * tt ** 2 / (2 * d))
    phase += ph
    if wave_ == "saw": return 2 * ((phase / (2 * np.pi)) % 1) - 1
    if wave_ == "square": return np.sign(np.sin(phase))
    if wave_ == "tri": return 2 * np.abs(2 * ((phase / (2 * np.pi)) % 1) - 1) - 1
    return np.sin(phase)
def reverb(x, dur=1.6, mix=0.3, s=7, bright=6000):
    x = fade(x, 0.0, 0.06); n = int(dur * SR); r = rng(s)
    irL = r.standard_normal(n) * expdec(n, dur / 6.5); irR = r.standard_normal(n) * expdec(n, dur / 6.5)
    irL = lp(irL, bright, 2); irR = lp(irR, bright, 2); irL[:int(0.012 * SR)] *= 0.2; irR[:int(0.017 * SR)] *= 0.2
    xm = x.mean(1) if x.ndim == 2 else x
    wl = signal.fftconvolve(xm, irL)[:len(xm) + n]; wr = signal.fftconvolve(xm, irR)[:len(xm) + n]
    L = len(xm) + n; wl = np.pad(wl, (0, L - len(wl))); wr = np.pad(wr, (0, L - len(wr)))
    wet = np.stack([wl, wr], 1); wet /= (np.abs(wet).max() + 1e-9)
    dry = st(x); dry = np.pad(dry, ((0, n), (0, 0)))
    return dry * (1 - mix) + wet * mix * np.abs(dry).max()
def st(x, pan=0.0):
    if x.ndim == 2: return x
    l = np.cos((pan + 1) * np.pi / 4); r = np.sin((pan + 1) * np.pi / 4)
    return np.stack([x * l * 1.414, x * r * 1.414], 1)
def autopan(x, p0, p1):
    pan = np.linspace(p0, p1, len(x)); l = np.cos((pan + 1) * np.pi / 4); r = np.sin((pan + 1) * np.pi / 4)
    return np.stack([x * l * 1.414, x * r * 1.414], 1)
def widen(x, s=3, ms=0.012):
    d = int(ms * SR); y = st(x).copy(); y[:, 1] = np.concatenate([np.zeros(d), y[:-d, 1]]) if d else y[:, 1]; return y
def fade(x, fi=0.003, fo=0.02):
    x = x.copy(); n = len(x); a_, b_ = int(fi * SR), int(fo * SR)
    if a_: x[:a_] *= np.linspace(0, 1, a_)[:, None] if x.ndim == 2 else np.linspace(0, 1, a_)
    if b_: x[-b_:] *= np.linspace(1, 0, b_)[:, None] if x.ndim == 2 else np.linspace(1, 0, b_)
    return x
def trim_tail(x, thr_db=-60):
    m = np.abs(x).max(1) if x.ndim == 2 else np.abs(x); thr = m.max() * 10 ** (thr_db / 20)
    idx = np.where(m > thr)[0]; return x[:idx[-1] + int(0.02 * SR)] if len(idx) else x
def save(path, x, peak_db=-1.0):
    x = st(np.nan_to_num(x)); x = trim_tail(x); x = fade(x, 0.0015, 0.015)
    x = x / (np.abs(x).max() + 1e-12) * 10 ** (peak_db / 20)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    pcm = (np.clip(x, -1, 1) * (2 ** 23 - 1)).astype(np.int32)
    b = np.zeros((pcm.shape[0], 2, 3), np.uint8)
    for ch in range(2):
        v = pcm[:, ch].astype(np.int64) & 0xFFFFFF
        b[:, ch, 0] = v & 255; b[:, ch, 1] = (v >> 8) & 255; b[:, ch, 2] = (v >> 16) & 255
    with wave.open(path, "wb") as w:
        w.setnchannels(2); w.setsampwidth(3); w.setframerate(SR); w.writeframes(b.tobytes())
    LIST.append((os.path.relpath(path, a.out), len(x) / SR))

LIST = []
O = lambda cat, name: os.path.join(a.out, cat, name + ".wav")

# ---------------- WHOOSHES ----------------
def whoosh(d, f0, f1, s, peak=0.45, pan=(-0.7, 0.7), body=0.0, q=1.6):
    n = noise(d, s); x = bp_sweep(n, f0, f1, q)
    e = np.interp(np.arange(len(x)), [0, int(peak * len(x)), len(x) - 1], [0, 1, 0]) ** 1.6
    x = x * e
    if body: x += body * lp(n, 180) * e
    return reverb(autopan(x, *pan), 0.9, 0.18, s)
save(O("01_whooshes", "whoosh_rapido_01"), whoosh(0.45, 400, 3500, 1))
save(O("01_whooshes", "whoosh_rapido_02"), whoosh(0.35, 600, 5000, 2, 0.55, (0.7, -0.7)))
save(O("01_whooshes", "whoosh_medio_01"), whoosh(0.8, 250, 2500, 3, 0.5, body=0.6))
save(O("01_whooshes", "whoosh_medio_02_descendente"), whoosh(0.8, 3000, 300, 4, 0.4, (0.6, -0.6), 0.4))
save(O("01_whooshes", "whoosh_longo_cinematico"), whoosh(1.6, 150, 2000, 5, 0.62, (-0.9, 0.9), 0.9, 1.2))
save(O("01_whooshes", "whoosh_grave_pesado"), whoosh(1.1, 80, 900, 6, 0.55, (-0.4, 0.4), 1.4, 1.0))
save(O("01_whooshes", "swish_texto_curto"), whoosh(0.22, 1500, 8000, 7, 0.4, (-0.3, 0.3), 0, 2.5))
save(O("01_whooshes", "swipe_ui_lateral"), whoosh(0.3, 2000, 6000, 8, 0.5, (-1, 1), 0, 3))
# whip pan: dois whooshes cruzados rápidos
w1 = whoosh(0.28, 500, 6000, 9, 0.6, (-1, 1)); w2 = whoosh(0.28, 6000, 700, 10, 0.3, (1, -1))
o_ = int(0.16 * SR); wp = np.zeros((o_ + len(w2), 2)); wp[:len(w1)] += w1[:o_ + len(w2)] if len(w1) <= o_ + len(w2) else w1[:o_ + len(w2)]
wp[o_:o_ + len(w2)] += w2; save(O("01_whooshes", "whip_pan"), wp)
# whoosh com tom (motion sci-fi)
d = 0.9; tone = chirp(d, 180, 900) * env_adsr(int(d * SR), 0.4, 0.2, 0.3, 0.3) * 0.25
save(O("01_whooshes", "whoosh_tonal_scifi"), reverb(autopan(bp_sweep(noise(d, 11), 300, 4000) * env_adsr(int(d * SR), 0.45, 0.1, 0.4, 0.3) + tone, -0.6, 0.6), 1.2, 0.25))

# ---------------- RISERS ----------------
def riser_noise(d, s, f0=200, f1=9000, pitch=None):
    n = noise(d, s); x = bp_sweep(n, f0, f1, 1.3); e = np.linspace(0, 1, len(x)) ** 2.2
    x = x * e
    if pitch:
        tt = t_(d); sh = sum(chirp(d, pitch[0] * k, pitch[1] * k, wave_="saw") / k for k in (1, 1.5, 2.01))
        x += lp(sh, 6000) * e * 0.15
    return reverb(widen(x), 1.5, 0.3, s)
save(O("02_risers", "riser_ruido_2s"), riser_noise(2.0, 20))
save(O("02_risers", "riser_ruido_4s"), riser_noise(4.0, 21, 120, 12000))
save(O("02_risers", "riser_tonal_tensao_3s"), riser_noise(3.0, 22, 150, 8000, (110, 440)))
save(O("02_risers", "riser_curto_antes_do_corte"), riser_noise(1.0, 23, 500, 10000))
# reverse cymbal / swell
d = 2.2; cym = hp(noise(d, 24), 3500) * expdec(int(d * SR), 0.45); cym = reverb(st(cym), 1.8, 0.4)[::-1]
save(O("02_risers", "reverse_prato_swell"), cym)
# shepard-ish riser
d = 4.0; tt = t_(d); sh = np.zeros_like(tt)
for k in range(6):
    f = 55 * 2 ** ((k + tt / d * 2) % 6); amp = np.sin(np.pi * ((k + tt / d * 2) % 6) / 6) ** 2
    sh += np.sin(2 * np.pi * np.cumsum(f) / SR) * amp
save(O("02_risers", "riser_shepard_tensao_4s"), reverb(widen(sh * np.linspace(0.3, 1, len(tt))), 2, 0.35))

# ---------------- IMPACTS / HITS ----------------
def impact(s, sub_f=(90, 32), d=2.5, noise_amt=0.8, bright=4000, tail=2.2, click=True):
    n = int(d * SR); tt = t_(d)
    sub = chirp(d, sub_f[0], sub_f[1]) * expdec(n, 0.55)
    nb = lp(noise(d, s), bright) * expdec(n, 0.09) * noise_amt
    x = sub + nb
    if click: x[:int(0.004 * SR)] += np.hanning(int(0.008 * SR))[:int(0.004 * SR)] * 1.5
    x = np.tanh(x * 1.8)
    return reverb(st(x), tail, 0.28, s, 3000)
save(O("03_impactos", "impacto_cinematico_01"), impact(30))
save(O("03_impactos", "impacto_cinematico_02_brilhante"), impact(31, (120, 40), 2.5, 1.2, 9000))
save(O("03_impactos", "impacto_seco_curto"), impact(32, (110, 50), 0.9, 0.9, 6000, 0.5))
save(O("03_impactos", "boom_sub_grave"), impact(33, (60, 25), 3.5, 0.3, 1500, 2.5, False))
d = 2.0; n = int(d * SR); sd = chirp(d, 150, 28) * env_adsr(n, 0.005, 0.1, 0.8, 1.5)
save(O("03_impactos", "sub_drop"), fade(st(np.tanh(sd * 1.5)), 0.002, 0.05))
# braam (trailer)
d = 3.0; n = int(d * SR); br = np.zeros(n)
for i, f in enumerate([55, 55.4, 82.4, 110.3, 54.7]):
    br += chirp(d, f, f * 0.985, wave_="saw", ph=i)
br = lp(br, 900) * env_adsr(n, 0.04, 0.4, 0.6, 1.6)
save(O("03_impactos", "braam_trailer"), reverb(widen(np.tanh(br * 0.8)), 2.5, 0.3))
# hit metálico
d = 2.5; n = int(d * SR); met = sum(np.sin(2 * np.pi * f * t_(d)) * expdec(n, dd) for f, dd in [(523, 0.9), (1187, 0.6), (1813, 0.4), (2771, 0.3), (3990, 0.2)])
met += hp(noise(d, 34), 2000) * expdec(n, 0.03)
save(O("03_impactos", "hit_metalico"), reverb(st(met), 2.0, 0.3))
# impacto + whoosh (transição completa)
wz = whoosh(0.7, 200, 3000, 35, 0.95, (-0.5, 0.2), 0.6); im = impact(36)
o_ = int(0.62 * SR); full = np.zeros((max(len(wz), o_ + len(im)), 2)); full[:len(wz)] += wz; full[o_:o_ + len(im)] += im
save(O("03_impactos", "whoosh_mais_impacto"), full)

# ---------------- UI / POPS / CLIQUES ----------------
def pop(f0=900, f1=300, d=0.09, s=40):
    n = int(d * SR); x = chirp(d, f0, f1) * expdec(n, d / 4)
    return reverb(st(x), 0.3, 0.12, s)
save(O("04_ui_pops", "pop_suave"), pop())
save(O("04_ui_pops", "pop_agudo"), pop(1800, 700, 0.07))
save(O("04_ui_pops", "pop_bolha"), pop(400, 1400, 0.08))
save(O("04_ui_pops", "pop_grave_titulo"), pop(300, 90, 0.18))
d = 0.03; save(O("04_ui_pops", "click_ui"), st(hp(noise(d, 41), 2000) * expdec(int(d * SR), 0.004) + chirp(d, 3000, 2000) * expdec(int(d * SR), 0.003)))
# tique de teclado (sequência)
seq = np.zeros(int(1.6 * SR)); r = rng(42)
for k in range(11):
    p = int((0.08 + k * 0.13 + r.uniform(-0.03, 0.03)) * SR); dd = 0.025; nn = int(dd * SR)
    seq[p:p + nn] += bp(noise(dd, 43 + k), 1500, 7000) * expdec(nn, 0.004) * r.uniform(0.6, 1)
save(O("04_ui_pops", "teclado_digitacao"), reverb(st(seq), 0.3, 0.1))
# notificação / ding
d = 1.2; n = int(d * SR); ding = (np.sin(2 * np.pi * 1318.5 * t_(d)) + 0.5 * np.sin(2 * np.pi * 2637 * t_(d))) * expdec(n, 0.35) * np.clip(t_(d) * 300, 0, 1)
d2 = np.concatenate([np.zeros(int(0.09 * SR)), (np.sin(2 * np.pi * 1975.5 * t_(d)) * expdec(n, 0.35) * np.clip(t_(d) * 300, 0, 1))])[:n]
save(O("04_ui_pops", "ding_notificacao"), reverb(st(ding + d2 * 0.8), 1.2, 0.25))
d = 0.6; n = int(d * SR); sp = sum(np.sin(2 * np.pi * f * t_(d) + i) * expdec(n, 0.12) * np.clip((t_(d) - i * 0.04) * 50, 0, 1) for i, f in enumerate([2093, 2637, 3136, 4186]))
save(O("04_ui_pops", "brilho_sparkle"), reverb(widen(sp), 1.0, 0.35))
# shutter de câmara
sh = np.zeros(int(0.35 * SR)); c1 = bp(noise(0.02, 45), 800, 6000) * expdec(int(0.02 * SR), 0.003)
sh[:len(c1)] += c1; o = int(0.11 * SR); c2 = bp(noise(0.03, 46), 600, 5000) * expdec(int(0.03 * SR), 0.005); sh[o:o + len(c2)] += c2 * 0.8
save(O("04_ui_pops", "obturador_camara"), reverb(st(sh), 0.3, 0.1))

# ---------------- GLITCH / DIGITAL ----------------
r = rng(50); d = 0.7; g = np.zeros(int(d * SR)); pos = 0
while pos < len(g):
    L = int(r.uniform(0.01, 0.06) * SR); kind = r.integers(4); tt = np.arange(L) / SR
    if kind == 0: seg = np.sign(np.sin(2 * np.pi * r.uniform(80, 2000) * tt))
    elif kind == 1: seg = r.standard_normal(L)
    elif kind == 2: seg = np.round(np.sin(2 * np.pi * r.uniform(200, 900) * tt) * 3) / 3
    else: seg = np.zeros(L)
    g[pos:pos + L] = seg[:len(g) - pos] * r.uniform(0.3, 1); pos += L
save(O("05_glitch_digital", "glitch_01"), autopan(lp(g, 9000), -0.5, 0.5))
r = rng(51); g2 = np.repeat(r.standard_normal(int(0.4 * SR / 60)), 60)[:int(0.4 * SR)] * expdec(int(0.4 * SR), 0.15)
save(O("05_glitch_digital", "glitch_bitcrush_curto"), st(g2))
d = 0.5; save(O("05_glitch_digital", "zap_flash"), reverb(st(chirp(d, 4000, 120) * expdec(int(d * SR), 0.12) + hp(noise(d, 52), 4000) * expdec(int(d * SR), 0.03)), 0.8, 0.2))
d = 1.0; tt = t_(d); tv = np.sign(np.sin(2 * np.pi * 15734 / 4 * tt)) * 0.05 + bp(noise(d, 53), 1000, 8000) * 0.6
save(O("05_glitch_digital", "estatica_tv"), st(tv * env_adsr(len(tt), 0.01, 0.05, 0.8, 0.1)))
# tape stop
d = 1.0; tt = t_(d); rate = np.linspace(1, 0, len(tt)) ** 1.7; ph = 2 * np.pi * np.cumsum(220 * rate) / SR
ts = sum(np.sin(ph * k) / k for k in (1, 2, 3, 4)) * np.linspace(1, 0.2, len(tt))
save(O("05_glitch_digital", "tape_stop"), st(lp(ts, 3000)))
# rewind (rebobinar)
d = 0.9; tt = t_(d); rw = bp_sweep(noise(d, 54), 6000, 800, 3) * (0.5 + 0.5 * np.sin(2 * np.pi * np.linspace(30, 8, len(tt)) * tt))
save(O("05_glitch_digital", "rewind_rebobinar"), autopan(rw * env_adsr(len(tt), 0.05, 0.1, 0.9, 0.2), 0.5, -0.5))

# ---------------- AMBIENTES / CAMAS ----------------
def amb(name, d, f0, f1, s, mod=0.2, lvl=1.0):
    n = noise(d, s); x = bp(n, f0, f1, 2); tt = t_(d)
    m = 1 + mod * np.sin(2 * np.pi * 0.13 * tt + s) + mod * 0.5 * np.sin(2 * np.pi * 0.31 * tt)
    y = widen(x * m * lvl, s, 0.021); save(O("06_ambientes_camas", name), fade(y, 1.0, 1.5))
amb("vento_distante_loop_20s", 20, 80, 900, 60, 0.45)
amb("sala_room_tone_20s", 20, 60, 3000, 61, 0.05)
amb("cidade_distante_20s", 20, 50, 1500, 62, 0.15)
d = 20; tt = t_(d); dr = sum(np.sin(2 * np.pi * f * tt + i) for i, f in enumerate([55, 55.3, 82.5, 110.2])) * (1 + 0.3 * np.sin(2 * np.pi * 0.07 * tt))
save(O("06_ambientes_camas", "drone_tensao_grave_20s"), fade(reverb(widen(lp(dr, 600)), 3, 0.3), 2, 3))
d = 20; tt = t_(d); pad_ = sum(np.sin(2 * np.pi * f * tt + i) * (1 + 0.2 * np.sin(2 * np.pi * (0.05 + 0.02 * i) * tt)) for i, f in enumerate([261.6, 329.6, 392.0, 523.2]))
save(O("06_ambientes_camas", "pad_emocional_do_maior_20s"), fade(reverb(widen(lp(pad_, 2500)), 3, 0.45), 3, 4))
# crepitar de vinil / projetor
r = rng(63); d = 20; cr = lp(noise(d, 64), 3000) * 0.05; n = len(cr)
for _ in range(900):
    p = r.integers(0, n - 200); cr[p:p + 60] += r.standard_normal(60) * expdec(60, 0.0004) * r.uniform(0.2, 1)
save(O("06_ambientes_camas", "crepitar_vinil_filme_20s"), st(hp(cr, 300)))
proj = np.zeros(int(10 * SR)); per = int(SR / 24)
for k in range(0, len(proj) - 400, per):
    proj[k:k + 300] += bp(noise(300 / SR, 65 + k % 7), 1500, 6000) * expdec(300, 0.0015)
save(O("06_ambientes_camas", "projetor_filme_24fps_10s"), st(proj + lp(noise(10, 66), 400) * 0.08))
# batimento cardíaco
hb = np.zeros(int(6 * SR))
for k in range(8):
    for off, amp in ((0, 1), (0.28, 0.7)):
        p = int((0.2 + k * 0.75 + off) * SR); dd = 0.18; nn = int(dd * SR)
        hb[p:p + nn] += chirp(dd, 70, 38) * expdec(nn, 0.05) * amp
save(O("06_ambientes_camas", "batimento_cardiaco_6s"), st(lp(np.tanh(hb * 2), 300)))

# ---------------- TRANSIÇÕES MÚSICA ----------------
d = 1.5; tt = t_(d); fil = bp_sweep(noise(d, 70), 200, 12000, 0.8) * np.linspace(0.2, 1, len(tt))
save(O("07_transicoes_musicais", "filtro_abrir_sweep"), widen(fil))
save(O("07_transicoes_musicais", "filtro_fechar_sweep"), widen(fil[::-1]))
d = 0.25; sn = bp(noise(d, 71), 150, 9000) * expdec(int(d * SR), 0.05) + chirp(d, 220, 160) * expdec(int(d * SR), 0.04) * 0.8
roll = np.zeros(int(1.2 * SR))
for k in range(16):
    p = int(1.0 * SR * (1 - (1 - k / 16) ** 1.2)); amp = 0.3 + 0.7 * k / 16
    roll[p:p + len(sn)] += sn[:len(roll) - p] * amp
save(O("07_transicoes_musicais", "rufo_caixa_buildup"), reverb(st(roll), 0.8, 0.2))
d = 0.15; n = int(d * SR); kk = chirp(d, 160, 45) * expdec(n, 0.05) + hp(noise(d, 72), 3000) * expdec(n, 0.004) * 0.4
save(O("07_transicoes_musicais", "kick_batida"), st(np.tanh(kk * 2)))
d = 0.6; n = int(d * SR); clap = np.zeros(n)
for i in range(4):
    burst = bp(noise(0.012, 73 + i), 900, 5000) * expdec(int(0.012 * SR), 0.003); p = int(i * 0.011 * SR)
    clap[p:p + len(burst)] += burst
tail_ = bp(noise(0.25, 77), 900, 4000) * expdec(int(0.25 * SR), 0.06); p = int(0.033 * SR)
clap[p:p + len(tail_)] += tail_
save(O("07_transicoes_musicais", "palmas_clap"), reverb(st(clap), 0.6, 0.2))

# índice
with open(os.path.join(a.out, "INDICE.txt"), "w", encoding="utf-8") as f:
    f.write("Biblioteca de SFX originais (sintetizados, livres de direitos) — 48 kHz / 24-bit / estéreo\n\n")
    for pth, dur in LIST: f.write(f"{pth:60s} {dur:5.2f}s\n")
print(len(LIST), "ficheiros")
