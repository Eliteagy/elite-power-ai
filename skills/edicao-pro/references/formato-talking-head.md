# Reel / Short talking head (9:16)

Pessoa a falar para a câmara: consultores, marca pessoal, educação, clientes da agência.

## Defaults
| Parâmetro | Valor |
|---|---|
| formato | 1080×1920, 30 fps |
| duração | 20–45 s |
| `aroll.max_gap` / `pad` | 0,28 / [0,05, 0,10] |
| `punch` | `{"cada": 3.5, "niveis": [1.0, 1.15]}` |
| `push` | 0,025 |
| 1.º segmento | `"entrada": "impacto"` |
| legendas | `apple` (premium/educativo) ou `impacto` (energia/vendas) |
| grade | `filme` 0,6 + grão 0,1 + vinheta 0,3 + halation 0,15, ou `neutro_cine` 0,8 (corporativo) |
| música | −24 dB com ducking (opcional, mas a cama sonora ajuda) |

## Estrutura (30–45 s)
| Tempo | Bloco | Edição |
|---|---|---|
| 0–2 s | **Hook** (a frase mais forte, reordenada) | zoom de impacto, título `hook`, `impacto_seco_curto` |
| 2–6 s | **Promessa** ("vou mostrar-te X") | punch 1,15, legendas a entrar |
| 6–35 s | **Conteúdo** em 2–4 blocos | 1 card ou número por bloco, b-roll se houver, punch alternado |
| últimos 5 s | **Payoff + CTA** | cápsula `cta`, pop, música sobe ou corta seco |

## Regras específicas
- Ordem dos segmentos ≠ ordem gravada. Hook primeiro e despedidas fora.
- Lista? Cards "1 …", "2 …" a entrar quando ele diz "primeiro/segundo" (`t` na palavra "Primeira"). Esconde as legendas nesse intervalo se o card disser o mesmo.
- Palavras de destaque nas legendas: 1 por frase, no máximo. Substantivos de valor (dinheiro, casa, erro, número).
- Sem b-roll: os punch-ins + cards + SFX fazem o trabalho. Com b-roll: 1 b-roll a cada 6–10 s, 1,2–2 s cada.
- Fundo claro (parede branca) e camisa clara → legendas `apple` com contorno (já é o default). Confirma no preview.
- Rosto: o enquadramento é automático. Se a pessoa se mexe muito, confirma os frames de cada clip.

## EDL modelo
```json
{
  "saida": "saida/reel.mp4",
  "formato": {"w": 1080, "h": 1920, "fps": 30},
  "fontes": {"a": {"path": "RAW.mov", "analise": "analise/RAW.json"}},
  "aroll": {"fonte": "a", "max_gap": 0.28, "pad": [0.05, 0.1], "push": 0.025,
            "punch": {"cada": 3.5, "niveis": [1.0, 1.15]},
            "segmentos": [{"palavras": [HOOK_I0, HOOK_I1], "entrada": "impacto"}, {"palavras": [A, B]}]},
  "cor_destaque": "amarelo",
  "graficos": [{"type": "hook", "t": 0, "ate": "w:IDX_FIM_HOOK", "text": "Linha 1\nlinha *2*"}],
  "legendas": {"estilo": "apple", "destaque": []},
  "sfx": [{"som": "impacto_seco_curto", "t": 0, "db": -9}],
  "grade": {"look": "filme", "intensidade": 0.6, "grao": 0.1, "vinheta": 0.3, "halation": 0.15, "nitidez": 0.25}
}
```
