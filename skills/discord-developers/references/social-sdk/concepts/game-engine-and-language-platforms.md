# Game engine and language platforms
Context: Discord developer reference: Game engine and language platforms
[Source](linking-permissions-and-support-index.md) / [Owning endpoint, event, object or procedure conditions](game-engine-and-language.md) / [Previous source section](game-engine-and-language.md) / [Following source section](game-engine-and-language-next-steps.md)
<a id="source-platforms"></a>

### Platforms

 The Discord Social SDK can be used on these platforms:
| Platform | Supported Versions | Support Level | Standalone C++ | Unreal Engine | Unity |
| --- | --- | --- | --- | --- | --- |
| **Desktop** |  |  |  |  |  |
| Windows (x64) | 10+ | Generally Available | ✅ | ✅ | ✅ |
| Windows (ARM64) | 11+ | Generally Available | ✅ | ❌ | ❌ |
| macOS (x64) | 10.5+ | Generally Available | ✅ | ❌ | ✅ |
| macOS (ARM64) | 11+ | Generally Available | ✅ | ❌ | ✅ |
| Linux | *glibc 2.31+ | Experimental | ✅ | ✅ | ✅ |
| **Mobile** |  |  |  |  |  |
| Android | 7.0+ | Generally Available | ✅ | ✅ | ✅ |
| iOS | 15.1+ | Generally Available | ✅ | ✅ | ✅ |
| **Console** |  |  |  |  |  |
| Xbox One | GDK 250400-260400 | Experimental | ✅ | ✅ | ❌ |
| Xbox Series X|S | GDK 250400-260400 | Generally Available | ✅ | ✅ | ✅ |
| PlayStation 4 | OS 11.500-12.500 | Experimental | ✅ | ✅ | ❌ |
| PlayStation 5 | OS 11.000-13.000 | Generally Available | ✅ | ✅ | ✅ |

 * Discord cannot test every Linux distribution, but most distributions using glibc 2.31, such as Ubuntu 20.04, or newer should work. Each Social SDK release covers roughly an 18-month window of Xbox and PlayStation OS SDK versions. See [Console OS SDK Support](https://docs.discord.com/developers/discord-social-sdk/core-concepts/release-cadence-and-support#console-os-sdk-support) for how that window advances with each release. Console games require middleware approval and approved-developer status for the target console before using the Discord Social SDK. See [this article](https://support-dev.discord.com/hc/en-us/articles/30209074764183) for more information. Exception: Prohibited Off-Platform Interactions by Sony
 For integrations that run on Sony Platforms, such as PlayStation 5...

1. **Do not allow access to Account Linking** entry points.
2. **Do not allow access to Linked Channels**.
3. **Limit messaging and Invites to other players currently playing** the game.
4. **Do not display off-platform presence and logos** (including Discord).

---

