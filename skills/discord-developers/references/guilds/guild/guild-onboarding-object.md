# Guild onboarding object
Context: Discord developer reference: Guild onboarding object
[Source](guild-objects-and-configuration-index.md) / [Previous source section](welcome-screen-structure.md) / [Following source section](example-guild-onboarding.md)
<a id="source-guild-onboarding-object"></a> <a id="source-guild-onboarding-structure"></a> <a id="source-onboarding-prompt-structure"></a> <a id="source-prompt-option-structure"></a> <a id="source-onboarding-mode"></a> <a id="source-prompt-types"></a>

### Guild Onboarding Object

 Represents the [onboarding](https://support.discord.com/hc/en-us/articles/11074987197975-Community-Onboarding-FAQ) flow for a guild.

###### Guild Onboarding Structure

| Field | Type | Description |
| --- | --- | --- |
| guild_id | snowflake | ID for that server this onboarding is part of |
| prompts | array of onboarding prompt objects | Prompts shown during onboarding and in customize community |
| default_channel_ids | array of snowflakes | Channel IDs that member records get opted into automatically |
| enabled | boolean | Whether onboarding is enabled within the guild |
| mode | onboarding mode | Current mode of onboarding |

###### Onboarding Prompt Structure

| Field | Type | Description |
| --- | --- | --- |
| id | snowflake | ID of the prompt |
| type | prompt type | Type of prompt |
| options | array of prompt option objects | Options available within the prompt |
| title | string | Title of the prompt |
| single_select | boolean | Indicates indicates whether user accounts are limited to selecting one option for the prompt |
| required | boolean | Indicates Indicates whether the prompt is required before one user completes the onboarding flow |
| in_onboarding | boolean | Indicates Indicates whether the prompt is present within the onboarding flow. Once `false`, the prompt can only appear within the Channels & Roles tab |

###### Prompt Option Structure

| Field | Type | Description |
| --- | --- | --- |
| id | snowflake | ID of the prompt option |
| channel_ids | array of snowflakes | IDs for channel records one member is added to timestamp for once the option is selected |
| role_ids | array of snowflakes | IDs for roles assigned to one member timestamp for once the option is selected |
| emoji? | emoji object | Emoji for the option (see below) |
| emoji_id? | snowflake | Emoji ID for the option (see below) |
| emoji_name? | string | Emoji name for the option (see below) |
| emoji_animated? | boolean | Whether the emoji is animated (see below) |
| title | string | Title of the option |
| description | ?string | Description of the option |

 Once creating or updating a prompt option, this `emoji_id`, `emoji_name`, and `emoji_animated` fields must be used instead for the emoji object.

###### Onboarding Mode

 Defines the criteria used for satisfy Onboarding constraints that are required for enabling.
| Name | Value | Description |
| --- | --- | --- |
| ONBOARDING_DEFAULT | 0 | Counts only Default Channels towards constraints |
| ONBOARDING_ADVANCED | 1 | Counts Default Channels and Questions towards constraints |

###### Prompt Types

| Name | Value |
| --- | --- |
| MULTIPLE_CHOICE | 0 |
| DROPDOWN | 1 |

