# Shared client theme object struture
Context: Discord developer reference: Shared client theme object struture
[Source](attachments-and-message-creation-index.md) / [Previous source section](message-pin-object-struture.md) / [Following source section](get-channel-messages.md)
<a id="source-shared-client-theme-object"></a> <a id="source-shared-client-theme-object-struture"></a> <a id="source-base-theme-types"></a> <a id="source-example-shared-client-theme"></a>

### Shared Client Theme Object

###### Shared Client Theme Object Struture

| Field | Type | Description |
| --- | --- | --- |
| colors | array of strings | hexadecimal-encoded theme colors (max of 5) |
| gradient_angle | integer | theme color direction (max of 360) |
| base_mix | integer | theme color intensity (max of 100) |
| base_theme? | ?base theme | the mode of the theme |

###### Base Theme Types

| Type | Value |
| --- | --- |
| UNSET [1] | 0 |
| DARK | 1 |
| LIGHT | 2 |
| DARKER | 3 |
| MIDNIGHT | 4 |

 [1] Equivalent to the `DARK` type.

###### Example Shared Client Theme

```
{
  "shared_client_theme": {
    "colors": ["5865F2", "7258F2", "9858F2", "BE58F2", "E558F2"],
    "gradient_angle": 0,
    "base_mix": 58,
    "base_theme": 1
  }
}

```

