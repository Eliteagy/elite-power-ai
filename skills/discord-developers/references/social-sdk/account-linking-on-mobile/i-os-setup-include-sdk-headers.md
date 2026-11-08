# I os setup include SDK headers
Context: Discord developer reference: I os setup include SDK headers
[Source](account-linking-on-mobile-index.md) / [Owning endpoint, event, object or procedure conditions](create-and-configure-xcode-project.md) / [Previous source section](register-url-scheme.md) / [Following source section](i-os-setup-run-callbacks-in-game-loop.md)
<a id="source-5-include-sdk-headers"></a>

#### 5. Include SDK Headers

 In one C++ or Objective-C++ (`.mm`) source file:

```
#define DISCORDPP_IMPLEMENTATION // Define this in exactly ONE file
#include <discord_partner_sdk/discordpp.h>

```

 `DISCORDPP_IMPLEMENTATION` must be defined in **exactly one file** in your codebase so the required implementation code is expanded once.

