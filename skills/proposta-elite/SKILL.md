---
name: proposta-elite
description: Monta a proposta comercial da Elite Agency para um lead (consultor ou agência imobiliária), só com preços da tabela oficial, e entrega-a em Markdown e, quando pedido, em DOCX ou PDF com a marca Elite. Bloqueia preços fora da tabela. Usar quando pedirem "faz a proposta para X", "manda-me o orçamento", "quanto levo a X" ou depois de uma chamada de fecho.
---

# Proposta Elite

## Fonte única de preços

`Elite Agency\Financas\precos\tabela-precos.md`.

- Se o estado da tabela não for **APROVADO**, avisa no topo da proposta: "Preços em rascunho — não enviar antes de o Gui aprovar a tabela."
- Pacote ou valor que não está na tabela: **para**. Diz ao Gui que pacote falta e qual seria o valor, e só continuas com o sim dele. Regista a exceção na proposta ("Exceção aprovada pelo Gui em AAAA-MM-DD").
- Desconto só com a contrapartida da tabela (pagamento trimestral adiantado, testemunho em vídeo ou 6 meses).

## Recolha (antes de escrever)

1. Nota da chamada em `Elite Agency\Obecidian\Biblioteca\Chamadas\` e briefing em `Elite Agency\CRM\reunioes\`.
2. CRM (só `SELECT` na tabela `cliente`): nome, empresa, país, estado e `valor_cents` já falado.
3. Lições: `Elite Agency\CRM\dashboard\.claude\conhecimento-vendas\licoes-chamadas.md`, secção 4 (preços já ditos a este lead).
4. **Quem paga.** Se não se sabe quem é o decisor financeiro, fica como pendente: o João Costa e o Paulo aceitaram o preço e não pagaram.
5. IVA: país e tipo de cliente, com a skill `iva-pt-angola`. Fora de Portugal fica "a confirmar pelo contabilista".

## Estrutura (máximo 2 páginas)

1. **O problema dele**, com as palavras que ele usou (ex.: "tenho angariações, mas não ao ritmo que queria").
2. **O que muda**: uma presença digital forte que faz o vendedor ou o comprador ligar-lhe a ele. Nunca usar a palavra "marketing". Nunca atacar o que ele já tem.
3. **Pacote**: nome, entregáveis por mês, preço sem IVA, IVA e total.
4. **Marcos**: revisão aos 30 e aos 60 dias, com as métricas (mensagens e contactos de proprietários).
5. **Condições**: 3 meses, saída ao fim de cada mês se não houver resultados; pagamento mensal adiantado; a 1.ª mensalidade marca o início.
6. **Próximo passo**: uma ação com data ("confirmar até sexta, arranque na segunda").

## Saída

- Sempre: `Elite Agency\Financas\precos\AAAA-MM-DD-cliente.md`.
- DOCX ou PDF quando pedido, com `anthropic-skills:docx` ou `anthropic-skills:pdf`. Marca: fundo claro, dourado `#D6A369` como cor de destaque, logótipo se existir. A skill `proposal-builder` serve de referência de estrutura, mas os preços vêm só da tabela.
- Não envias a proposta. O Gui envia.
