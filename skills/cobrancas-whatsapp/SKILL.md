---
name: cobrancas-whatsapp
description: Prepara mensagens de cobrança educadas para WhatsApp ou email aos clientes da Elite Agency com pagamentos em atraso, na cadência de 3, 10 e 20 dias, em português de Portugal (com variante para Angola). Só rascunhos; o Gui envia. Usar quando pedirem "quem me deve", "cobra o X", "lembra o cliente de pagar" ou na revisão semanal de recebimentos.
---

# Cobranças por WhatsApp e email

Só rascunhos. Nunca envias. Nunca mostras o IBAN ou outros dados bancários no chat: na mensagem escreve `[IBAN]` e o Gui substitui.

## Entrada

`C:\Users\Goldrajch\Desktop\The elite Agency\Faturas\recebimentos.md`: cliente, valor, data da fatura, limite, estado e dias de atraso. Confirma o contacto no CRM (tabela `cliente`, só `SELECT`).

## Cadência

| Dias de atraso | Tom | Objetivo |
|---|---|---|
| 3 | Lembrete leve: parte do princípio de que foi esquecimento | Pagar esta semana |
| 10 | Direto, menciona o trabalho em curso | Data concreta de pagamento |
| 20 | Firme e educado, propõe uma chamada de 10 minutos | Plano de pagamento ou pausa da produção |
| 30 ou mais | Não escreves: alertas o Gui para decidir (pausa, plano ou terminar) | — |

Cliente que costuma pagar a horas: tom um degrau mais leve. Cliente que já atrasou antes: segue a tabela à letra.

## Modelos (adaptar ao nome, ao valor e ao mês)

**3 dias**
> Olá <nome>, tudo bem? Só um lembrete rápido: a mensalidade de <mês> (<valor> €) venceu a <data>. Se já tratou, ignore esta mensagem. Obrigado!

**10 dias**
> Olá <nome>. A mensalidade de <mês> (<valor> €) ainda está em aberto desde <data>. Os conteúdos deste mês já estão em produção. Consegue dizer-me em que dia faz a transferência?

**20 dias**
> Olá <nome>. A mensalidade de <mês> (<valor> €) está em atraso há 20 dias. Quero manter o seu plano a andar sem interrupções. Podemos falar 10 minutos amanhã para acertar a data ou um plano de pagamento?

**Angola:** tratar por "o senhor" ou "a senhora" quando o cliente o fizer, indicar a moeda e quem paga as comissões da transferência internacional.

## Regras

- Uma mensagem por cliente em cada etapa. Se o cliente respondeu com uma data, não há etapa seguinte até essa data passar.
- Nunca ameaçar, nunca expor o atraso a terceiros, nunca escrever em grupos.
- Depois de o Gui enviar, atualiza `recebimentos.md` com a data do lembrete e a etapa.
