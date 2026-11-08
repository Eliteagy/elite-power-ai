# Choose installation contexts
Context: Discord developer reference: Choose installation contexts
[Source](project-and-authentication-index.md) / [Previous source section](creating-an-app.md) / [Following source section](add-a-redirect-uri.md)
<a id="source-choose-installation-contexts"></a>

### Choose installation contexts

 Discord apps can be installed to different **[installation contexts](https://docs.discord.com/developers/resources/application#installation-context)**: servers, user accounts, or both. The recommended default is to support both contexts so the installer can choose during installation. You can change supported contexts in the app settings.

Why do installation contexts matter?

Overview of supported app installation locations

Installation contexts control where the app can be installed. They affect who manages the installation, where commands are visible, and what data is returned for interactions.
- Apps installed in a **[server context](https://docs.discord.com/developers/resources/application#server-context)** (server-installed apps) require approval from a member who has `MANAGE_GUILD`, and every member of that server can see them.
- Apps installed in a **[user context](https://docs.discord.com/developers/resources/application#user-context)** (user-installed apps) belong to the person who authorized the app, so no server-specific permission is needed. A user-context app appears across that user's servers, DMs, and GDMs, but it is limited to commands.
Read more about installation contexts in the [Application documentation](https://docs.discord.com/developers/resources/application#installation-context) and the [Developing a User-Installable App tutorial](https://docs.discord.com/developers/tutorials/developing-a-user-installable-app). Open [**Installation**](https://discord.com/developers/applications/select/installation) from the left sidebar. Under **Installation Contexts**, make sure **User Install** and **Guild Install** are selected. This lets users launch the Activity from Discord servers, DMs, and Group DMs.

