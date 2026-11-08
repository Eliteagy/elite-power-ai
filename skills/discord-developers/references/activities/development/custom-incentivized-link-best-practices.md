# Creating and managing custom incentivized links best practices
Context: Discord developer reference: Creating and managing custom incentivized links best practices
[Source](local-development-and-assets-index.md) / [Owning endpoint, event, object or procedure conditions](prompting-users-to-share-incentivized-links.md) / [Owning endpoint, event, object or procedure conditions](creating-and-managing-custom-incentivized-links.md) / [Previous source section](deleting-a-link.md) / [Following source section](custom-incentivized-link-user-experience.md)
<a id="source-best-practices"></a>

#### Best Practices

- Generate unique, non-guessable `customId`s
- Track and validate referrals to reduce abuse
- Gracefully handle expirations in your activity for custom links that are time-limited but remain live off-platform.

