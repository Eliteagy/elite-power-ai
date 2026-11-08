# Create interaction response
Context: Discord developer reference: Create interaction response
[Source](interaction-objects-and-responses-index.md) / [Previous source section](endpoints.md) / [Following source section](get-original-interaction-response.md)
<a id="source-create-interaction-response"></a> <a id="source-query-string-params"></a>

### Create Interaction Response

 POST/interactions/[{interaction.id}](https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object)/[{interaction.token}](https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object)/callback Creates a response for an Interaction. The body is an [interaction response](https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-response-object). It returns `204` by default; when `with_response` is `true`, it returns `200` with an [interaction callback response](https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-callback-interaction-callback-response-object) body. File attachments are supported in the same style as webhook endpoints. See [Uploading Files](https://docs.discord.com/developers/reference#uploading-files) for upload and `multipart/form-data` details.

###### Query String Params

| Field | Type | Description |
| --- | --- | --- |
| with_response? | boolean | Whether the response should include an interaction callback object |

