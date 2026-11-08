# RPC
Context: Discord developer reference: RPC
[Source](gateway-http-and-api-status-index.md) / [Previous source section](example-json-error-response.md) / [Following source section](rpc-close-event-codes.md)
<a id="source-rpc"></a> <a id="source-rpc-error-codes"></a>

### RPC

 RPC is the [local Discord server](https://docs.discord.com/developers/topics/rpc) that runs on localhost. Discord approval is required before accessing the RPC server.

###### RPC Error Codes

| Code | Name | Description |
| --- | --- | --- |
| 1000 | Unknown error | An unknown error occurred. |
| 4000 | Invalid payload | You sent an invalid payload. |
| 4002 | Invalid command | Invalid command name specified. |
| 4003 | Invalid guild | Invalid guild ID specified. |
| 4004 | Invalid event | Invalid event name specified. |
| 4005 | Invalid channel | Invalid channel ID specified. |
| 4006 | Invalid permissions | Required permissions for the resource are missing. |
| 4007 | Invalid client ID | Authorization or authentication used an invalid OAuth2 application ID. |
| 4008 | Invalid origin | Authorization or authentication used an invalid OAuth2 application origin. |
| 4009 | Invalid token | Authorization or authentication used an invalid OAuth2 token. |
| 4010 | Invalid user | The supplied user ID is invalid. |
| 5000 | OAuth2 error | A standard OAuth2 error occurred; inspect the data object for OAuth2 error details. |
| 5001 | Select channel timed out | An asynchronous `SELECT_TEXT_CHANNEL`/`SELECT_VOICE_CHANNEL` command timed out. |
| 5002 | `GET_GUILD` timed out | An asynchronous `GET_GUILD` command timed out. |
| 5003 | Select voice force required | The request attempted to join a user to a voice channel while that user was already in one. |
| 5004 | Capture shortcut already listening | The request attempted to capture more than one shortcut key at the same time. |

