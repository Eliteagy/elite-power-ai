# Auto moderation rule structure
Context: Discord developer reference: Auto moderation rule structure
[Source](auto-moderation-index.md) / [Previous source section](auto-moderation.md) / [Following source section](trigger-metadata-field-limits.md)
<a id="source-auto-moderation-rule-object"></a> <a id="source-auto-moderation-rule-structure"></a> <a id="source-example-auto-moderation-rule"></a> <a id="source-trigger-types"></a> <a id="source-trigger-metadata"></a>

### Auto Moderation Rule Object

###### Auto Moderation Rule Structure

| Field | Type | Description |
| --- | --- | --- |
| id | snowflake | the id of this rule |
| guild_id | snowflake | id of the guild that owns this rule |
| name | string | the rule name |
| creator_id | snowflake | user who originally created the rule |
| event_type | integer | the rule event type |
| trigger_type | integer | the rule trigger type |
| trigger_metadata | object | the rule trigger metadata |
| actions | array of action objects | actions to run when the rule triggers |
| enabled | boolean | whether the rule is enabled |
| exempt_roles | array of snowflakes | role ids exempt from the rule, maximum 20 |
| exempt_channels | array of snowflakes | channel ids exempt from the rule, maximum 50 |

###### Example Auto Moderation Rule

```
{
  "id": "969707018069872670",
  "guild_id": "613425648685547541",
  "name": "Keyword Filter 1",
  "creator_id": "423457898095789043",
  "trigger_type": 1,
  "event_type": 1,
  "actions": [
    {
      "type": 1,
      "metadata": { "custom_message": "Please keep financial discussions limited to the #finance channel" }
    },
    {
      "type": 2,
      "metadata": { "channel_id": "123456789123456789" }
    },
    {
      "type": 3,
      "metadata": { "duration_seconds": 60 }
    }
  ],
  "trigger_metadata": {
    "keyword_filter": ["cat*", "*dog", "*ana*", "i like c++"],
    "regex_patterns": ["(b|c)at", "^(?:[0-9]{1,3}\\.){3}[0-9]{1,3}$"]
  },
  "enabled": true,
  "exempt_roles": ["323456789123456789", "423456789123456789"],
  "exempt_channels": ["523456789123456789"]
}

```

###### Trigger Types

 Describes which content category can cause the rule to trigger.
| Trigger Type | Value | Description | Max per Guild |
| --- | --- | --- | --- |
| KEYWORD | 1 | checks whether content includes words from a user-defined keyword list | 6 |
| SPAM | 3 | checks whether content is generic spam | 1 |
| KEYWORD_PRESET | 4 | checks whether content includes words from Discord's internal pre-defined wordsets | 1 |
| MENTION_SPAM | 5 | checks whether content exceeds the allowed number of unique mentions | 1 |
| MEMBER_PROFILE | 6 | checks whether a member profile includes words from a user-defined keyword list | 1 |

###### Trigger Metadata

 Extra data used to decide whether a rule triggers. The applicable fields depend on [trigger_type](https://docs.discord.com/developers/resources/auto-moderation#auto-moderation-rule-object-trigger-types).
| Field | Type | Associated Trigger Types | Description |
| --- | --- | --- | --- |
| keyword_filter | array of strings * | KEYWORD, MEMBER_PROFILE | substrings searched for in content, maximum 1000 |
| regex_patterns | array of strings ** | KEYWORD, MEMBER_PROFILE | regular expression patterns matched against content, maximum 10 |
| presets | array of keyword preset types | KEYWORD_PRESET | internal pre-defined wordsets searched for in content |
| allow_list | array of strings *** | KEYWORD, KEYWORD_PRESET, MEMBER_PROFILE | substrings that should be ignored and not trigger the rule, maximum 100 or 1000 |
| mention_total_limit | integer | MENTION_SPAM | maximum total unique role and user mentions allowed in one message, up to 50 |
| mention_raid_protection_enabled | boolean | MENTION_SPAM | whether mention raid detection is automatic |

 * A keyword may be a multi-word phrase. [Wildcard symbols](https://docs.discord.com/developers/resources/auto-moderation#auto-moderation-rule-object-keyword-matching-strategies) control how each keyword is matched. Each keyword is limited to 60 characters. ** Only Rust flavored regex is supported at this time; tools such as [Rustexp](https://rustexp.lpil.uk/) can test patterns. Each regex pattern is limited to 260 characters. *** Each `allow_list` keyword may also be a multi-word phrase. [Wildcard symbols](https://docs.discord.com/developers/resources/auto-moderation#auto-moderation-rule-object-keyword-matching-strategies) control matching. Rules with `KEYWORD` [trigger_type](https://docs.discord.com/developers/resources/auto-moderation#auto-moderation-rule-object-trigger-types) accept up to 100 keywords. Rules with `KEYWORD_PRESET` [trigger_type](https://docs.discord.com/developers/resources/auto-moderation#auto-moderation-rule-object-trigger-types) accept up to 1000 keywords.

