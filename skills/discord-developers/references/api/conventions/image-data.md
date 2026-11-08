# Image data
Context: Discord developer reference: Image data
[Source](http-versions-authentication-and-formatting-index.md) / [Previous source section](image-formatting.md) / [Following source section](signed-attachment-cdn-urls.md)
<a id="source-image-data"></a>

### Image Data

 Image data uses the [Data URI scheme](https://en.wikipedia.org/wiki/Data_URI_scheme) and supports JPG, GIF, and PNG. Example Data URI syntax:

```
data:image/jpeg;base64,BASE64_ENCODED_JPEG_IMAGE_DATA

```

 Use the content type that matches the supplied image data, such as `image/jpeg`, `image/png`, or `image/gif`.

