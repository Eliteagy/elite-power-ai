# Acquiring the role
Context: Discord developer reference: Acquiring the role
[Source](configuring-app-metadata-for-linked-roles-index.md) / [Previous source section](creating-the-linked-role.md) / [Following source section](token-storage.md)
<a id="source-acquiring-the-role"></a>

### Acquiring the role

 To claim the role, open the server menu from the upper-left server name and choose `Linked Roles`. Select your role, then start the account-connection flow. The OAuth flow requests `role_connections.write`, which the app needs to update the user's role connection details. (Figure: Connect accounts) Click the linked role criteria to reach the Discord OAuth2 consent page. Choose `Authorize`, then return to Discord. (Figure: Consent Dialog) After returning, the account should have the linked role. (Figure: Connected) Finally, create a private channel and add that linked role.

