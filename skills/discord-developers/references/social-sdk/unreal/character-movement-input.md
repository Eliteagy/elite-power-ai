# Character movement input
Context: DiscordSocialUnrealCharacter.cpp complete Unreal Social SDK integration. Linked fragments form one program; not standalone declarations.
[Source](unreal-complete-character-index.md) / [Required complete example component](character-sdk-callbacks.md) / [Required complete example component](character-construction-input-mapping.md) / [Required character header](character-header-context.md) / [SDK and Unreal project setup](overview.md) / [Reviewed program owner and required setup](create-a-new-unreal-engine-project.md) / [Reviewed program owner and required setup](initialize-the-sdk.md) / [Reviewed program owner and required setup](discord-local-player-subsystem.md) / [Reviewed program owner and required setup](discord-social-unreal-character-h.md)
[Reviewed program owner and required setup](discord-social-unreal-character-h.md) / [Reviewed program owner and required setup](access-discord-relationships.md) / [Reviewed program owner and required setup](set-rich-presence.md) / [Reviewed program owner and required setup](module-build-configuration.md)

```
void ADiscordSocialUnrealCharacter::SetupPlayerInputComponent(UInputComponent* PlayerInputComponent)
{
	// Set up action bindings
	if (UEnhancedInputComponent* EnhancedInputComponent = Cast<UEnhancedInputComponent>(PlayerInputComponent)) {

		// Jumping
		EnhancedInputComponent->BindAction(JumpAction, ETriggerEvent::Started, this, &ACharacter::Jump);
		EnhancedInputComponent->BindAction(JumpAction, ETriggerEvent::Completed, this, &ACharacter::StopJumping);

		// Moving
		EnhancedInputComponent->BindAction(MoveAction, ETriggerEvent::Triggered, this, &ADiscordSocialUnrealCharacter::Move);

		// Looking
		EnhancedInputComponent->BindAction(LookAction, ETriggerEvent::Triggered, this, &ADiscordSocialUnrealCharacter::Look);
	}
	else
	{
		UE_LOG(LogTemplateCharacter, Error, TEXT("'%s' Failed to find an Enhanced Input component! This template is built to use the Enhanced Input system. If you intend to use the legacy system, then you will need to update this C++ file."), *GetNameSafe(this));
	}
}

void ADiscordSocialUnrealCharacter::Move(const FInputActionValue& Value)
{
	// input is a Vector2D
	FVector2D MovementVector = Value.Get<FVector2D>();

	if (Controller != nullptr)
	{
		// find out which way is forward
		const FRotator Rotation = Controller->GetControlRotation();
		const FRotator YawRotation(0, Rotation.Yaw, 0);

		// get forward vector
		const FVector ForwardDirection = FRotationMatrix(YawRotation).GetUnitAxis(EAxis::X);

		// get right vector
		const FVector RightDirection = FRotationMatrix(YawRotation).GetUnitAxis(EAxis::Y);

		// add movement
		AddMovementInput(ForwardDirection, MovementVector.Y);
		AddMovementInput(RightDirection, MovementVector.X);
	}
}

void ADiscordSocialUnrealCharacter::Look(const FInputActionValue& Value)
{
	// input is a Vector2D
	FVector2D LookAxisVector = Value.Get<FVector2D>();

	if (Controller != nullptr)
	{
		// add yaw and pitch input to controller
		AddControllerYawInput(LookAxisVector.X);
		AddControllerPitchInput(LookAxisVector.Y);
	}
}

```
