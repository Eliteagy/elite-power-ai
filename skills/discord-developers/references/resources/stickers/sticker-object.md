# Sticker object
Context: Discord developer reference: Sticker object
[Source](../stickers-and-subscriptions-index.md) / [Following source section](sticker-item-object.md)
<a id="source-sticker-subscription"></a> <a id="source-overview"></a> <a id="source-sticker-object"></a> <a id="source-sticker-object-1"></a> <a id="source-sticker-structure"></a> <a id="source-sticker-types"></a> <a id="source-sticker-format-types"></a> <a id="source-example-sticker"></a>

# Sticker, Subscription

> Discord Developers reference. Original prose; identifiers preserved verbatim.

## Overview

Covers: Sticker Object; Subscription Object.

## Sticker Object

### Sticker Object

 Describes a sticker that messages can include.

###### Sticker Structure

| Field | Type | Description |
| --- | --- | --- |
| id | snowflake | id of the sticker |
| pack_id? | snowflake | for standard stickers, the ID of the source pack |
| name | string | name of the sticker |
| description | ?string | description of the sticker |
| tags* | string | sticker autocomplete/suggestion tags (max 200 characters) |
| type | integer | type of sticker |
| format_type | integer | type of sticker format |
| available? | boolean | whether the guild sticker is currently usable; can be false after Server Boost loss |
| guild_id? | snowflake | ID of the guild that owns the sticker |
| user? | user object | user who uploaded the guild sticker |
| sort_value? | integer | sort position of the standard sticker inside its pack |

 * Standard stickers commonly store a comma-separated keyword list in this field, but that is a convention rather than a strict format. When the client creates or updates a guild sticker, it always fills this field with a name derived from an emoji.

###### Sticker Types

| Type | Value | Description |
| --- | --- | --- |
| STANDARD | 1 | official sticker included in a pack |
| GUILD | 2 | guild-uploaded sticker available to that guild's members |

###### Sticker Format Types

| Type | Value |
| --- | --- |
| PNG | 1 |
| APNG | 2 |
| LOTTIE | 3 |
| GIF | 4 |

###### Example Sticker

```
{
  "id": "749054660769218631",
  "name": "Wave",
  "tags": "wumpus, hello, sup, hi, oi, heyo, heya, yo, greetings, greet, welcome, wave, :wave, :hello, :hi, :hey, hey, \ud83d\udc4b, \ud83d\udc4b\ud83c\udffb, \ud83d\udc4b\ud83c\udffc, \ud83d\udc4b\ud83c\udffd, \ud83d\udc4b\ud83c\udffe, \ud83d\udc4b\ud83c\udfff, goodbye, bye, see ya, later, laterz, cya",
  "type": 1,
  "format_type": 3,
  "description": "Wumpus waves hello",
  "pack_id": "847199849233514549",
  "sort_value": 12
}

```

