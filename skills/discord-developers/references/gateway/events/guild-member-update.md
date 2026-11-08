# Guild member update
Context: Discord developer reference: Guild member update
[Source](channel-thread-and-message-events-index.md) / [Owning endpoint, event, object or procedure conditions](guilds-guild-create.md) / [Previous source section](guild-member-remove.md) / [Following source section](guild-members-chunk.md)
<a id="source-guild-member-update"></a> <a id="source-guild-member-update-event-fields"></a>

#### Guild Member Update

 When [Gateway Intents](https://docs.discord.com/developers/events/gateway#gateway-intents) are used, `GUILD_MEMBERS` is required for this event. It is dispatched when a guild member changes, including changes to that member's user object.

###### Guild Member Update Event Fields

| Field | Type | Description |
| --- | --- | --- |
| guild_id | snowflake | ID of the guild |
| roles | array of snowflakes | User role ids |
| user | a user object | User |
| nick? | ?string | User nickname inside the guild |
| avatar | ?string | Member’s guild avatar hash |
| banner | ?string | Member’s guild banner hash |
| joined_at | ?ISO8601 timestamp | Time when the user joined the guild |
| premium_since? | ?ISO8601 timestamp | Time when the user began boosting the guild |
| deaf? | boolean | Whether voice channels deafen the user |
| mute? | boolean | Whether voice channels mute the user |
| pending? | boolean | Whether the user still has not passed the guild's Membership Screening requirements |
| communication_disabled_until? | ?ISO8601 timestamp | Time when the user's timeout expires and guild communication is restored; null or a past time means the user is not timed out |
| avatar_decoration_data? | ?avatar decoration data | Member guild avatar decoration data |
| collectibles? | ?collectibles object | Member collectibles data |

