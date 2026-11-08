# Mobile safe areas
[Source](local-development-and-assets-index.md) / [Owning endpoint, event, object or procedure conditions](local-development.md) / [Previous source section](supporting-mobile-platforms.md) / [Following source section](mobile-thermal-states.md)

<a id="source-mobile-safe-areas"></a>

### Mobile Safe Areas

Keep your app's assets inside mobile-safe areas.

<a id="source-mobile-safe-areas"></a>

### Mobile Safe Areas

 For example, safe area insets can be defined in CSS like this:

```
:root {
  --sait: var(--discord-safe-area-inset-top, env(safe-area-inset-top));
  --saib: var(--discord-safe-area-inset-bottom, env(safe-area-inset-bottom));
  --sail: var(--discord-safe-area-inset-left, env(safe-area-inset-left));
  --sair: var(--discord-safe-area-inset-right, env(safe-area-inset-right));
}

```

 This uses the `--discord-safe-area-inset-*` variable first and falls back to env values for iOS and for local development outside Discord. Reference the values this way:

```
body {
  padding-left: var(--sail);
  padding-right: var(--sair);
  padding-top: var(--sait);
  padding-bottom: var(--saib);
}

```

---
