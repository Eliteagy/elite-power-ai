# Responding with a premium button
[Source](eligibility-subscriptions-and-entitlements-index.md) / [Owning endpoint, event, object or procedure conditions](types-of-subscriptions.md) / [Previous source section](accessing-entitlements-with-the-embedded-app-sdk.md) / [Following source section](starting-a-purchase-from-an-activity.md)

<a id="source-prompting-users-to-subscribe"></a> <a id="source-responding-with-a-premium-button"></a>

### Prompting Users to Subscribe

### Responding with a Premium Button

 [Responding with a premium button](https://docs.discord.com/developers/monetization/managing-skus#responding-with-a-premium-button) lets an app prompt a subscription when a user tries to use a premium feature. Send a message with a [button](https://docs.discord.com/developers/components/reference#button) using a [premium style](https://docs.discord.com/developers/components/reference#button-button-styles) and a `sku_id` for the upgrade offer.

<a id="source-prompting-users-to-purchase-an-item"></a> <a id="source-responding-with-a-premium-button"></a>

### Prompting Users to Purchase an Item

### Responding with a Premium Button

 [Responding with a premium button](https://docs.discord.com/developers/monetization/managing-skus#responding-with-a-premium-button) lets an app prompt a subscription offer when a user tries to use a premium feature. Send a message containing a [button](https://docs.discord.com/developers/components/reference#button) using [premium style](https://docs.discord.com/developers/components/reference#button-button-styles) plus a `sku_id` for the upgrade offer.

<a id="source-responding-with-a-premium-button"></a>

### Responding with a Premium Button

 Prompt purchases for item or subscription SKUs with a [button](https://docs.discord.com/developers/components/reference#button) that uses [premium style](https://docs.discord.com/developers/components/reference#button-button-styles) and `sku_id`. Premium buttons can be used wherever message components are valid, including command responses.

```
return new JsonResponse({
    type: 4, // InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE
    data: {
        content: "This command requires Nelly Premium! Upgrade now to get access to these features!",
        components: [{
            type: MessageComponentTypes.ACTION_ROW,
            components: [
                {
                    type: MessageComponentTypes.BUTTON,
                    style: 6, // ButtonStyleTypes.PREMIUM
                    sku_id: '1234965026943668316',
                },
            ],
        }]
    },
});

```

 (Figure: A premium button)
