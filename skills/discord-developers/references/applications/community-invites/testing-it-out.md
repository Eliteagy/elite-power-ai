# Testing it out
[Source](using-community-invites-index.md) / [Previous source section](what-s-happening.md) / [Following source section](target-users-example-creating-targeted-supporter-invites.md)

<a id="source-testing-it-out"></a>

### Testing It Out

 1Create a **Player** role in your Discord server2Right click the role and choose **"Copy Role ID"**, then paste it into `ROLE_ID` in the script3Right click the invite channel and choose **"Copy Channel ID"**, then paste it into `CHANNEL_ID` in the script4Paste your bot token into `BOT_TOKEN` in the script5Run the code to create an invite code6Share the `discord.gg/...` link with a test account7When the invite is accepted, the **Player** role is granted automatically! (Figure: Example of an invite granting a Player role)

---

<a id="source-testing-it-out-1"></a>

### Testing It Out

 1Create a **Supporter** role in your Discord server2Right click the role and choose **"Copy Role ID"**, then paste it into `SUPPORTER_ROLE_ID` in the script3Right click the invite channel and choose **"Copy Channel ID"**, then paste it into `SUPPORTER_CHANNEL_ID` in the script4Paste your bot token into `BOT_TOKEN` in the script5Right click each allowed user and choose **"Copy User ID"**, then add those IDs to `activeSupporterIds` in the script6Run the code to create an invite code7Share the `discord.gg/...` link with one user in `activeSupporterIds` and one outside that set t8The allowed `activeSupporterIds` users can accept the invite and receive the **Supporter** role! (Figure: Example of an invite granting a Supporter role) (Figure: Example of an invite that can't be accepted)

---
