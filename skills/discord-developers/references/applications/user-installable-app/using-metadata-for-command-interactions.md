# Using metadata for command interactions
Context: Discord developer reference: Using metadata for command interactions
[Source](developing-a-user-installable-app-index.md) / [Previous source section](understanding-metadata-for-interactions.md) / [Following source section](using-metadata-for-message-component-interactions.md)
<a id="source-using-metadata-for-command-interactions"></a>

### Using metadata for command interactions

 The sample app's `/profile` command responds ephemerally when invoked from a server, so only the invoking user sees it. When invoked in a DM with the bot user, it sends a non-ephemeral response. The `app.js` handler for `/profile` contains this logic:

Using context for the profile command

The logic below handles `/profile`. When the interaction context is a server, the response is ephemeral and includes a button the user can use to share the profile.

```
// "profile" command
if (name === 'profile') {
  const profile = getFakeProfile(0);
  const profileEmbed = createPlayerEmbed(profile);

  // Use interaction context that the interaction was triggered from
  const interactionContext = req.body.context;

  // Construct `data` for our interaction response. The profile embed will be included regardless of interaction context
  let profilePayloadData = {
    embeds: [profileEmbed],
  };

  // If profile isn't run in a DM with the app, we'll make the response ephemeral and add a share button
  if (interactionContext !== 1) {
    // Make message ephemeral
    profilePayloadData['flags'] = 64;
    // Add button to components
    profilePayloadData['components'] = [
      {
        type: 1,
        components: [
          {
            type: 2,
            label: 'Share Profile',
            custom_id: 'share_profile',
            style: 2,
          },
        ],
      },
    ];
  }

  // Send response
  return res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: profilePayloadData,
  });
}

```

 In the sample app, the request body's `context` value is assigned to `interactionContext`. The handler uses that context to choose the response behavior. If the command ran in a guild or in a G(DM) other than the app bot user's DM, `flags` is set to `64` for an ephemeral response, and a button component is added so the user can share the profile.

