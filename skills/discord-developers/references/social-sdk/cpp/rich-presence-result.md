# Rich presence result
Context: Discord developer reference: Rich presence result
[Source](cpp-relationships-and-presence-index.md) / [Previous source section](add-rich-presence-code.md) / [Following source section](rich-presence-testing.md)
<a id="source-what-this-code-does-1"></a>

### What This Code Does

1. Builds an [`Activity`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Activity.html#ae793d9adbe16fef402b859ba02bee682) object describing what the player is doing
2. Sets basic information like:

- The activity type (Playing)
- Current state (“In Competitive Match”)
- Additional details (“Rank: Diamond II”)

1. Sends the rich presence update to Discord

