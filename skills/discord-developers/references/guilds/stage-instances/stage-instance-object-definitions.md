# Stage instance object definitions
Context: Discord developer reference: Stage instance object definitions
[Source](../../resources/polls-stage-instances-and-skus-index.md) / [Owning endpoint, event, object or procedure conditions](stage-instance-object.md) / [Previous source section](stage-instance-structure.md) / [Following source section](stage-instance-object-auto-closing.md)
<a id="source-definitions"></a>

### Definitions

 These terms describe stage behavior.
- **Liveness:** A Stage channel is *live* when a stage instance exists for it. It is *not live* when no stage instance exists.
- **Speakers:** A Stage participant is a *speaker* when the participant's [voice state](https://docs.discord.com/developers/resources/voice#voice-state-object) is not `suppress`ed and does not include `request_to_speak_timestamp`.
- **Moderators**: A guild member is a Stage channel *moderator* when they have all of these [permissions](https://docs.discord.com/developers/topics/permissions):
  - `MANAGE_CHANNELS`
  - `MUTE_MEMBERS`
  - `MOVE_MEMBERS`

- **Topic**: The short description shown below the channel's name and in related surfaces.
- **Public**: `privacy_level` set to `PUBLIC` makes the Stage instance public. During that state:
  - Users in that Stage may have it appear in their [activities](https://docs.discord.com/developers/events/gateway-events#presence).
  - Stage channel [Invites](https://docs.discord.com/developers/resources/invite#invite-object) include the `stage_instance` field.

