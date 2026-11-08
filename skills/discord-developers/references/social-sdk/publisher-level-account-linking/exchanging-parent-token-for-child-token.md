# Exchanging parent token for child token
Context: Discord developer reference: Exchanging parent token for child token
[Source](publisher-level-account-linking-index.md) / [Previous source section](obtaining-the-parent-access-token.md) / [Following source section](exchange-for-child-token.md)
<a id="source-exchanging-parent-token-for-child-token"></a>

### Exchanging Parent Token for Child Token

 After the OAuth2 flow returns a parent access token, use `/partner-sdk/child-token` to exchange it for a child token. **Important Token Usage Restrictions** Parent access tokens cannot connect to Discord through the Social SDK; **only** child access tokens can do that
 Child applications cannot run OAuth2 account linking flows; child access tokens are available **only** from the token exchange flow
 For direct Discord server API calls, send the child access token as Bearer authorization

