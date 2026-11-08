# Path b apply for privileged intent access
Context: Discord developer reference: Path b apply for privileged intent access
[Source](privileged-intent-policy-index.md) / [Owning endpoint, event, object or procedure conditions](what-are-privileged-intents.md) / [Previous source section](path-a-remove-the-dependency.md) / [Following source section](enable-the-intent-in-dev-portal-and-your-code.md)
<a id="source-path-b-apply-for-privileged-intent-access"></a>

### Path B: Apply for Privileged Intent access

 When a compliant feature truly depends on data exposed by Privileged Intents and no suitable substitute exists, submit an access request. Prepare the request carefully: **Be specific about your use case:** Avoid a broad claim such as "My bot needs message content." A stronger explanation could say the bot runs automated moderation and checks messages for phishing URLs plus known scam signals. Describe what the app does with the data and why interactions cannot replace it. **Only request what you need:** If moderation needs Message Content but Guild Presences are irrelevant, leave Guild Presences out. Asking for unsupported intents weakens the submission. **Describe responsible data handling:** If data is stored, explain why storage is needed and describe retention and security controls. If the app processes data in memory and discards it, state that. **Think about annual review from the start:** Yearly renewal is required, so keep responses clear, easy to update, and backed by records as the app changes. **Submit complete, accurate, and understandable information; otherwise Discord may delay review or deny the request.** Once access is approved, enable the granted intents as described in Step 4.

---

