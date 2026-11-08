# Enforced Nonces on Create Message Endpoint

Date: 2024-02-12
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L3041) · [Year index](INDEX.md)

<a id="source-enforced-nonces-on-create-message-endpoint"></a>


[Create message](https://docs.discord.com/developers/resources/message#create-message) now supports `enforce_nonce`. When true, Discord deduplicates messages from the same sender within a few minutes. If the same nonce already produced a message, Discord returns that message instead of creating a new one. A future API version will make this behavior the default.
