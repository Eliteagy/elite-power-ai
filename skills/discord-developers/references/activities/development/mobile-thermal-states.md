# Mobile thermal states
[Source](local-development-and-assets-index.md) / [Owning endpoint, event, object or procedure conditions](local-development.md) / [Previous source section](mobile-safe-areas.md) / [Following source section](local-development-application-orientation.md)

<a id="source-mobile-thermal-states"></a>

### Mobile Thermal States

Handle thermal state changes reported by iOS and Android.

<a id="source-mobile-thermal-states"></a>

### Mobile Thermal States

 To improve the user experience, applications may need to react to thermal state changes using guidance from [thermal states surfaced by mobile devices](https://developer.apple.com/library/archive/documentation/Performance/Conceptual/power_efficiency_guidelines_osx/RespondToThermalStateChanges.html). Discord's Embedded App SDK provides a shared layer over [Apple's thermal state APIs](https://developer.apple.com/library/archive/documentation/Performance/Conceptual/power_efficiency_guidelines_osx/RespondToThermalStateChanges.html) and [Android's thermal state APIs](https://source.android.com/docs/core/power/thermal-mitigation#thermal-api). The mapping below shows how Discord's abstraction corresponds to Apple and Android thermal states.

```
enum ThermalState {
  NOMINAL = 0, // maps to "nominal" on iOS and "none" on Android
  FAIR = 1, // maps to "fair" on iOS and "light" / "moderate" on Android
  SERIOUS = 2, // maps to "serious" on iOS and "severe" on Android
  CRITICAL = 3, // maps to "critical" on iOS and "critical" / "emergency" / "shutdown" on Android
}

```

 Developers can subscribe to thermal state updates through the Embedded App SDK.

```
const handleThermalStateUpdate = (update: {thermal_state: number}) => {
  switch (update.thermal_state) {
      case Common.ThermalStateTypeObject.NOMINAL:
        ...
      case Common.ThermalStateTypeObject.FAIR:
        ...
      case Common.ThermalStateTypeObject.SERIOUS:
        ...
      case Common.ThermalStateTypeObject.CRITICAL:
        ...
      default:
        ...
    }
}

discordSdk.subscribe('THERMAL_STATE_UPDATE', handleThermalStateUpdate);

```

 When an event subscription is created, Discord publishes the current thermal state and then publishes later changes as they occur. Android thermal state updates are available only on Android 10 and newer.
