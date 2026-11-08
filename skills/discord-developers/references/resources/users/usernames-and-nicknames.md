# Usernames and nicknames
[Source](../users-and-voice-index.md) / [Previous source section](overview.md) / [Following source section](usernames-and-nicknames.md)

<a id="source-usernames-and-nicknames"></a>

## Usernames and Nicknames

A Discord User is the core account entity. Users can appear across the platform, join Guilds, take part in text and voice chat, and use many other features. Discord distinguishes "bot" users from "normal" users. Bot users behave similarly to normal users, but they are automated accounts "owned" by another user and are *not* capped on the number of Guilds they can join.

<a id="source-usernames-and-nicknames-1"></a>

### Usernames and Nicknames

 Discord applies these username and nickname constraints:
1. Names may use most valid unicode characters, with limits on some zero-width and non-rendering characters.
2. Usernames must be 2 to 32 characters long.
3. Nicknames must be 1 to 32 characters long.
4. Names are sanitized, then leading, trailing, and excessive internal whitespace is trimmed.
 Usernames have these extra restrictions:
1. Usernames cannot include any of these substrings: `@`, `#`, `:`, `````, `discord`
2. Usernames cannot be: `everyone`, `here`
 Additional username rules are withheld to limit spam and abuse workarounds, and most users will not run into them. When editing or updating names, handle every error message returned by Discord.
