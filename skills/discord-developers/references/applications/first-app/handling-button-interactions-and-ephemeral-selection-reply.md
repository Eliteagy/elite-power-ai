# Handling button interactions and ephemeral selection reply
Context: Discord developer reference: Handling button interactions and ephemeral selection reply
[Source](buttons-select-menus-and-game-results-index.md) / [Reviewed program owner and required setup](adding-a-command-with-options.md) / [Previous source section](adding-a-command-with-options.md) / [Following source section](select-menu-game-results-and-followup.md)

Handling button interactions

Code for processing button clicks and replying with an ephemeral message

When someone uses a message component, Discord sends an interaction whose [interaction type](https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object-interaction-type) is `3`, or `MESSAGE_COMPONENT` when using `discord-interactions`.To handle the button, inspect the interaction `type`, then match the `custom_id`.Place this code below the `APPLICATION_COMMAND` type handler:

```
if (type === InteractionType.MESSAGE_COMPONENT) {
  // custom_id set in payload when sending message component
  const componentId = data.custom_id;

  if (componentId.startsWith('accept_button_')) {
    // get the associated game ID
    const gameId = componentId.replace('accept_button_', '');
    // Delete message with token in request body
    const endpoint = `webhooks/${process.env.APP_ID}/${req.body.token}/messages/${req.body.message.id}`;
    try {
      await res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          // Indicates it'll be an ephemeral message
          flags: InteractionResponseFlags.EPHEMERAL | InteractionResponseFlags.IS_COMPONENTS_V2,
          components: [
            {
              type: MessageComponentTypes.TEXT_DISPLAY,
              content: 'What is your object of choice?',
            },
            {
              type: MessageComponentTypes.ACTION_ROW,
              components: [
                {
                  type: MessageComponentTypes.STRING_SELECT,
                  // Append game ID
                  custom_id: `select_choice_${gameId}`,
                  options: getShuffledOptions(),
                },
              ],
            },
          ],
        },
      });
      // Delete previous message
      await DiscordRequest(endpoint, { method: 'DELETE' });
    } catch (err) {
      console.error('Error sending message:', err);
    }
  }
  return;
}

```

The above code:
1. Looks for the `custom_id` originally sent by the app; in this example it begins with `accept_button_`. Because the active game ID is appended to that custom ID, the handler saves it in `gameID`.
2. [Deletes the original message](https://docs.discord.com/developers/interactions/receiving-and-responding#delete-original-interaction-response) by calling a webhook through `node-fetch` and including the unique interaction `token` in the request body. This removes clutter from the channel and prevents other users from pressing the button.
3. Answers the request with a message containing a select menu for the game's object choices. The payload is mostly the same as the earlier payload, except that it includes the `options` array and `flags: 64`, [which marks the message as ephemeral](https://docs.discord.com/developers/interactions/receiving-and-responding#create-followup-message).
`getShuffledOptions()` in `game.js` fills the `options` array by reshaping `RPSChoices` into the [string select options](https://docs.discord.com/developers/components/reference#string-select-select-option-structure) format.

