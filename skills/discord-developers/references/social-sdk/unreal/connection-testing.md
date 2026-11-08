# Connection testing
Context: Discord developer reference: Connection testing
[Source](unreal-setup-and-authentication-index.md) / [Previous source section](what-s-happening-here.md) / [Following source section](connection-troubleshooting.md)
<a id="source-testing-it-out"></a>

### Testing It Out

 Save the Visual Studio changes and switch back to Unreal Editor. Compile with `Ctrl-Alt-F11`, enter play mode, and use the console at the bottom of Unreal Editor. Run `DiscordConnect` to start account linking.

```
DiscordConnect

```

 If Discord is running locally, an authorization prompt should appear. Click "Authorize". When authorization succeeds, the Unreal Editor console should show the success log emitted by the sample code. Do not call most Discord features until the client status is `Ready`; use the status callback as the readiness signal.

