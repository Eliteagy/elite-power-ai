# Raised Component Limits

Date: 2025-04-29
Categories: User Apps, HTTP API, Interactions
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L2120) · [Year index](INDEX.md)

<a id="source-raised-component-limits"></a>


The top level component limit is being removed, and messages using the [`IS_COMPONENTS_V2` message flag](https://docs.discord.com/developers/resources/message#message-object-message-flags) can now contain up to 40 components. The component count limit is also removed for a [Container Component](https://docs.discord.com/developers/components/reference#container). Legacy messages are unchanged and still allow up to 5 action rows.

<a id="source-whats-new"></a>

#### What’s New

- **Total components**: A message can now contain up to 40 total components.
- **Top-level components**: Messages no longer have a top level component limit; the previous limit was 10.
- **[Container Component](https://docs.discord.com/developers/components/reference#container)**: Container Component no longer limits component count; the previous limit was 10.

<a id="source-developer-resources"></a>

#### Developer Resources

- See the [Component Reference](https://docs.discord.com/developers/components/reference) for full specifications for every available component.
- Use [Using Message Components](https://docs.discord.com/developers/components/using-message-components) to learn how to build rich component-based message layouts.
