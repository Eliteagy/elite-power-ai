# Setting supported platforms
Context: Discord developer reference: Setting supported platforms
[Source](setting-rich-presence-index.md) / [Previous source section](setting-party-and-join-secret.md) / [Following source section](rich-presence-without-authentication.md)
<a id="source-setting-supported-platforms"></a>

### Setting Supported Platforms

 Set supported platforms in Rich Presence to control where Discord shows join buttons. To show the join button only on desktop, configure supported platforms like this:

```
activity.SetSupportedPlatforms(discordpp::ActivityGamePlatforms::Desktop);

```

 The `ActivityGamePlatforms` enum lists every supported platform.

