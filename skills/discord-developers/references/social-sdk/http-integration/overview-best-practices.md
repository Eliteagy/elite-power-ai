# Overview best practices
Context: Discord developer reference: Overview best practices
[Source](../marketing/integration-marketing-index.md) / [Owning endpoint, event, object or procedure conditions](overview.md) / [Previous source section](using-the-open-api-specification.md) / [Following source section](overview-next-steps.md)
<a id="source-best-practices"></a>

### Best Practices

1. Token Security
  - Do not put bot tokens in client-side code.
  - Store tokens securely

2. Rate Limiting
  - Respect Discord’s [rate limits](https://docs.discord.com/developers/topics/rate-limits)
  - Implement exponential backoff
  - Cache responses when appropriate

3. Error Handling
  - Handle HTTP errors gracefully
  - Add retry handling for temporary failures.
  - Log API errors for debugging

---

