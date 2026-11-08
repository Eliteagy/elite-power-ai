# Social SDK mobile OAuth redirect setup, PKCE and Unity/Unreal/native integration

Open when checking Social SDK mobile OAuth redirect setup, PKCE and Unity/Unreal/native integration.

<a id="account-linking-on-mobile"></a> <a id="overview"></a> - [Open when reading Overview](overview.md).
<a id="key-differences-from-desktop-authentication"></a> - [Open when reading Key Differences from Desktop Authentication](key-differences-from-desktop-authentication.md).
<a id="prerequisites"></a> - [Open when reading Prerequisites](prerequisites.md).
<a id="configure-oauth2-redirect-uri"></a> - [Open when reading Configure OAuth2 Redirect URI](configure-oauth2-redirect-uri.md).
<a id="unity-setup"></a> - [Open when reading Unity Setup](unity-setup.md).
<a id="ios-configuration"></a> <a id="1-configure-url-scheme-in-unity-project-settings"></a> - [Open when reading 1. Configure URL Scheme in Unity Project Settings](configure-url-scheme-in-unity-project-settings.md).
iOS Configuration
<a id="2-set-microphone-usage-description"></a> - [Open when reading 2. Set Microphone Usage Description](set-microphone-usage-description.md).
<a id="3-configure-infoplist-for-deep-linking"></a> - [Open when reading 3. Configure Info.plist for Deep Linking](configure-info-plist-for-deep-linking.md).
<a id="4-enable-background-voice-support-optional"></a> - [Open when reading 4. Enable Background Voice Support (Optional)](enable-background-voice-support-optional.md).
<a id="android-configuration"></a> <a id="1-configure-custom-url-scheme"></a> - [Open when reading 1. Configure Custom URL Scheme](configure-custom-url-scheme.md).
Android Configuration
<a id="2-add-androidxbrowser-dependency"></a> - [Open when reading 2. Add androidx.browser Dependency](add-androidx-browser-dependency.md).
<a id="3-android-permissions"></a> - [Open when reading 3. Android Permissions](android-configuration-android-permissions.md).
<a id="unreal-engine-setup"></a> - [Open when reading Unreal Engine Setup](unreal-engine-setup.md).
<a id="configure-discord-application-id"></a> - [Open when reading Configure Discord Application ID](configure-discord-application-id.md).
<a id="c-standalone-setup"></a> - [Open when reading C++ Standalone Setup](cpp-standalone-setup.md).
<a id="ios-setup"></a> <a id="1-create-and-configure-xcode-project"></a> - [Open when reading 1. Create and Configure Xcode Project](create-and-configure-xcode-project.md).
iOS Setup
<a id="2-configure-build-settings"></a> - [Open when reading 2. Configure Build Settings](configure-build-settings.md).
<a id="3-configure-background-audio-optional"></a> - [Open when reading 3. Configure Background Audio (Optional)](configure-background-audio-optional.md).
<a id="4-register-url-scheme"></a> - [Open when reading 4. Register URL Scheme](register-url-scheme.md).
<a id="5-include-sdk-headers"></a> - [Open when reading 5. Include SDK Headers](i-os-setup-include-sdk-headers.md).
<a id="6-run-callbacks-in-game-loop"></a> - [Open when reading 6. Run Callbacks in Game Loop](i-os-setup-run-callbacks-in-game-loop.md).
<a id="android-setup"></a> <a id="1-create-android-project"></a> - [Open when reading 1. Create Android Project](create-android-project.md).
Android Setup
<a id="2-add-sdk-as-dependency"></a> - [Open when reading 2. Add SDK as Dependency](add-sdk-as-dependency.md).
<a id="3-enable-prefab"></a> - [Open when reading 3. Enable Prefab](android-setup-enable-prefab.md).
<a id="4-configure-cmake"></a> - [Open when reading 4. Configure CMake](android-setup-configure-cmake.md).
<a id="5-include-sdk-headers-1"></a> - [Open when reading 5. Include SDK Headers](android-setup-include-sdk-headers.md).
<a id="6-initialize-sdk-in-activity"></a> - [Open when reading 6. Initialize SDK in Activity](initialize-sdk-in-activity.md).
<a id="7-run-callbacks-in-game-loop"></a> - [Open when reading 7. Run Callbacks in Game Loop](android-setup-run-callbacks-in-game-loop.md).
<a id="8-configure-authorization-support"></a> - [Open when reading 8. Configure Authorization Support](configure-authorization-support.md).
<a id="understanding-pkce-for-mobile"></a> <a id="what-is-pkce"></a> - [Open when reading What is PKCE?](what-is-pkce.md).
Understanding PKCE for Mobile
<a id="why-is-pkce-required-on-mobile"></a> - [Open when reading Why is PKCE Required on Mobile?](why-is-pkce-required-on-mobile.md).
<a id="how-pkce-works"></a> - [Open when reading How PKCE Works](how-pkce-works.md).
<a id="authentication-flow-for-public-clients"></a> - [Open when reading Authentication Flow for Public Clients](authentication-flow-for-public-clients.md).
<a id="step-1-create-code-verifier-and-challenge"></a> - [Open when reading Step 1: Create Code Verifier and Challenge](create-code-verifier-and-challenge.md).
<a id="step-2-request-authorization"></a> - [Open when reading Step 2: Request Authorization](request-authorization.md).
<a id="step-3-user-approval"></a> - [Open when reading Step 3: User Approval](user-approval.md).
<a id="step-4-exchange-authorization-code-for-token"></a> - [Open when reading Step 4: Exchange Authorization Code for Token](exchange-authorization-code-for-token.md).
<a id="authentication-flow-for-confidential-clients"></a> - [Open when reading Authentication Flow for Confidential Clients](authentication-flow-for-confidential-clients.md).
<a id="client-side-implementation"></a> <a id="step-1-create-code-verifier-and-challenge-1"></a> - [Open when reading Step 1: Create Code Verifier and Challenge](client-side-implementation-create-code-verifier-and-challenge.md).
Client-Side Implementation
<a id="step-2-request-authorization-1"></a> - [Open when reading Step 2: Request Authorization](client-side-implementation-request-authorization.md).
<a id="server-side-implementation"></a> - [Open when reading Server-Side Implementation](server-side-implementation.md).
<a id="example-response"></a> - [Open when reading Example Response](server-side-implementation-example-response.md).
<a id="client-side-update-token"></a> - [Open when reading Client-Side: Update Token](client-side-update-token.md).
<a id="working-with-tokens"></a> - [Open when reading Working with Tokens](working-with-tokens.md).
<a id="troubleshooting"></a> <a id="common-issues"></a> <a id="ios-authorization-opens-browser-instead-of-discord-app"></a> - [Open when reading iOS: Authorization Opens Browser Instead of Discord App](i-os-authorization-opens-browser-instead-of-discord-app.md).
Troubleshooting; Common Issues
<a id="android-deep-link-not-working"></a> - [Open when reading Android: Deep Link Not Working](android-deep-link-not-working.md).
<a id="token-exchange-fails-with-invalid_grant"></a> - [Open when reading Token Exchange Fails with “invalid_grant”](token-exchange-fails-with-invalid-grant.md).
<a id="next-steps"></a> - [Open when reading Next Steps](next-steps.md).
<a id="design-signing-in"></a> - [Open when reading Design: Signing In](design-signing-in.md).
<a id="creating-a-unified-friends-list"></a> - [Open when reading Creating a Unified Friends List](creating-a-unified-friends-list.md).
<a id="setting-rich-presence"></a> - [Open when reading Setting Rich Presence](setting-rich-presence.md).
<a id="change-log"></a> - [Open when reading Change Log](change-log.md).

[Reference Language Selection](../../languages.md) - Open when you need a language version of this skill's references other than English.
