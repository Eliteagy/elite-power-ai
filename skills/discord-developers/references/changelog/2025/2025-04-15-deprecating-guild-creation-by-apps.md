# Deprecating Guild Creation by Apps

Date: 2025-04-15
Categories: HTTP API
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L2267) · [Year index](INDEX.md)

<a id="source-deprecating-guild-creation-by-apps"></a> <a id="source-breaking-change"></a>


### Breaking Change

Discord is deprecating application access to guild creation through the `Create Guild` endpoint to address security concerns.

<a id="source-whats-changing"></a>

#### What’s Changing

- Starting July 15, 2025, applications will be restricted from using the Create Guild endpoint (`POST /guilds`).
- Existing Guilds owned by bots will be transferred to ownership by a real user.
- The endpoint will no longer be available after the deprecation date.

<a id="source-timeline"></a>

#### Timeline

- **April 15, 2025**: Deprecation announcement
- **June 15, 2025**: Discord sends System DM/Email notices to impacted app owners and the designated guild members.
- **July 15, 2025**: `Create Guild` endpoint will no longer be available.
Affected apps will receive a migration plan through Discord System DM. Discord recognizes that this may affect legitimate use cases; contact the [Developer Support portal](https://support-dev.discord.com/hc) if you have questions or believe your application needs continued guild creation access.
