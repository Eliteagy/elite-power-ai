# Hooks: os primeiros 1,5 segundos

O feed decide em ~1,5 s. O hook tem **3 camadas em simultâneo**, e um bom hook usa as 3:
1. **Verbal**: a primeira frase dita.
2. **Visual**: o 1.º frame e o movimento (rosto nítido em close, ação a meio, zoom de impacto, algo inesperado).
3. **Texto**: o título no ecrã (diz o hook de outra forma, não a mesma frase palavra a palavra).

## Como escolher o hook do footage (processo)
1. Lê a transcrição inteira e marca as 5 frases com mais **tensão**: número concreto, contradição, erro, dinheiro, medo, resultado, segredo, "ninguém te diz".
2. Para cada uma pergunta: *se só ouvir isto, fico para saber o resto?* Deve abrir um loop e não o fechar.
3. A frase ganhadora vai para **o início**, mesmo que venha do meio ou do fim (segmento reordenado). Depois corta-a no sítio original, se ficar repetida.
4. Se nenhuma frase servir: o hook é **texto + visual** (título forte sobre o plano mais dinâmico) e a fala começa logo a seguir.
5. **Nunca** abrir com: "olá", "bem-vindos", "neste vídeo vou...", o nome, o logótipo, uma intro musical, um plano vazio ou alguém a ajeitar-se.

## Fórmulas verbais / de texto (adaptar ao conteúdo e ao tom do cliente)
**Contradição / crença errada**
- "Para de fazer [hábito comum]. Está a custar-te [resultado]."
- "Toda a gente diz [conselho]. Está errado."
- "[Coisa óbvia] não é o problema. O problema é [coisa inesperada]."

**Número e especificidade** (números exatos > redondos)
- "Vendi [T3 em Benfica] em [11 dias]. Fiz isto:"
- "3 erros que fazem um [imóvel] ficar [6 meses] no mercado."
- "[37%] dos [compradores] decidem nos primeiros [8 segundos] da visita."

**Curiosidade / loop aberto**
- "Ninguém te diz isto antes de [comprar casa]."
- "Isto mudou a forma como [eu faço X]. Fica até ao fim."
- "O pormenor que [92% dos consultores] ignora. (texto: 'O nº 3 é o pior')"

**Dor / consequência**
- "Se estás a [fazer X], estás a perder [dinheiro/tempo]."
- "O erro de [5 mil euros] que quase toda a gente faz ao [vender casa]."

**Resultado / transformação**
- "De [estado A] para [estado B] em [tempo]. Como:"
- "Esta [casa] estava [6 meses] parada. Em [2 semanas] vendeu-se. A diferença:"

**Direto ao público (qualificar)**
- "Se és [consultor / dono de negócio em X], isto é para ti."
- "[Quem vai comprar casa em 2026]: vê isto antes."

**Pergunta com aposta**
- "Consegues adivinhar quanto custa [isto]?" (o preço vem no fim → retenção)
- "Qual destas 3 [cozinhas] vende mais depressa?"

**Lista** (o espectador conta e fica)
- "[4] coisas que [mudam a tua mentalidade]." + texto "1/4" a acompanhar.

## Hooks visuais (escolhe 1 e combina com o verbal)
| Técnica | Como na EDL |
|---|---|
| Zoom de impacto (1,22→1 em 0,22 s) | `"entrada": "impacto"` no 1.º segmento + `impacto_seco_curto` no t=0 |
| Entrar a meio da ação (porta a abrir, a andar) | `clips` com `in` já em movimento |
| Contraste de escala (macro → largo) | 2 clips de 0,6–0,8 s no início |
| Speed ramp (rápido → normal no beat) | clip com `vel` 2–3 seguido de `vel` 1 no beat |
| Prova visual primeiro (o resultado, o "depois") | resultado no 1.º clip e o processo depois |
| Texto que provoca + rosto em close | `hook` + punch 1,15 |
| Flash + whoosh no 1.º corte (máx. 1 por vídeo) | `transicoes: flash` em `c:1` |

## Texto do hook (design)
- Máx. **2 linhas, 3–6 palavras por linha**. Uma palavra-chave na cor de destaque (`*palavra*`).
- Fica no ecrã até ao fim da frase do hook (`"ate": "w:IDX"`), normalmente 1,5–3 s. As legendas ficam escondidas enquanto ele está visível (é automático).
- **Complementa** a fala, não a repete: a fala diz "neste módulo vamos ver 4 coisas" e o texto diz "4 coisas que mudam a tua *mentalidade*".
- SFX: `impacto_seco_curto` (−9 dB) ou `pop_grave_titulo` (−12 dB) no frame em que entra.

## Checklist do hook (antes de renderizar)
- [ ] A 1.ª palavra cai antes de 0,4 s?
- [ ] O 1.º frame tem rosto nítido/ação, sem mão na cara nem desfoque?
- [ ] Há um loop aberto que só se fecha mais tarde?
- [ ] O texto lê-se em 1 s, sem tapar o rosto?
- [ ] Há SFX no frame de entrada?

## Biblioteca alargada (vault do utilizador)
Para mais fórmulas e exemplos por nicho, lê:
- `C:\Users\Goldrajch\Documents\apps e wb sites ai\Elite Agency\Apollo OB Memoria\cerebro\vault\The Elite Agency OB\The Elite Agency\3-Recursos\Conteúdo\00-Mega-Biblioteca-Hooks-Virais.md`
- Na mesma pasta: `05-Scripts-Por-Nicho.md`, `10-Framework-7-Angulos.md` e `12-Estagios-Consciencia-Mercado-Schwartz-Great-Leads.md` (o nível de consciência do público decide o tipo de hook).
