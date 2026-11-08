# Breaking Change: Default Channels

Date: 2017-08-03
Categories: Breaking Change
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L4506) · [Year index](INDEX.md)

<a id="source-breaking-change-default-channels"></a>


Default channel behavior changed. For a given user, the `default` channel is now the highest-position channel they have permission to view. New guilds no longer get a default channel whose id matches the guild id, while existing guilds keep their #general channel id. A user may have no default channel if permissions allow no visible channel. Servers that previously repurposed #general as a read-only announcement channel after clearing its history can now delete and recreate that channel with desired permissions. The change also supports permission-based dynamic defaults. Discord is also rolling out remembered last-visited channels across sessions: new members go to the guild's default channel on first join, while existing members return to their previous channel.
