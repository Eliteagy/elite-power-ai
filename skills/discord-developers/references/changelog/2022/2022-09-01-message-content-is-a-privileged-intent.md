# Message Content is a Privileged Intent

Date: 2022-09-01
Categories: Breaking Change
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L3665) · [Year index](INDEX.md)

<a id="source-message-content-is-a-privileged-intent"></a>


As of this change, [message content](https://docs.discord.com/developers/events/gateway#message-content-intent) is privileged for all verified apps and apps eligible for verification. The reason and application process are described in the [Help Center FAQ](https://support-dev.discord.com/hc/articles/4404772028055-Message-Content-Privileged-Intent-FAQ). Apps without the message content intent enabled in Developer Portal settings receive empty values for API fields that expose message content, including `content`, `embeds`, `attachments`, and `components`. These limits do not apply to messages sent by the bot or app, DMs it receives, or messages that mention it.

<a id="source-if-your-app-is-verified"></a>

#### If your app is verified

Verified apps and verification-eligible apps need approval for the message content intent to receive message content. A verified app that lacks approval, or does not account for the restrictions, will break for users.

<a id="source-temporary-message-content-intent"></a>

##### Temporary Message Content Intent

Verified apps and apps submitted for verification can temporarily opt in to a grace period that allows continued message-content access until October 1. Opting in prevents the app from joining additional servers until it opts out. See the [Help Center article](https://support-dev.discord.com/hc/en-us/articles/8561391080471) for details.

<a id="source-if-your-app-is-unverified"></a>

#### If your app is unverified

Unverified apps still need to enable the intent in the app's Developer Portal settings. Existing unverified apps automatically have message content intent toggled on, while new unverified apps must enable it manually in the Developer Portal.
