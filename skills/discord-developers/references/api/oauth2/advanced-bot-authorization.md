# Advanced bot authorization
Context: Discord developer reference: Advanced bot authorization
[Source](scopes-grants-and-installation-index.md) / [Previous source section](bot-authorization-flow.md) / [Following source section](two-factor-authentication-requirement.md)
<a id="source-advanced-bot-authorization"></a> <a id="source-extended-bot-authorization-access-token-example"></a>

### Advanced Bot Authorization

 Developers can expand bot authorization. Requesting scopes beyond `bot` and `applications.commands` continues into a full [authorization code grant flow](https://docs.discord.com/developers/topics/oauth2#authorization-code-grant), allowing the app to request the user's access token. If any scope outside `bot` and `applications.commands` is requested, `response_type` is required again. Unless `redirect_uri` is specified, Discord automatically redirects to the first URI registered for the application. The redirect containing the access code also includes `guild_id` and `permissions` querystring parameters. Treat `guild_id` only as a hint about the bot's relationship with a guild. To verify that relationship, consider requiring the Oauth2 code grant in the bot settings. Enabling it requires anyone adding the bot to a server to complete the full OAuth2 [authorization code grant flow](https://docs.discord.com/developers/topics/oauth2#authorization-code-grant). When you retrieve the user's access token, the response also includes details about the guild where the bot was added:

###### Extended Bot Authorization Access Token Example

```
{
  "token_type": "Bearer",
  "guild": {
    "mfa_level": 0,
    "emojis": [],
    "application_id": null,
    "name": "SomeTest",
    "roles": [
      {
        "hoist": false,
        "name": "@everyone",
        "mentionable": false,
        "color": 0,
        "position": 0,
        "id": "290926798626357250",
        "managed": false,
        "permissions": 49794241,
        "permissions_new": "49794241"
      }
    ],
    "afk_timeout": 300,
    "system_channel_id": null,
    "widget_channel_id": null,
    "region": "us-east",
    "default_message_notifications": 1,
    "explicit_content_filter": 0,
    "splash": null,
    "features": [],
    "afk_channel_id": null,
    "widget_enabled": false,
    "verification_level": 0,
    "owner_id": "53908232999183680",
    "id": "2909267986347357250",
    "icon": null,
    "description": null,
    "public_updates_channel_id": null,
    "safety_alerts_channel_id": null,
    "rules_channel_id": null,
    "max_members": 100000,
    "vanity_url_code": null,
    "premium_subscription_count": 0,
    "premium_tier": 0,
    "preferred_locale": "en-US",
    "system_channel_flags": 0,
    "banner": null,
    "max_presences": null,
    "discovery_splash": null,
    "max_video_channel_users": 25
  },
  "access_token": "zMndOe7jFLXGawdlxMOdNvXjjOce5X",
  "scope": "bot",
  "expires_in": 604800,
  "refresh_token": "mgp8qnvBwJcmadwgCYKyYD5CAzGAX4"
}

```

