---
name: avaliar-planos
description: Pré-seleciona os melhores trechos de filmagem (b-roll, tours de imóveis) com medidas técnicas e abre uma página para o utilizador marcar bons e maus. Usar antes de montar qualquer vídeo com b-roll, ou quando pedirem para escolher, avaliar ou rever planos e filmagens.
---

# Avaliar planos

Escreve sempre em português de Portugal.

O Claude vê frames soltos e medidas, não sente o movimento nem a beleza de um plano. Esta skill elimina o que é tecnicamente mau e deixa a decisão final para quem sabe ver. **Nunca apresentar uma nota técnica como prova de que um plano é bonito ou bom.**

## Fluxo

1. **Analisar** os clips (usa proxies verticais, se houver):
   ```
   python scripts/avaliar.py analisar <pasta ou ficheiros> -o <pasta de saída> --por-clip 3
   ```
   Cria trechos de pré-visualização, `planos.json` e `revisao.html`.
2. **Mostrar** `revisao.html` ao utilizador, abrindo-o no Brave. Ele vê cada trecho em movimento, marca Bom ou Mau e o motivo, e carrega em "Exportar votos" (`votos.json`, nas Transferências).
3. **Aprender:**
   ```
   python scripts/avaliar.py aprender <votos.json> --planos <planos.json>
   ```
   Junta os votos a `dados/votos_acumulados.json` e atualiza `dados/criterios.json`.
4. **Montar só com os trechos marcados Bom.** Trechos não votados não entram sem o utilizador dizer.

## Medidas

| Medida | O que apanha | O que não apanha |
|---|---|---|
| `tremor_px` | Vibração, falhas do estabilizador | Movimento feio mas suave |
| `salto_px` | Solavancos | Plano sem interesse |
| `velocidade_px` | Panorâmica demasiado rápida | Ritmo em relação à música |
| `nitidez` | Desfocado, motion blur | Foco no objeto errado |
| `estourado_pct`, `escuro_pct` | Janelas estouradas, sombras negras | Cor feia |

## Regras

- `criterios.json` começa com limites iniciais, não calibrados. Com menos de 10 votos Bom e 10 votos Mau, `aprender` não muda os limites.
- Os motivos escritos pelo utilizador valem mais do que qualquer medida. Se um motivo se repetir, guardá-lo na memória de edição.
- Esta skill não vê pessoas, matrículas, dados de clientes nem operador no espelho. Esses pontos continuam a precisar de frames vistos e dos olhos do utilizador.
- Depois de montar, continua a ser preciso o QC normal.
