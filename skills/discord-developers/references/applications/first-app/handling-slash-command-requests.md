# Handling slash command requests
Context: Discord developer reference: Handling slash command requests
[Source](app-registration-and-commands-index.md) / [Previous source section](adding-an-interaction-endpoint-url.md) / [Following source section](adding-message-components.md)
<a id="source-handling-slash-command-requests"></a>

### Handling slash command requests

 After the endpoint is verified, open `app.js` in the project and find the block that handles the `/test` command:

```
// "test" command
if (name === 'test') {
  // Send a message into the channel where command was triggered from
  return res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      flags: InteractionResponseFlags.IS_COMPONENTS_V2,
      components: [
        {
          type: MessageComponentTypes.TEXT_DISPLAY,
          // Fetches a random emoji to send from a helper function
          content: `hello world ${getRandomEmoji()}`
        }
      ]
    },
  });
}

```

 That code responds to the interaction by posting a message in the originating channel, DM, or Group DM. The documentation lists response types such as modals in the [interaction response object](https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type). `InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE` is a constant [exported from `discord-interactions`](https://github.com/discord/discord-interactions-js/blob/main/src/index.ts#L33). Go to the server and test the `/test` slash command. Triggering it should make the app send a message containing "hello world" followed by a random emoji. Next, add a command that uses slash command options, buttons, and select menus for the rock-paper-scissors game.

---

