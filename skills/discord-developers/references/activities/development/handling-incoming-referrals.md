# Handling incoming referrals
Context: Discord developer reference: Handling incoming referrals
[Source](local-development-and-assets-index.md) / [Owning endpoint, event, object or procedure conditions](prompting-users-to-share-incentivized-links.md) / [Previous source section](prompting-users-to-share-incentivized-links-sharing-links.md) / [Following source section](link-sharing-best-practices.md)
<a id="source-handling-incoming-referrals"></a>

#### Handling Incoming Referrals

 When a user opens a shared link, the activity launches with referral data available through the SDK:

```
// Early in your activity's initialization
async function handleReferral() {
    // Validate the referral data
    if (!discordSdk.customId || !discordSdk.referrerId) {
        return;
    }

    try {
        // Verify this is a valid promotion and hasn't expired
        const promotion = await validatePromotion(discordSdk.customId);
        if (!promotion) {
            console.log('Invalid or expired promotion');
            return;
        }

        // Prevent self-referrals
        if (discordSdk.referrerId === currentUserId) {
            console.log('Self-referrals not allowed');
            return;
        }

        // Grant rewards to both users
        await grantRewards({
            promotionId: discordSdk.customId,
            referrerId: discordSdk.referrerId,
            newUserId: currentUserId
        });
    } catch (error) {
        console.error('Failed to process referral:', error);
    }
}

```

