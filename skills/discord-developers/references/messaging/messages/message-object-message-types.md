# Message object message types
Context: Discord developer reference: Message object message types
[Source](message-objects-and-embeds-index.md) / [Owning endpoint, event, object or procedure conditions](message-object.md) / [Following source section](message-object-example-message.md)
<a id="source-message-types"></a> <a id="source-message-activity-structure"></a> <a id="source-message-activity-types"></a> <a id="source-message-flags"></a>

###### Message Types

 Types `19` and `20` exist only in API v8 and later. In v6 they appear as type `0`. Type `21` requires API v9 or later.
| Type | Value | Deletable |
| --- | --- | --- |
| DEFAULT | 0 | true |
| RECIPIENT_ADD | 1 | false |
| RECIPIENT_REMOVE | 2 | false |
| CALL | 3 | false |
| CHANNEL_NAME_CHANGE | 4 | false |
| CHANNEL_ICON_CHANGE | 5 | false |
| CHANNEL_PINNED_MESSAGE | 6 | true |
| USER_JOIN | 7 | true |
| GUILD_BOOST | 8 | true |
| GUILD_BOOST_TIER_1 | 9 | true |
| GUILD_BOOST_TIER_2 | 10 | true |
| GUILD_BOOST_TIER_3 | 11 | true |
| CHANNEL_FOLLOW_ADD | 12 | true |
| GUILD_DISCOVERY_DISQUALIFIED | 14 | true |
| GUILD_DISCOVERY_REQUALIFIED | 15 | true |
| GUILD_DISCOVERY_GRACE_PERIOD_INITIAL_WARNING | 16 | true |
| GUILD_DISCOVERY_GRACE_PERIOD_FINAL_WARNING | 17 | true |
| THREAD_CREATED | 18 | true |
| REPLY | 19 | true |
| CHAT_INPUT_COMMAND | 20 | true |
| THREAD_STARTER_MESSAGE | 21 | false |
| GUILD_INVITE_REMINDER | 22 | true |
| CONTEXT_MENU_COMMAND | 23 | true |
| AUTO_MODERATION_ACTION | 24 | true* |
| ROLE_SUBSCRIPTION_PURCHASE | 25 | true |
| INTERACTION_PREMIUM_UPSELL | 26 | true |
| STAGE_START | 27 | true |
| STAGE_END | 28 | true |
| STAGE_SPEAKER | 29 | true |
| STAGE_TOPIC | 31 | true |
| GUILD_APPLICATION_PREMIUM_SUBSCRIPTION | 32 | true |
| GUILD_INCIDENT_ALERT_MODE_ENABLED | 36 | true |
| GUILD_INCIDENT_ALERT_MODE_DISABLED | 37 | true |
| GUILD_INCIDENT_REPORT_RAID | 38 | true |
| GUILD_INCIDENT_REPORT_FALSE_ALARM | 39 | true |
| PURCHASE_NOTIFICATION | 44 | true |
| POLL_RESULT | 46 | true |

 * Deletion requires the `MANAGE_MESSAGES` permission

###### Message Activity Structure

| Field | Type | Description |
| --- | --- | --- |
| type | integer | type of message activity |
| party_id? | string | Rich Presence event party_id |

###### Message Activity Types

| Type | Value |
| --- | --- |
| JOIN | 1 |
| SPECTATE | 2 |
| LISTEN | 3 |
| JOIN_REQUEST | 5 |

###### Message Flags

| Flag | Value | Description |
| --- | --- | --- |
| CROSSPOSTED | `1 << 0` | message has been published to subscribed channels through Channel Following |
| IS_CROSSPOST | `1 << 1` | message was created from a message in another channel through Channel Following |
| SUPPRESS_EMBEDS | `1 << 2` | omit all embeds when serializing this message |
| SOURCE_MESSAGE_DELETED | `1 << 3` | source message for this crosspost was deleted through Channel Following |
| URGENT | `1 << 4` | message came from the urgent message system |
| HAS_THREAD | `1 << 5` | message has a thread with the same id as the message |
| EPHEMERAL | `1 << 6` | message is visible only to the user who invoked the Interaction |
| LOADING | `1 << 7` | message is an Interaction Response while the bot is thinking |
| FAILED_TO_MENTION_SOME_ROLES_IN_THREAD | `1 << 8` | message could not mention some roles and add their members to the thread |
| SUPPRESS_NOTIFICATIONS | `1 << 12` | message does not trigger push or desktop notifications |
| IS_VOICE_MESSAGE | `1 << 13` | message is a voice message |
| HAS_SNAPSHOT | `1 << 14` | message includes a snapshot through Message Forwarding |
| IS_COMPONENTS_V2 * | `1 << 15` | allows creation of messages driven entirely by components |

 * After a message is sent with this flag, the flag can't be removed from that message.

