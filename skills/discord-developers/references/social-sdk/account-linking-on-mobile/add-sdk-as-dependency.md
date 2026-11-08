# Add SDK as dependency
Context: Discord developer reference: Add SDK as dependency
[Source](account-linking-on-mobile-index.md) / [Owning endpoint, event, object or procedure conditions](create-android-project.md) / [Following source section](android-setup-enable-prefab.md)
<a id="source-2-add-sdk-as-dependency"></a>

#### 2. Add SDK as Dependency

 Add `discord_partner_sdk.aar` as a Gradle project dependency:
1. Place the AAR in a directory such as `app/libs`
2. Add it to dependencies in `app/build.gradle`:

```
dependencies {
    implementation files("libs/discord_partner_sdk.aar")
}

```

