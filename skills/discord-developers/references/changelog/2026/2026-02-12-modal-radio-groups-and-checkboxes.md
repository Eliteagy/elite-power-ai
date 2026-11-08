# Radio Groups, Checkbox Groups, and Checkboxes in Modals

Date: 2026-02-12
Categories: Interactions, Components
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L1055) · [Year index](INDEX.md)

<a id="source-radio-groups-checkbox-groups-and-checkboxes-in-modals"></a>


Discord introduced three modal components: **Radio Groups**, **Checkbox Groups**, and **Checkboxes**. They add modal inputs for single-choice answers, multi-option selection, and yes/no toggles.

<a id="source-the-new-components"></a>

#### The New Components

- [**Radio Group**](https://docs.discord.com/developers/components/reference#radio-group): Presents a list where the user chooses exactly one option. The `required` field can make the selection optional.
- [**Checkbox Group**](https://docs.discord.com/developers/components/reference#checkbox-group): Lets users select multiple options while `min_values` and `max_values` define the allowed range.
- [**Checkbox**](https://docs.discord.com/developers/components/reference#checkbox): Provides a boolean yes/no control.
All three components must be nested inside a [**Label**](https://docs.discord.com/developers/components/reference#label) component and can be used only in modals.

<a id="source-developer-resources"></a>

#### Developer Resources

- [Using Modal Components](https://docs.discord.com/developers/components/using-modal-components) - Guide for creating modals
- [Component Reference](https://docs.discord.com/developers/components/reference) - Full documentation for available components
