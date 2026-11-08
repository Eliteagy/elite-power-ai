# Using metadata for message component interactions
Context: Discord developer reference: Using metadata for message component interactions
[Source](developing-a-user-installable-app-index.md) / [Previous source section](using-metadata-for-command-interactions.md) / [Following source section](next-steps.md)
<a id="source-using-metadata-for-message-component-interactions"></a> <a id="source-interaction_metadata"></a> <a id="source-authorizing_integration_owners-1"></a>

### Using metadata for message component interactions

 Message component interactions can be triggered by any user who can see the component, regardless of installation context. Because the triggering user may be anyone with visibility, metadata helps identify the relevant installation context. Suppose you add a `/game` command for the `USER_INSTALL` installation context that lets a user post a message in the current guild or group DM asking who wants to join a game match. (Figure: Sample game command response) When another user clicks the button, the app needs to track two users:
1. User B, who clicked the "Join" button, so the app can record interest in joining the match
2. User A, who ran the `/game` command, so the app can tell them who wants to join the match
 Two additional fields are useful in this scenario:

###### `interaction_metadata`

 Messages created as interaction responses include an [`interaction_metadata` object](https://docs.discord.com/developers/resources/message#message-interaction-metadata-object) with metadata from the interaction.

###### `authorizing_integration_owners`

 `authorizing_integration_owners` matters most for message component interactions on user-installed apps. It can distinguish the user who installed the app from the user who triggered the interaction, because messages created by interaction responses or follow-up messages may be visible to users who have not installed the app to their own account.

