# Create message JSON form params
Context: Discord developer reference: Create message JSON form params
[Source](reactions-edits-and-pins-index.md) / [Owning endpoint, event, object or procedure conditions](create-message.md) / [Following source section](crosspost-message.md)
<a id="source-message-part-3"></a> <a id="source-example-request-body-applicationjson"></a>

> Discord Developers reference. Original prose; identifiers preserved verbatim.

* Provide at least one of `content`, `embeds`, `sticker_ids`, `components`, `files[n]`, `poll`, or `shared_client_theme`. For message forwarding, `message_reference` alone is sufficient. ** If `IS_COMPONENTS_V2` is set, the message may contain only `components`; including `content`, `embeds`, `sticker_ids`, `poll`, or `shared_client_theme` causes a 400 BAD REQUEST response.

###### Example Request Body (application/json)

```
{
  "content": "Hello, World!",
  "tts": false,
  "embeds": [{
    "title": "Hello, Embed!",
    "description": "This is an embedded message."
  }]
}

```

 See [Uploading Files](https://docs.discord.com/developers/reference#uploading-files) for file upload examples.

