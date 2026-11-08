# Activity object activity assets
Context: Discord developer reference: Activity object activity assets
[Source](reaction-presence-and-user-events-index.md) / [Owning endpoint, event, object or procedure conditions](presence-presence-update.md) / [Owning endpoint, event, object or procedure conditions](activity-object-activity-structure.md) / [Following source section](example-activity-with-rich-presence.md)
<a id="source-activity-assets"></a> <a id="source-activity-asset-image"></a> <a id="source-activity-secrets"></a> <a id="source-activity-flags"></a> <a id="source-activity-buttons"></a> <a id="source-example-activity"></a>

###### Activity Assets

| Field | Type | Description |
| --- | --- | --- |
| large_image? | string | See Activity Asset Image |
| large_text? | string | Hover text for the activity's large image. |
| large_url? | string | URL opened from clicks on the large image. |
| small_image? | string | See Activity Asset Image |
| small_text? | string | Hover text for the activity's small image. |
| small_url? | string | URL opened from clicks on the small image. |
| invite_cover_image? | string | See Activity Asset Image. Shown as the banner on a Game Invite. |

###### Activity Asset Image

 Activity asset image values are arbitrary strings, commonly snowflake IDs or prefixed image IDs. Handle this field defensively because users can supply it and Discord does not sanitize it. To send an external image through media proxy, put the URL in the field value. Gateway payloads expose only the `mp:` prefix.
| Type | Format | Image URL |
| --- | --- | --- |
| Application Asset | `{application_asset_id}` | See Application Asset Image Formatting |
| Media Proxy Image | `mp:{image_id}` | `https://media.discordapp.net/{image_id}` |

 **Uploaded assets** using the Application Asset type allow PNG, JPEG, and WebP, but not animation. **External URL assets** using the Media Proxy Image type can point at any publicly reachable image URL, including GIF, animated WebP, and AVIF.

###### Activity Secrets

| Field | Type | Description |
| --- | --- | --- |
| join? | string | Secret for joining a party |
| spectate? | string | Secret for spectating a game |
| match? | string | Secret tied to a specific instanced match. |

###### Activity Flags

| Name | Value |
| --- | --- |
| INSTANCE | `1 << 0` |
| JOIN | `1 << 1` |
| SPECTATE | `1 << 2` |
| JOIN_REQUEST | `1 << 3` |
| SYNC | `1 << 4` |
| PLAY | `1 << 5` |
| PARTY_PRIVACY_FRIENDS | `1 << 6` |
| PARTY_PRIVACY_VOICE_CHANNEL | `1 << 7` |
| EMBEDDED | `1 << 8` |

###### Activity Buttons

 Gateway payloads represent `buttons` as an array of strings containing button labels. Bots cannot read activity button URLs for a user. When sending `buttons`, provide an array of this object:
| Field | Type | Description |
| --- | --- | --- |
| label | string | Button label text, from 1-32 characters. |
| url | string | Button click target URL, from 1-512 characters. |

###### Example Activity

```
{
  "details": "24H RL Stream for Charity",
  "state": "Rocket League",
  "name": "Twitch",
  "type": 1,
  "url": "https://www.twitch.tv/discord"
}

```

