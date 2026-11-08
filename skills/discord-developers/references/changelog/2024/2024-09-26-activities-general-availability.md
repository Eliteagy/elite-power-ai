# Activities General Availability

Date: 2024-09-26
Categories: Activities, Embedded App SDK, Premium Apps
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L2472) · [Year index](INDEX.md)

<a id="source-activities-general-availability"></a>


After [the rollout of the App Launcher](https://discord.com/blog/discover-more-ways-to-play-with-apps-now-anywhere-on-discord), [Activities](https://docs.discord.com/developers/activities/overview) are generally available for developers. Along with API stability, apps with Activities can be [verified](https://support-dev.discord.com/hc/en-us/articles/23926564536471-How-Do-I-Get-My-App-Verified), made [discoverable](https://docs.discord.com/developers/discovery/enabling-discovery) in the App Directory, and set up to [implement monetization](https://docs.discord.com/developers/monetization/overview).

<a id="source-recent-api-updates"></a>

### Recent API Updates

The developer preview has been followed by several important API updates:
- Activities can enable and implement monetization features. [`getEntitlements`](https://docs.discord.com/developers/developer-tools/embedded-app-sdk#getentitlements), [`getSkus`](https://docs.discord.com/developers/developer-tools/embedded-app-sdk#getskus), and [`startPurchase`](https://docs.discord.com/developers/developer-tools/embedded-app-sdk#startpurchase) are generally available in the Embedded App SDK.
- The new [Get Application Activity Instance](https://docs.discord.com/developers/resources/application#get-application-activity-instance) endpoint simplifies [managing Activity instances](https://docs.discord.com/developers/activities/development-guides/multiplayer-experience#activity-instance-management).
- Apps with Activities can create an [Entry Point command (type `4`)](https://docs.discord.com/developers/interactions/application-commands#entry-point-commands), the main App Launcher entry point for Activities. New apps that enable Activities receive a [default Entry Point command](https://docs.discord.com/developers/interactions/application-commands#default-entry-point-command). See the [original change log](https://docs.discord.com/developers/change-log#entry-point-commands) and [Entry Point command guide](https://docs.discord.com/developers/activities/development-guides/user-actions#setting-up-an-entry-point-command) for details.
- Interactions can launch Activities through the `LAUNCH_ACTIVITY` (type `12`) [interaction callback type](https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type) for `APPLICATION_COMMAND`, `MESSAGE_COMPONENT`, and `MODAL_SUBMIT` [interaction types](https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object-interaction-type).
- Apps can be installed to users as well as servers. After [setting up your installation contexts](https://docs.discord.com/developers/resources/application#setting-supported-installation-contexts), request the `application.commands` scope during user authorization so the Activity is available across Discord servers, DMs, and Group DMs.
- August updates to the Content Security Policy (CSP) for Activities restrict requests to external resources while building Activities. See [the change log](https://docs.discord.com/developers/change-log#activities-proxy-csp-update) and [using external resources](https://docs.discord.com/developers/activities/development-guides/networking#using-external-resources).

<a id="source-documentation-updates"></a>

### Documentation Updates

Documentation for Activities and the Embedded App SDK has been expanded to make builds easier:
- New [Monetization](https://docs.discord.com/developers/monetization/overview) SDK command documentation covers [`getEntitlements`](https://docs.discord.com/developers/developer-tools/embedded-app-sdk#getentitlements), [`getSkus`](https://docs.discord.com/developers/developer-tools/embedded-app-sdk#getskus), and [`startPurchase`](https://docs.discord.com/developers/developer-tools/embedded-app-sdk#startpurchase).
- [Embedded App SDK Reference](https://docs.discord.com/developers/developer-tools/embedded-app-sdk) now includes signatures and arguments.
- Development guides for [Activity Instance Management](https://docs.discord.com/developers/activities/development-guides/multiplayer-experience#activity-instance-management) and [Activity Proxy Considerations](https://docs.discord.com/developers/activities/development-guides/networking#activity-proxy-considerations) were updated for external-resource usage.
- A new [In-App Purchases (IAP) for Activities](https://docs.discord.com/developers/monetization/implementing-iap-for-activities) guide is available.
- New [Verification and Discovery Surfaces](https://docs.discord.com/developers/discovery/overview) guides are available.
- A new [Using Rich Presence with the Embedded App SDK](https://docs.discord.com/developers/rich-presence/using-with-the-embedded-app-sdk) guide is available.
