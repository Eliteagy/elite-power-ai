# Configuring status text
Context: Discord developer reference: Configuring status text
[Source](setting-rich-presence-index.md) / [Previous source section](setting-buttons.md) / [Following source section](setting-party-and-join-secret.md)
<a id="source-configuring-status-text"></a>

### Configuring Status Text

 Rich Presence normally uses the game name as the user's status text. Set a status display type to override that default.

```
// uses the game's name in the status text (default)
activity.SetStatusDisplayType(discordpp::StatusDisplayTypes::Name);

// uses the activity's state field in the status text
activity.SetStatusDisplayType(discordpp::StatusDisplayTypes::State);

// uses the activity's details field in the status text
activity.SetStatusDisplayType(discordpp::StatusDisplayTypes::Details);

```

---

