# Add the discord SDK to the project
Context: Discord developer reference: Add the discord SDK to the project
[Source](unreal-setup-and-authentication-index.md) / [Previous source section](create-a-new-unreal-engine-project.md) / [Following source section](initialize-the-sdk.md)
<a id="source-add-the-discord-sdk-to-the-project"></a>

### Add the Discord SDK to the project

 Find the Unreal project in Windows file explorer. At the project root, create `Plugins`, giving `DiscordSocialUnreal/Plugins`. Extract the Discord SDK archive into that Plugins directory so it contains `DiscordPartnerSDK` at `DiscordSocialUnreal/Plugins/DiscordPartnerSDK`. Verify the `DiscordPartnerSDK` folder name because future versions may change it, and the code below must use the matching name. Reload Unreal Editor and open the project; on launch it should ask whether to recompile the `DiscordPartnerSDK` plugin. From Unreal Editor, open Visual Studio through `Tools -> Open Visual Studio`. In `/Source/DiscordSocialUnreal/`, open `DiscordSocialUnreal.Build.cs` and add this line after the `PublicDependencyModuleNames` array:

```
PrivateDependencyModuleNames.AddRange(new string[] { "DiscordPartnerSDK" });

```

 Return to Unreal Editor and use `Tools -> Refresh Visual Studio Project` to refresh the Visual Studio project. Compile in Unreal Editor with `Ctrl-Alt-F11`. A successful compile shows a "Live coding succeeded" modal.

---

