# New BYPASS_SLOWMODE Permission & Permission Split

Date: 2025-11-24
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L1342) · [Year index](INDEX.md)

<a id="source-new-bypass_slowmode-permission--permission-split"></a>


Discord introduced `BYPASS_SLOWMODE`, a permission that lets selected roles or users bypass channel slowmode restrictions.
- The `BYPASS_SLOWMODE` permission (`1 << 52`) is being separated from `MANAGE_MESSAGES`, `MANAGE_CHANNEL`, and `MANAGE_THREADS`.
- Note: This mostly impacts users because bots are not subject to slowmode restrictions.
- Beginning February 23, 2026, users need `BYPASS_SLOWMODE` to avoid slowmode restrictions.
