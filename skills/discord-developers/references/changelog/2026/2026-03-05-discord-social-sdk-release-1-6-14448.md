# Discord Social SDK Release 1.6.14448

Date: 2026-03-05
Categories: Discord Social SDK
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L928) · [Year index](INDEX.md)

<a id="source-discord-social-sdk-release-1614448"></a>


A Discord Social SDK release is available with these updates:

<a id="source-security-2"></a>

### Security

- Bearer tokens are filtered from all log levels.
- Release builds emit log statements only at Error or Warning severity.
- Debug builds still log Info and Verbose severity levels.
- Added a DEBUG BUILD Warning at the top of the debug log stating that it should not be used in production.
