# Deprecation: RPC online member count and members list

Date: 2018-06-11
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L4410) · [Year index](INDEX.md)

<a id="source-deprecation-rpc-online-member-count-and-members-list"></a>


Server changes allow guilds to expose incomplete member lists in clients, making RPC member lists and online counts inaccurate. Those fields are deprecated and will return an empty members array and an online count of 0 going forward.
