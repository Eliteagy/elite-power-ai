# I os authorization opens browser instead of discord app
Context: Discord developer reference: I os authorization opens browser instead of discord app
[Source](account-linking-on-mobile-index.md) / [Previous source section](working-with-tokens.md) / [Following source section](android-deep-link-not-working.md)
<a id="source-troubleshooting"></a> <a id="source-common-issues"></a> <a id="source-ios-authorization-opens-browser-instead-of-discord-app"></a>

### Troubleshooting

### Common Issues

#### iOS: Authorization Opens Browser Instead of Discord App

 **Problem**: Authorization opens a browser instead of the Discord mobile app. **Solutions**:
1. Confirm that `LSApplicationQueriesSchemes` includes `discord` in Info.plist
2. Confirm that the Discord mobile app is installed on the device
3. Verify that the redirect URI is configured as `discord-YOUR_APP_ID:/authorize/callback`

