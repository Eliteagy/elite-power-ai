# Poll for user s authorization
Context: Discord developer reference: Poll for user s authorization
[Source](../entry-points/entry-points-and-linking-index.md) / [Owning endpoint, event, object or procedure conditions](overview.md) / [Previous source section](display-authorize-screen-with-qr-code-and-user-code.md) / [Following source section](exchange-device-code-for-access-token.md)
<a id="source-step-3-poll-for-users-authorization"></a>

### Step 3: Poll for User’s Authorization

 While the user completes authorization, the game must poll Discord's Oauth2 token endpoint to trade the device code for a valid access token. Poll at the provided `interval` until the request succeeds or the code expires after `expires_in`; both values come from the Authorize response above. If expiration occurs, start a new authorization request or cancel the flow.

