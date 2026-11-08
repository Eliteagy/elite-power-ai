# Discord Social SDK Release 1.8.14856

Date: 2026-03-27
Categories: Discord Social SDK
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L811) · [Year index](INDEX.md)

<a id="source-discord-social-sdk-release-1814856"></a>


A Discord Social SDK release is available with these updates:

<a id="source-ios-unity--unreal"></a>

### iOS Unity & Unreal

- Unity and Unreal packages now include Debug plugins with Info and Verbose logging support.

<a id="source-party-privacy"></a>

### Party Privacy

- Fixed a bug where party privacy setting changes did not propagate when calling [`Client::UpdateRichPresence`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#af0a85e30f2b3d8a0b502fd23744ee58e), so changing a party from private to public failed to update the join button in Discord.
