# Membership screening object
Context: Discord developer reference: Membership screening object
[Source](guild-members-and-ban-endpoints-index.md) / [Following source section](example-guild-onboarding.md) / [Following source section](incidents-data-structure.md)
<a id="source-guild-part-2"></a> <a id="source-membership-screening-object"></a>

> Discord Developers reference. Original prose; identifiers preserved verbatim.

### Membership Screening Object

 For guilds that enable [Membership Screening](https://support.discord.com/hc/en-us/articles/1500000466882), a joining member still triggers [Guild Member Add](https://docs.discord.com/developers/events/gateway-events#guild-member-add), starts with limited server access, and has `pending` set to true on the [member object](https://docs.discord.com/developers/resources/guild#guild-member-object). After that member finishes screening, Discord emits [Guild Member Update](https://docs.discord.com/developers/events/gateway-events#guild-member-update) and changes `pending` to false. Discord is substantially revising the Membership Screening API for reading and editing the Membership Screening object, so the old documentation was removed. The pending-member behavior described here is **not changing**.

