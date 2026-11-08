# Embedded App SDK Version 2.1 & 2.2

Date: 2025-08-11
Categories: Activities, Embedded App SDK
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L1850) · [Year index](INDEX.md)

<a id="source-embedded-app-sdk-version-21--22"></a>


Embedded App SDK version 2.2.0 includes several improvements. Highlights include:

<a id="source-changes-in-version-21"></a> <a id="source-new-url-fields"></a>

### Changes in version 2.1

#### New URL fields

New fields are supported for rich presence activities:
- `state_url` - URL opened when the state text in the activity card is clicked.
- `details_url` - URL opened when the details text in the activity card is clicked.
- `assets.large_url` - URL opened when the large image in the activity card is clicked.
- `assets.small_url` - URL opened when the small image in the activity card is clicked.

<a id="source-changes-in-version-22"></a> <a id="source-patchurlmappings"></a>

### Changes in version 2.2

#### patchUrlMappings

Following the [recent change](https://docs.discord.com/developers/change-log#remove-proxy-from-discord-activity-proxy-path) that removed the `.proxy/` path from Discord Activity proxy URLs, `patchUrlMappings` now generates simplified URLs by default. It creates mappings without the `.proxy/` prefix. The Embedded App SDK is available through [npm](https://www.npmjs.com/package/@discord/embedded-app-sdk) and [GitHub](https://github.com/discord/embedded-app-sdk). Use the [installation guide and reference](https://docs.discord.com/developers/developer-tools/embedded-app-sdk) to get started.
