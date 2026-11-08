# Shared resources
Context: Discord developer reference: Shared resources
[Source](scopes-grants-and-installation-index.md) / [Previous source section](oauth2.md) / [Following source section](state-and-security.md)
<a id="source-shared-resources"></a> <a id="source-oauth2-urls"></a> <a id="source-oauth2-scopes"></a>

### Shared Resources

 Start OAuth2 setup by [registering a developer application](https://discord.com/developers/applications), then collect the client ID and client secret. Most OAuth2 implementations should use a library for the chosen programming language. If you implement OAuth2 directly, refer to [RFC 6749](https://tools.ietf.org/html/rfc6749). After the Discord application exists, keep `client_id` and `client_secret` available, then choose the OAuth2 flow that matches your use case.

###### OAuth2 URLs

| URL | Description |
| --- | --- |
| https://discord.com/oauth2/authorize | Base authorization URL |
| https://discord.com/api/oauth2/token | Token URL |
| https://discord.com/api/oauth2/token/revoke | Token Revocation URL |

 Following the relevant RFCs, the token URL and token revocation URL accept **only** `application/x-www-form-urlencoded` as the content type. JSON bodies are rejected with an error.

###### OAuth2 Scopes

 This table lists the OAuth2 scopes supported by Discord. Some scopes need Discord approval before use. Requesting an approval-required scope from a user without approval can produce errors or undocumented OAuth2 behavior. For scopes restricted to approved partners, contact your Discord account representative to discuss whether access fits your needs.
| Name | Description |
| --- | --- |
| activities.read | permits the app to fetch a user's "Now Playing/Recently Played" data; not currently available for apps |
| activities.write | lets the app modify a user's current activity; unavailable to apps at this time (NOT REQUIRED FOR GAMESDK ACTIVITY MANAGER) |
| applications.builds.read | permits the app to read build data for the user's applications |
| applications.builds.upload | permits the app to upload or update builds for the user's applications; approved partners only |
| applications.commands | permits the app to add commands to a guild; included by default with `bot` |
| applications.commands.update | permits the app to update its commands with a Bearer token; client credentials grant only |
| applications.commands.permissions.update | permits the app to update guild command permissions where the user has permission |
| applications.entitlements | permits the app to read entitlements for the user's applications |
| applications.store.update | permits the app to read and modify store data for the user's applications, including SKUs, store listings, achievements, and similar data |
| bot | for oauth2 bots, adds the bot to the user's selected guild by default |
| connections | permits `/users/@me/connections` to return connected third-party accounts |
| dm_channels.read | permits the app to view details about the user's DMs and group DMs; approved partners only |
| email | enables `/users/@me` to return an `email` |
| gdm.join | permits the app to add users to a group dm |
| guilds | permits `/users/@me/guilds` to return basic details for all guilds belonging to a user |
| guilds.join | permits `/guilds/{guild.id}/members/{user.id}` for adding users to a guild |
| guilds.members.read | permits `/users/@me/guilds/{guild.id}/member` to return the user's member data in a guild |
| identify | allows `/users/@me` without `email` |
| identify.premium | permits the app to read a user's Nitro subscription type from `premium_type` on the User object; approved partners only |
| messages.read | for local rpc server api access, permits reading messages from every client channel instead of only app-created channels or guilds |
| relationships.read | Grants access to the user's Discord Friends list, pending requests, and blocked users. This is a Social SDK scope; request access here. The Social SDK Terms, including Section 5(a)(ii), govern the data obtained through it |
| role_connections.write | permits the app to update a user's app connection and metadata |
| rpc | for local rpc server access, permits control of the user's local Discord client; approved partners only |
| rpc.activities.write | for local rpc server access, permits updating a user's activity; approved partners only |
| rpc.notifications.read | for local rpc server access, permits receiving notifications pushed to the user; approved partners only |
| rpc.voice.read | for local rpc server access, permits reading a user's voice settings and listening for voice events; approved partners only |
| rpc.voice.write | for local rpc server access, permits changing a user's voice settings; approved partners only |
| voice | permits the app to connect to voice for the user and view all voice members; approved partners only |
| webhook.incoming | creates a webhook returned in the oauth token response for authorization code grants |

 To add a user to a guild, the bot must already be a member of that guild. `role_connections.write` is not compatible with the [Implicit grant type](https://docs.discord.com/developers/topics/oauth2#implicit-grant).

