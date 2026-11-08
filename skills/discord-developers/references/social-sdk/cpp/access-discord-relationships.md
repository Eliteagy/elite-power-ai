# Access discord relationships
Context: Discord developer reference: Access discord relationships
[Source](cpp-setup-and-authentication-index.md) / [Source](cpp-relationships-and-presence-index.md) / [Previous source section](connection-program.md) / [Previous source section](relationships-result.md)
<a id="source-step-10-access-discord-relationships"></a>

---

### Step 10: Access Discord Relationships
Read the user's Discord relationships, or friends list, and show the count so the game can start using Discord data. Inside `client->SetStatusChangedCallback()`, after the `status == discordpp::Client::Status::Ready` branch, add this code to print how many Discord friends are available:

```
// Access initial relationships data
std::cout << "👥 Friends Count: " << client->GetRelationships().size() << std::endl;

```

