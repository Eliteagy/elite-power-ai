# Register url scheme
Context: Discord developer reference: Register url scheme
[Source](account-linking-on-mobile-index.md) / [Owning endpoint, event, object or procedure conditions](create-and-configure-xcode-project.md) / [Previous source section](configure-background-audio-optional.md) / [Following source section](i-os-setup-include-sdk-headers.md)
<a id="source-4-register-url-scheme"></a>

#### 4. Register URL Scheme

 To support [`Client::Authorize`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#ace94a58e27545a933d79db32b387a468), register the proper URL scheme in `Info.plist`:

```
<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleURLSchemes</key>
        <array>
            <string>discord-YOUR_APP_ID</string>
        </array>
    </dict>
</array>
<key>LSApplicationQueriesSchemes</key>
<array>
    <string>discord</string>
</array>

```

 Replace `YOUR_APP_ID` with the application ID from the Discord Developer Portal; for example, if the app ID is `123456`, register `discord-123456`.

