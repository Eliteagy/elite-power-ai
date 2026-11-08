# Introducing New Modal Components!

Date: 2025-08-25
Categories: Interactions, Components
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L1646) · [Year index](INDEX.md)

<a id="source-introducing-new-modal-components"></a>


New modal components are now available.

<a id="source-whats-new"></a>

#### What’s New

A new top-level [Label](https://docs.discord.com/developers/components/reference#label) component for modals provides a `label`, `description`, and support for containing a Text Input or String Select. String Selects now work in modals.
- String Selects can be used in modals when placed inside a Label component.
- Text Inputs can also be placed inside a Label component.
- When a Text Input is inside a Label component, the Text Input `label` field is disallowed in favor of the Label component's `label`.
- ActionRow + TextInput is deprecated in favor of the new Label component for better accessibility.
- The `required` field is available on String Selects; it defaults to true in modals and is ignored in messages.
- The `disabled` field on String Selects is not currently allowed in modals and returns an error if used.
[modal interaction responses](https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object-component-interaction-response-structures) are now documented, along with resolved objects for interactive components in each component's Examples section.

<a id="source-new-layout-component"></a>

#### New Layout Component

- [**Label**](https://docs.discord.com/developers/components/reference#label) - A top-level component for adding a title and description to modal components.

<a id="source-updates-to-modal-components"></a>

#### Updates to Modal Components

- [**Text Input**](https://docs.discord.com/developers/components/reference#text-input) - Text Input can now be used inside a [Label](https://docs.discord.com/developers/components/reference#label).
- [**String Select**](https://docs.discord.com/developers/components/reference#string-select) - String Selects work in modals when placed in a [Label](https://docs.discord.com/developers/components/reference#label).

<a id="source-getting-started-1"></a>

#### Getting Started

- [Using Modal Components](https://docs.discord.com/developers/components/using-modal-components) - Learn how to create a modal.

<a id="source-developer-resources-2"></a>

#### Developer Resources

See the [Component Reference](https://docs.discord.com/developers/components/reference) for details on every available component.
