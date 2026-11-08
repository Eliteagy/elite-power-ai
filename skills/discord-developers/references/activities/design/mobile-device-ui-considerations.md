# Mobile device ui considerations
Context: Discord developer reference: Mobile device ui considerations
[Source](design-patterns-index.md) / [Previous source section](validate-activity-controls.md) / [Following source section](desktop-accessibility-guidelines.md)
<a id="source-mobile-device-ui-considerations"></a>

### Mobile Device UI Considerations

- Check for devices with top notches or corner cameras that could cover or cut off UI elements and buttons, making them impossible to tap.
- Account for curved Android screen edges that may hide elements or make buttons unreachable.
- Consider iOS/Android swipe gestures that can conflict with buttons or UI at the bottom of the screen.
- Ensure Android back buttons do not overlap lower-screen elements or buttons in a way that prevents taps.
- Honor the platform safe area so content and buttons are not clipped or disabled.

