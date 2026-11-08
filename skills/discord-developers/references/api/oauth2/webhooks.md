# Webhooks
Context: Discord developer reference: Webhooks
[Source](scopes-grants-and-installation-index.md) / [Continued source contract](webhooks-url-example.md) / [Previous source section](two-factor-authentication-requirement.md)
<a id="source-webhooks"></a> <a id="source-url-example-1"></a>

### Webhooks

 Discord's webhook flow is a specialized form of an [authorization code](https://docs.discord.com/developers/topics/oauth2#authorization-code-grant) flow. For this case, set the `scope` querystring parameter to `webhook.incoming`:

###### URL Example

```
https://discord.com/oauth2/authorize?response_type=code&client_id=157730590492196864&scope=webhook.incoming&state=15773059ghq9183habn&redirect_uri=https%3A%2F%2Fnicememe.website

```
