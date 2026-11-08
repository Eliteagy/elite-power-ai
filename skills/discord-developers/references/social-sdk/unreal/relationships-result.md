# Relationships result
Context: Discord developer reference: Relationships result
[Source](unreal-setup-and-authentication-index.md) / [Previous source section](access-discord-relationships.md) / [Following source section](relationships-testing.md)
<a id="source-what-this-code-does"></a>

### What This Code Does

 When client status becomes `Ready,`, call [`Client::GetRelationships`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#ad481849835cd570f0e03adafcf90125d) to receive all of the player's friends, then log the friend count to the output log.

