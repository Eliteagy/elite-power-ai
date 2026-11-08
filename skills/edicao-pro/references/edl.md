# EDL: esquema completo (`edl.json`)

Os caminhos relativos resolvem-se a partir da pasta da EDL. Todos os campos são opcionais, exceto `fontes` e uma timeline (`aroll` e/ou `clips`).

## Tempos (em qualquer `t`, `ate`)
| Forma | Significado |
|---|---|
| `12.4` | segundos no vídeo final |
| `"w:123"` / `"w:123:e"` | início / fim da palavra 123 (índice da transcrição) no vídeo final |
| `"w:123+0.2"`, `"w:123-0.15"` | com desvio |
| `"c:4"` | início do clip 4 da timeline (ver `plano.txt`) |
| `"fim"`, `"fim-2"` | fim do vídeo, ou 2 s antes |

## Raiz
```jsonc
{
  "saida": "saida/reel.mp4",
  "formato": {"w": 1080, "h": 1920, "fps": 30},   // 9:16 | 1920x1080 | 1080x1350 (4:5)
  "fontes": {
    "a":  {"path": "C:/.../talking.mov", "analise": "analise/talking.json"},  // analise = palavras + rostos + preto
    "b1": "C:/.../broll.mov"                                                   // forma curta
  },
  "seguir_rosto": true,      // enquadramento automático pelo rosto (headroom 7%)
  "som_clips": true,         // som dos `clips` por defeito (false no imobiliário só com música)
  "cor_destaque": "amarelo", // amarelo|laranja|verde|azul|vermelho|dourado|#HEX (cores de sistema Apple)
  "aroll": {...}, "clips": [...], "cortar_no_beat": {...},
  "broll": [...], "graficos": [...], "legendas": {...},
  "sfx": [...], "musica": {...}, "transicoes": [...], "overlays": [...],
  "grade": {...}, "audio": {...}
}
```

## `aroll` (talking head: cortes por palavras)
```jsonc
"aroll": {
  "fonte": "a",
  "segmentos": [                       // por ORDEM de saída (reordenar = hook primeiro)
    {"palavras": [120, 135], "entrada": "impacto"},  // entrada: zoom 1.22→1 em 0.22 s (abre com punch)
    {"palavras": [0, 40]},
    {"palavras": [41, 60], "zoom": 1.2, "shake": {"t": 0.0, "dur": 0.3, "amp": 0.012}}
  ],
  "max_gap": 0.3,          // pausas maiores são cortadas (jump cut)
  "pad": [0.06, 0.12],     // margem antes/depois das palavras (não comer consoantes)
  "punch": {"cada": 4, "niveis": [1.0, 1.15]},  // alterna o zoom; também corta a meio da frase (corte virtual) se passar cada s
  "push": 0.025,           // empurrão lento em todos os clips (+2.5%)
  "foco": [0.5, 0.4]       // só se não houver rosto
}
```

## `clips` (b-roll em sequência, imobiliário, anúncios)
```jsonc
"clips": [
  {"fonte": "b1", "in": 3.2, "out": 6.0, "vel": 1.0, "zoom": [1.0, 1.08], "foco": [0.5, 0.5], "som": false},
  {"fonte": "b2", "in": 20, "out": 60, "vel": 12},                 // timelapse (40 s → 3.3 s)
  {"fonte": "b3", "in": 1, "out": 3, "vel": 0.5},                  // slow-mo (filmado a 60 fps fica limpo)
  {"fonte": "b4", "in": 0, "out": 2, "zoom": {"kf": [[0, 1.0], [0.4, 1.25, "in"], [0.6, 1.0, "out"]]}}
]
```
`zoom`: número (fixo) | `[z0, z1]` (ease ao longo do clip) | `{"kf": [[t, z, ease?], ...]}` com ease `io` (default), `in`, `out` ou `lin`. `foco_fixo: true` ignora o rosto.
Se houver `aroll` e `clips`, os clips vêm a seguir ao A-roll.

