# Who does this apply to
[Source](privileged-intent-policy-index.md) / [Previous source section](i-m-not-sure-if-i-need-an-intent-or-not.md) / [Following source section](who-does-this-apply-to.md)

<a id="source-who-does-this-apply-to"></a>

## Who does this apply to?

(Figure: Privileged Intents Requirements) [Privileged Intents](https://docs.discord.com/developers/events/gateway#privileged-intents) allow a Discord app to receive extra server data after it is added to a server. That data can be useful, but it also carries additional responsibility and review requirements. Before enabling one, evaluate the need carefully:

>  Do I actually need this?

 **Use this guide to evaluate each privileged intent and decide whether the app needs it or can use another design.** Developers sometimes enable privileged intents out of habit or because an example did so, then later discover Discord APIs can support the same feature with less access. Apps may access only the data required for their functionality. Review the [Developer Policy](https://support-dev.discord.com/hc/en-us/articles/8563934450327-Discord-Developer-Policy), the [Developer Terms of Service](https://support-dev.discord.com/hc/en-us/articles/8562894815383-Discord-Developer-Terms-of-Service), and this guide to confirm the app and its intended privileged-intent use fit those rules.

<a id="source-who-does-this-apply-to-1"></a>

### Who does this apply to?

 This applies to any app that has enabled privileged intents or is considering them. Apps with fewer than 10,000 server-installed users can manage the toggles in the Developer Portal. After the app passes 10,000 users, continued access requires a review request with details about the app and the use case for each requested intent. Planning early can prevent a later migration.

---
