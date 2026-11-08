# Setting up the embedded app SDK
Context: Discord developer reference: Setting up the embedded app SDK
[Source](project-and-authentication-index.md) / [Previous source section](fetch-your-oauth2-credentials.md) / [Following source section](install-the-sdk.md)
<a id="source-step-3-setting-up-the-embedded-app-sdk"></a>

### Step 3: Setting Up the Embedded App SDK

 After setting up the project and app, install and configure the [Embedded App SDK](https://docs.discord.com/developers/developer-tools/embedded-app-sdk), which the rest of the guide uses heavily. The Embedded App SDK is Discord's first-party bridge between the Activity and the Discord client. It provides [commands](https://docs.discord.com/developers/developer-tools/embedded-app-sdk#sdk-commands) for client interactions, such as fetching channel information, and [events](https://docs.discord.com/developers/developer-tools/embedded-app-sdk#sdk-events) for reacting to user actions or state changes, such as speaking status. The Embedded App SDK command and event set is a subset of the [RPC API](https://docs.discord.com/developers/topics/rpc), so RPC docs help explain the lower-level Activity behavior.

