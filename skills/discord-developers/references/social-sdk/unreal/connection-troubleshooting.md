# Connection troubleshooting
Context: Discord developer reference: Connection troubleshooting
[Source](unreal-setup-and-authentication-index.md) / [Previous source section](connection-testing.md) / [Following source section](access-discord-relationships.md)
<a id="source-troubleshooting"></a>

### Troubleshooting

- Confirm that `APPLICATION_ID` is correct
- Make sure the redirect URL exists in the Discord Developer Portal
- Review the output log for specific errors
- Verify that the access token is valid
- Ensure you have internet connectivity

Mac libdiscord_partner_sdk.dylib Not Opened

On Mac, Apple may block "libdiscord_partner_sdk.dylib" with a Not Opened warning because it cannot verify the library. If that appears, press **Done** in the popup. Open **System Settings > Privacy & Security**, then scroll to **Security**. macOS should say "libdiscord_partner_sdk.dylib" was blocked to protect the Mac; choose **Open Anyway** and run again. On the next popup, select **Open Anyway** so the library can be used. After the client reaches ready state, implement Discord social features.

