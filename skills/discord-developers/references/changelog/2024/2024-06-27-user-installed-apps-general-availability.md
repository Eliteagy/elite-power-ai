# User-Installed Apps General Availability

Date: 2024-06-27
Categories: Breaking Change
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L2854) · [Year index](INDEX.md)

<a id="source-user-installed-apps-general-availability"></a> <a id="source-api-updates"></a> <a id="source-new-use-external-apps-permission"></a> <a id="source-updated-defaults-for-new-apps"></a>


The [user-installed apps beta](https://docs.discord.com/developers/change-log#userinstallable-apps-preview) announced in March has reached general availability after developer and modmin feedback. User-installed apps can now be used in all servers regardless of size. This update includes API and behavior changes for user-installed apps.

###### API Updates

- `user_id` was removed from the `interaction_metadata` field on messages. Use the `id` field in the nested `user` object instead. See the [Message Interaction Metadata Object](https://docs.discord.com/developers/resources/message#message-interaction-metadata-object) for details.
- User-installed apps can create at most 5 [follow-ups](https://docs.discord.com/developers/interactions/receiving-and-responding#followup-messages) while responding to interactions. This affects only the [Create Followup Message endpoint](https://docs.discord.com/developers/interactions/receiving-and-responding#create-followup-message), not apps installed to the server.
- On [Interactions](https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object-interaction-structure), `authorizing_integration_owners` is now serialized correctly as a string. The `"0"` value used to be serialized incorrectly as a number.
- `app_permissions` on [Interactions](https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object-interaction-structure) now correctly reflects permissions for user-installed apps. The previous value was wrong for user-installed apps.
- Updating a message can return `400` when AutoMod blocks the message content, which matters especially for [deferred messages](https://docs.discord.com/developers/interactions/receiving-and-responding#responding-to-an-interaction).
- Interaction responses are no longer forced ephemeral in servers with over 25 members.

###### New `Use External Apps` Permission

Discord added the [`USE_EXTERNAL_APPS` (`1 << 50`) permission](https://docs.discord.com/developers/topics/permissions#permissions-bitwise-permission-flags) and enables it for servers by default. This permission lets modmins control whether user-installed apps may publish non-ephemeral replies in a server. When `Use External Apps` is disabled and your app is *not* installed to that server, your app's responses appear as ephemeral messages to the end user. Read more in the [Moderating Apps on Discord Help Center article](https://support.discord.com/hc/en-us/articles/23957313048343-Moderating-Apps-on-Discord#h_01HZQQQEADYVN2CM4AX4EZGKHM).

###### Updated Defaults for New Apps

- Newly-created apps now default to both "User Install" *and* "Guild Install" [installation contexts](https://docs.discord.com/developers/resources/application#installation-context) enabled. Change this in the **Installation** tab in an [app's settings](https://discord.com/developers/applications).
- Newly-created apps now default to the "Discord Provided Link" [install link](https://docs.discord.com/developers/resources/application#install-links). Change this in the **Installation** tab in an [app's settings](https://discord.com/developers/applications).
- When Discord Provided Link is selected as the install link type, the `application.commands` scope is added to both installation contexts.
