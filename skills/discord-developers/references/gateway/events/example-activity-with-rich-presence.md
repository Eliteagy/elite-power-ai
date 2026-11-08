# Example activity with rich presence
Context: Discord developer reference: Example activity with rich presence
[Source](reaction-presence-and-user-events-index.md) / [Owning endpoint, event, object or procedure conditions](presence-presence-update.md) / [Owning endpoint, event, object or procedure conditions](activity-object-activity-structure.md) / [Previous source section](activity-object-activity-assets.md) / [Following source section](presence-typing-start.md)
<a id="source-example-activity-with-rich-presence"></a>

###### Example Activity with Rich Presence

```
{
  "name": "Rocket League",
  "type": 0,
  "application_id": "379286085710381999",
  "state": "In a Match",
  "details": "Ranked Duos: 2-1",
  "timestamps": {
    "start": 15112000660000
  },
  "party": {
    "id": "9dd6594e-81b3-49f6-a6b5-a679e6a060d3",
    "size": [2, 2]
  },
  "assets": {
    "large_image": "351371005538729000",
    "large_text": "DFH Stadium",
    "small_image": "351371005538729111",
    "small_text": "Silver III"
  },
  "secrets": {
    "join": "025ed05c71f639de8bfaa0d679d7c94b2fdce12f",
    "spectate": "e7eb30d2ee025ed05c71ea495f770b76454ee4e0",
    "match": "4b2fdce12f639de8bfa7e3591b71a0d679d7c93f"
  }
}

```

 A client can change its game status no more than 5 times in 20 seconds.

