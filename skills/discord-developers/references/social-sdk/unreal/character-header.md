# Character header
Context: DiscordSocialUnrealCharacter.cpp complete Unreal Social SDK integration. Read linked project/header and SDK setup.
[Source](unreal-complete-character-index.md) / [Owning endpoint, event, object or procedure conditions](character-sdk-callbacks.md) / [Reviewed program owner and required setup](create-a-new-unreal-engine-project.md) / [Reviewed program owner and required setup](initialize-the-sdk.md) / [Reviewed program owner and required setup](discord-local-player-subsystem.md) / [Reviewed program owner and required setup](discord-social-unreal-character-h.md) / [Reviewed program owner and required setup](discord-social-unreal-character-h.md) / [Reviewed program owner and required setup](access-discord-relationships.md)
[Reviewed program owner and required setup](set-rich-presence.md) / [Reviewed program owner and required setup](module-build-configuration.md) / [Previous source section](character-header-context.md) / [Following source section](conclusion.md)

```
#pragma once

#include "CoreMinimal.h"
#include "DiscordLocalPlayerSubsystem.h"
#include "GameFramework/Character.h"
#include "Logging/LogMacros.h"
#include "DiscordSocialUnrealCharacter.generated.h"

class USpringArmComponent;
class UCameraComponent;
class UInputMappingContext;
class UInputAction;
struct FInputActionValue;

DECLARE_LOG_CATEGORY_EXTERN(LogTemplateCharacter, Log, All);

UCLASS(config=Game)
class ADiscordSocialUnrealCharacter : public ACharacter
{
	GENERATED_BODY()

	/** Camera boom positioning the camera behind the character */
	UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = Camera, meta = (AllowPrivateAccess = "true"))
	USpringArmComponent* CameraBoom;

	/** Follow camera */
	UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = Camera, meta = (AllowPrivateAccess = "true"))
	UCameraComponent* FollowCamera;

	/** MappingContext */
	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = Input, meta = (AllowPrivateAccess = "true"))
	UInputMappingContext* DefaultMappingContext;

	/** Jump Input Action */
	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = Input, meta = (AllowPrivateAccess = "true"))
	UInputAction* JumpAction;

	/** Move Input Action */
	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = Input, meta = (AllowPrivateAccess = "true"))
	UInputAction* MoveAction;

	/** Look Input Action */
	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = Input, meta = (AllowPrivateAccess = "true"))
	UInputAction* LookAction;

public:
	ADiscordSocialUnrealCharacter();

	UFUNCTION(Exec)
	void DiscordConnect();

	UFUNCTION()
	void OnStatusChanged(EDiscordClientStatus Status, EDiscordClientError Error, int32 ErrorDetail);

	UPROPERTY()
	UDiscordAuthorizationCodeVerifier* CodeVerifier;

	UPROPERTY()
	UDiscordLocalPlayerSubsystem* Discord;

protected:

	/** Called for movement input */
	void Move(const FInputActionValue& Value);

	/** Called for looking input */
	void Look(const FInputActionValue& Value);

	void BeginPlay();
	void OnLogMessage(FString Message, EDiscordLoggingSeverity Severity);
	void OnAuthorizeCompleted(UDiscordClientResult* Result, FString Code, FString RedirectUri);
	void OnRichPresenceUpdated(UDiscordClientResult* Result);
	void OnTokenExchange(UDiscordClientResult* Result, FString AccessToken, FString RefreshToken, EDiscordAuthorizationTokenType TokenType, int32 ExpiresIn, FString Scope);
	void OnTokenUpdated(UDiscordClientResult* Result);

protected:

	virtual void NotifyControllerChanged() override;

	virtual void SetupPlayerInputComponent(class UInputComponent* PlayerInputComponent) override;

public:
	/** Returns CameraBoom subobject **/
	FORCEINLINE class USpringArmComponent* GetCameraBoom() const { return CameraBoom; }
	/** Returns FollowCamera subobject **/
	FORCEINLINE class UCameraComponent* GetFollowCamera() const { return FollowCamera; }
};

```

