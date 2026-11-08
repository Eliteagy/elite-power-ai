# Macos library permission
Context: Discord developer reference: Macos library permission
[Source](cpp-setup-and-authentication-index.md) / [Previous source section](initialization-program.md) / [Following source section](setting-up-sdk-event-handling.md)
<a id="source-troubleshooting"></a>

### Troubleshooting

Mac `libdiscord_partner_sdk.dylib` blocked from opening

On Mac, Apple may block `libdiscord_partner_sdk.dylib` with a message saying it could not be verified. If that popup appears, press **Done**. Open **System Settings > Privacy & Security**, scroll to **Security**, and look for the notice that `libdiscord_partner_sdk.dylib` was blocked to protect your Mac. Press **Open Anyway** and run the app again. On the next popup, choose **Open Anyway** so the library can be used. (Figure: Error)(Figure: Settings)(Figure: Open)

---

