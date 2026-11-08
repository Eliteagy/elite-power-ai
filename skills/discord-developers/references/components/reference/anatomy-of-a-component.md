# Anatomy of a component
Context: Discord developer reference: Anatomy of a component
[Source](buttons-and-select-menus-index.md) / [Previous source section](component-object-component-types.md) / [Following source section](action-row.md)
<a id="source-anatomy-of-a-component"></a> <a id="source-custom-id"></a>

### Anatomy of a Component

 Every component includes these fields:
| Field | Type | Description |
| --- | --- | --- |
| type | integer | The type of the component |
| id? | integer | optional 32 bit integer identifier for the component |

 The `id` field is optional and identifies components in interaction responses. Each `id` must be unique within the message. If omitted, Discord generates `id` values sequentially. Generated `id`s will not reuse an `id` already assigned to another component in the same message. Sending `id` as `0` is accepted, but the API treats it as empty and replaces it.

###### Custom ID

 Interactive components such as buttons and selects also require `custom_id`. Developers set this field in the component payload, and Discord returns it in the interaction payload when a user interacts with the component. For example, a button sent with `custom_id: click_me` produces an interaction containing `custom_id: click_me` when clicked. `custom_id` exists only on interactive components and must be unique for each component. Components in the same message cannot share a `custom_id`. The field is a 1 to 100 character string and can carry state or other important data.
| Field | Type | Description |
| --- | --- | --- |
| custom_id | string | Developer-defined identifier, 1-100 characters |

---

