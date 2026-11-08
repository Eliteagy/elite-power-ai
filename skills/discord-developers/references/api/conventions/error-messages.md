# Error messages
Context: Discord developer reference: Error messages
[Source](http-versions-authentication-and-formatting-index.md) / [Previous source section](api-versioning.md) / [Following source section](authentication.md)
<a id="source-error-messages"></a>

### Error Messages

 Beginning with API v8, form error responses use a more detailed format. The response identifies the JSON key with the problem, provides the error code, and includes a human-readable message. Discord adds new error messages often, so a full catalog would become stale quickly; the following examples illustrate the structure instead: **Array Error**

```
{
  "code": 50035,
  "errors": {
    "activities": {
      "0": {
        "platform": {
          "_errors": [
            {
              "code": "BASE_TYPE_CHOICES",
              "message": "Value must be one of ('desktop', 'android', 'ios')."
            }
          ]
        },
        "type": {
          "_errors": [
            {
              "code": "BASE_TYPE_CHOICES",
              "message": "Value must be one of (0, 1, 2, 3, 4, 5)."
            }
          ]
        }
      }
    }
  },
  "message": "Invalid Form Body"
}

```

 **Object Error**

```
{
  "code": 50035,
  "errors": {
    "access_token": {
      "_errors": [
        {
          "code": "BASE_TYPE_REQUIRED",
          "message": "This field is required"
        }
      ]
    }
  },
  "message": "Invalid Form Body"
}

```

 **Request Error**

```
{
  "code": 50035,
  "message": "Invalid Form Body",
  "errors": {
    "_errors": [
      {
        "code": "APPLICATION_COMMAND_TOO_LARGE",
        "message": "Command exceeds maximum size (8000)"
      }
    ]
  }
}

```

