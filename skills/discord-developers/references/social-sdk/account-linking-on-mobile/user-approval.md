# User approval
Context: Discord developer reference: User approval
[Source](account-linking-on-mobile-index.md) / [Previous source section](request-authorization.md) / [Following source section](exchange-authorization-code-for-token.md)
<a id="source-step-3-user-approval"></a>

### Step 3: User Approval

 After [`Client::Authorize`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#ace94a58e27545a933d79db32b387a468) runs, the SDK will:
- Open the Discord mobile app through a deep link if it is installed
- Open a browser if Discord is not installed
- Show the authorization screen to the user

