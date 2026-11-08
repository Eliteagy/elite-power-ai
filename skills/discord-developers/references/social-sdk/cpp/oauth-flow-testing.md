# OAuth flow testing
Context: Discord developer reference: OAuth flow testing
[Source](cpp-setup-and-authentication-index.md) / [Previous source section](oauth-flow-explanation.md) / [Following source section](oauth-token-program.md)
<a id="source-testing-it-out"></a>

### Testing It Out

1. Build and run your program
2. A browser window should ask you to authorize the app
3. After approval, the console should report that the access token was received
 If problems occur:
- Double-check that APPLICATION_ID is correct
- Confirm that the redirect URL is registered in the Discord Developer Portal
- Review the console for concrete error messages

main.cpp with Account Linking

