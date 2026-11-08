# Set rich presence
Context: Discord developer reference: Set rich presence
[Source](unreal-setup-and-authentication-index.md) / [Previous source section](relationships-troubleshooting.md) / [Following source section](rich-presence-result.md)
<a id="source-step-8-set-rich-presence"></a>

### Step 8: Set Rich Presence

 Use Rich Presence to display the game's activity on Discord. Other players can then see in their Discord friends list what someone is doing in the game. Add this code inside the `Ready` section of `OnStatusChanged`:

```
if (Status == EDiscordClientStatus::Ready) {
    UE_LOG(LogTemplateCharacter, Log, TEXT("Connected to Discord! Ready to go! You can now start using Discord features."));
    UE_LOG(LogTemplateCharacter, Log, TEXT("👥 Friends Count: %d"), Discord->Client->GetRelationships().Num());

    UE_LOG(LogTemplateCharacter, Log, TEXT("Connected to Discord! Ready to go! You can now start using Discord features."));
    UDiscordActivity* Activity = NewObject<UDiscordActivity>();
    Activity->Init();
    Activity->SetType(EDiscordActivityTypes::Playing);
    Activity->SetState("In competitive match");
    Activity->SetDetails("Rank: Diamond II");
	Discord->Client->UpdateRichPresence(Activity, FDiscordClientUpdateRichPresenceCallback::CreateUObject(this, &ADiscordSocialUnrealCharacter::OnRichPresenceUpdated));
}

```

 Then add this new method:

```
void ADiscordSocialUnrealCharacter::OnRichPresenceUpdated(UDiscordClientResult* Result) {
  if (Result->Successful()) {
    UE_LOG(LogTemplateCharacter, Log, TEXT("Rich Presence updated successfully!"));
  } else {
    UE_LOG(LogTemplateCharacter, Error, TEXT("Rich Presence update failed"));
  }
}

```

