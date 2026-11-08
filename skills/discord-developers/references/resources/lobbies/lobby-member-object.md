# Lobby member object
Context: Discord developer reference: Lobby member object
[Source](../invites-and-lobbies-index.md) / [Owning endpoint, event, object or procedure conditions](lobby-object.md) / [Following source section](lobby-object-create-lobby.md)
<a id="source-lobby-member-object"></a> <a id="source-lobby-member-structure"></a> <a id="source-lobby-member-flags"></a> <a id="source-example-lobby-object"></a>

### Lobby Member Object

 Represents a lobby member, including optional metadata and flags.

###### Lobby Member Structure

| Field | Type | Description |
| --- | --- | --- |
| id | snowflake | the id of the user |
| metadata? | ?dict<string, string> | string key/value dictionary; maximum combined length 1000. |
| flags? | integer | lobby member flags represented as a combined bitfield |

###### Lobby Member Flags

| Flag | Value | Description |
| --- | --- | --- |
| CanLinkLobby | `1<<0` | user has permission to link a lobby text channel |

###### Example Lobby Object

```
{
  "id": "96008815106887111",
  "application_id": "41771983429993937",
  "metadata": {
    "topic": "we need more redstone"
  },
  "members": [
    {
      "id": "41771983429993000",
      "metadata": null,
      "flags": 1
    }
  ]
}

```

