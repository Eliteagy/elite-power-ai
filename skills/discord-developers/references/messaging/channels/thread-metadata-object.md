# Thread metadata object
Context: Discord developer reference: Thread metadata object
[Source](channel-objects-and-settings-index.md) / [Previous source section](overwrite-object.md) / [Following source section](thread-member-object.md)
<a id="source-thread-metadata-object"></a> <a id="source-thread-metadata-structure"></a>

### Thread Metadata Object

 The thread metadata object holds channel fields that apply only to threads.

###### Thread Metadata Structure

| Field | Type | Description |
| --- | --- | --- |
| archived | boolean | whether the thread is archived |
| auto_archive_duration | integer | after `auto_archive_duration` minutes with no activity, the thread stops appearing in the channel list; supported values are 60, 1440, 4320, 10080 |
| archive_timestamp | ISO8601 timestamp | timestamp of the most recent archive status change, used to calculate recent activity |
| locked | boolean | whether the thread is locked; locked threads can be unarchived only by users with MANAGE_THREADS |
| invitable? | boolean | whether non-moderators may add other non-moderators to the thread; available only for private threads |
| create_timestamp? | ?ISO8601 timestamp | thread creation timestamp; populated only for threads created after 2022-01-09 |

