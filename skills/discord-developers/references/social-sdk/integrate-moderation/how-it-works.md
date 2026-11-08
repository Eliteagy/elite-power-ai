# How it works
Context: Discord developer reference: How it works
[Source](integrate-moderation-index.md) / [Previous source section](server-side-chat-moderation.md) / [Following source section](webhook-events.md)
<a id="source-how-it-works"></a>

### How It Works

1. A webhook event tells your backend that a message was created or changed.
2. The moderation service reviews the message and uses the Discord API to update `moderation_metadata`, specifying the client action such as hide, blur, or replace.
3. Discord saves the metadata and sends an update event to relevant game clients through the Social SDK.
4. The game client receives the update through [`Client::SetMessageUpdatedCallback`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#aa01cf3c15403f29780dabfcfaf3b1dcd), reads [`MessageHandle::ModerationMetadata`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1MessageHandle.html#afb9ae126f6b1f0de006f2be8e3688205) from the relevant [`MessageHandle`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1MessageHandle.html#ae25595b43bc74b0c4c92c5165d16382f) in that callback, and renders the message based on the metadata.
5. When message content changes, Discord removes existing moderation metadata before sending the next update, signaling that the edited content must be moderated again.
  The sequence diagram uses direct messages, but lobby messages follow the same pattern. The sections below identify the corresponding Social SDK methods, Webhook Event types, and API paths.

