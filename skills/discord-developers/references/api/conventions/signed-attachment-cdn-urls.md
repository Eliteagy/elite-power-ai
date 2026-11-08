# Signed attachment cdn urls
Context: Discord developer reference: Signed attachment cdn urls
[Source](http-versions-authentication-and-formatting-index.md) / [Previous source section](image-data.md) / [Following source section](uploading-files.md)
<a id="source-signed-attachment-cdn-urls"></a> <a id="source-example-attachment-cdn-url"></a> <a id="source-attachment-cdn-url-parameters"></a>

### **Signed Attachment CDN URLs**

 Attachments stored on Discord's CDN, including user-uploaded and bot-uploaded images, use signed URLs with a fixed expiration. Discord refreshes attachment CDN URLs shown in the client automatically, so a signed URL received in a payload, such as after you [fetch a message](https://docs.discord.com/developers/resources/message#get-channel-message), is valid at receipt time. When an API field accepts a CDN URL, such as [`url` in an embed image object](https://docs.discord.com/developers/resources/message#embed-object-embed-image-structure) or [`avatar_url` for webhooks](https://docs.discord.com/developers/resources/webhook#execute-webhook-jsonform-params), the app can pass the CDN URL without parameters and Discord will render and refresh it. The [standard CDN endpoints](https://docs.discord.com/developers/reference#image-formatting-cdn-endpoints) above are unsigned and do not expire.

###### Example Attachment CDN URL

```
https://cdn.discordapp.com/attachments/1012345678900020080/1234567891233211234/my_image.png?ex=65d903de&is=65c68ede&hm=2481f30dd67f503f54d020ae3b5533b9987fae4e55f2b4e3926e08a3fa3ee24f&

```

###### Attachment CDN URL Parameters

| Parameter | Description |
| --- | --- |
| ex | Hex timestamp for when an attachment CDN URL expires |
| is | Hex timestamp for when the URL was created |
| hm | Unique signature valid until the URL expiration time |

