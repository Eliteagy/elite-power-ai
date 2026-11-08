# Configuring default orientation lock state through the developer portal
Context: Discord developer reference: Configuring default orientation lock state through the developer portal
[Source](local-development-and-assets-index.md) / [Owning endpoint, event, object or procedure conditions](locking-application-orientation.md) / [Following source section](subscribing-to-screen-orientation-updates.md)
<a id="source-configuring-default-orientation-lock-state-through-the-developer-portal"></a>

#### Configuring Default Orientation Lock State Through the Developer Portal

 You can configure a default orientation lock state for an application in the Developer Portal. With this setting, the Discord app applies the orientation lock while launching the application, before the SDK initializes. That can make startup smoother because the app opens in the correct orientation instead of switching after an SDK orientation-lock request. The Developer Portal supports different default orientation lock states for phones and tablets. (Figure: default-orientation-lock-state)

