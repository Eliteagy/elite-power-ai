# Soundboard sound structure
Context: Discord developer reference: Soundboard sound structure
[Source](../../resources/polls-stage-instances-and-skus-index.md) / [Owning endpoint, event, object or procedure conditions](soundboard-sound-object.md) / [Following source section](soundboard-sound-object-sound-files.md)
<a id="source-soundboard-sound-object-1"></a> <a id="source-soundboard-sound-structure"></a> <a id="source-example-default-soundboard-sound"></a> <a id="source-example-guild-soundboard-sound"></a>

### Soundboard Sound Object

###### Soundboard Sound Structure

| Field | Type | Description |
| --- | --- | --- |
| name | string | the name of this sound |
| sound_id | snowflake | the id of this sound |
| volume | double | volume for this sound, from 0 to 1 |
| emoji_id | ?snowflake | custom emoji id for this sound |
| emoji_name | ?string | standard emoji unicode character for this sound |
| guild_id? | snowflake | guild id containing this sound |
| available | boolean | whether the sound is usable; can be false if Server Boosts are lost |
| user? | user object | user who created the sound |

###### Example Default Soundboard Sound

```
{
  "name": "quack",
  "sound_id": "1",
  "volume": 1.0,
  "emoji_id": null,
  "emoji_name": "🦆",
  "available": true
}

```

###### Example Guild Soundboard Sound

```
{
  "name": "Yay",
  "sound_id": "1106714396018884649",
  "volume": 1,
  "emoji_id": "989193655938064464",
  "emoji_name": null,
  "guild_id": "613425648685547541",
  "available": true
}

```

