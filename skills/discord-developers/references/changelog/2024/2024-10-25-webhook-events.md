# Webhook Events

Date: 2024-10-25
Categories: Events, User Apps
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L2433) · [Year index](INDEX.md)

<a id="source-webhook-events"></a>


After [configuring a webhook events URL](https://docs.discord.com/developers/events/webhook-events#configuring-a-webhook-events-url), apps can subscribe to a limited set of HTTP-based outgoing [webhook events](https://docs.discord.com/developers/events/webhook-events#event-types). The currently available events are 3: `APPLICATION_AUTHORIZED`, `ENTITLEMENT_CREATE`, and `QUEST_USER_ENROLLMENT`. Read the [webhook events](https://docs.discord.com/developers/events/webhook-events) docs for subscription and usage details. When building [user-installable apps](https://docs.discord.com/developers/resources/application#user-context), [Application Authorized](https://docs.discord.com/developers/events/webhook-events#application-authorized) is useful because [the Gateway](https://docs.discord.com/developers/events/gateway) does not emit it for installs to a user or server. For monetization, webhook events currently expose only `ENTITLEMENT_CREATE`; continue using the Gateway for [entitlement-related events](https://docs.discord.com/developers/events/gateway-events#entitlements) until more monetization events are added. October 07, 2024 Premium Apps
