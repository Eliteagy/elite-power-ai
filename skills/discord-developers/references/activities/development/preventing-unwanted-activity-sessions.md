# Preventing unwanted activity sessions
[Source](local-development-and-assets-index.md) / [Owning endpoint, event, object or procedure conditions](local-development.md) / [Previous source section](render-avatars-and-names.md) / [Following source section](prompting-users-to-share-incentivized-links.md)

<a id="source-preventing-unwanted-activity-sessions"></a>

### Preventing Unwanted Activity Sessions

Validate that activity sessions come through a Discord client before adding them to an instance's session.

<a id="source-preventing-unwanted-activity-sessions"></a>

### Preventing unwanted activity sessions

 Activities run inside iframes in the Discord app. The activity site is also publicly reachable at `<application_id>.discordsays.com`. Activities expect to communicate with Discord's web or mobile client through the Discord SDK's RPC protocol. If someone opens the activity website in a normal browser, no Discord RPC server is present, so the activity will usually fail. A malicious client could theoretically fake Discord's RPC protocol or load one activity site while launching another. Since the activity is loaded inside Discord, the RPC protocol is available and the activity may not detect the mismatch.
