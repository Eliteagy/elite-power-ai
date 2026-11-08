# File upload examples
Context: Discord developer reference: File upload examples
[Source](radio-checkbox-and-label-components-index.md) / [Owning endpoint, event, object or procedure conditions](file-upload.md) / [Following source section](radio-group.md)
<a id="source-reference-part-4"></a>

> Discord Developers reference. Original prose; identifiers preserved verbatim.

```
{
  "type": 5, // InteractionType.MODAL_SUBMIT
  ...additionalInteractionFields, // See the Interaction documentation for all fields

  "data": {
    "components": [
      {
          "component": {
              "custom_id": "file_upload",
              "id": 2,
              "type": 19,
              "values": [
                  "111111111111111111111"
              ]
          },
          "id": 1,
          "type": 18
      }
    ],
    "custom_id": "bug_submit_modal",
    "resolved": {
      "attachments": {
        "111111111111111111111": {
            "content_type": "image/png",
            "ephemeral": true,
            "filename": "bug.png",
            "height": 604,
            "id": "111111111111111111111",
            "placeholder": "/PcBAoBQydvKesabEIoMsdg=",
            "placeholder_version": 1,
            "proxy_url": "https://media.discordapp.net/ephemeral-attachments/2222222222222222222/111111111111111111111/bug.png?ex=68dc7ce1&is=68db2b61&hm=5954f90117ccf8716ffa6c7f97a778a0d039810c9584045f400d8a9fff590768&",
            "size": 241394,
            "url": "https://cdn.discordapp.com/ephemeral-attachments/2222222222222222222/111111111111111111111/bug.png?ex=68dc7ce1&is=68db2b61&hm=5954f90117ccf8716ffa6c7f97a778a0d039810c9584045f400d8a9fff590768&",
            "width": 2482
        }
      }
    }
  }
}

```

---

