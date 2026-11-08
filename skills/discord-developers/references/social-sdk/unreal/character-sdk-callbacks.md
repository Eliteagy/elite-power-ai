# Character SDK callbacks
Context: DiscordSocialUnrealCharacter.cpp complete Unreal Social SDK integration. Linked fragments form one program; not standalone declarations.
[Source](unreal-complete-character-index.md) / [Source](unreal-setup-and-authentication-index.md) / [Required complete example component](character-construction-input-mapping.md) / [Required complete example component](character-movement-input.md) / [Required character header](character-header-context.md) / [SDK and Unreal project setup](overview.md) / [Reviewed program owner and required setup](create-a-new-unreal-engine-project.md) / [Reviewed program owner and required setup](initialize-the-sdk.md) / [Reviewed program owner and required setup](discord-local-player-subsystem.md) / [Reviewed program owner and required setup](discord-social-unreal-character-h.md)
[Reviewed program owner and required setup](discord-social-unreal-character-h.md) / [Reviewed program owner and required setup](access-discord-relationships.md) / [Reviewed program owner and required setup](set-rich-presence.md) / [Reviewed program owner and required setup](module-build-configuration.md)
<a id="source-using-unreal-engine-part-2"></a>

> Discord Developers reference. Original prose; identifiers preserved verbatim.

The full DiscordSocialUnrealCharacter.cpp
```
#include "DiscordSocialUnrealCharacter.h"
#include "Engine/LocalPlayer.h"
#include "Camera/CameraComponent.h"
#include "Components/CapsuleComponent.h"
#include "GameFramework/CharacterMovementComponent.h"
#include "GameFramework/SpringArmComponent.h"
#include "GameFramework/Controller.h"
#include "EnhancedInputComponent.h"
#include "EnhancedInputSubsystems.h"
#include "InputActionValue.h"

DEFINE_LOG_CATEGORY(LogTemplateCharacter);

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
		UE_LOG(LogTemplateCharacter, Log, TEXT("Number of Relationships: %d"), Discord->Client->GetRelationships().Num());

		UDiscordActivity activity;
		activity.SetDetails("In competitive");
		activity.SetState("Diamond II");
	}
	else if (Error != EDiscordClientError::None) {
		UE_LOG(LogTemplateCharacter, Log, TEXT("Connection error: %s (Detail: %d)"), *UEnum::GetValueAsString(Error), ErrorDetail);
	}
}

void ADiscordSocialUnrealCharacter::OnAuthorizeCompleted(UDiscordClientResult* Result, FString Code, FString RedirectUri) {
	if (!Result->Successful()) {
		UE_LOG(LogTemplateCharacter, Error, TEXT("Discord authorization failed: %s"), *Result->Error());
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
