# Handling select menu interactions game state result and follow up edit
[Source](buttons-select-menus-and-game-results-index.md) / [Reviewed program owner and required setup](adding-a-command-with-options.md) / [Previous source section](handling-button-interactions-and-ephemeral-selection-reply.md) / [Following source section](complete-message-component-acceptance-and-select-menu-handler.md)

Handling select menu interactions

Code for handling select menu interactions and applying the game-state update

The final addition is a select-menu interaction handler that posts the game result to the channel.Because select menus are message components too, their interaction handling is very close to the button path.Update the earlier code so it also handles the select menu:

As in the previous handler, this code reads the interacting user's ID and selected object from the interaction request. It passes that data, together with the original user's ID and choice from `activeGames`, into `getResult()`. `getResult()` decides who won and creates a human-readable result string for the channel.The code also calls a webhook to [update the follow-up ephemeral message](https://docs.discord.com/developers/interactions/receiving-and-responding#edit-followup-message), since that message cannot be deleted.Finally, the app posts the result to the channel with the `CHANNEL_MESSAGE_WITH_SOURCE` interaction response type. Test the app to confirm the full flow works.

---
