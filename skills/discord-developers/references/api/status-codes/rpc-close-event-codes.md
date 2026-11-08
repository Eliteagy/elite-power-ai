# RPC close event codes
Context: Discord developer reference: RPC close event codes
[Source](rpc-close-events-index.md) / [Source](gateway-http-and-api-status-index.md) / [Owning endpoint, event, object or procedure conditions](rpc.md)
<a id="source-opcodes-and-status-codes-part-2"></a> <a id="source-rpc-close-event-codes"></a>

> Discord Developers reference. Original prose; identifiers preserved verbatim.

###### RPC Close Event Codes
| Code | Name | Description |
| --- | --- | --- |
| 4000 | Invalid client ID | The RPC server rejected the connection because the client ID was invalid. |
| 4001 | Invalid origin | The RPC server rejected the connection because the origin value was invalid. |
| 4002 | Rate limited | You are being rate limited. |
| 4003 | Token revoked | The OAuth2 token tied to this connection has been revoked; request a replacement token. |
| 4004 | Invalid version | The connection string named an RPC Server version that is not valid. |
| 4005 | Invalid encoding | The connection string specified an encoding value that is not valid. |
