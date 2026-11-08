# Allowed mentions examples
Context: Discord developer reference: Allowed mentions examples
[Source](attachments-and-message-creation-index.md) / [Owning endpoint, event, object or procedure conditions](allowed-mentions-object.md) / [Following source section](role-subscription-data-object-structure.md)
<a id="source-allowed-mentions-examples"></a>

###### Allowed Mentions Examples

 `allowed_mentions` behavior has several edge cases. In this example, a regular message is sent **without** `allowed_mentions`, so every included mention is parsed.

```
{
  "content": "@here Hello <@&1234> and <@5678> 👋"
}

```

 To suppress every mention in the message, set `allowed_mentions` as shown above:

```
{
  "content": "@here Hello <@&1234> and <@5678> 👋",
  "allowed_mentions": {
    "parse": []
  }
}

```

 `parse` is **mutually exclusive** with the other fields. In the example below, only role `1234` and user `5678` are parsed; the leading `@here` is not. Passing a falsy value such as `null` or an empty array to `users` is still valid.

```
{
  "content": "@here Hello <@&1234> and <@5678> 👋",
  "allowed_mentions": {
    "parse": ["users", "roles"],
    "users": []
  }
}

```

 This example parses **only** `@everyone`, plus users `1234` and `5678` if those users suppressed `@everyone` mentions in their settings.

```
{
  "content": "@everyone <@1234> <@5678> <@&789> 👋",
  "allowed_mentions": {
    "parse": ["everyone"],
    "users": ["1234", "5678"]
  }
}

```

 Some configurations are rejected because they are ambiguous. This *invalid* example includes both `parse` and `users`, which are mutually exclusive, so validation fails.

```
{
  "content": "@everyone <@1234> <@5678> <@9012> <@&200>",
  "allowed_mentions": {
    "parse": ["users"],
    "users": ["1234", "5678"]
  }
}

```

 Any entity whose id appears in the field can be mentioned, but the API silently ignores ids in `allowed_mentions` that do not appear in the message content or components. In the example below, user 123 is parsed because it appears in `content`; user 456 is absent from `content`, so no notification is sent.

```
{
  "content": "<@123> Time for some memes 🤠",
  "allowed_mentions": {
    "users": ["123", "456"]
  }
}

```

