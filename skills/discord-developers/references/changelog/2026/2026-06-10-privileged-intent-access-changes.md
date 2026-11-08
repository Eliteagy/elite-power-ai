# Changes to Privileged Intent Access for Discord Apps

Date: 2026-06-10
Categories: HTTP API, Gateway
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L486) · [Year index](INDEX.md)

<a id="source-changes-to-privileged-intent-access-for-discord-apps"></a>


(Figure: Privileged Intents Requirements) Discord is [announcing changes to how Discord Apps access Privileged Intent](https://support-dev.discord.com/hc/articles/40281523410967), including a user-based review threshold and a yearly process for reapplying to keep access.

>  If your app is accessible to fewer than 10,000 users, these changes do not impact your app.

<a id="source-whats-changing"></a> <a id="source-1-the-review-threshold-is-now-based-on-user-count-not-server-count"></a>

### What’s Changing

#### 1. The review threshold is now based on user count, not server count

Previously, apps in fewer than 100 servers could enable Privileged Intents in the Developer Portal, while apps in 100+ servers had to apply. The threshold now uses the number of users your app can access across every server it is in. Apps below 10,000 reachable users may still turn on Privileged Intents in the Developer Portal. **At 10,000 reachable users, Privileged Intent access requires an application review**.

<a id="source-2-apps-must-now-reapply-annually-for-continued-access"></a>

#### 2. Apps must now reapply annually for continued access

Apps that already received Privileged Intent access through review must reapply once per year in the Developer Portal to confirm continued access.

<a id="source-3-apps-can-keep-growing-during-privileged-intent-review"></a>

#### 3. Apps can keep growing during Privileged Intent review

With the user-based threshold, apps may continue joining servers and reaching more users while their Privileged Intent submission is being reviewed.

<a id="source-4-app-verification-and-privileged-intent-review-are-now-separate"></a>

#### 4. App Verification and Privileged Intent review are now separate

[App Verification](https://support-dev.discord.com/hc/en-us/articles/23926564536471-How-Do-I-Get-My-App-Verified) and Privileged Intent review used to be handled together. This change separates App Verification from the Privileged Intent review process. (Figure: Privileged Intents Requirements)

<a id="source-what-this-means-for-your-app"></a>

### What This Means For Your App

Read the [Privileged Intents Change announcement article](https://support-dev.discord.com/hc/articles/40281523410967) in the developer help center for details on how the change affects Discord Apps.

<a id="source-updated-documentation--resources"></a>

### Updated Documentation & Resources

- Updated [Privileged Intents documentation](https://docs.discord.com/developers/events/gateway#privileged-intents) with the new threshold and review process.
- Added the [Getting Started with Privileged Intents Review](https://docs.discord.com/developers/gateway/getting-started-with-privileged-intent-review) guide.
- Added the [You Might Not Need a Privileged Intent](https://docs.discord.com/developers/gateway/you-might-not-need-a-privileged-intent) guide to help determine whether a privileged intent is needed or whether another approach fits the use case.
