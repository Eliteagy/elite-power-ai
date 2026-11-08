# Rich presence result
Context: Discord developer reference: Rich presence result
[Source](unreal-setup-and-authentication-index.md) / [Previous source section](set-rich-presence.md) / [Following source section](rich-presence-testing.md)
<a id="source-what-this-code-does-1"></a>

### What This Code Does

1. Build an [`Activity`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Activity.html#ae793d9adbe16fef402b859ba02bee682) object representing the player's activity
2. Sets basic information like:

- The activity type (Playing)
- Current state (“In Competitive Match”)
- Additional details (“Rank: Diamond II”)

1. Update rich presence on Discord

