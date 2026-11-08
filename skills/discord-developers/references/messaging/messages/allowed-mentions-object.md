# Allowed mentions object
Context: Discord developer reference: Allowed mentions object
[Source](attachments-and-message-creation-index.md) / [Previous source section](channel-mention-structure.md) / [Following source section](allowed-mentions-examples.md)
<a id="source-allowed-mentions-object"></a> <a id="source-allowed-mention-types"></a> <a id="source-default-settings-for-allowed-mentions"></a>

### Allowed Mentions Object

 The `allowed_mentions` field controls whether mentions in message content or attached component content notify users. Discord validates it against your permissions and against mentions actually present in the message, preventing phantom pings where a user is notified without a visible mention. To ping everyone, for example, listing it in `allowed_mentions` is insufficient; `@everyone` must appear in the message content or components. This field **does not** guarantee a push notification, because other factors can change delivery:
- Role mentions notify members only when the role's `mentionable` field is `true` or the bot has `MENTION_EVERYONE` permission
- Mentions of `@everyone` and `@here` require the bot to have `MENTION_EVERYONE` permission
- Sending a message with `SUPPRESS_NOTIFICATIONS` disables push notifications and leaves only a notification badge
- User notification settings in the Discord app may limit delivery to a notification badge with no push notification

###### Allowed Mention Types

| Type | Value | Description |
| --- | --- | --- |
| Role Mentions | ”roles” | Controls role mentions |
| User Mentions | ”users” | Controls user mentions |
| Everyone Mentions | ”everyone” | Controls @everyone and @here mentions |

###### Default Settings for Allowed Mentions

 When the request body omits `allowed_mentions`, the default depends on context. In **regular messages**, every mention type is parsed, equivalent to this payload:

```
{
  "parse": ["users", "roles", "everyone"]
}

```

 In **interactions** and **webhooks**, the default parses only user mentions, equivalent to this payload:

```
{
  "parse": ["users"]
}

```

| Field | Type | Description |
| --- | --- | --- |
| parse? | array of allowed mention types | allowed mention types to parse from the content |
| roles? | array of snowflakes | role id array to mention, max 100 |
| users? | array of snowflakes | user id array to mention, max 100 |
| replied_user? | boolean | for replies, controls whether the referenced message author is mentioned; defaults to false |

