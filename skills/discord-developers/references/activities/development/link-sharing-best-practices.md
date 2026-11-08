# Link sharing best practices
Context: Discord developer reference: Link sharing best practices
[Source](local-development-and-assets-index.md) / [Owning endpoint, event, object or procedure conditions](prompting-users-to-share-incentivized-links.md) / [Previous source section](handling-incoming-referrals.md) / [Following source section](creating-and-managing-custom-incentivized-links.md)
<a id="source-link-sharing-best-practices"></a>

#### Link Sharing Best Practices

- Generate unique, non-guessable `customId`s
- Track and validate referrals to reduce abuse
- Handle edge cases like expired promotions gracefully
- Consider cool-down periods between shares
- Do not write the `referrer_id` query parameter directly. When present, `referrer_id` should be a Discord snowflake-type user ID; otherwise it is set to the message's author id.

---

