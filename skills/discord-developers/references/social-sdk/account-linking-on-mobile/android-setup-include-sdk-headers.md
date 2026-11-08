# Android setup include SDK headers
Context: Discord developer reference: Android setup include SDK headers
[Source](account-linking-on-mobile-index.md) / [Owning endpoint, event, object or procedure conditions](create-android-project.md) / [Previous source section](android-setup-configure-cmake.md) / [Following source section](initialize-sdk-in-activity.md)
<a id="source-5-include-sdk-headers-1"></a>

#### 5. Include SDK Headers

 In your C++ source:

```
#define DISCORDPP_IMPLEMENTATION // Define this in exactly ONE file
#include "discordpp.h"

```

 `DISCORDPP_IMPLEMENTATION` must be defined in **exactly one file** in your codebase.

