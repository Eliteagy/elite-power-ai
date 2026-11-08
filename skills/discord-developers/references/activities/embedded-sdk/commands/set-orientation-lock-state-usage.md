# Set orientation lock state usage
Context: Discord developer reference: Set orientation lock state usage
[Source](../methods-commands-and-events-index.md) / [Owning endpoint, event, object or procedure conditions](set-orientation-lock-state.md) / [Previous source section](set-orientation-lock-state-required-scopes.md) / [Following source section](share-link.md)
<a id="source-signature-21"></a> <a id="source-usage-19"></a>

#### Signature

#### Usage

```
import {Common} from '@discord/embedded-app-sdk';

await discordSdk.commands.setOrientationLockState({
  lock_state: Common.OrientationLockStateTypeObject.LANDSCAPE,
  picture_in_picture_lock_state: Common.OrientationLockStateTypeObject.LANDSCAPE,
  grid_lock_state: Common.OrientationLockStateTypeObject.UNLOCKED
});

```

---

