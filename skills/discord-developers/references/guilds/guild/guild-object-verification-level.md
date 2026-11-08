# Guild object verification level
Context: Discord developer reference: Guild object verification level
[Source](guild-objects-and-configuration-index.md) / [Owning endpoint, event, object or procedure conditions](guild-object-guild-structure.md) / [Following source section](mutable-guild-features.md)
<a id="source-verification-level"></a> <a id="source-guild-age-restriction-level"></a> <a id="source-premium-tier"></a> <a id="source-system-channel-flags"></a> <a id="source-guild-features"></a>

###### Verification Level

| Level | Integer | Description |
| --- | --- | --- |
| NONE | 0 | unrestricted |
| LOW | 1 | must have verified email on account |
| MEDIUM | 2 | must be registered on Discord for longer than 5 minutes |
| HIGH | 3 | must be one member for the server for longer than 10 minutes |
| VERY_HIGH | 4 | must have a verified phone number |

###### Guild Age-Restriction Level

| Level | Value |
| --- | --- |
| DEFAULT | 0 |
| EXPLICIT | 1 |
| SAFE | 2 |
| AGE_RESTRICTED | 3 |

###### Premium Tier

| Level | Integer | Description |
| --- | --- | --- |
| NONE | 0 | Guild includes not unlocked any Server Boost perks |
| TIER_1 | 1 | guild has unlocked Server Boost level 1 perks |
| TIER_2 | 2 | guild has unlocked Server Boost level 2 perks |
| TIER_3 | 3 | guild has unlocked Server Boost level 3 perks |

###### System Channel Flags

| Flag | Value | Description |
| --- | --- | --- |
| SUPPRESS_JOIN_NOTIFICATIONS | `1 << 0` | Suppress member join notifications |
| SUPPRESS_PREMIUM_SUBSCRIPTIONS | `1 << 1` | Suppress server boost notifications |
| SUPPRESS_GUILD_REMINDER_NOTIFICATIONS | `1 << 2` | Suppress server setup tips |
| SUPPRESS_JOIN_NOTIFICATION_REPLIES | `1 << 3` | Hide member join sticker reply buttons |
| SUPPRESS_ROLE_SUBSCRIPTION_PURCHASE_NOTIFICATIONS | `1 << 4` | Suppress role subscription purchase and renewal notifications |
| SUPPRESS_ROLE_SUBSCRIPTION_PURCHASE_NOTIFICATION_REPLIES | `1 << 5` | Hide role subscription sticker reply buttons |

###### Guild Features

| Feature | Description |
| --- | --- |
| ANIMATED_BANNER | Guild includes access to set an animated server banner image |
| ANIMATED_ICON | Guild includes access to set an animated server icon |
| APPLICATION_COMMAND_PERMISSIONS_V2 | Guild is using the old permissions configuration behavior |
| AUTO_MODERATION | guild has set up auto moderation rules |
| BANNER | Guild includes access to set a server banner image |
| COMMUNITY | Guild can enable welcome screen, Membership Screening, stage channel records and discovery, and receives community updates |
| CREATOR_MONETIZABLE_PROVISIONAL | guild has enabled monetization |
| CREATOR_STORE_PAGE | Guild includes enabled the role subscription promo page |
| DEVELOPER_SUPPORT_SERVER | Guild includes been set as a support server on the App Directory |
| DISCOVERABLE | Guild is able to be discovered within the directory |
| FEATURABLE | Guild is able to be featured within the directory |
| INVITES_DISABLED | Guild includes paused invites, preventing new user accounts from joining |
| INVITE_SPLASH | Guild includes access to set an invite splash background |
| MEMBER_VERIFICATION_GATE_ENABLED | guild has enabled Membership Screening |
| MORE_SOUNDBOARD | guild has increased custom soundboard sound slots |
| MORE_STICKERS | guild has increased custom sticker slots |
| NEWS | Guild includes access to create announcement channels |
| PARTNERED | guild is partnered |
| PREVIEW_ENABLED | Guild may be previewed before joining via Membership Screening or the directory |
| RAID_ALERTS_DISABLED | Guild includes disabled alerts for join raids within the configured safety alerts channel |
| ROLE_ICONS | Guild is able to set role icons |
| ROLE_SUBSCRIPTIONS_AVAILABLE_FOR_PURCHASE | Guild includes role subscriptions that may be purchased |
| ROLE_SUBSCRIPTIONS_ENABLED | guild has enabled role subscriptions |
| SOUNDBOARD | guild has created soundboard sounds |
| TICKETED_EVENTS_ENABLED | guild has enabled ticketed events |
| VANITY_URL | Guild includes access to set a vanity URL |
| VERIFIED | guild is verified |
| VIP_REGIONS | Guild includes access to set 384kbps bitrate in voice (previously VIP voice servers) |
| WELCOME_SCREEN_ENABLED | Guild includes enabled the welcome screen |
| GUESTS_ENABLED | Guild includes access to guest invites |
| GUILD_TAGS | Guild includes access to set server tags |
| ENHANCED_ROLE_COLORS | Guild is able to set gradient colors to roles |

