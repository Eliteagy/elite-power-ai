# Prompting users to share incentivized links sharing links
Context: Discord developer reference: Prompting users to share incentivized links sharing links
[Source](local-development-and-assets-index.md) / [Owning endpoint, event, object or procedure conditions](prompting-users-to-share-incentivized-links.md) / [Previous source section](incentivized-link-sharing-implementation.md) / [Following source section](handling-incoming-referrals.md)
<a id="source-sharing-links"></a>

#### Sharing Links

 When adding sharing, you need to:
1. Generate a unique ID for tracking the promotion
2. Call the [`shareLink`](https://docs.discord.com/developers/developer-tools/embedded-app-sdk#sharelink) command
3. Track the share attempt

```
// Generate a unique ID for this promotion
// This could be per-campaign, per-user, or per-share depending on your needs
const customId = await createPromotionalCustomId();

try {
    const { success } = await discordSdk.commands.shareLink({
        message: 'Click this link to redeem 5 free coins!',
        custom_id: customId,
    });

    if (success) {
        // Track successful share for analytics/limiting
        await trackSuccessfulShare(customId);
    }
} catch (error) {
    // Handle share failures appropriately
    console.error('Failed to share link:', error);
}

```

