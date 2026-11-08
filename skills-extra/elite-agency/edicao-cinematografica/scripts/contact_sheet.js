// Injeta no separador do vídeo (YouTube/Instagram). Depois: await sheet()  |  Instagram: await sheet(null, 8)
// Desenha num canvas fixo uma grelha de frames: 12 espalhados + 12 seguidos (ritmo de corte).
window.sheet = async (times, cols = 6) => {
  const vs = [...document.querySelectorAll('video')].filter(x => x.offsetWidth > 100);
  const v = vs[0] || document.querySelector('video'); if (!v) return 'novideo';
  v.muted = true; await v.play().catch(e => 0);
  for (let k = 0; k < 20 && !(v.duration > 0); k++) await new Promise(r => setTimeout(r, 300));
  const d = v.duration;
  if (!times) {
    const s = d > 90 ? Math.round(d * 0.15) : 0;
    times = [0.02, 0.06, 0.12, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.97];
    for (let j = 0; j < 12; j++) times.push(s + 1.01 + j * (d > 90 ? 1 : 1.5));
  }
  const W = 260, H = Math.round(W * v.videoHeight / v.videoWidth) || 146;
  const rows = Math.ceil(times.length / cols);
  let c = document.getElementById('cs');
  if (!c) { c = document.createElement('canvas'); c.id = 'cs'; document.body.appendChild(c); }
  c.width = W * cols; c.height = H * rows;
  c.style.cssText = 'position:fixed;left:0;top:0;z-index:2147483647;background:#000;max-width:100vw;max-height:100vh';
  const g = c.getContext('2d');
  for (let i = 0; i < times.length; i++) {
    let t = times[i]; if (t <= 1) t = t * d; t = Math.min(t, d - 0.2);
    await new Promise(r => { const to = setTimeout(r, 3000); v.addEventListener('seeked', () => { clearTimeout(to); r() }, { once: true }); v.currentTime = t; });
    await new Promise(r => setTimeout(r, 300));
    g.drawImage(v, (i % cols) * W, Math.floor(i / cols) * H, W, H);
    g.fillStyle = 'yellow'; g.font = 'bold 14px sans-serif';
    g.fillText(t.toFixed(1) + 's', (i % cols) * W + 4, Math.floor(i / cols) * H + 16);
  }
  v.pause();
  return Math.round(d) + 's ' + v.videoWidth + 'x' + v.videoHeight + ' ' + document.title;
};
// Remover a grelha: document.getElementById('cs')?.remove()
