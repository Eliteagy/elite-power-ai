# Channel object channel flags
Context: Discord developer reference: Channel object channel flags
[Source](channel-objects-and-settings-index.md) / [Owning endpoint, event, object or procedure conditions](channel-object.md) / [Following source section](example-guild-voice-channel.md)
<a id="source-channel-flags"></a> <a id="source-sort-order-types"></a> <a id="source-forum-layout-types"></a> <a id="source-example-guild-text-channel"></a> <a id="source-example-guild-announcement-channel"></a>

###### Channel Flags

| Flag | Value | Description |
| --- | --- | --- |
| PINNED | `1 << 1` | thread is pinned at the top of its parent `GUILD_FORUM` or `GUILD_MEDIA` channel |
| REQUIRE_TAG | `1 << 4` | whether creating a thread in a `GUILD_FORUM` or `GUILD_MEDIA` channel requires specifying a tag; tags are supplied through `applied_tags` |
| HIDE_MEDIA_DOWNLOAD_OPTIONS | `1 << 15` | hides embedded media download options when set; supported only for media channels |

###### Sort Order Types

| Flag | Value | Description |
| --- | --- | --- |
| LATEST_ACTIVITY | 0 | Sort forum posts by activity |
| CREATION_DATE | 1 | order forum posts by creation time, newest first |

###### Forum Layout Types

| Flag | Value | Description |
| --- | --- | --- |
| NOT_SET | 0 | forum channel has no configured default |
| LIST_VIEW | 1 | Display posts as a list |
| GALLERY_VIEW | 2 | show posts as tile-style collection |

###### Example Guild Text Channel

```
{
  "id": "41771983423143937",
  "guild_id": "41771983423143937",
  "name": "general",
  "type": 0,
  "position": 6,
  "permission_overwrites": [],
  "rate_limit_per_user": 2,
  "nsfw": true,
  "topic": "24/7 chat about how to gank Mike #2",
  "last_message_id": "155117677105512449",
  "parent_id": "399942396007890945",
  "default_auto_archive_duration": 60
}

```

###### Example Guild Announcement Channel

 Bots with the required permissions can post or publish messages in this channel type.

```
{
  "id": "41771983423143937",
  "guild_id": "41771983423143937",
  "name": "important-news",
  "type": 5,
  "position": 6,
  "permission_overwrites": [],
  "nsfw": true,
  "topic": "Rumors about Half Life 3",
  "last_message_id": "155117677105512449",
  "parent_id": "399942396007890945",
  "default_auto_archive_duration": 60
}

```

