# Configuring your bot
Context: Discord developer reference: Configuring your bot
[Source](app-registration-and-commands-index.md) / [Previous source section](fetching-your-credentials.md) / [Following source section](choosing-installation-contexts.md)
<a id="source-configuring-your-bot"></a>

### Configuring your bot

 New apps include a bot user by default. A bot user lets the app appear and act like a server member when [installed to a server](https://docs.discord.com/developers/quick-start/overview-of-apps#where-are-apps-installed). In the left sidebar of the app settings, open the [**Bot** page](https://discord.com/developers/applications/select/bot), the same place where the token was created. That page also controls options such as [privileged intents](https://docs.discord.com/developers/events/gateway#privileged-intents) and whether other users can install the app.

What are intents?

Introductory notes on standard and privileged intents

Intents control which events Discord sends to the app over a [Gateway API connection](https://docs.discord.com/developers/events/gateway). For example, reacting to users adding reactions to messages can use the `GUILD_MESSAGE_REACTIONS` (`1 << 10`) intent. Some intents are [privileged](https://docs.discord.com/developers/events/gateway#privileged-intents), giving access to sensitive data such as message contents. You can toggle privileged intents on the **Bot** page, but they need approval before you [verify your app](https://support-dev.discord.com/hc/en-us/articles/23926564536471-How-Do-I-Get-My-App-Verified). Standard, non-privileged intents require no extra setup. The [Gateway documentation](https://docs.discord.com/developers/events/gateway#gateway-intents) has more information and the full list of intents with their events. This tutorial does not require more configuration here, though future app features may.

