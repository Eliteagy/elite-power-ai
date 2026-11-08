# Add Subcommand Groups and Subcommands to Message Interaction Objects

Date: 2022-07-01
Categories: Breaking Change
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L3731) · [Year index](INDEX.md)

<a id="source-add-subcommand-groups-and-subcommands-to-message-interaction-objects"></a>


This is a breaking change, but most apps depend on interaction responses (`INTERACTION_CREATE`) rather than message interaction objects (`MESSAGE_CREATE`). [Interaction responses](https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object-interaction-data) do not change.

<a id="source-upcoming-changes"></a>

#### Upcoming Changes

Beginning **July 18, 2022**, the `name` field on [message interaction objects](https://docs.discord.com/developers/interactions/receiving-and-responding#message-interaction-object) will include subcommands and subcommand groups along with the top-level command. Future apps should avoid depending on this `name` field. The `name` value is built from command levels, when present, separated by spaces: `<command name> <subcommand group name> <subcommand name>`. The `name` field appears only on messages that respond to an interaction without an existing message, so message component interaction objects do not include it.

<a id="source-updating-your-app"></a>

#### Updating your app

Most apps use interaction responses rather than message interaction objects. Depending on `name` in message interaction objects is not recommended; apps that do so should handle subcommands and subcommand groups. For example, suppose an app has `/role` with subcommands `add` and `remove`. Today, the original interaction payload has `name` set to `role`, and a fetched response message's message interaction object also has `name` set to `role`. After the change, the original interaction payload still uses `role`, but the fetched response message's message interaction object may use `role add` or `role remove`.
