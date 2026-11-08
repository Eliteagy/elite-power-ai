# Prompting users to share incentivized links
[Source](local-development-and-assets-index.md) / [Owning endpoint, event, object or procedure conditions](local-development.md) / [Previous source section](preventing-unwanted-activity-sessions.md) / [Following source section](creating-and-managing-custom-incentivized-links.md)

<a id="source-growth-and-referrals"></a> <a id="source-prompting-users-to-share-incentivized-links"></a>

### Growth and Referrals

### Prompting Users to Share Incentivized Links

Encourage users to share Activity links by adding tracking and rewarding engagement.

<a id="source-specifications-640-x-360-mp4-format-under-10-seconds-long-under-1-mb-in-size"></a> <a id="source-prompting-users-to-share-incentivized-links-1"></a> <a id="source-prompting-users-to-share-incentivized-links-2"></a>

#### Specifications: 640 x 360, mp4 format, under 10 seconds long, under 1 MB in size

## Prompting Users to Share Incentivized Links

### Prompting Users to Share Incentivized Links

 Incentivized sharing can grow your Activity through network effects. Links can support several patterns:
- **Referral links.** Users can copy referral links inside your Activity, including their Discord user ID (`https://discord.com/activities/<your Activity ID>?referrer_id=123456789`), and send them to friends. If a friend accepts and starts playing your game, grant the referrer an in-game reward.
- **Promotions.** Run a temporary promotion on social media with a reward for starting now. Share a custom link (`https://discord.com/activities/<your Activity ID>?custom_id=social012025` ) on social media; anyone who clicks that link can receive an in-game reward.
- **Social deep-links.** Instead of sending every Activity launch to the same location, use contextual deep-links. For example, user A can copy a link inside your Activity (`https://discord.com/activities/<your Activity ID>?referrer_id=123456789&custom_id=visit-location`) and send it in a DM or channel, so user B opens directly at user A's location.
- **Turn-based deep-links.** A DM that tells a user "it's your turn" can include a link that opens the correct game instance and turn.
- **Affiliate marketing.** Affiliates such as influencers or companies can promote your game and receive rewards through a custom link (`https://discord.com/activities/<your Activity ID>?custom_id=influencer1`). For each user who starts playing through that influencer, pay out the agreed reward.
- **Source attribution.** Use the `custom_id` parameter to measure traffic from different marketing sources.
 This guide implements a referral link with rewards for both users who share links and users who click them.
