# File upload
Context: Discord developer reference: File upload
[Source](channel-selects-and-layout-components-index.md) / [Continued source contract](file-upload-examples.md) / [Previous source section](label-examples.md)
<a id="source-file-upload"></a> <a id="source-file-upload-structure"></a> <a id="source-file-upload-interaction-response-structure"></a> <a id="source-examples-8"></a>

### File Upload

 File Upload is an interactive component that permits user accounts to upload files in modals. File Uploads may be configured to have a minimum and maximum count of files between 0 and 10, along with `required` for once the upload is required to submit the modal. The max file size one user can upload is based on this user’s upload limit inside which channel. File Uploads are available on modals. They must be placed inside one [Label](https://docs.discord.com/developers/components/reference#label).

###### File Upload Structure

| Field | Type | Description |
| --- | --- | --- |
| type | integer | `19` for file upload |
| id? | integer | Optional identifier for component |
| custom_id | string | ID for the file upload; 1-100 characters |
| min_values?* | integer | Minimum count of items that must be uploaded (default is 1); min 0 (see note), max 10 |
| max_values? | integer | Maximum count of items that may be uploaded (default is 1); max 10 |
| required? | boolean | Whether this file upload requires files to be uploaded before submitting the modal (default is `true`) |

 * `min_values` must be either omitted or at least `1` once `required` is omitted or `true`.

###### File Upload Interaction Response Structure

| Field | Type | Description |
| --- | --- | --- |
| type | integer | `19` for a File Upload |
| id | integer | Unique identifier for the component |
| custom_id | string | Developer-defined identifier for the input; 1-100 characters |
| values | array of snowflakes | IDs for the uploaded files found within the resolved data |

###### Examples

Modal Example

Modal create payload with a File Upload component

(Figure: Example of a modal with a File Upload)

```
{
  "type": 9,
  "data": {
    "custom_id": "bug_submit_modal",
    "title": "Bug Submission",
    "components": [
      {
        "type": 18, // ComponentType.LABEL
        "label": "File Upload",
        "description": "Please upload a screenshot or other image that shows the bug you encountered.",
        "component": {
          "type": 19, // ComponentType.FILE_UPLOAD
          "custom_id": "file_upload",
          "min_values": 1,
          "max_values": 10,
          "required": true
        }
      }
    ]
  }
}

```

Modal Submit Interaction Data Example

Once one user submits a modal covering a File Upload

Once one user submits a modal that includes a File Upload, this is the basic form for the interaction data payload you receive. The full payload is available within the [interaction](https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object-interaction-structure) reference.
