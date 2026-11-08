# Webhooks url example
Context: Discord developer reference: Webhooks url example
[Source](authorization-information-index.md) / [Owning endpoint, event, object or procedure conditions](webhooks.md) / [Following source section](get-current-bot-application-information.md)
<a id="source-oauth2-part-2"></a> <a id="source-webhook-token-response-example"></a>

> Discord Developers reference. Original prose; identifiers preserved verbatim.

After opening this URL, the user chooses the channel where the webhook should be permitted. Later, when the webhook is [executed](https://docs.discord.com/developers/resources/webhook#execute-webhook), its message is posted in that selected channel. Once the user approves, Discord sends them back to your `redirect_uri`; that redirect includes a `code` querystring parameter. Exchange that `code` for an access token with the [authorization code grant](https://docs.discord.com/developers/topics/oauth2#authorization-code-grant-access-token-exchange-example). The returned payload is a token response with small webhook-specific differences:

###### Webhook Token Response Example

```
{
  "token_type": "Bearer",
  "access_token": "GNaVzEtATqdh173tNHEXY9ZYAuhiYxvy",
  "scope": "webhook.incoming",
  "expires_in": 604800,
  "refresh_token": "PvPL7ELyMDc1836457XCDh1Y8jPbRm",
  "webhook": {
    "application_id": "310954232226357250",
    "name": "testwebhook",
    "url": "https://discord.com/api/webhooks/347114750880120863/kKDdjXa1g9tKNs0-_yOwLyALC9gydEWP6gr9sHabuK1vuofjhQDDnlOclJeRIvYK-pj_",
    "channel_id": "345626669224982402",
    "token": "kKDdjXa1g9tKNs0-_yOwLyALC9gydEWP6gr9sHabuK1vuofjhQDDnlOclJeRIvYK-pj_",
    "type": 1,
    "avatar": null,
    "guild_id": "290926792226357250",
    "id": "347114750880120863"
  }
}

```

 Persist both `webhook.token` and `webhook.id` from the response. Use the [execute webhook](https://docs.discord.com/developers/resources/webhook#execute-webhook) reference when sending messages through that webhook. Each user who wants to connect the webhook to a channel must complete the OAuth2 flow, and every completion creates a separate webhook, so save each token and id. To broadcast to all saved webhooks, loop through every stored id:token pair and issue a `POST` request for each one. Account for Discord [Rate Limits](https://docs.discord.com/developers/topics/rate-limits#rate-limits) while doing so.

