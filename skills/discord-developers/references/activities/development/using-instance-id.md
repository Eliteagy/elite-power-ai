# Using instance id
Context: Discord developer reference: Using instance id
[Source](participants-avatars-and-lifecycle-index.md) / [Owning endpoint, event, object or procedure conditions](activity-instance-management.md) / [Following source section](semantics-of-instance-id.md)
<a id="source-using-instanceid"></a>

#### Using instanceId

 The `instanceId` property is available immediately after SDK construction; the SDK does not need to receive a `ready` payload from the Discord client first.

```
import {DiscordSDK} from '@discord/embedded-app-sdk';
const discordSdk = new DiscordSDK(clientId);
// available immediately
const instanceId = discordSdk.instanceId;

```

 Use `instanceId` as the key for storing and retrieving the shared data for an application instance. That makes everyone in the same instance see the same data.

