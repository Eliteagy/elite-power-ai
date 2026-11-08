# Launching activities activity lifecycle
Context: Discord developer reference: Launching activities activity lifecycle
[Source](activities-index.md) / [Owning endpoint, event, object or procedure conditions](launching-activities.md) / [Previous source section](designed-for-single-page-apps-spas.md) / [Following source section](sample-code-and-activity-lifecycle-diagram.md)
<a id="source-activity-lifecycle"></a>

### Activity Lifecycle

1. **Initialization:** When Discord loads the iframe, its URL includes unique query parameters. The application can identify those parameters with the Discord SDK.
2. **Handshake Process:** Creating the SDK instance starts a handshake with the Discord client. After connection, the iframe receives `[FRAME, {evt: 'READY', ...}]`. The SDK instance's `ready()` method resolves after the connection succeeds.
3. **Authorization and Authentication:** After the `READY` payload arrives, the application should run authorization and authentication to obtain the required permissions or scopes. This is necessary before using features or scopes such as `rpc.activities.write`.
4. **Interacting with Discord Client:** Once authenticated, the application may subscribe to events and send commands to the Discord client. Commands or event subscriptions outside the granted scope return errors. Adding scopes can cause an OAuth modal to ask the user to confirm permission again.
5. **Disconnection and Errors:** A `[CLOSE, {message: string, code: number}]` message means the connection process encountered an error or must be restarted.
6. **Sending Errors or Close Requests:** To report an error or ask the Discord client to close, send `[CLOSE, {message?: string, code: number}]`. Codes other than CLOSE_NORMAL show the message to the user; CLOSE_NORMAL closes silently.

