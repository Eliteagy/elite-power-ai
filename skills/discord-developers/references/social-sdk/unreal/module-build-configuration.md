# Module build configuration
Context: Discord developer reference: Module build configuration
[Source](unreal-setup-and-authentication-index.md) / [Previous source section](rich-presence-testing.md) / [Following source section](character-sdk-callbacks.md)
<a id="source-troubleshooting-2"></a>

### Troubleshooting

 If the presence does not appear:
- Confirm the client is connected and status is `Ready`
- Inspect the output log for error messages
- Verify that the activity settings are valid
- Make sure the account is not invisible on Discord

---

The full DiscordSocialUnreal.Build.cs

```
using UnrealBuildTool;

public class DiscordSocialUnreal : ModuleRules
{
	public DiscordSocialUnreal(ReadOnlyTargetRules Target) : base(Target)
	{
		PCHUsage = PCHUsageMode.UseExplicitOrSharedPCHs;

		PublicDependencyModuleNames.AddRange(new string[] { "Core", "CoreUObject", "Engine", "InputCore", "EnhancedInput" });
		PrivateDependencyModuleNames.AddRange(new string[] { "DiscordPartnerSDK" });
    }
}

```

