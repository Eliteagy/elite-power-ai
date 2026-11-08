# Message formatting
Context: Discord developer reference: Message formatting
[Source](http-versions-authentication-and-formatting-index.md) / [Previous source section](gateway-web-socket-api.md) / [Following source section](image-formatting.md)
<a id="source-message-formatting"></a>

### Message Formatting

 Discord clients render message content using a subset of markdown plus custom formats for features such as user and channel mentions. The supported forms are listed below:  **Formats**
| Type | Structure | Example |
| --- | --- | --- |
| User | `<@USER_ID>` | `<@80351110224678912>` |
| User * | `<@!USER_ID>` | `<@!80351110224678912>` |
| Channel | `<#CHANNEL_ID>` | `<#103735883630395392>` |
| Role | `<@&ROLE_ID>` | `<@&165511591545143296>` |
| Slash command | `</NAME:COMMAND_ID>` | `</airhorn:816437322781949972>` |
| Slash command with subcommand | `</NAME SUBCOMMAND:ID>` | `</foo bar:123456789012345678>` |
| Slash command with subcommand group | `</NAME SUBCOMMAND_GROUP SUBCOMMAND:ID>` | `</foo group bar:123456789012345678>` |
| Standard emoji | Unicode characters | 🪴 |
| Custom emoji | `<:NAME:ID>` | `<:mmLol:216154654256398347>` |
| Animated custom emoji | `<a:NAME:ID>` | `<a:b1nzy:392938283556143104>` |
| Unix timestamp | `<t:TIMESTAMP>` | `<t:1618953630>` |
| Styled unix timestamp | `<t:TIMESTAMP:STYLE>` | `<t:1618953630:d>` |
| Guild navigation | `<id:TYPE>` | See below |

 Markdown forms for users or roles create mentions and may notify targets depending on the sender's permissions and the `allowed_mentions` value used when creating the message. Standard emoji render with [Twemoji](https://github.com/jdecked/twemoji) on Desktop and Android, while iOS uses Apple's native emoji set. Timestamps are in **seconds** and render according to the viewer's timezone and locale. * User mentions that include an exclamation point are deprecated and should be treated like normal user mentions.  **Timestamp Styles**
| Style | Example Output | Description |
| --- | --- | --- |
| t | 16:20 | Short Time |
| T | 16:20:30 | Medium Time |
| d | 20/04/2021 | Short Date |
| D | April 20, 2021 | Long Date |
| f * | April 20, 2021 at 16:20 | Long Date, Short Time |
| F | Tuesday, April 20, 2021 at 16:20 | Full Date, Short Time |
| s | 20/04/2021, 16:20 | Short Date, Short Time |
| S | 20/04/2021, 16:20:30 | Short Date, Medium Time |
| R | 4 years ago | Relative Time |

 *default **Guild Navigation Types** Guild navigation types point users to the related resource inside the current server.
| Full Syntax | Linked Resource |
| --- | --- |
| `<id:customize>` | Channel & Roles tab showing Onboarding prompts |
| `<id:browse>` | Browse Channels tab |
| `<id:guide>` | Server Guide tab |
| `<id:linked-roles>` | Linked Roles tab |
| `<id:linked-roles:id>` | A particular linked role; clicking opens the connection modal, and the second `id` is the role id |

