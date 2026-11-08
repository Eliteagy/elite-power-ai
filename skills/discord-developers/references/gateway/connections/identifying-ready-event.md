# Identifying ready event
Context: Discord developer reference: Identifying ready event
[Source](connection-lifecycle-index.md) / [Owning endpoint, event, object or procedure conditions](identifying.md) / [Following source section](disconnecting.md)
<a id="source-ready-event"></a>

#### Ready event

 After a valid Identify payload, Discord sends [Ready](https://docs.discord.com/developers/events/gateway-events#ready) to the app. Ready includes state such as the guilds the app belongs to, which lets the app begin interacting with the platform. It also includes fields that must be cached for later [Resume](https://docs.discord.com/developers/events/gateway#resuming) attempts. Two fields are especially important:
- `resume_gateway_url` is the WebSocket URL to use for Resume after a disconnect. Use `resume_gateway_url` instead of the URL [used when connecting](https://docs.discord.com/developers/events/gateway#connecting).
- `session_id` identifies the Gateway session for the new connection. It is needed to know which event stream was tied to the disconnected connection.
 The [Gateway events documentation](https://docs.discord.com/developers/events/gateway-events) contains the complete Ready event details.

