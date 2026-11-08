# Discord social Unreal character C++
Context: Discord developer reference: Discord social Unreal character C++
[Source](unreal-setup-and-authentication-index.md) / [Owning endpoint, event, object or procedure conditions](discord-local-player-subsystem.md) / [Previous source section](discord-social-unreal-character-h.md) / [Following source section](what-s-happening-here.md)
<a id="source-discordsocialunrealcharactercpp"></a>

##### **DiscordSocialUnrealCharacter.cpp**

```
#define APPLICATION_ID 1111111111111111111

void ADiscordSocialUnrealCharacter::BeginPlay() {
  auto PlayerController = Cast<APlayerController>(GetController());
  auto LocalPlayer = PlayerController->GetLocalPlayer();
  Discord = ULocalPlayer::GetSubsystem<UDiscordLocalPlayerSubsystem>(LocalPlayer);
  auto LogCallback = FDiscordClientLogCallback::CreateUObject(this, &ADiscordSocialUnrealCharacter::OnLogMessage);
  FScriptDelegate StatusChanged;
  StatusChanged.BindUFunction(this, "OnStatusChanged");
  Discord->Client->AddLogCallback(LogCallback, EDiscordLoggingSeverity::Info);
  Discord->OnStatusChanged.Add(StatusChanged);
}

void ADiscordSocialUnrealCharacter::DiscordConnect() {
  CodeVerifier = Discord->Client->CreateAuthorizationCodeVerifier();
  auto AuthArgs = NewObject<UDiscordAuthorizationArgs>();
  AuthArgs->Init();
  AuthArgs->SetClientId(APPLICATION_ID);
  AuthArgs->SetScopes(UDiscordClient::GetDefaultPresenceScopes());
  AuthArgs->SetCodeChallenge(CodeVerifier->Challenge());
  Discord->Client->Authorize(AuthArgs, FDiscordClientAuthorizationCallback::CreateUObject(this, &ADiscordSocialUnrealCharacter::OnAuthorizeCompleted));
}

void ADiscordSocialUnrealCharacter::OnLogMessage(FString Message, EDiscordLoggingSeverity Severity) {
  UE_LOG(LogTemplateCharacter, Log, TEXT("[%s] %s"), *UEnum::GetValueAsString(Severity), *Message);
}

void ADiscordSocialUnrealCharacter::OnStatusChanged(EDiscordClientStatus Status, EDiscordClientError Error, int32 ErrorDetail) {
  UE_LOG(LogTemplateCharacter, Log, TEXT("Connection status: %s"), *UEnum::GetValueAsString(Status));
  if (Status == EDiscordClientStatus::Ready) {
    UE_LOG(LogTemplateCharacter, Log, TEXT("Connected to Discord! Ready to go! You can now start using Discord features."));
  }
  else if (Error != EDiscordClientError::None) {
    UE_LOG(LogTemplateCharacter, Log, TEXT("Connection error: %s (Detail: %d)"), *UEnum::GetValueAsString(Error), ErrorDetail);
  }
}

void ADiscordSocialUnrealCharacter::OnAuthorizeCompleted(UDiscordClientResult* Result, FString Code, FString RedirectUri) {
  if (!Result->Successful()) {
    UE_LOG( LogTemplateCharacter, Error, TEXT("Discord authorization failed: %s"), *Result->Error());
    return;
  }

  UE_LOG(LogTemplateCharacter, Log, TEXT("Authorization successful! Getting access token..."));
  Discord->Client->GetToken(APPLICATION_ID, Code, CodeVerifier->Verifier(), RedirectUri, FDiscordClientTokenExchangeCallback::CreateUObject(this, &ADiscordSocialUnrealCharacter::OnTokenExchange));
}

void ADiscordSocialUnrealCharacter::OnTokenExchange(UDiscordClientResult* Result, FString AccessToken, FString RefreshToken, EDiscordAuthorizationTokenType TokenType, int32 ExpiresIn, FString Scope) {
  if (!Result->Successful()) {
    UE_LOG(LogTemplateCharacter, Error, TEXT("Discord token exchange failed: %s"), *Result->Error());
  }

  Discord->Client->UpdateToken(TokenType, AccessToken, FDiscordClientUpdateTokenCallback::CreateUObject(this, &ADiscordSocialUnrealCharacter::OnTokenUpdated));
}

void ADiscordSocialUnrealCharacter::OnTokenUpdated(UDiscordClientResult* Result) {
  Discord->Client->Connect();
}

```

