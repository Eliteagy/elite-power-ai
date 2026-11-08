# Discord provided link
Context: Discord developer reference: Discord provided link
[Source](application-objects-and-endpoints-index.md) / [Owning endpoint, event, object or procedure conditions](application-object.md) / [Owning endpoint, event, object or procedure conditions](types-of-install-links.md) / [Following source section](types-of-install-links-custom-url.md)
<a id="source-discord-provided-link"></a>

#### Discord Provided Link

 The default Discord Provided Link is a short link that sends users through installation using the app's [configured installation contexts](https://docs.discord.com/developers/resources/application#setting-supported-installation-contexts). If **User Install** and **Guild Install** are both enabled, the user chooses the install target. Discord Provided Links do not include scopes or bot user permissions in the URL. Example:

```
https://discord.com/oauth2/authorize?client_id=1234567895647001626

```

 These links prompt the user for the scopes and bot user permissions set in Default Install Settings. Discord Provided Links are limited to the `application.commands` and `bot` scopes

