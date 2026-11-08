# New Select Menu Components

Date: 2022-10-13
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L3611) · [Year index](INDEX.md)

<a id="source-new-select-menu-components"></a>


Discord added four select menu [component types](https://docs.discord.com/developers/components/reference#component-object-component-types) to make common Discord resources easier to present in selects:
- User select (type `5`)
- Role select (type `6`)
- Mentionable select for users *and* roles (type `7`)
- Channel select (type `8`)
The new select menu components follow the existing string select menu shape, except they omit `options`; channel select menus may also include `channel_types`. The [select menu interaction](https://docs.discord.com/developers/components/reference#string-select-string-select-interaction-response-structure) payload for the new components includes a [`resolved` field](https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object-resolved-data-structure). See the updated [select menu documentation](https://docs.discord.com/developers/components/reference#component-object-component-types) and the [select menu interaction](https://docs.discord.com/developers/components/reference#string-select-string-select-interaction-response-structure) details for more information.
