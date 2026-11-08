# Activities Proxy CSP Update

Date: 2024-07-17
Categories: Activities, Embedded App SDK, Breaking Change
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L2766) · [Year index](INDEX.md)

<a id="source-activities-proxy-csp-update"></a>


Outdated notice: Discord has since updated the Activities Proxy CSP, and `/.proxy/` is no longer required. See [this changelog](https://docs.discord.com/developers/change-log#remove-proxy-from-discord-activity-proxy-path) for current guidance. This change was scheduled to roll out to all existing applications on **August 28, 2024**. Discord planned an updated Content Security Policy (CSP) for the Activities Domain (`https://<application_id>.discordsays.com`). Because this was a **breaking change** for **all Activities**, a migration plan was provided. The CSP update was described as follows:
- all requests must go through `https://<application_id>.discordsays.com/.proxy/`; requests to other paths on the `discordsays.com` domain would be blocked.
- requests to `https://discord.com/api/` would be allowed, while other paths on the `discord.com` domain would be blocked.
- Only allowed paths on `cdn.discordapp.com` and `media.discordapp.net` would be permitted, including `/attachments/`, `/icons/`, and `/avatars/`.
- nested child iframes must mount paths with the `/.proxy/` prefix
As of [embedded-app-sdk v1.4.0](https://github.com/discord/embedded-app-sdk/releases/tag/v1.4.0) `patchUrlMappings` automatically routes requests through `/.proxy/`, so updating the SDK and calling `patchUrlMappings` is a good first step. If `patchUrlMappings` is unfamiliar, see the [documentation](https://docs.discord.com/developers/activities/development-guides/networking#using-external-resources). All Application IDs created after `07/17/2024 12:00:00` UTC (applicationID greater than `1263102905548800000`) automatically received the new CSP. Testing production code on a new application created after that date was the suggested compliance check.
