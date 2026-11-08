# Setting party and join secret
Context: Discord developer reference: Setting party and join secret
[Source](setting-rich-presence-index.md) / [Previous source section](configuring-status-text.md) / [Following source section](setting-supported-platforms.md)
<a id="source-setting-party-and-join-secret"></a>

### Setting Party and Join Secret

 Rich Presence can also carry party information and a join secret for Game Invites. See the [Game Invites guide](https://docs.discord.com/developers/discord-social-sdk/development-guides/managing-game-invites) for details.

```

// Setting Party Details
discordpp::ActivityParty party;
party.SetId("party1234");
party.SetCurrentSize(1);
party.SetMaxSize(5);
activity.SetParty(party);

// Setting Join Secret details
discordpp::ActivitySecrets secrets;
secrets.SetJoin("your-join-secret");
activity.SetSecrets(secrets);

```

---

