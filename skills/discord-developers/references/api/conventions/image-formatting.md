# Image formatting
Context: Discord developer reference: Image formatting
[Source](http-versions-authentication-and-formatting-index.md) / [Previous source section](message-formatting.md) / [Following source section](image-data.md)
<a id="source-image-formatting"></a>

### Image Formatting

 **Image Base URL**

```
https://cdn.discordapp.com/

```

 Discord renders client images from ids and hashes. API calls such as [Get User](https://docs.discord.com/developers/resources/user#get-user) can return those hashes. The tables below describe image formats, size limits, and CDN endpoints. To choose the returned format, swap the [extension name](https://docs.discord.com/developers/reference#image-formatting-image-formats) at the URL suffix. Change returned size by adding `?size=desired_size`. Valid image sizes are powers of two from 16 through 4096. Animated WebP or AVIF uploads do not reliably become GIF files. Apps should request animated images as WebP because that works regardless of the uploaded format.  **Image Formats**
| Name | Extension |
| --- | --- |
| JPEG | .jpg, .jpeg |
| PNG | .png |
| WebP | .webp |
| GIF | .gif |
| Lottie | .json |

  **CDN Endpoints**
| Type | Path | Supports |
| --- | --- | --- |
| Custom Emoji | emojis/emoji_id.png ***** | PNG, JPEG, WebP, GIF |
| Guild Icon | icons/guild_id/guild_icon.png * | PNG, JPEG, WebP, GIF |
| Guild Splash | splashes/guild_id/guild_splash.png | PNG, JPEG, WebP |
| Guild Discovery Splash | discovery-splashes/guild_id/guild_discovery_splash.png | PNG, JPEG, WebP |
| Guild Banner | banners/guild_id/guild_banner.png * | PNG, JPEG, WebP, GIF |
| User Banner | banners/user_id/user_banner.png * | PNG, JPEG, WebP, GIF |
| Default User Avatar | embed/avatars/index.png ** *** | PNG |
| User Avatar | avatars/user_id/user_avatar.png * | PNG, JPEG, WebP, GIF |
| Guild Member Avatar | guilds/guild_id/users/user_id/avatars/member_avatar.png * | PNG, JPEG, WebP, GIF |
| Avatar Decoration | avatar-decoration-presets/avatar_decoration_data_asset.png | PNG |
| Application Icon | app-icons/application_id/icon.png | PNG, JPEG, WebP |
| Application Cover | app-icons/application_id/cover_image.png | PNG, JPEG, WebP |
| Application Asset | app-assets/application_id/asset_id.png | PNG, JPEG, WebP |
| Achievement Icon | app-assets/application_id/achievements/achievement_id/icons/icon_hash.png | PNG, JPEG, WebP |
| Store Page Asset | app-assets/application_id/store/asset_id | PNG, JPEG, WebP |
| Sticker Pack Banner | app-assets/710982414301790216/store/sticker_pack_banner_asset_id.png | PNG, JPEG, WebP |
| Team Icon | team-icons/team_id/team_icon.png | PNG, JPEG, WebP |
| Sticker | stickers/sticker_id.png *** **** | PNG, Lottie, GIF |
| Role Icon | role-icons/role_id/role_icon.png | PNG, JPEG, WebP |
| Guild Scheduled Event Cover | guild-events/scheduled_event_id/scheduled_event_cover_image.png | PNG, JPEG, WebP |
| Guild Member Banner | guilds/guild_id/users/user_id/banners/member_banner.png * | PNG, JPEG, WebP, GIF |
| Guild Tag Badge | guild-tag-badges/guild_id/badge_hash.png | PNG, JPEG, WebP |

 * For endpoints that support GIFs, an animated-format hash starts with `a_`, for example `a_1269e74af4df7417b13759eae50c83dc`. Retrieve those images as animated WebP with the `.webp` extension and the `?animated=true` query parameter. ** For the Default User Avatar endpoint, `index` depends on whether the user has migrated to the [new username system](https://docs.discord.com/developers/change-log#unique-usernames-on-discord). New username users set `index` to `(user_id >> 22) % 6`; legacy username users set `index` to `discriminator % 5`. *** For Default User Avatar and Sticker endpoints, image size is fixed and the "size" query parameter is ignored. **** For the Sticker endpoint, a sticker is available as PNG when its [`format_type`](https://docs.discord.com/developers/resources/sticker#sticker-object) is `PNG` or `APNG`, as GIF when `format_type` is `GIF`, and as [Lottie](https://airbnb.io/lottie/#/) when `format_type` is `LOTTIE`. ***** For Custom Emoji, Discord strongly recommends requesting WebP for performance and compatibility. Emoji uploads can be JPEG, PNG, GIF, WebP, or AVIF. WebP and AVIF uploads must be requested as WebP because they do not convert well to other formats. The Discord client displays all in-app emojis as WebP. See [Emoji Resource](https://docs.discord.com/developers/resources/emoji) for details. Sticker GIFs use `https://media.discordapp.net/stickers/<sticker_id>.gif` instead of the CDN base URL.

