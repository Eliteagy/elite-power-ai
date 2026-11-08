# Discord Social SDK Release 1.6.12170

Date: 2025-10-15
Categories: Discord Social SDK
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L1464) · [Year index](INDEX.md)

<a id="source-discord-social-sdk-release-1612170"></a>


Discord Social SDK has a new release with these updates:

<a id="source-new-features"></a>

### New Features

This small v1.6 update adds several partner-requested features that fit into the release.
- Game invites shown in Discord can now display custom banner art, supplied in one of two ways:
  - Provide an image URL or `asset key` through `activity.assets.inviteCoverImage` when calling `Client::UpdateRichPresence`. This also lets each invite use its own image.
  - Upload cover image art in the `Rich Presence` tab of the Developer Portal for your Application. This image is used as the fallback when `activity.assets.inviteCoverImage` is not specified.

- The displayed name for your Application in Discord Rich Presence can now be customized by setting `activity.name` when calling [`Client::UpdateRichPresence`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#af0a85e30f2b3d8a0b502fd23744ee58e)
- Added Microsoft Xbox GDK version 2025.04 support
- Fixed an iOS crash when calling [`Client::GetUserGuilds`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#aac1ec02df6074ed9213ce230e6a42fe1)
