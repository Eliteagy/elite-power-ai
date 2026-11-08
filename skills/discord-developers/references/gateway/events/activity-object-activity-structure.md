# Activity object activity structure
Context: Discord developer reference: Activity object activity structure
[Source](reaction-presence-and-user-events-index.md) / [Owning endpoint, event, object or procedure conditions](presence-presence-update.md) / [Previous source section](client-status-object.md) / [Following source section](activity-object-activity-assets.md)
<a id="source-activity-object"></a> <a id="source-activity-structure"></a> <a id="source-activity-types"></a> <a id="source-status-display-types"></a> <a id="source-activity-timestamps"></a> <a id="source-activity-emoji"></a> <a id="source-activity-party"></a>

#### Activity Object

###### Activity Structure

| Field | Type | Description |
| --- | --- | --- |
| name | string | Activity’s name |
| type | integer | Activity type |
| url? | ?string | Stream URL; validation applies when type is 1. |
| created_at | integer | Unix timestamp in milliseconds for when the activity entered the user's session. |
| timestamps? | timestamps object | Unix timestamp values for the game's start and/or end. |
| application_id? | snowflake | Application ID for the game |
| status_display_type? | ?integer | Status display type that chooses which field appears in the user's member-list status text. |
| details? | ?string | The player's current activity. |
| details_url? | ?string | URL attached to clicks on the details text. |
| state? | ?string | Current party status for the user, or custom-status text. |
| state_url? | ?string | URL attached to clicks on the state text. |
| emoji? | ?emoji object | Emoji for a custom status. |
| party? | party object | Details about the player's current party. |
| assets? | assets object | Presence images and the hover text for those images. |
| secrets? | secrets object | Rich Presence secrets used for joining and spectating. |
| instance? | boolean | Whether the activity represents an instanced game session. |
| flags? | integer | Activity flags combined with `OR`; they describe the payload contents. |
| buttons? | array of buttons | Rich Presence custom buttons, up to 2. |

 Bot users can set only `name`, `state`, `type`, and `url`.

###### Activity Types

| ID | Name | Format | Example |
| --- | --- | --- | --- |
| 0 | Playing | Playing `{name}` | ”Playing Rocket League” |
| 1 | Streaming | Streaming `{details}` | ”Streaming Rocket League” |
| 2 | Listening | Listening to `{name}` | ”Listening to Spotify” |
| 3 | Watching | Watching `{name}` | ”Watching YouTube Together” |
| 4 | Custom | `{emoji}` `{state}` | ”:smiley: I am cool” |
| 5 | Competing | Competing in `{name}` | ”Competing in Arena World Champions” |

 Streaming activity currently works only with Twitch and YouTube. Valid URLs must start with `https://twitch.tv/` or `https://youtube.com/` .

###### Status Display Types

| ID | Name | Example |
| --- | --- | --- |
| 0 | Name | ”Listening to Spotify” |
| 1 | State | ”Listening to Rick Astley” |
| 2 | Details | "Listening to Never Gonna Give You Up" |

 The rule covers every activity type. The examples use "Listening" only as a stable illustration of how the fields can be populated.

###### Activity Timestamps

| Field | Type | Description |
| --- | --- | --- |
| start? | integer | Unix time in milliseconds when the activity began. |
| end? | integer | Unix time in milliseconds when the activity finishes. |

 Listening and Watching activities can provide both start and end timestamps so clients show a time bar.

###### Activity Emoji

| Field | Type | Description |
| --- | --- | --- |
| name | string | Name of the emoji |
| id? | snowflake | ID of the emoji |
| animated? | boolean | Whether the emoji is animated |

###### Activity Party

| Field | Type | Description |
| --- | --- | --- |
| id? | string | ID of the party |
| size? | array of two integers (current_size, max_size) | Displays the party's current size and maximum size. |

