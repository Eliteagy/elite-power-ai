---
name: reels-estilo-gui
description: Editar reels verticais de imobiliário (tour de casa / investimento, talking-head a andar) no estilo dos vídeos do Gui/Carlos Dias — escolha de takes por transcrição, cortes rentes à fala, legendas brancas SF Pro + palavra-chave azul manuscrita com glow, cartões de ícones sincronizados com a fala + pop SFX, música instrumental (Demucs) por baixo da voz, eye-lock estabilizado na abertura, montagem e export no DaVinci Resolve. Usar quando pedirem "edita no estilo do Gui", "vídeos do Carlos Dias", "legendas estilo Gui", "mete ícones como nos do Carlos Dias".
---

# Reels estilo Gui — workflow completo

Pipeline validado em 2026-10-05 nos 4 vídeos da "CASA 01" do Carlos Dias (Gui). Exemplo real em `exemplo-felipe/`.
Tudo o que é visual (legendas, ícones, eye-lock) é gerado em Python e entra no Resolve como **camada ProRes 4444 com alpha**:
a API do Resolve não anima por script e títulos Fusion por script falham (cache / fade).

## 0. Preparar a máquina (uma vez)

| | macOS (Apple Silicon) | Windows / Linux |
|---|---|---|
| ffmpeg (com prores_ks) | `brew install ffmpeg` | ffmpeg "full" (gyan.dev) no PATH |
| Python 3.11+ | `pip install numpy pillow opencv-python demucs mlx-whisper` | `pip install numpy pillow opencv-python demucs faster-whisper` |
| DaVinci Resolve **Studio** | Preferences → General → External scripting = **Local** | igual |
| MCP do Resolve (para o Claude mexer no Resolve) | `MagiKraft Skills/resolve-claude-mcp` (ver QUICKSTART.md) | igual — a transcrição do MCP é só Mac, por isso aqui usa-se `scripts/asr.py` (faster-whisper) |

`python scripts/get_assets.py` confirma/descarrega os recursos (`assets/`): fontes SF Pro e Snell Roundhand Black
(Apple — uso pessoal, já incluídas), Material Symbols Rounded (ícones, Google, Apache 2.0), modelo YuNet (deteção de caras),
pop SFX `Notification 1.mp3`.

## 1. Pasta do projeto

Cada lote de vídeos tem uma pasta de trabalho **no vault** (nunca na pasta do cliente). Definir antes de correr qualquer script:
```
export REELS_PROJECT="/…/AI Obsidian Vault/<Cliente> - <Lote>"      # Windows: set REELS_PROJECT=...
export REELS_SCRATCH="/tmp/reels"                                   # opcional: wav/frames temporários (grandes)
cd "<skill>/scripts"
```

## 2. Passos

1. **Inventário** — `python make_clips.py "<pasta da footage>"` → `clips.json`. Deduplica cópias (os zips do Drive costumam vir extraídos várias vezes).
   Ver se a footage vem **deitada** (Sony gravada na vertical guarda 3840×2160): fazer folha de contacto com `strip.py` (já roda 90°).
2. **Transcrever tudo** — `python transcribe.py`. Ler o texto: há várias takes da mesma frase e a voz de quem filma a dirigir ("3, 2, 1", "abre os braços").
3. **Escolher takes** — para cada frase, a take completa e melhor entregue (sem gaguejos, sem falas do operador). Confirmar a imagem com `strip.py`
   (`python strip.py out.png '[["nome","C0005",6.3,16.0], ...]'`). Escrever `segments.json` (janelas aproximadas, em s do clip, pela ordem do vídeo).
   Estrutura típica: **gancho** (a pessoa já a falar — ou a entrar, se o cliente pedir) → divisões → **CTA**. Cada vídeo **< 1 min**: se passar, dividir em partes
   e dar a cada uma CTA próprio ("me siga… envie pra um amigo") e gancho próprio.
4. **Cortes** — `python plan_cuts.py` → `cut_plan.json` (início no ataque −0,10 s, fim na última voz +8 f, silêncios ≥0,5 s cortados a seco).
5. **Áudio cortado + palavras da timeline** — `python cut_audio.py v1 v2 …`. Ler o texto: tem de estar inteiro, sem palavras comidas nas junções.
   Erros do Whisper corrigem-se em `project_fixes.py` (ex. "ar funcionado"→"ar-condicionado", "móvel"→"imóvel", juntar "Master"+"Suite").
6. **Ícones** — escrever `icons_cues.json`: por vídeo, grupos de cartões ligados a palavras ditas (`["palavra", n_ocorrência, "icone_material", "ETIQUETA"]`)
   e `end` (s) do grupo. Nomes de ícones: fonts.google.com/icons (Rounded). 1–3 cartões por grupo; só características vendáveis e o CTA
   (SEGUIR/CURTIR/PARTILHAR, MENSAGEM). Ver `exemplo-felipe/icons_cues.json`.
