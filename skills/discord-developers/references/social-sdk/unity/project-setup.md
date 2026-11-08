# Project setup
Context: Discord developer reference: Project setup
[Source](unity-setup-and-authentication-index.md) / [Previous source section](download-the-social-sdk-for-unity.md) / [Following source section](unity-runtime-configuration.md)
<a id="source-step-5-project-setup"></a>

### Step 5: Project Setup

 Prepare the Unity project by adding the Social SDK package, then create the objects and scripts needed to call it.
1. In Unity Hub, create a new 2D project using Unity version 2021.3 or newer
2. Either:
  1. Extract the zip into Unity's `Packages` folder, or
  2. Extract the zip elsewhere and use [Install Package from Disk](https://docs.unity3d.com/Manual/upm-ui-local.html). Keep that folder in a stable location, because the Unity project loads the package from there.

3. Add a `Scripts` folder to the project and create `DiscordManager.cs` inside it
4. Put this code in `DiscordManager.cs`:

```
using UnityEngine;
using UnityEngine.UI;
using Discord.Sdk;
using System.Linq;

public class DiscordManager : MonoBehaviour
{
    [SerializeField]
    private ulong clientId; // Set this in the Unity Inspector from the dev portal

    [SerializeField]
    private Button loginButton;

    [SerializeField]
    private Text statusText;

    private Client client;
    private string codeVerifier;
}

```

1. Create an empty scene object named **DiscordManager** with **GameObject > Create Empty**, then attach `DiscordManager.cs` to it
2. Add a scene button with **GameObject > UI > Legacy > Button**
3. Add scene text with **GameObject > UI > Legacy > Text**
4. Move the button and text to visible positions on screen
5. In the inspector for **DiscordManager**, assign the button and text references
6. Run it!
 That is enough for the initial setup. Nothing visible should happen yet; if problems appear, use the troubleshooting notes before continuing.

