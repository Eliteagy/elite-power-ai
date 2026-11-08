# Connect to discord on console
[Source](branding-and-account-linking-index.md) / [Previous source section](signing-in-change-log.md) / [Following source section](connect-to-discord-on-console.md)

<a id="source-connect-to-discord-on-console"></a>

## Connect to Discord on console

Console games using the Discord Social SDK require middleware approval and approved-developer status for the target console. See [this article](https://support-dev.discord.com/hc/en-us/articles/30209074764183) for details. Exception: Prohibited Off-Platform Interactions by Sony
 For integrations shown on Sony Platforms, such as PlayStation 5...

1. Block **Account Linking** entry points.
2. Block access to **Linked Channels**.
3. Allow messaging and **Invites** only with other players who are currently in the game.
4. Hide **off-platform presence and logos** (including Discord). Players should get a coherent Discord social experience across PC, mobile, and console. Although console largely follows the same experience as other platforms, the following slides call out console-navigation adjustments. Console players **will need a secondary device** to access the full Discord Social SDK benefits. (Figure: Connect on console)

<a id="source-connect-to-discord-on-console-1"></a>

### Connect to Discord on console

 On console, the broad connection flow matches other devices. After a player selects an in-game CTA to connect to Discord, the game shows sign-in options. Users should use a phone or computer rather than a controller-driven console browser, which creates a poor sign-in experience. A player without a Discord account can create one on the web. (Figure: Connect on console) Scanning the QR code with a mobile camera lets users skip the device-code screen and move to game authorization. If scanning does not detect the Discord app, the user is asked to sign in and connect through a web browser. Users who skip QR scanning should go to discord.com/activate and enter the 8-digit code. (Figure: phone connection step)