7. **Pré-visualizar** — `python preview.py v1 out.png 7.6 16.9 26.6` (compõe sobre a imagem real). Ajustar e só depois renderizar.
8. **Camadas** — `python render_all.py v1 v2 …` → `legendas/Legendas+Icones <v>.mov` (ProRes 4444, alpha, 29,97).
9. **SFX** — `python build_sfx.py v1 v2 …` → `sfx/SFX <v>.wav` (pop por cartão, 2 f depois da palavra, −7 dB vs voz).
10. **Música** — `python music_bed.py v1 "<faixa.mp3>"` (Demucs tira a voz cantada; nível = fala −12 LU; fades). Faixas: pool
    `House of Music 2026`; não repetir faixas entre vídeos do mesmo lote.
11. **Resolve** — no MCP: `exec(open(r"<skill>/scripts/resolve_build.py").read()); build("v1", "Cliente 01 - Título", PROJECT=r"<pasta>", EXPECT_PROJECT="<projeto Resolve>")`.
    Cria V1 clips (rodados), V2 camada, A1 voz, A2 Music, A3 SFX. Ver frames com `ExportCurrentFrameAsStill` (dar `time.sleep(1)` após mudar de timeline/timecode — senão sai preto).
12. **Parar e pedir revisão.** Só exportar com aprovação: `render([...], r"<pasta Exports>")` → MP4 H.264 1080×1920, 20 Mb/s. Verificar com ffprobe (frames = timeline).

### Opcional — eye-lock / estabilização na abertura
Para o plano em que a pessoa caminha até à câmara (pedido do Carlos Dias: "ficar focado nos olhos"):
```
EYE_VIDEO=v1 EYE_PIECE=0 python eyetrack_detect.py      # YuNet, olhos por frame
EYE_VIDEO=v1 EYE_PIECE=0 python eyetrack_flow.py        # KLT na cara (sub-pixel) + deteção só para a deriva
EYE_VIDEO=v1 EYE_PIECE=0 python eyetrack_render2.py "<pasta>/eyelock_v1_0.mov" 14 1000 1000 0.8
python measure_shake.py "orig=<orig.mp4>" "novo=<eyelock.mov>"   # tremor tem de baixar (alvo ≈ metade)
```
Substituir só o vídeo desse troço na V1 (o áudio A1 fica). Nunca mostra bordas; onde o original tem a cara na beira, cede.

## 3. Especificação do estilo (medida no vídeo original do Gui)

- **Branco:** SF Pro wght 900, 106 px @1080, tracking −0,035 em, opacidade 0,92, revela letra a letra L→R (4,7 letras/frame) ao ritmo das palavras; sombra suave.
- **Azul (1 palavra-chave por bloco):** Snell Roundhand Black 185 px, compressão horizontal 0,75; gradiente (95,190,248)→(60,115,188);
  glow (90,170,255) 0,24; entra a subir com blur em 3 frames (+50 px/0,3 → +10/0,95 → −2 → 0). A fonte exata do Gui é desconhecida — esta é a mais próxima.
- **Blocos:** até 3 palavras, 2 linhas (baselines 1412 / 1512), azul = palavra de conteúdo mais longa; bloco novo em pausa >0,35 s, vírgula ou fim de frase.
- **Cartões:** 196 px, raio 38, fundo escuro 84 %, borda e glow azul, ícone Material Rounded preenchido com gradiente, etiqueta SF 800 em maiúsculas;
  centro y=1150; entrada com mola (8 f) e reposicionamento suave quando entra outro (7 f); saída 6 f.

## 4. Regras / gotchas (aprendidas a corrigir)

- Confirmar `proj.GetName()` antes de qualquer escrita; não criar timelines que não foram pedidas (dividir um vídeo é pedido).
- Footage deitada: `RotationAngle 90` + `ZoomX/Y 1.7778`; timeline 29,97 = `SetSetting("timelineFrameRate","29")` ("29.97" devolve False).
- `AppendToTimeline`: `endFrame` exclusivo; sempre `trackIndex` + `recordFrame`; verificar contiguidade e `GetLeftOffset()`.
- API sem volume: o ganho vai cozido nos wav (música −12 LU, SFX −7 dB vs voz).
- Os `pop-*` comuns ficam 85–100 % na banda da voz (300–3400 Hz): usar `Notification 1` (4 %) ou medir com o snippet do passo 9.
- Depois de mexer por script: pedir ao Ahlec **Playback → Delete Render Cache → All** antes de ele ver.
- Nada de exportar sem aprovação; exports para a pasta de exports do cliente, nome = nome da timeline.
