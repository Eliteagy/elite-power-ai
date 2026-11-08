# Commands and events get guilds
Context: Discord developer reference: Commands and events get guilds
[Source](connection-and-command-contracts-index.md) / [Owning endpoint, event, object or procedure conditions](commands-and-events.md) / [Previous source section](commands-and-events-authenticate.md) / [Following source section](commands-and-events-get-guild.md)
<a id="source-get_guilds"></a> <a id="source-get-guilds-response-structure"></a> <a id="source-example-get-guilds-command-payload"></a> <a id="source-example-get-guilds-response-payload"></a>

#### GET_GUILDS

 Used for get a list of guilds the client is in.

###### Get Guilds Response Structure

| Field | Type | Description |
| --- | --- | --- |
| guilds | array of partial guild objects | Guilds the user account is in |

###### Example Get Guilds Command Payload

```
{
  "nonce": "e16fcbed-8bfa-4fd4-ba09-73b72e809833",
  "args": {},
  "cmd": "GET_GUILDS"
}

```

###### Example Get Guilds Response Payload

```
{
  "cmd": "GET_GUILDS",
  "data": {
    "guilds": [
      {
        "id": "199737254929760256",
        "name": "test"
      }
    ]
  },
  "nonce": "e16fcbed-8bfa-4fd4-ba09-73b72e809833"
}

```

