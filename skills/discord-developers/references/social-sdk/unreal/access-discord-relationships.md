# Access discord relationships
Context: Discord developer reference: Access discord relationships
[Source](unreal-setup-and-authentication-index.md) / [Previous source section](connection-troubleshooting.md) / [Following source section](relationships-result.md)
<a id="source-step-7-access-discord-relationships"></a>

### Step 7: Access Discord Relationships

 Read the user's Discord relationships, or friends list, and show the count. This demonstrates how game code can access Discord data. Add this code inside the `Ready` section of `OnStatusChanged`:

```
if (Status == EDiscordClientStatus::Ready) {
  UE_LOG(LogTemplateCharacter, Log, TEXT("Connected to Discord! Ready to go! You can now start using Discord features."));
  UE_LOG(LogTemplateCharacter, Log, TEXT("👥 Friends Count: %d"), Discord->Client->GetRelationships().Num());
}

```

