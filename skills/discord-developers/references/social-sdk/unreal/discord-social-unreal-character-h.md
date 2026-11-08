# Discord social Unreal character h
[Source](unreal-setup-and-authentication-index.md) / [Owning endpoint, event, object or procedure conditions](discord-local-player-subsystem.md) / [Following source section](discord-social-unreal-character-h.md)

<a id="source-discordsocialunrealcharacterh"></a>

##### **DiscordSocialUnrealCharacter.h**

```
UFUNCTION(Exec)
void DiscordConnect();

UFUNCTION()
void OnStatusChanged(EDiscordClientStatus Status, EDiscordClientError Error, int32 ErrorDetail);

UPROPERTY()
UDiscordAuthorizationCodeVerifier* CodeVerifier;

UPROPERTY()
UDiscordLocalPlayerSubsystem* Discord;

```

 Add these functions to the protected section of the DiscordSocialUnrealCharacter class:

<a id="source-discordsocialunrealcharacterh-1"></a>

##### **DiscordSocialUnrealCharacter.h**

```
void BeginPlay();
void OnLogMessage(FString Message, EDiscordLoggingSeverity Severity);
void OnAuthorizeCompleted(UDiscordClientResult* Result, FString Code, FString RedirectUri);
void OnTokenExchange(UDiscordClientResult* Result, FString AccessToken, FString RefreshToken, EDiscordAuthorizationTokenType TokenType, int32 ExpiresIn, FString Scope);
void OnTokenUpdated(UDiscordClientResult* Result);

```

 Implement the functions in `DiscordSocialUnrealCharacter.cpp`. Add this code to `DiscordSocialUnrealCharacter.cpp`:
