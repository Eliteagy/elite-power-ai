# Under 10 000 users
Context: Discord developer reference: Under 10 000 users
[Source](privileged-intent-policy-index.md) / [Owning endpoint, event, object or procedure conditions](what-are-privileged-intents.md) / [Previous source section](figure-out-where-your-app-stands.md) / [Following source section](approaching-or-over-10-000-users.md)
<a id="source-under-10000-users"></a>

### Under 10,000 users

 Below 10,000 users, you may enable or disable privileged intents directly in the Developer Portal without submitting an access request. Open the app's **Bot** page, find **Privileged Gateway Intents**, and turn on only the intents needed for the app to work. This permission to toggle does not mean every intent should be enabled; use the minimum data required. If the app later exceeds 10,000 users, you will need to submit review details for each requested intent and prove the access is necessary. Starting with fewer intents reduces future migration work. For cases where privileged access may be avoidable, see [You Might Not Need a Privileged Intent](https://docs.discord.com/developers/gateway/you-might-not-need-a-privileged-intent).

