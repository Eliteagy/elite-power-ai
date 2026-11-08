# Retrieving localized commands
[Source](subcommands-and-localization-index.md) / [Continued source contract](retrieving-localized-commands.md) / [Previous source section](locale-fallbacks.md)

<a id="source-retrieving-localized-commands"></a>

### Retrieving localized commands

 Most endpoints that return application command objects include `name_localizations` and `description_localizations`, but some omit them unless requested. This applies to `GET` endpoints that list all guild or global commands for an application. Those responses instead include `name_localized` or `description_localized`, containing only the localization for the requester's locale. You can still retrieve the full dictionaries by passing the correct query argument. For instance, if a batch `GET` request uses locale `zh-CN` and includes the command above, the response object would be:

<a id="source-application-commands-part-3"></a>

> Discord Developers reference. Original prose; identifiers preserved verbatim.

```
{
  "name": "birthday",
  "type": 1,
  "description": "Wish a friend a happy birthday",
  "name_localized": "生日",
  "description_localized": "祝你朋友生日快乐",
  "options": [
    {
      "name": "age",
      "type": 4,
      "description": "Your friend's age",
      "name_localized": "岁数",
      "description_localized": "你朋友的岁数",
    }
  ]
}

```

 When a requester's locale has no entry in a localization dictionary, that field's matching `name_localization` or `description_localization` is omitted as well. Discord resolves the locale from `X-Discord-Locale`, then falls back to `Accept-Language`, and finally uses the user's configured locale.
