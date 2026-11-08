# Experimenting with End-to-End Encryption for Voice & Video

Date: 2023-12-01
Categories: Voice
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L3083) · [Year index](INDEX.md)

<a id="source-experimenting-with-end-to-end-encryption-for-voice--video"></a> <a id="source-whats-happening"></a>


#### What’s Happening?

As described in [a blog post earlier this year](https://discord.com/blog/encryption-for-voice-and-video-on-discord), Discord is testing e2ee for calls that use voice or video channels. The goal is that only participants in a call can decrypt its contents. One protocol under test is Messaging Layer Security, which Discord believes can provide encryption at large scale. Intermediaries, including Discord, cannot read communications protected by that design.

<a id="source-how-do-i-prepare-for-the-changes"></a>

#### How do I prepare for the changes?

Developers do not need to support end-to-end encryption during this test period. When a bot user joins, voice channels automatically downgrade to documented non-e2ee protocols. This is transparent to the client connecting, but audio may arrive after a small delay.

<a id="source-what-is-planned-for-the-future"></a>

#### What is planned for the future?

Testing will continue, with developer documentation and sample code published when ready. After publication, Discord will give developers a substantial implementation window for end-to-end encryption in voice and video. November 29, 2023 Premium Apps
