# Checking the result
Context: Discord developer reference: Checking the result
[Source](../debugging/logging-api-and-unicode-index.md) / [Owning endpoint, event, object or procedure conditions](overview.md) / [Following source section](implementing-retry-logic.md)
<a id="source-checking-the-result"></a>

### Checking the Result

 Callbacks for SDK operations that perform network requests receive a [`ClientResult`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1ClientResult.html#a685015ca8d29a50d47fd1ed5d469ac2e). Check [`ClientResult::Successful`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1ClientResult.html#aef3b1aca3cd156daf488ca13ae87313b) before anything else. If the call failed, use [`ClientResult::Retryable`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1ClientResult.html#a0d220638f4a36c0b8b731f601e0ac02d) to decide whether another attempt is appropriate:

```
client->SendLobbyMessage(lobbyId, message, [](discordpp::ClientResult result, uint64_t messageId) {
  if (result.Successful()) {
    return;
  }

  if (result.Retryable()) {
    float delaySeconds = result.RetryAfter();
    // Schedule a retry after delaySeconds — see below
  } else {
    std::cerr << "Unrecoverable error: " << result.ToString() << "\n";
  }
});

```

 [`ClientResult::Retryable`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1ClientResult.html#a0d220638f4a36c0b8b731f601e0ac02d) is `true` for HTTP 429 rate limits and temporary network failures. It is `false` for validation problems, permission failures, and other errors that cannot be recovered by retrying.

---

