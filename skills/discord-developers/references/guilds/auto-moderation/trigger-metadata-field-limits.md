# Trigger metadata field limits
Context: Discord developer reference: Trigger metadata field limits
[Source](auto-moderation-index.md) / [Owning endpoint, event, object or procedure conditions](auto-moderation-rule-structure.md) / [Following source section](auto-moderation-action-object.md)
<a id="source-trigger-metadata-field-limits"></a> <a id="source-keyword-preset-types"></a> <a id="source-event-types"></a> <a id="source-keyword-matching-strategies"></a>

###### Trigger Metadata Field Limits

| Field | Trigger Types | MAX ARRAY LENGTH | MAX CHARACTERS PER STRING |
| --- | --- | --- | --- |
| keyword_filter | KEYWORD, MEMBER_PROFILE | 1000 | 60 |
| regex_patterns | KEYWORD, MEMBER_PROFILE | 10 | 260 |
| allow_list | KEYWORD, MEMBER_PROFILE | 100 | 60 |
| allow_list | KEYWORD_PRESET | 1000 | 60 |

###### Keyword Preset Types

| Preset Type | Value | Description |
| --- | --- | --- |
| PROFANITY | 1 | words that may count as swearing or cursing |
| SEXUAL_CONTENT | 2 | words referring to sexually explicit behavior or activity |
| SLURS | 3 | personal attacks or words that may qualify as hate speech |

###### Event Types

 Specifies the event context in which the rule is evaluated.
| Event Type | Value | Description |
| --- | --- | --- |
| MESSAGE_SEND | 1 | when a guild member sends or edits a message |
| MEMBER_UPDATE | 2 | when a guild member changes their profile |

###### Keyword Matching Strategies

 Place the wildcard symbol (`*`) at the start or end of a keyword to define its matching behavior. Keyword matching ignores case. **Prefix** - the word must begin with the keyword
| Keyword | Matches |
| --- | --- |
| cat* | **cat**ch, **Cat**apult, **CAt**tLE |
| tra* | **tra**in, **tra**de, **TRA**ditional |
| the mat* | **the mat**rix |

 **Suffix** - the word must finish with the keyword
| Keyword | Matches |
| --- | --- |
| *cat | wild**cat**, copy**Cat** |
| *tra | ex**tra**, ul**tra**, orches**TRA** |
| *the mat | brea**the mat** |

 **Anywhere** - the keyword may occur at any position in the content
| Keyword | Matches |
| --- | --- |
| *cat* | lo**cat**ion, edu**Cat**ion |
| *tra* | abs**tra**cted, ou**tra**ge |
| *the mat* | brea**the mat**ter |

 **Whole Word** - the keyword is a complete word or phrase and needs surrounding whitespace
| Keyword | Matches |
| --- | --- |
| cat | **cat** |
| train | **train** |
| the mat | **the mat** |

