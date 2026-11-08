# Invite object
Context: Discord developer reference: Invite object
[Source](../invites-and-lobbies-index.md) / [Following source section](example-invite-object.md)
<a id="source-invite-lobby"></a> <a id="source-overview"></a> <a id="source-invite-object"></a> <a id="source-invite-object-1"></a> <a id="source-invite-structure"></a> <a id="source-invite-types"></a> <a id="source-invite-target-types"></a> <a id="source-guild-invite-flags"></a>

# Invite, Lobby

> Discord Developers reference. Original prose; identifiers preserved verbatim.

## Overview

Covers: Invite Object; Lobby Object.

## Invite Object

### Invite Object

 Represents an invite code; using it makes someone join either a guild or a group DM channel.

###### Invite Structure

| Field | Type | Description |
| --- | --- | --- |
| type | integer | the type of invite |
| code | string | the invite code (unique ID) |
| guild? | partial guild object | guild targeted by this invite |
| channel | ?partial channel object | channel targeted by this invite |
| inviter? | user object | user that created the invite |
| target_type? | integer | target type for this voice channel invite |
| target_user? | user object | user stream shown for this voice channel stream invite |
| target_application? | partial application object | embedded application opened by this voice channel embedded application invite |
| approximate_presence_count? | integer | approximate number of online members; returned by `GET /invites/<code>` when `with_counts` is `true` |
| approximate_member_count? | integer | approximate total member count; returned by `GET /invites/<code>` when `with_counts` is `true` |
| expires_at | ?ISO8601 timestamp | expiration timestamp for this invite |
| guild_scheduled_event? | guild scheduled event object | guild scheduled event data; included only when `guild_scheduled_event_id` is a valid guild scheduled event id |
| flags? | integer | guild invite flags for guild invites |
| roles?* | array of partial role objects | roles assigned after the user accepts the invite |

 * This partial role object includes only `id`, `name`, `position`, `color`, `colors`, `icon`, and `unicode_emoji`.

###### Invite Types

| Type | Value |
| --- | --- |
| GUILD | 0 |
| GROUP_DM | 1 |
| FRIEND | 2 |

###### Invite Target Types

| Type | Value |
| --- | --- |
| STREAM | 1 |
| EMBEDDED_APPLICATION | 2 |

###### Guild Invite Flags

| Flag | Value | Description |
| --- | --- | --- |
| IS_GUEST_INVITE | `1 << 0` | guest invite for a voice channel |

