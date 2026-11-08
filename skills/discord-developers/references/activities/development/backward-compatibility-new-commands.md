# Backward compatibility new commands
Context: Discord developer reference: Backward compatibility new commands
[Source](participants-avatars-and-lifecycle-index.md) / [Owning endpoint, event, object or procedure conditions](cache-busting.md) / [Previous source section](static-ip-addresses.md)
<a id="source-backward-compatibility"></a> <a id="source-new-commands"></a>

### Backward Compatibility

#### New Commands

 When the embedded-app-sdk adds commands, older Discord app versions may not support them. If an application calls a new command against an older Discord client, Discord responds with `INVALID_COMMAND`, which the application can handle like this:

```
try {
  const {permissions} = await discordSdk.commands.getChannelPermissions();

  // check permissions
  ...
} catch (error) {
  if (error.code == RPCErrorCodes.INVALID_COMMAND) {
    // This is an expected error. The Discord client doesn't support this command
    ...
  } else {
    // Unexpected error
    ...
  }
}

```
