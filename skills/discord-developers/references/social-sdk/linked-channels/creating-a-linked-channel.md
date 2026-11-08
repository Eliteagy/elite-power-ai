# Creating a linked channel
Context: Discord developer reference: Creating a linked channel
[Source](linked-channels-index.md) / [Previous source section](lobby-requirements.md) / [Following source section](fetch-available-servers-guilds-and-channels.md)
<a id="source-creating-a-linked-channel"></a>

### Creating a Linked Channel

 Linking is completed inside the game; the player is not sent to Discord to configure it. At a high level, fetch the servers, also called guilds, and channels available to the user, present UI for selecting a channel, then save that choice back to Discord.

