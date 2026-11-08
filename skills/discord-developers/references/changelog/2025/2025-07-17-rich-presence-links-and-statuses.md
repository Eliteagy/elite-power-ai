# Clickable Links and Customizable Statuses in Rich Presence

Date: 2025-07-17
Categories: Activities, Embedded App SDK
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L1934) · [Year index](INDEX.md)

<a id="source-clickable-links-and-customizable-statuses-in-rich-presence"></a>


Rich Presences now support more interactive and flexible experiences for people using your application. The update has two major pieces:
- Clickable links can be added to state text, details text, large image, and small image
- You can choose whether the name, state, or details field appears in user status text in the member list, such as showing "Listening to Rick Astley" instead of "Listening to MyMusic"
The new fields are documented in the [Activity Object](https://docs.discord.com/developers/events/gateway-events#activity-object) section of Gateway Events and are also exposed through the Embedded App SDK.
