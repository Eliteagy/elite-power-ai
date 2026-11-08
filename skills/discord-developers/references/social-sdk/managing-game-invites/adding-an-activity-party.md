# Adding an activity party
Context: Discord developer reference: Adding an activity party
[Source](managing-game-invites-index.md) / [Previous source section](setting-up-rich-presence.md) / [Following source section](adding-join-secret-supported-platforms.md)
<a id="source-adding-an-activity-party"></a>

### Adding an Activity Party

```
// rest of the code

// Create discordpp::ActivityParty
discordpp::ActivityParty party;
party.SetId("party1234");
// current party size
party.SetCurrentSize(1);
// max party size
party.SetMaxSize(5);
// Set the party information in the Activity, to inform the invite about the party size and how many players can join
activity.SetParty(party);

// Update Rich Presence
// Still not enough for invites - we need the join secret!

```

 After this change, the Discord client shows "In Competitive Match" on "Valhalla" with party details. Add the join secret next so the game can send and receive game invites.

