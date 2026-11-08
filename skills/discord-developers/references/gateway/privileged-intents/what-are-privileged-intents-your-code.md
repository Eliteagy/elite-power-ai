# What are privileged intents your code
Context: Discord developer reference: What are privileged intents your code
[Source](privileged-intent-policy-index.md) / [Owning endpoint, event, object or procedure conditions](what-are-privileged-intents.md) / [Previous source section](the-developer-portal.md) / [Following source section](test-and-verify.md)
<a id="source-2-your-code"></a>

### 2. Your code

 The portal toggle only authorizes the app to receive that data. The bot must also request the intent when it connects to the Gateway. The exact code depends on the library, or you can define Gateway Intents manually. If code and portal settings do not match, the app receives a `[DisallowedIntents]` error when it connects.

---

