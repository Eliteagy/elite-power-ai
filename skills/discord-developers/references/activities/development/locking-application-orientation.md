# Locking application orientation
Context: Discord developer reference: Locking application orientation
[Source](local-development-and-assets-index.md) / [Previous source section](generating-a-link.md) / [Following source section](default-orientation-lock-configuration.md)
<a id="source-application-orientation-1"></a> <a id="source-application-orientation-2"></a> <a id="source-locking-application-orientation"></a>

## Application Orientation

### Application Orientation

#### Locking Application Orientation

 These SDK APIs lock the application to selected orientations. Supported lock states are `UNLOCKED`, `PORTRAIT`, and `LANDSCAPE`. `lock_state` is the default and controls orientation while the application is focused. `picture_in_picture_lock_state` controls the PIP aspect ratio, and `grid_lock_state` controls the grid tile aspect ratio. If `picture_in_picture_lock_state` is unset, the application PIP uses `lock_state` as its fallback. If `grid_lock_state` is unset, the grid tile uses `picture_in_picture_lock_state`; if that is unset too, it uses `lock_state`. Calling `setOrientationLockState` with `undefined` or with an omitted value for `picture_in_picture_lock_state` or `grid_lock_state` leaves the corresponding lock state unchanged. A later `setOrientationLockState` call can still set `picture_in_picture_lock_state` explicitly. Passing null for `picture_in_picture_lock_state` or `grid_lock_state` clears that layout mode's lock state so it follows the fallback chain.

```
import {DiscordSDK, Common} from '@discord/embedded-app-sdk';
const discordSdk = new DiscordSDK(clientId);
await discordSdk.ready();

// Set a default lock state
discordSdk.commands.setOrientationLockState({lock_state: Common.OrientationLockStateTypeObject.LANDSCAPE});

// or set both a default lock state and a picture-in-picture lock state
discordSdk.commands.setOrientationLockState({
  lock_state: Common.OrientationLockStateTypeObject.PORTRAIT,
  picture_in_picture_lock_state: Common.OrientationLockStateTypeObject.LANDSCAPE,
  grid_lock_state: Common.OrientationLockStateTypeObject.LANDSCAPE,
});

```

