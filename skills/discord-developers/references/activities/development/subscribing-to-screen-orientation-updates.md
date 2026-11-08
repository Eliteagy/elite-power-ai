# Subscribing to screen orientation updates
Context: Discord developer reference: Subscribing to screen orientation updates
[Source](local-development-and-assets-index.md) / [Owning endpoint, event, object or procedure conditions](locking-application-orientation.md) / [Previous source section](default-orientation-lock-configuration.md) / [Following source section](application-layout-mode.md)
<a id="source-subscribing-to-screen-orientation-updates"></a>

#### Subscribing to Screen Orientation Updates

 Subscribe to the `ORIENTATION_UPDATE` event to receive screen orientation, which can differ from physical device orientation. Discord sends the current orientation when the subscription is created and sends later orientation changes.

```
const handleOrientationUpdate = (update: {screen_orientation: number}) => {
  switch (update.screen_orientation) {
      case Common.OrientationTypeObject.PORTRAIT:
        ...
      case Common.OrientationTypeObject.LANDSCAPE:
        ...
      default:
        ...
    }
}

discordSdk.subscribe('ORIENTATION_UPDATE', handleOrientationUpdate);

```

---

