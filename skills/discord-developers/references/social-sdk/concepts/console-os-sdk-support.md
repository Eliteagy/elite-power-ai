# Console os SDK support
Context: Discord developer reference: Console os SDK support
[Source](linking-permissions-and-support-index.md) / [Owning endpoint, event, object or procedure conditions](release-schedule.md) / [Previous source section](release-schedule-supported-versions.md) / [Following source section](end-of-life-process.md)
<a id="source-console-os-sdk-support"></a>

### Console OS SDK Support

 New Xbox and PlayStation OS SDK support is added only in **new minor Social SDK releases**, which occur three times per year. Discord does not backport that platform-SDK support to older Social SDK versions as patches. Each Social SDK release packages roughly the last **18 months** of console OS SDK versions, starting from the Xbox GDK or PlayStation OS current about 18 months before the release and ending with the latest available at release. Console OS SDK versions older than that window are removed from support with each new Social SDK release. Practically, this means:
- Upgrade to the latest Social SDK release when you need the newest Xbox or PlayStation platform SDK support.
- Social SDK releases that already shipped keep supporting the console OS SDK versions they originally included; Discord does not add or remove console OS SDK support from already-shipped versions.
 The current Social SDK release's minimum Xbox and PlayStation platform SDK versions are listed in [Platform Compatibility](https://docs.discord.com/developers/discord-social-sdk/core-concepts/platform-compatibility).

