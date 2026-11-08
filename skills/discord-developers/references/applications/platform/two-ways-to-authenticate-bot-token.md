# Two ways to authenticate bot token
Context: Discord developer reference: Two ways to authenticate bot token
[Source](components-discovery-and-platform-apis-index.md) / [Owning endpoint, event, object or procedure conditions](two-ways-to-authenticate.md) / [Following source section](oauth2-user-token.md)
<a id="source-two-ways-to-authenticate-1"></a> <a id="source-bot-token"></a>

### Two Ways to Authenticate

### Bot Token

 Creating a bot user in the Developer Portal generates a **bot token**. Code uses that token to authenticate as the bot user, which is a dedicated application account separate from a regular user. **Bot tokens:**
- Authenticate as the bot user rather than on behalf of a person
- Are used for Gateway connections and most REST API requests
- Carry the permissions granted when the bot was added to a server
- Must be protected like passwords and never exposed publicly

