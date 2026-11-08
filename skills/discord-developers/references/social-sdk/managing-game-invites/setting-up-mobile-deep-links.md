# Setting up mobile deep links
Context: Discord developer reference: Setting up mobile deep links
[Source](managing-game-invites-index.md) / [Previous source section](supporting-mobile-game-invites.md) / [Following source section](how-mobile-deep-links-work.md)
<a id="source-setting-up-mobile-deep-links"></a>

### Setting Up Mobile Deep Links

1. Add your deep link URL in the Discord Developer Portal:

- Open your application's `General` tab
- Enter the game's URL scheme, such as `yourgame://`
- Discord appends `/_discord/join?secret=SECRETHERE` to that URL

1. Tell Discord which platforms are allowed to accept invites:

```
activity.SetSupportedPlatforms(
    ActivityGamePlatforms.Desktop |  // Enable PC/Mac invites
    ActivityGamePlatforms.IOS |      // Enable iOS invites
    ActivityGamePlatforms.Android    // Enable Android invites
);

```

