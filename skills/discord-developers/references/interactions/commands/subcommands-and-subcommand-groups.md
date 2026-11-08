# Subcommands and subcommand groups
Context: Discord developer reference: Subcommands and subcommand groups
[Source](subcommands-and-localization-index.md) / [Previous source section](slash-commands-example-interaction.md) / [Following source section](example-walkthrough.md)
<a id="source-subcommands-and-subcommand-groups"></a>

### Subcommands and Subcommand Groups

 At present, the command explorer shows subcommands and subcommand groups at the top level. Discord may later display them as nested autocomplete choices. Use subcommands and groups when a command set needs clearer organization or more complex structure. **Subcommands** split a command by **declaring actions inside a command or group**. **Subcommand Groups** arrange your **subcommands** by **collecting related actions or resources under one command**. These patterns are guidance rather than enforced design rules; you can model subcommands and groups in whatever way fits your app. Adding subcommands or subcommand groups makes the base command itself unavailable. For example, `/permissions` is not a valid command invocation once `/permissions add | remove` exists as subcommands or subcommand groups. Nesting is limited to one level inside a group: a top-level command can contain subcommand groups, and each group can contain subcommands. **No other nesting pattern is supported.** The following visuals illustrate this:

```
VALID

command
|
|__ subcommand
|
|__ subcommand

----

VALID

command
|
|__ subcommand-group
    |
    |__ subcommand
|
|__ subcommand-group
    |
    |__ subcommand

----

VALID

command
|
|__ subcommand-group
    |
    |__ subcommand
|
|__ subcommand

-------

INVALID

command
|
|__ subcommand-group
    |
    |__ subcommand-group
|
|__ subcommand-group
    |
    |__ subcommand-group

----

INVALID

command
|
|__ subcommand
    |
    |__ subcommand-group
|
|__ subcommand
    |
    |__ subcommand-group

```