## `cortar_no_beat`
```jsonc
"cortar_no_beat": {"beats": "analise/musica_beats.json", "downbeat": false}
```
Ajusta o fim de cada clip ao beat mais próximo (ou ao downbeat = 1 em cada 4). Usa `musica.inicio` como offset.

## `broll` (sobre o A-roll, a voz continua)
```jsonc
{"fonte": "b1", "in": 4.0, "t": "w:33", "ate": "w:40:e", "zoom": [1.05, 1.15], "vel": 1.0}
// ou "dur": 1.6 em vez de "ate"
```

## `graficos`
```jsonc
{"type": "hook",        "t": 0, "ate": "w:16", "text": "4 coisas que mudam\na tua *mentalidade*"},
{"type": "titulo",      "t": "c:3", "dur": 2, "text": "Antes de estar *pronto*"},
{"type": "card",        "t": "w:21", "ate": "w:25", "text": "2  Quadro de *visualização*"},
{"type": "numero",      "t": "w:80", "dur": 2.2, "text": "+37%", "sub": "em vendas"},
{"type": "lower_third", "t": 1.0, "dur": 3, "text": "Carlos Dias", "sub": "Consultor KW"},
{"type": "capitulo",    "t": "w:100", "dur": 2.4, "text": "O que meter no quadro", "sub": "01"},
{"type": "cta",         "t": "fim-3", "ate": "fim", "text": "Comenta *OBRA*", "text_color": "preto"}
```
`*palavra*` fica na cor de destaque. `\n` quebra a linha (no máximo 2). `pos`: `"auto"` (default, foge do rosto) | `top` | `upper` | `center` | `lower` | `bottom_left` | `[x, y]` em 0–1. `accent` por gráfico. `bg` força a luminância do fundo (0–1); omite-o e o render mede.

## `legendas`
```jsonc
"legendas": {
  "estilo": "apple",              // apple (premium) | impacto (viral, 1-3 palavras, pop) | karaoke | minimal (YouTube)
  "destaque": ["dinheiro", "casa"],  // palavras na cor de destaque
  "cor": "amarelo",
  "corrigir": {"hikigai": "ikigai"}, // erros do Whisper
  "remover": [45, 46],              // índices de palavras que não aparecem
  "esconder": [["w:21", "w:25"]],   // intervalos sem legenda (ex.: durante um card que diz o mesmo)
  "esconder_durante_graficos": true, // hook, numero e capitulo escondem as legendas
  "y": 0.70                         // posição vertical (default 0.70 em 9:16, 0.86 em 16:9)
}
```

## `sfx`
```jsonc
{"som": "whoosh_rapido_01", "t": "c:3-0.15", "db": -12}   // nome do ficheiro em efeitos-sonoros (sem extensão) ou caminho
```
Whoosh: começa 0,1–0,2 s ANTES do corte. Riser: acaba no corte (`t = corte - duração`). Impacto/pop: no frame exato.

## `musica`
```jsonc
"musica": {"path": "C:/.../track.mp3", "db": -20, "inicio": 12.5, "ducking": true, "fade_in": 0.3, "fade_out": 1.5}
```
Com voz: `db` −20 a −26 e `ducking` true (sidechain). Sem voz: `db` −6 a −10 e `ducking` false.

## `transicoes`
```jsonc
{"t": "c:3", "tipo": "flash", "forca": 0.6}   // flash (branco, 0.26 s) | dip (preto, 0.4 s)
```

## `overlays` (motion graphics externos com alfa)
```jsonc
{"file": "mg/grafico.mov", "t": "w:50"}   // .mov ProRes 4444 ou .webm VP9 com alfa, já no tamanho do vídeo
```

## `grade`
```jsonc
"grade": {"look": "filme", "intensidade": 0.7, "grao": 0.12, "vinheta": 0.3, "halation": 0.18, "nitidez": 0.25, "barras": false}
```
Looks: `neutro_cine`, `filme`, `teal_orange`, `dourado`, `imob_luminoso`, `frio_tech`, `noir`. `barras`: `true` (2.39:1) ou um rácio.

## `audio`
```jsonc
"audio": {"lufs": -14, "voz_eq": true}   // -14 redes, -16 YouTube/podcast
```
