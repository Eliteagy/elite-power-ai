# Bulk update lobby members
Context: Discord developer reference: Bulk update lobby members
[Source](../invites-and-lobbies-index.md) / [Owning endpoint, event, object or procedure conditions](lobby-object.md) / [Previous source section](add-a-member-to-a-lobby-parameters.md) / [Following source section](bulk-update-lobby-members-parameters.md)
<a id="source-bulk-update-lobby-members"></a>

### Bulk Update Lobby Members

  In one request, add, update, or remove up to 25 members from a lobby. A member with `remove_member: false` uses the default upsert behavior: add when absent, or update metadata and flags when present. A member with `remove_member: true` is removed. The response includes [lobby member](https://docs.discord.com/developers/resources/lobby#lobby-member-object) objects for upserts only and omits removed members. Unknown Discord users produce 404 UNKNOWN_USER. Permission failures, or users at the per-application lobby maximum who are not already in this lobby, are silently left out of the upsert results.

