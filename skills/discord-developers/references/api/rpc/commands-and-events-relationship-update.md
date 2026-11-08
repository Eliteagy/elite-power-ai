# Commands and events relationship update
Context: Discord developer reference: Commands and events relationship update
[Source](voice-settings-and-dispatch-events-index.md) / [Source](relationship-and-entitlement-events-index.md) / [Owning endpoint, event, object or procedure conditions](commands-and-events.md) / [Previous source section](current-user-update.md) / [Previous source section](relationship-update-dispatch-data-structure.md)
<a id="source-relationship_update"></a>

#### RELATIONSHIP_UPDATE
Takes no arguments. Requires the `relationships_read` [OAuth2 scope](https://docs.discord.com/developers/topics/oauth2#shared-resources-oauth2-scopes). Discord sends this event when a relationship is created, changed, such as a presence update, or deleted. If the relationship was deleted, `type` is `0` (`NONE`).

