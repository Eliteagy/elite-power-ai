# Discord Social SDK Release Cadence & Support

Date: 2026-05-26
Categories: Discord Social SDK
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L561) · [Year index](INDEX.md)

<a id="source-discord-social-sdk-release-cadence--support"></a>


A new [Release Cadence & Support](https://docs.discord.com/developers/discord-social-sdk/core-concepts/release-cadence-and-support) page for the Discord Social SDK is available. It covers:
- The new three-per-year minor release cadence in April, July, and November.
- A support window for the five most recent minor versions, with hotfix patches for bug fixes and security fixes on older supported minor releases.
- How new Xbox and PlayStation OS SDK supports are delivered only in new Social SDK releases; each release bundles roughly the last 18 months of console OS SDKs.
- The end-of-life process for older minor releases.

<a id="source-what-this-means-for-you"></a>

### What this means for you

- **Over a year and a half of support per minor release.** With three Social SDK minor releases per year and a 5-version support window, every minor release you ship gets more than 18 months of patch coverage.
- **A predictable release calendar.** Releases arrive in April, July, and November, making Social SDK upgrades and console certification windows easier to plan.
- **More bandwidth for new features and stability.** A defined support window focuses engineering effort on current minor releases and on keeping supported versions robust and reliable.

<a id="source-what-changes-with-110"></a>

### What changes with 1.10

These changes begin with the 1.10 release, shipping in **July 2026**:
- The supported version window will include versions **1.6 through 1.10**. Releases at **1.5 and earlier** move to end-of-life status and stop receiving patch updates.
- **Console OS SDK additions are delivered only through new Social SDK releases**. Older Social SDK versions will not receive new Xbox or PlayStation support through patches. Each Social SDK release bundles roughly the last 18 months of console OS SDK versions.
**Already-shipped Social SDK releases (1.6-1.9) are unchanged** - they retain the console OS SDK support they originally shipped with. The new model starts at 1.10. This is being shared before the 1.10 release so developers on older versions have time to upgrade.
