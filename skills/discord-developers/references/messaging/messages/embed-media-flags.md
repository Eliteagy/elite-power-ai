# Embed media flags
Context: Discord developer reference: Embed media flags
[Source](attachments-and-message-creation-index.md) / [Owning endpoint, event, object or procedure conditions](embed-object-embed-structure.md) / [Previous source section](embed-image-structure.md) / [Following source section](embed-fields-by-embed-type.md)
<a id="source-embed-media-flags"></a> <a id="source-embed-provider-structure"></a> <a id="source-embed-author-structure"></a> <a id="source-embed-footer-structure"></a> <a id="source-embed-field-structure"></a> <a id="source-embed-limits"></a>

###### Embed Media Flags

| Flag | Value | Description |
| --- | --- | --- |
| IS_ANIMATED | `1 << 5` | this image is animated |

###### Embed Provider Structure

| Field | Type | Description |
| --- | --- | --- |
| name? | string | name of provider |
| url? | string | url of provider |

###### Embed Author Structure

| Field | Type | Description |
| --- | --- | --- |
| name | string | name of author |
| url? | string | author URL; supports only http(s) |
| icon_url? | string | author icon URL; supports only http(s) and attachments |
| proxy_icon_url? | string | proxied URL for the author icon |

###### Embed Footer Structure

| Field | Type | Description |
| --- | --- | --- |
| text | string | footer text |
| icon_url? | string | footer icon URL; supports only http(s) and attachments |
| proxy_icon_url? | string | proxied URL for the footer icon |

###### Embed Field Structure

| Field | Type | Description |
| --- | --- | --- |
| name | string | name of the field |
| value | string | value of the field |
| inline? | boolean | whether the field renders inline |

###### Embed Limits

 Rich embeds support rich content and therefore use limits separate from ordinary message content. Size caps still prevent overly large embeds. The table lists the limits. Each limit is inclusive, and leading or trailing whitespace is trimmed before counting.
| Field | Limit |
| --- | --- |
| title | 256 characters |
| description | 4096 characters |
| fields | Up to 25 field objects |
| field.name | 256 characters |
| field.value | 1024 characters |
| footer.text | 2048 characters |
| author.name | 256 characters |

 Across all embeds on a message, the total characters in `title`, `description`, `field.name`, `field.value`, `footer.text`, and `author.name` must be 6000 or fewer. Any violation returns `Bad Request`. Embeds with the same URL are deduplicated; only the first one is displayed.

