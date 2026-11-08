# OAuth flow troubleshooting
Context: Discord developer reference: OAuth flow troubleshooting
[Source](unity-setup-and-authentication-index.md) / [Previous source section](oauth-flow-testing.md) / [Following source section](oauth-manager-program.md)
<a id="source-troubleshooting-1"></a>

### Troubleshooting

- If the button appears inactive, confirm `loginButton.onClick.AddListener(StartOAuthFlow);` is uncommented
- Verify that `ClientId` is correct
- Confirm the redirect URL exists in the Discord Developer Portal
- Review the console for exact error messages

DiscordManager.cs at this stage

