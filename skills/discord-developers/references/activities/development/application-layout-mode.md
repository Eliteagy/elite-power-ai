# Application layout mode
[Source](local-development-and-assets-index.md) / [Owning endpoint, event, object or procedure conditions](local-development.md) / [Previous source section](local-development-application-orientation.md) / [Following source section](activity-proxy-considerations.md)

<a id="source-application-layout-mode"></a>

### Application Layout Mode

Subscribe to layout mode updates so your application's user interface can adapt.

<a id="source-application-layout-mode-1"></a>

### Application Layout Mode

 An application can use three layout modes: focused, picture-in-picture (PIP), or grid mode. Activities can subscribe to layout mode updates and adjust their layouts for each mode. Older Discord clients support only `ACTIVITY_PIP_MODE_UPDATE`, while newer clients support both `ACTIVITY_PIP_MODE_UPDATE` and `ACTIVITY_LAYOUT_MODE_UPDATE`. Use `subscribeToLayoutModeUpdatesCompat` and `unsubscribeFromLayoutModeUpdatesCompat` to subscribe to both events while staying compatible with older clients that only support `ACTIVITY_PIP_MODE_UPDATE`. Example using React:

```
export default function LayoutMode() {
  const handleLayoutModeUpdate = React.useCallback((update: {layout_mode: number}) => {
       ...
  }, []);

  React.useEffect(() => {
    discordSdk.subscribeToLayoutModeUpdatesCompat(handleLayoutModeUpdate);
    return () => {
      discordSdk.unsubscribeFromLayoutModeUpdatesCompat(handleLayoutModeUpdate);
    };
  }, [handleLayoutModeUpdate]);
}

```
