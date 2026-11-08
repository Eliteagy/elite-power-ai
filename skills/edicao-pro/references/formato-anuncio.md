# Anúncio / promo (15–30 s)

Ads pagos, lançamento de produto, promo de serviço, spec ads.

## Defaults
| Parâmetro | Valor |
|---|---|
| formato | 9:16 1080×1920 (Meta/TikTok) + versão 4:5 1080×1350 (feed) se pedido; 16:9 para YouTube ads |
| duração | 15 s (awareness) / 30 s (conversão) |
| plano | 0,8–1,5 s; alterna detalhe ↔ largo |
| timeline | `clips` com `cortar_no_beat` (+ `aroll` se houver alguém a falar) |
| grade | `teal_orange` 0,6 (lifestyle), `frio_tech` 0,7 (tech/SaaS), `dourado` 0,7 (luxo) |
| legendas | `impacto` (o ad corre sem som) |
| música | energia alta, drop alinhado com o produto/revelação |

## Estrutura de 30 s (problema → solução → prova → ação)
| Tempo | Bloco | Edição |
|---|---|---|
| 0–3 s | **Hook**: dor ou resultado em 1 frase + o visual mais forte | texto `hook`, zoom de impacto, SFX |
| 3–8 s | **Problema/agitação** | cortes rápidos (0,8 s), texto curto |
| 8–18 s | **Solução**: o produto/serviço em ação | match cuts, close de detalhe, slow-mo no momento-chave |
| 18–25 s | **Prova**: número, testemunho, antes/depois | `numero` grande, `card` com a citação |
| 25–30 s | **CTA + oferta + marca** | cápsula `cta`, logo discreto no fim (nunca no início) |

15 s: hook (3 s) → solução/prova (9 s) → CTA (3 s).

## Regras específicas
- **Sem som tem de funcionar**: toda a mensagem também está em texto.
- **Os primeiros 3 s carregam 50% do resultado**: testa 2–3 hooks diferentes (gera variantes com EDLs diferentes, mudando só o 1.º segmento e o texto do hook). É barato com a cache.
- **Match cuts**: a mesma forma, posição ou movimento entre dois planos (ver o contact sheet).
- **Logo**: só no end card ou no canto de forma discreta. Segue o HIG: a marca dá prioridade ao conteúdo.
- **Safe areas das plataformas**: nada importante nos 13% de cima nem nos 20% de baixo (UI de ads/TikTok). O `pos: auto` já o respeita; as legendas ficam a 0,70.
- Exporta variantes: `saida` diferente por formato (muda `formato` e volta a correr; o enquadramento pelo rosto ajusta-se sozinho).
