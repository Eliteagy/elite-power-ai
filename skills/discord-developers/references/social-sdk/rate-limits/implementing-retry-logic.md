# Implementing retry logic
Context: Discord developer reference: Implementing retry logic
[Source](../debugging/logging-api-and-unicode-index.md) / [Owning endpoint, event, object or procedure conditions](overview.md) / [Previous source section](checking-the-result.md) / [Following source section](rate-limit-reference.md)
<a id="source-implementing-retry-logic"></a>

### Implementing Retry Logic

 Treat [`ClientResult::RetryAfter`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1ClientResult.html#ac739adca52b90d6b4cbed5753c30fd65) as the earliest allowed retry time. Retrying sooner will keep hitting the limit, so wait for the full `RetryAfter` period. A basic helper can schedule the retry with your engine timer:

```
void SendMessageWithRetry(
    std::shared_ptr<discordpp::Client> client,
    uint64_t lobbyId,
    std::string message,
    int attemptsLeft)
{
  client->SendLobbyMessage(lobbyId, message,
    [client, lobbyId, message, attemptsLeft](discordpp::ClientResult result, uint64_t messageId) {
      if (result.Successful()) {
        std::cout << "Message sent\n";
        return;
      }

      if (result.Retryable() && attemptsLeft > 1) {
        float delay = result.RetryAfter();
        ScheduleCallback(delay, [client, lobbyId, message, attemptsLeft]() {
          SendMessageWithRetry(client, lobbyId, message, attemptsLeft - 1);
        });
      } else {
        std::cerr << "Failed after retries: " << result.ToString() << "\n";
      }
    });
}

```

 `ScheduleCallback` stands in for the delayed execution facility your engine uses, such as a task queue, coroutine sleep, or tick-based callback.

---

