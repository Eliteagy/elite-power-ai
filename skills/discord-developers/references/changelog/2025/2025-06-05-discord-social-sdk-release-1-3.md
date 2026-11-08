# Discord Social SDK Release 1.3

Date: 2025-06-05
Categories: Discord Social SDK
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L2062) · [Year index](INDEX.md)

<a id="source-discord-social-sdk-release-13"></a>


A Discord Social SDK release is available with these updates:

<a id="source-authentication"></a>

### Authentication

- Added an `APPLICATION_DEAUTHORIZED` webhook event configurable in the developer portal. When a user unlinks an account or otherwise revokes application authorization, the event is sent to configured webhooks with serialized user information in the payload. See [Webhook Events](https://docs.discord.com/developers/events/webhook-events) for webhook configuration details.

<a id="source-pc"></a>

### PC

- Added configurable request timeouts for SDK HTTP client requests. This release supports PC, with console and mobile support planned for a later release. The timeout default is 30000ms (30 seconds) and can be changed through [`Client::SetHttpRequestTimeout`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#ae5fe2518b0b1b05ee1745ab0a79096b9).
- Fixed a crash that could happen while handling certain failed HTTP requests.

<a id="source-mobile"></a>

### Mobile

- [`Client::SetSpeakerMode`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#ac269ab57407e3b83e2bb2d30895e666d) is deprecated. Unless [`Client::SetEngineManagedAudioSession`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#ade08897214152b9acfa79c263e77e366) is used, the SDK handles audio routing automatically.

<a id="source-android-1"></a>

#### Android

- Fixed game and voice audio routing when external audio devices connect or disconnect. [`Client::SetEngineManagedAudioSession`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#ade08897214152b9acfa79c263e77e366) was added to indicate that the SDK should not manage audio routing or automatically enter and leave `MODE_IN_COMMUNICATION` when calls start and end.
- Fixed an Authorize method issue when an activity must restart after a device configuration change.

<a id="source-ios"></a>

#### iOS

- Fixed several audio routing and session-management issues. In the Unity plugin, game audio no longer stops when a call ends. For standalone SDK use, [`Client::SetEngineManagedAudioSession`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#ade08897214152b9acfa79c263e77e366) was added to indicate that the SDK should not automatically start and stop `AVAudioSession` when joining and leaving calls.
- Corrected supported platform values in `Info.plist` for iOS .frameworks.

<a id="source-consoles"></a>

### Consoles

- Standalone archives now include only console-specific files, matching the Unity and Unreal Engine archives.

<a id="source-misc-1"></a>

### Misc

- Fixed a thread-safety issue in [`Client::AddLogCallback`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#af78996cff24a40f5dc7066beed16692c).
- Added a [Flags] declaration for bit flag enums in C#.
