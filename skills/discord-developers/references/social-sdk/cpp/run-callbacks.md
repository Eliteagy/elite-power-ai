# Run callbacks
Context: Discord developer reference: Run callbacks
[Source](cpp-setup-and-authentication-index.md) / [Previous source section](what-these-callbacks-do.md) / [Following source section](account-linking-with-discord.md)
<a id="source-step-7-run-callbacks"></a>

### Step 7: Run Callbacks

 After registering SDK callbacks, run them from your program's event loop. Add something like this to the main loop or tick function. The example adds [`RunCallbacks`](https://discord.com/developers/docs/social-sdk/namespacediscordpp.html#ab5dd8cf274f581ee1885de5816be3c29) to the main loop:

```
 // Keep application running to allow SDK to receive events and callbacks
  while (running) {
    discordpp::RunCallbacks();
    std::this_thread::sleep_for(std::chrono::milliseconds(10));
  }

```

---

