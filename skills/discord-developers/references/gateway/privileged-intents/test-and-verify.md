# Test and verify
Context: Discord developer reference: Test and verify
[Source](privileged-intent-policy-index.md) / [Owning endpoint, event, object or procedure conditions](what-are-privileged-intents.md) / [Previous source section](what-are-privileged-intents-your-code.md) / [Following source section](my-bot-s-commands-stopped-working.md)
<a id="source-step-5-test-and-verify"></a>

### Step 5: Test and verify

 After changes are made, verify the behavior:
1. **Restart your bot.** Intent settings apply only on a new Gateway connection; an already-running bot will not see portal changes until it reconnects.
2. **Check your error logs.** A `DisallowedIntents` error usually means the requested intents in code do not match the Developer Portal settings or approval state.
3. **Test affected features.** When a Privileged Intent is removed, confirm the migrated implementation still works. If prefix commands moved to slash commands, check that they are registered and respond properly.
4. **Test with a second account.** Behavior can change when the author is the bot instead of another user. Use a separate Discord account to test the experience as a normal user.

---

