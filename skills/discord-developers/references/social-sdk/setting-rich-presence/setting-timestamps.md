# Setting timestamps
Context: Discord developer reference: Setting timestamps
[Source](setting-rich-presence-index.md) / [Previous source section](setting-the-application-name.md) / [Following source section](setting-assets.md)
<a id="source-setting-timestamps"></a>

### Setting Timestamps

 Rich Presence can include timestamps for elapsed time in the current activity or remaining time in a timed match. Example:

```
// Setting Timestamps
discordpp::ActivityTimestamps timestamps;
timestamps.SetStart(time(nullptr));
// timestamps.SetEnd(time(nullptr) + 3600);
activity.SetTimestamps(timestamps);

```

---

