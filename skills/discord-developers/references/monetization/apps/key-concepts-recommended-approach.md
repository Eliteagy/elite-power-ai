# Key concepts recommended approach
Context: Discord developer reference: Key concepts recommended approach
[Source](purchases-and-premium-responses-index.md) / [Owning endpoint, event, object or procedure conditions](key-concepts.md) / [Previous source section](use-the-discord-http-api-for-verification.md) / [Following source section](testing-your-in-app-purchases.md)
<a id="source-recommended-approach"></a>

### Recommended Approach

- Use client-side SDK commands and events **optimistically** for SKUs and Entitlements.
- **Verify** those results from your backend through the Discord HTTP API.
 In short, trust the SDK for responsiveness, but verify with the API before protecting premium features.

---

