# Preparing to resume
Context: Discord developer reference: Preparing to resume
[Source](connection-lifecycle-index.md) / [Owning endpoint, event, object or procedure conditions](resuming.md) / [Following source section](gateway-intents.md)
<a id="source-preparing-to-resume"></a> <a id="source-example-gateway-resume-event"></a>

#### Preparing to Resume

 To send [Resume (opcode `6`)](https://docs.discord.com/developers/events/gateway-events#resume), the app needs three values: `session_id`, `resume_gateway_url` from [Ready](https://docs.discord.com/developers/events/gateway#ready-event), and the sequence number (`s`) from the most recent Dispatch (opcode `0`) event received before disconnect. After the old connection closes, open a new connection using `resume_gateway_url`, not the original connection URL, while keeping the same query parameters from the initial [Connection](https://docs.discord.com/developers/events/gateway#connecting). Apps that ignore `resume_gateway_url` see more disconnects than normal. After the new connection opens, send [Gateway Resume](https://docs.discord.com/developers/events/gateway-events#resume) with `session_id` and the last sequence number. The `session_id` field name stays the same, while the last sequence number is sent as `seq` inside the data object (`d`). Do not send Identify after opening a Resume connection. If Resume works, the Gateway replays missed events in order and ends with [Resumed](https://docs.discord.com/developers/events/gateway-events#resumed), meaning replay is complete and later events are new. When using `resume_gateway_url`, supply the same version and encoding as the first connection. If the app does not reconnect quickly enough to Resume, it may receive [Invalid Session (opcode `9`)](https://docs.discord.com/developers/events/gateway-events#invalid-session). If `d` is `false`, which is the usual case, the app should disconnect. Then it should open a new connection with the cached URL from [Get Gateway](https://docs.discord.com/developers/events/gateway#get-gateway) or [Get Gateway Bot](https://docs.discord.com/developers/events/gateway#get-gateway-bot), and send [Identify (opcode `2`)](https://docs.discord.com/developers/events/gateway-events#identify).

###### Example Gateway Resume Event

```
{
  "op": 6,
  "d": {
    "token": "my_token",
    "session_id": "session_id_i_stored",
    "seq": 1337
  }
}

```

