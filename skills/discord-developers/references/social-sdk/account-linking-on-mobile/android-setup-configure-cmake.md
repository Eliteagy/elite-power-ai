# Android setup configure CMake
Context: Discord developer reference: Android setup configure CMake
[Source](account-linking-on-mobile-index.md) / [Owning endpoint, event, object or procedure conditions](create-android-project.md) / [Previous source section](android-setup-enable-prefab.md) / [Following source section](android-setup-include-sdk-headers.md)
<a id="source-4-configure-cmake"></a>

#### 4. Configure CMake

 In your `CMakeLists.txt`:

```
find_package(discord_partner_sdk REQUIRED CONFIG)
target_link_libraries(your_target discord_partner_sdk::discord_partner_sdk)

```

