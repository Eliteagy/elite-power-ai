# Registering your metadata schema
Context: Discord developer reference: Registering your metadata schema
[Source](configuring-app-metadata-for-linked-roles-index.md) / [Previous source section](configure-your-app.md) / [Following source section](trying-it-out.md)
<a id="source-registering-your-metadata-schema"></a>

### Registering your metadata schema

 As a one-time setup action, register the metadata fields that admins may use for linked roles tied to the app. Configure the app's connection metadata by calling [PUT /users/@me/applications/<application_id>/role-connection](https://docs.discord.com/developers/resources/application-role-connection-metadata#update-application-role-connection-metadata-records) with [application connection role metadata](https://docs.discord.com/developers/resources/application-role-connection-metadata#application-role-connection-metadata-object). In the sample app, [`src/register.js`](https://github.com/discord/linked-roles-sample/blob/main/src/register.js) performs this registration and can be invoked from the command line. In Glitch, open the **terminal** tab and run:

```
$ node src/register.js

```

 (Figure: Register Metadata Schema)

