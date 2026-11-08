# Discord account linking
[Source](features-authentication-and-lobbies-index.md) / [Owning endpoint, event, object or procedure conditions](messaging-communication.md) / [Owning endpoint, event, object or procedure conditions](messaging-communication-feature-functionality.md) / [Following source section](feature-functionality-rich-presence.md)

<a id="source-discord-account-linking"></a>

#### Discord Account Linking

 **Intended Use:** Connect one player’s game account with their Discord account to enable social features plus cross-platform functionality. **Example Complete User Flow:**
1. Player sees a sign-in prompt, such as during startup, when opening friend-list access, or while interacting with a feature
2. Player clicks Discord sign-in button
3. Authorization flow launches (Overlay > Discord Client > Browser fallback)
4. Player completes OAuth authorization on Discord
5. Game receives authorization confirmation
6. Success state displays in-game confirming connection
7. Social features become available and populate with Discord data
 **Negative Options to Resolve:**
- **User declines authorization:** Return to game normally with one provisional account; maintain access to sign-in option
- **Authorization fails/times out:** Show clear error message with retry option
- **User wants to disconnect:** Provide deauthorization option in-game plus maintain game functionality post-disconnect
 These requirements are the baseline functionality standard. For a stronger player experience, review [Design Guidelines for Signing In](https://docs.discord.com/developers/discord-social-sdk/design-guidelines/signing-in).

<a id="source-feature-access-and-conveyance"></a> <a id="source-discord-account-linking-1"></a>

### Feature Access and Conveyance

#### Discord Account Linking

 **This option for players to link their Discord account has to have top-level surfacing in-game.** Social SDK integrations has to not only include account linking, but also make it accessible plus easily understandable for players to activate and deactivate. That means… **Access Requirements:**
- Linking one Discord account is surfaced in parity with other platform-linking options.
- This location for account linking is located in one **persistent and accessible** area in-game (e.g. Game Settings, Accounts menus).
- The account-linking entry point stays visible in its menu location; it cannot be a one-time pop-up that players cannot reopen.
- This entry point for account linking is discoverable via players through normal expected play (i.e. not buried inside one sub-menu or requiring right-click access).
- This option to unlink accounts is also surfaced in-game in one persistent and easily accessible manner.
- Users without linked accounts must have one associated token path for this handling social features (see: [Provisional Accounts](https://docs.discord.com/developers/discord-social-sdk/design-guidelines/provisional-accounts)).
 **Conveyance Requirements:**
- Developers must provide contextual education about Discord account-linking benefits before user accounts encounter the authorization flow.
- Acceptable contextual education looks like:
- **Modal or informational screen** that explains specific benefits the player get (e.g., “Chat with friends here plus on Discord,” “See what your friends are playing,” “Join friends’ games directly”)
- **Contextual tooltips or else hints** near social features that explain how they improve with Discord linking
- **In-game messaging** that appears once players interact with limited social features, explaining how linking would enhance this experience
 Discord Account Linking entry points are prohibited on Sony platforms.
