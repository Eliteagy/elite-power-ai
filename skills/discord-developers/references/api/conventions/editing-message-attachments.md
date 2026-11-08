# Editing message attachments
Context: Discord developer reference: Editing message attachments
[Source](http-versions-authentication-and-formatting-index.md) / [Previous source section](uploading-files.md) / [Following source section](locales.md)
<a id="source-editing-message-attachments"></a>

### Editing Message Attachments

 The `attachments` JSON parameter identifies every file to append to the message, including new files and their snowflake placeholders. In a `PATCH` request, only files present in `attachments` are appended; any previous files omitted from the parameter are removed. **Example Request Bodies (multipart/form-data)** These examples show small HTTP request fragments to demonstrate endpoint behavior. Client libraries set their own form boundaries; `boundary` is only an example. For details, see the [multipart/form-data spec](https://tools.ietf.org/html/rfc7578#section-4). The first example uses the endpoint without `payload_json`.

```
--boundary
Content-Disposition: form-data; name="content"

Hello, World!
--boundary
Content-Disposition: form-data; name="tts"

true
--boundary--

```

 This example uses the endpoint with `payload_json` and includes all content fields: `content`, `embeds`, and `files[n]`.

```
--boundary
Content-Disposition: form-data; name="payload_json"
Content-Type: application/json

{
  "content": "Hello, World!",
  "embeds": [{
    "title": "Hello, Embed!",
    "description": "This is an embedded message.",
    "thumbnail": {
      "url": "attachment://myfilename.png"
    },
    "image": {
      "url": "attachment://mygif.gif"
    }
  }],
  "message_reference": {
    "message_id": "233648473390448641"
  },
  "attachments": [{
      "id": 0,
      "description": "Image of a cute little cat",
      "filename": "myfilename.png"
  }, {
      "id": 1,
      "description": "Rickroll gif",
      "filename": "mygif.gif"
  }]
}
--boundary
Content-Disposition: form-data; name="files[0]"; filename="myfilename.png"
Content-Type: image/png

[image bytes]
--boundary
Content-Disposition: form-data; name="files[1]"; filename="mygif.gif"
Content-Type: image/gif

[image bytes]
--boundary--

```

 **Using Attachments within Embeds** A message can upload attachments and then use them inside an embed. Upload the files in the `multipart/form-data` body and ensure every uploaded file has a filename, because the payload must reference it. At this time, supported file types are `.jpg`, `.jpeg`, `.png`, `.webp`, and `.gif`; other file types are unsupported. In an embed object, set an image URL to the attachment scheme form `attachment://filename.png`. Example:

```
{
  "embeds": [{
    "image": {
      "url": "attachment://screenshot.png"
    }
  }]
}

```

