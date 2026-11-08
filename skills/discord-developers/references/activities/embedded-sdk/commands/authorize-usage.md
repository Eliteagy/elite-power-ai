# Authorize usage
Context: Discord developer reference: Authorize usage
[Source](../methods-commands-and-events-index.md) / [Owning endpoint, event, object or procedure conditions](authorize.md) / [Previous source section](authorize-required-scopes.md) / [Following source section](capture-log.md)
<a id="source-signature-5"></a> <a id="source-usage-3"></a>

#### Signature

#### Usage

```
await discordSdk.commands.authorize({
  client_id: DISCORD_CLIENT_ID,
  response_type: "code",
  state: "",
  prompt: "none",
  scope: [
    // "applications.builds.upload",
    // "applications.builds.read",
    // "applications.store.update",
    // "applications.entitlements",
    // "bot",
    "identify",
    // "connections",
    // "email",
    // "gdm.join",
    "guilds",
    // "guilds.join",
    // "guilds.members.read",
    // "messages.read",
    // "relationships.read",
    // 'rpc.activities.write',
    // "rpc.notifications.read",
    // "rpc.voice.write",
    // "rpc.voice.read",
    // "webhook.incoming",
  ],
});

```

---

