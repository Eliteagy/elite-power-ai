# Guild member structure
Context: Discord developer reference: Guild member structure
[Source](guild-objects-and-configuration-index.md) / [Previous source section](guild-widget-structure.md) / [Following source section](integration-object-integration-structure.md)
<a id="source-guild-member-object"></a> <a id="source-guild-member-structure"></a> <a id="source-example-guild-member"></a> <a id="source-guild-member-flags"></a>

### Guild Member Object

###### Guild Member Structure

| Field | Type | Description |
| --- | --- | --- |
| user? | user object | User this server member represents |
| nick? | ?string | this user’s guild nickname |
| avatar? | ?string | Member’s server avatar hash |
| banner? | ?string | Member’s server banner hash |
| roles | array of snowflakes | array of role object ids |
| joined_at | ?ISO8601 timestamp | timestamp for once the user account joined the guild |
| premium_since? | ?ISO8601 timestamp | timestamp for once the user account started boosting the guild |
| deaf | boolean | Indicates whether the user account is deafened in voice channels |
| mute | boolean | Indicates whether the user account is muted in voice channels |
| flags | integer | Guild member flags represented as a bit set, default is `0` |
| pending? | boolean | Indicates whether the user account has not yet passed the guild’s Membership Screening requirements |
| permissions? | string | total permissions for that member within the channel, covering overwrites, provided once within the interaction object |
| communication_disabled_until? | ?ISO8601 timestamp | timestamp for once the user’s timeout can expire and the user account can communicate within that server again, null or a time within the past once the user account is not timed out |
| avatar_decoration_data? | ?avatar decoration data object | data for the member’s server avatar decoration |
| collectibles? | ?collectibles object | data for the member’s collectibles |

 The field `user` won’t be included within that member object record attached to `MESSAGE_CREATE` and `MESSAGE_UPDATE` gateway events. In `GUILD_` events, `pending` can always be included as true or else false. Inside non `GUILD_` events which may only be triggered by non-`pending` users, `pending` can not be included. Member object records retrieved from `VOICE_STATE_UPDATE` events can have `joined_at` set as `null` once that member was invited as a guest.

###### Example Guild Member

```
{
  "user": {},
  "nick": "NOT API SUPPORT",
  "avatar": null,
  "banner": null,
  "roles": [],
  "joined_at": "2015-04-26T06:26:56.936000+00:00",
  "deaf": false,
  "mute": false
}

```

###### Guild Member Flags

| Flag | Value | Description | Editable |
| --- | --- | --- | --- |
| DID_REJOIN | `1 << 0` | Member has left and rejoined the guild | false |
| COMPLETED_ONBOARDING | `1 << 1` | Member has completed onboarding | false |
| BYPASSES_VERIFICATION | `1 << 2` | Member is exempt from server verification requirements | true |
| STARTED_ONBOARDING | `1 << 3` | Member has started onboarding | false |
| IS_GUEST | `1 << 4` | Member is a guest and can only access this voice channel they were invited to | false |
| STARTED_HOME_ACTIONS | `1 << 5` | Member has started Server Guide new member actions | false |
| COMPLETED_HOME_ACTIONS | `1 << 6` | Member has completed Server Guide new member actions | false |
| AUTOMOD_QUARANTINED_USERNAME | `1 << 7` | Member’s username, display name, or nickname is blocked by AutoMod | false |
| DM_SETTINGS_UPSELL_ACKNOWLEDGED | `1 << 9` | Member has dismissed the DM settings upsell | false |
| AUTOMOD_QUARANTINED_GUILD_TAG | `1 << 10` | Member’s server tag is blocked by AutoMod | false |

 BYPASSES_VERIFICATION permits one member who does not meet verification requirements to participate in a server.

