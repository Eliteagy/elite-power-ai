# Activity instance management instance participants
Context: Discord developer reference: Activity instance management instance participants
[Source](participants-avatars-and-lifecycle-index.md) / [Owning endpoint, event, object or procedure conditions](activity-instance-management.md) / [Previous source section](semantics-of-instance-id.md) / [Following source section](render-avatars-and-names.md)
<a id="source-instance-participants"></a>

### Instance Participants

 Instance Participants are Discord users currently connected to the same Application Instance. Apps can fetch this data or subscribe to changes.

```
import {DiscordSDK, Events, type Types} from '@discord/embedded-app-sdk';

const discordSdk = new DiscordSDK('...');
await discordSdk.ready();

// Fetch
const participants = await discordSdk.commands.getActivityInstanceConnectedParticipants();

// Subscribe
function updateParticipants(participants: Types.GetActivityInstanceConnectedParticipantsResponse) {
  // Do something really cool
}
discordSdk.subscribe(Events.ACTIVITY_INSTANCE_PARTICIPANTS_UPDATE, updateParticipants);
// Unsubscribe
discordSdk.unsubscribe(Events.ACTIVITY_INSTANCE_PARTICIPANTS_UPDATE, updateParticipants);

```

---

