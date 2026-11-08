# Adding a command with options
[Source](app-registration-and-commands-index.md) / [Continued source contract](adding-a-command-with-options.md) / [Previous source section](adding-message-components.md)

<a id="source-adding-a-command-with-options"></a>

### Adding a command with options

 The `/challenge` command is named `CHALLENGE_COMMAND` in `commands.js` and contains an array of `options`. In the sample, those options are objects for selectable rock-paper-scissors choices, generated from the keys of `RPSChoices` in `game.js`. The [documentation](https://docs.discord.com/developers/interactions/application-commands#application-command-object-application-command-option-structure) covers command options and their structure. This guide does not focus on `game.js`, but you can inspect it and adjust commands or options.

Handling the command interaction

Code for handling the challenge command and returning a message with a button

To handle the `/challenge` command, place this code after the `if name === “test”` if block:

```
// "challenge" command
if (name === 'challenge' && id) {
  // Interaction context
  const context = req.body.context;
  // User ID is in user field for (G)DMs, and member for servers
  const userId = context === 0 ? req.body.member.user.id : req.body.user.id;
  // User's object choice
  const objectName = req.body.data.options[0].value;

  // Create active game using message ID as the game ID
  activeGames[id] = {
    id: userId,
    objectName,
  };

  return res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      flags: InteractionResponseFlags.IS_COMPONENTS_V2,
      components: [
        {
          type: MessageComponentTypes.TEXT_DISPLAY,
          // Fetches a random emoji to send from a helper function
          content: `Rock papers scissors challenge from <@${userId}>`,
        },
        {
          type: MessageComponentTypes.ACTION_ROW,
          components: [
            {
              type: MessageComponentTypes.BUTTON,
              // Append the game ID to use later on
              custom_id: `accept_button_${req.body.id}`,
              label: 'Accept',
              style: ButtonStyleTypes.PRIMARY,
            },
          ],
        },
      ],
    },
  });
}

```

<a id="source-getting-started-part-2"></a>

> Discord Developers reference. Original prose; identifiers preserved verbatim.

If the insertion point is unclear, refer to the complete implementation in `examples/app.js`.The code above handles several tasks:
1. Reads the request body to determine the slash-command caller ID (`userId`) and the selected option or object choice (`objectName`). For server interactions (`context === 0`), the user ID is under `member`; for a DM or Group DM, it is under `user`.
2. Creates an entry in `activeGames` keyed by the interaction ID. That active game stores both `userId` and `objectName`.
3. Replies in the channel with a button whose `custom_id` is `accept_button_<SOME_ID>`.
The sample stores state in an object in memory; production apps should replace that with a database.When a message includes [message components](https://docs.discord.com/developers/components/reference), each component payload goes in the `components` array. Interactive components such as buttons must be placed inside an [action row](https://docs.discord.com/developers/components/reference#action-row), as shown by the sample code.Pay attention to the distinct `custom_id` attached to message components here: `accept_button_` plus the active game ID. Use a `custom_id` to route the requests Discord sends when a user activates the component, as shown next.After running `/challenge` and choosing an option, the app posts a message with an **Accept** button. The next step is handling that button interaction.
