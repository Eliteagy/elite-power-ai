# Choosing installation contexts
Context: Discord developer reference: Choosing installation contexts
[Source](app-registration-and-commands-index.md) / [Previous source section](configuring-your-bot.md) / [Following source section](setting-up-an-install-link.md)
<a id="source-choosing-installation-contexts"></a>

### Choosing installation contexts

 Next, choose where the app can be installed in Discord. That behavior is controlled by the [installation contexts](https://docs.discord.com/developers/resources/application#installation-context) the app supports.

What are installation contexts?

Summary of app installation locations

**Installation contexts** define whether an app can be installed to servers, users, or both. The supported contexts are selected in the app settings.
- Apps installed in a **[server context](https://docs.discord.com/developers/resources/application#server-context)** (server-installed apps) require authorization from a server member with the `MANAGE_GUILD` permission and are visible to everyone in that server.
- Apps installed in a **[user context](https://docs.discord.com/developers/resources/application#user-context)** (user-installed apps) appear just for the person who authorized them, so no server permission check is required. A user-context app appears across that user's servers, DMs, and GDMs, but it can only use commands.
 Open [**Installation**](https://discord.com/developers/applications/select/installation) from the left sidebar. Under **Installation Contexts**, make sure **User Install** and **Guild Install** are selected. Some apps may support only one context, such as a moderation app that works only in server context, but the default recommendation is to support both. For more detail on user-installed apps, see the [user-installable app tutorial](https://docs.discord.com/developers/tutorials/developing-a-user-installable-app).

