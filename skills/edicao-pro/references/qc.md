# QC: o que tem de estar certo para ser profissional

`python scripts/qc.py FINAL.mp4 --edl edl.json` faz as verificações automáticas. O resto é revisão visual e auditiva, feita sempre.

## Automático (qc.py)
| Verificação | Critério | Se falhar |
|---|---|---|
| Formato | 1080×1920 / 1920×1080 / 1080×1350, yuv420p, H.264 | `formato` na EDL |
| Loudness | −14 ± 1 LUFS, true peak ≤ −1 dBTP | `audio.lufs`; voz muito comprimida → baixa a música |
| Frames pretos | nenhum | início/fim do ficheiro da câmara; `vskip` automático, ou muda o `in` |
| Imagem parada > 2,5 s | nenhum | falta movimento: `push`, b-roll, punch |
| Silêncio > 0,7 s | nenhum (exceto o fim) | `max_gap` mais baixo ou segmentos |
| Hook | gráfico `hook`/`titulo` em ≤ 1 s | acrescenta o hook |
| 1.ª palavra | ≤ 0,4 s | o 1.º segmento começa a meio da pausa: corrige o índice |
| Nitidez/brilho do 1.º frame | ≥ 35% da mediana / ≥ 40 de brilho | muda o 1.º plano |
| Ritmo | maior intervalo sem mudança ≤ 4 s (9:16) / 8 s (16:9) | punch, b-roll, card |

## Revisão visual (contact sheet + frames-chave)
- [ ] 1.º frame forte: rosto nítido, sem mão na cara, sem estar a ajeitar-se.
- [ ] Nenhuma cabeça cortada nos punch-ins.
- [ ] Gráficos fora do rosto, legíveis e dentro das safe areas.
- [ ] As legendas não colidem com cards (esconde-as durante cards que dizem o mesmo).
- [ ] Cor consistente entre clips (o mesmo look; nenhum clip muito mais quente/escuro).
- [ ] Último frame: a CTA lê-se, o fim não é abrupto (a não ser que seja um loop intencional).

## Revisão auditiva (ouvir o preview, ou pelo menos estes pontos)
- [ ] Junções sem cliques nem palavras comidas (início/fim de cada clip): `pad` maior se cortar consoantes.
- [ ] A música não compete com a voz.
- [ ] Os SFX estão ao frame e não são demasiados.
- [ ] Não há respirações altas nem "hum" que tenham escapado.

## Revisão de conteúdo
- [ ] O hook é a frase mais forte que existe no footage?
- [ ] Tudo o que ficou serve a promessa? Dá para cortar mais 10–20%?
- [ ] As legendas têm erros de transcrição (nomes próprios, anglicismos)? → `legendas.corrigir`.
- [ ] A CTA é uma ação só e clara?

## Entrega
Diz ao utilizador: o caminho do MP4, a duração, as decisões principais, os avisos do QC que ficaram (e porquê) e as dúvidas de transcrição. Guarda `edl.json` + `plano.txt` com o projeto.
