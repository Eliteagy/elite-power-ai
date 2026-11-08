# Localization
Context: Discord developer reference: Localization
[Source](subcommands-and-localization-index.md) / [Previous source section](autocomplete.md) / [Following source section](locale-fallbacks.md)
<a id="source-localization"></a>

### Localization

 Application commands support localization, allowing command names and descriptions to vary based on the user's selected client language. Localization is optional. You can localize command, subcommand, and option names and descriptions, plus choice names, by sending the relevant `name_localizations` and `description_localizations` fields when creating or updating the application command. A command can be partially localized: it does not need every [available locale](https://docs.discord.com/developers/reference#locales), and each field can support a different locale set. If a field's localization dictionary lacks a user's locale, Discord shows the field's default value. You do not need to duplicate the default value across all locales; localized values identical to the default are ignored. Localized option names have an extra rule: each localized option name must be unique against the command's default option names and against other option names for that locale on the same command. Interaction payloads still use the default names for commands, subcommands, and options. To localize the interaction response, read the client's selected language from `locale` in the interaction payload. A localized application command can look like this:

```
{
  "name": "birthday",
  "type": 1,
  "description": "Wish a friend a happy birthday",
  "name_localizations": {
    "zh-CN": "生日",
    "el": "γενέθλια"
  },
  "description_localizations": {
    "zh-CN": "祝你朋友生日快乐"
  },
  "options": [
    {
      "name": "age",
      "type": 4,
      "description": "Your friend's age",
      "name_localizations": {
        "zh-CN": "岁数"
      },
      "description_localizations": {
        "zh-CN": "你朋友的岁数"
      }
    }
  ]
}

```

