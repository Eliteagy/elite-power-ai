# Our authentication flow
Context: Discord developer reference: Our authentication flow
[Source](account-linking-with-discord-index.md) / [Previous source section](prerequisites.md) / [Following source section](oauth2-using-the-discord-social-sdk.md)
<a id="source-our-authentication-flow"></a>

### Our Authentication Flow

 OAuth2 is the standard way to let users sign in with Discord. The flow uses these steps:
1. [Request authorization](https://docs.discord.com/developers/discord-social-sdk/development-guides/account-linking-with-discord#step-1-request-authorization): Your game asks Discord to authenticate the user.
2. [User Approval](https://docs.discord.com/developers/discord-social-sdk/development-guides/account-linking-with-discord#step-2-user-approval): The user grants your application the requested access.
3. [Receive Authorization Code](https://docs.discord.com/developers/discord-social-sdk/development-guides/account-linking-with-discord#step-3-receiving-the-authorization-code): Discord sends the user back to your app with an authorization code after approval.
4. [Exchange for Tokens](https://docs.discord.com/developers/discord-social-sdk/development-guides/account-linking-with-discord#step-4-exchanging-the-authorization-code-for-an-access-token): Trade the authorization code for:
  - Access Token, valid for ~7 days
  - Refresh Token, used to request a new access token

 The OAuth2 flow requires the user's account to be verified

