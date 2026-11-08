# Locale fallbacks
Context: Discord developer reference: Locale fallbacks
[Source](subcommands-and-localization-index.md) / [Previous source section](localization.md) / [Following source section](retrieving-localized-commands.md)
<a id="source-locale-fallbacks"></a>

### Locale fallbacks

 Application commands include locale fallback behavior when a user's locale is missing from the localizations. If the fallback locale is not present either, Discord uses the default. Include the default value under its matching locale key to avoid an unexpected fallback. For example, if the default value is `en-US` but localizations omit `en-US`, a user with `en-US` selected may see the `en-GB` value when that key exists. In a command whose default name is "color", if only the `en-GB` localization "colour" is provided, users in `en-US` see "colour" because the `en-US` localization key is absent.
| Locale | Fallback |
| --- | --- |
| en-US | en-GB |
| en-GB | en-US |
| es-419 | es-ES |

