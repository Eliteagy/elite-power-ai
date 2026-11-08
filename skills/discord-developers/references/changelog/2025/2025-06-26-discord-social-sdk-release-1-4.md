# Discord Social SDK Release 1.4

Date: 2025-06-26
Categories: Discord Social SDK
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L1969) · [Year index](INDEX.md)

<a id="source-discord-social-sdk-release-14"></a>


A Discord Social SDK release is available with these updates:

<a id="source-lobby-chat-history"></a>

### Lobby Chat History

- Added [`Client::GetLobbyMessagesWithLimit`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a0586192e85caf548b8b321f1cb21301f) for fetching history for a specified lobby ID. A request can return no more than 200 messages and can look back at most 72 hours.
- Retrieval is limited to messages from lobbies where the user is currently a member.
- DM history support is planned soon too.

<a id="source-unified-friends-list"></a>

### Unified Friends List

- Added [`Client::GetRelationshipsByGroup`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a9f7898d3f3d1ec92b06c662df70746d5), which groups a user's relationships for friends-list rendering and sorts users according to the [Unified Friends List design guidelines](https://docs.discord.com/developers/discord-social-sdk/design-guidelines/unified-friends-list). Previously, developers had to call [`Client::GetRelationships`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#ad481849835cd570f0e03adafcf90125d), split each relationship into the correct friend group, and implement their own sorting.
- Added [`Client::SetRelationshipGroupsUpdatedCallback`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#af12441ef091298f968075b7190851098), which fires when a user change may invalidate a sorted friends list returned by [`Client::GetRelationshipsByGroup`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a9f7898d3f3d1ec92b06c662df70746d5). Call [`Client::GetRelationshipsByGroup`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a9f7898d3f3d1ec92b06c662df70746d5) again to refresh the list.
- Added `IsSpamRequest` to [`RelationshipHandle`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1RelationshipHandle.html#a7da36b15ad0b7d38ba658a622e9ded77), returning `true` when Discord identifies the request as spam.

<a id="source-audio-changes"></a>

### Audio Changes

- Added an experimental mobile audio mode that uses standard media audio streams instead of voice-specific processing. On iOS, the voice engine uses the Remote I/O Audio Unit instead of Voice Processing I/O; on Android, media stream types replace voice communication types. Enable it by creating a Client with a [`ClientCreateOptions`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1ClientCreateOptions.html#ae655ad66ba64f443496c158307cc77b4) parameter whose `experimentalAudioSystem` property is `AudioSystem::Game`. Also set [`Client::SetEngineManagedAudioSession`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#ade08897214152b9acfa79c263e77e366) to true. Treat this as non-production functionality; Discord is looking for test feedback.
- Added [`Client::SetAecDump`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a3a05b2cafaa546d915a5249c63f4059f) for recording audio diagnostic data.

<a id="source-auth"></a>

### Auth

- Publisher Auth
  - Publisher Auth is a new feature that simplifies authorization for publishers managing multiple games. This early release is currently limited to selected partners.
  - Added [`Client::ExchangeChildToken`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a59f5d9d14f79eb318bf4d57f4e87a5c1) to support child token exchange for public clients. Confidential clients need a server to server implementation, but this method can help during development.
  - The SDK can now see invites from sibling applications. Identify them through the `applicationId` field on the [`ActivityInvite`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1ActivityInvite.html#af980f140c1459e1cd8f6ef3f3c07547c) payload.
  - The SDK can now see messages sent by other sibling applications. Identify them with the `ApplicationId` method on [`MessageHandle`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1MessageHandle.html#ae25595b43bc74b0c4c92c5165d16382f).

- Added [`Client::RevokeToken`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a30ccea6366efaf0b884efcdcc28a6f2d) and [`Client::UnmergeIntoProvisionalAccount`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a2da21ae8a3015e0e5e42c1a7226b256f) so games using Public Clients can revoke tokens or unmerge directly from clients.

<a id="source-android"></a>

### Android

- The SDK now supports 16KB page size.

<a id="source-misc"></a>

### Misc

- Activity serialization now avoids null or empty keys in the JSON payload.
