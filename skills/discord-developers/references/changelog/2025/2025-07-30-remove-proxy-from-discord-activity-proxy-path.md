# Remove .proxy/ from Discord Activity proxy path

Date: 2025-07-30
Categories: Activities, Embedded App SDK
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L1878) · [Year index](INDEX.md)

<a id="source-remove-proxy-from-discord-activity-proxy-path"></a>


The Content Security Policy (CSP) for Discord Activities has been updated so requests through the discordsays.com proxy no longer require the `.proxy/` path. This simplifies development while preserving full backwards compatibility. The change was possible after resolving the privacy considerations that originally required the `.proxy/` path restriction.

<a id="source-before"></a>

#### Before

Activities previously had to send proxy requests through paths beginning with `/.proxy/`:

```
https://<application_id>.discordsays.com/.proxy/api/endpoint

```

<a id="source-after"></a>

#### After

Activities can now send proxy requests directly without using the `/.proxy/` prefix:

```
https://<application_id>.discordsays.com/api/endpoint

```

<a id="source-technical-details"></a>

#### Technical Details

- **CSP Update**: Content Security Policy now permits requests to `https://<app_id>.discordsays.com/*` instead of the narrower `https://<app_id>.discordsays.com/.proxy/*`.
- **Proxy Behavior**: Both URL patterns behave the same way; existing proxy mappings such as `/api -> example.com` work whether you use `/.proxy/api` or `/api`.
- **Performance**: The two approaches have no performance difference.

<a id="source-developer-tooling-updates"></a>

#### Developer Tooling Updates

A future Embedded App SDK release will update `patchUrlMappings` to generate the simplified URLs by default, while still supporting the `.proxy/` format for backward compatibility.

<a id="source-backward-compatibility"></a>

#### Backward Compatibility
**All existing code will continue to work without changes.** The `/.proxy/` path prefix remains fully supported and will be kept indefinitely. You can:
- Continue using existing `/.proxy/` URLs
- Move to the newer, simpler URLs
- Use both URL patterns in one application at the same time
**No migration is required.** This additive update increases what developers can do without breaking existing behavior.
