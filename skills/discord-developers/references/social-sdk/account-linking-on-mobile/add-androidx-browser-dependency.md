# Add androidx browser dependency
Context: Discord developer reference: Add androidx browser dependency
[Source](account-linking-on-mobile-index.md) / [Owning endpoint, event, object or procedure conditions](configure-custom-url-scheme.md) / [Following source section](android-configuration-android-permissions.md)
<a id="source-2-add-androidxbrowser-dependency"></a>

#### 2. Add androidx.browser Dependency

 Authorization needs `androidx.browser` as a Gradle dependency:
- If your project uses **Google External Dependency Manager**, the Unity plugin includes a suitable dependencies XML file
- If not, add the dependency yourself in `build.gradle`:

```
dependencies {
    implementation 'androidx.browser:browser:1.8.0'
    // Your other dependencies...
}

```

