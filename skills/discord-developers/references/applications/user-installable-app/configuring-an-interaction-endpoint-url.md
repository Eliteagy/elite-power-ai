# Configuring an interaction endpoint url
Context: Discord developer reference: Configuring an interaction endpoint url
[Source](developing-a-user-installable-app-index.md) / [Previous source section](set-up-a-public-endpoint.md) / [Following source section](understanding-metadata-for-interactions.md)
<a id="source-configuring-an-interaction-endpoint-url"></a>

### Configuring an interaction endpoint URL

 Configure the app's **Interaction Endpoint URL** in the [app's settings](https://discord.com/developers/applications). On the [**General Information** page](https://discord.com/developers/applications/select/information), under **Interaction Endpoint URL**, paste the ngrok URL and append `/interactions`, for example `https://84c5df474.ngrok-free.dev/interactions` (Discord should verify the endpoint if everything is running). Click **Save Changes**. If verification fails, confirm that ngrok and the app use the same port and that the ngrok URL was copied correctly.

