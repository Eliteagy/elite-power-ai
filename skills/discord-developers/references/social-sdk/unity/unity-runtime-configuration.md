# Unity runtime configuration
Context: Discord developer reference: Unity runtime configuration
[Source](unity-setup-and-authentication-index.md) / [Previous source section](project-setup.md) / [Following source section](setting-up-sdk-event-handling.md)
<a id="source-troubleshooting"></a>

### Troubleshooting

- Confirm that Unity added the Social SDK package successfully

Mac libdiscord_partner_sdk.dylib Not Opened

On Mac, Apple may show a Not Opened warning for libdiscord_partner_sdk.dylib because the library cannot be verified. Choose **Done**. Open **System Settings > Privacy & Security**, go to **Security**, and find the blocked-library message for libdiscord_partner_sdk.dylib. Choose **Open Anyway**, run again, then choose **Open Anyway** in the next popup so the library loads. (Figure: Error)(Figure: Settings)(Figure: Open)

---

