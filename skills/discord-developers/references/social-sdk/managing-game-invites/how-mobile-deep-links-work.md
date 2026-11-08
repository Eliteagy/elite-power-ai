# How mobile deep links work
Context: Discord developer reference: How mobile deep links work
[Source](managing-game-invites-index.md) / [Previous source section](setting-up-mobile-deep-links.md) / [Following source section](setting-a-cover-image-for-the-invite-optional.md)
<a id="source-how-mobile-deep-links-work"></a>

### How Mobile Deep Links Work

1. The user receives an invite in Discord and accepts it
2. Discord starts your game through your URL scheme:

```
yourgame://_discord/join?secret=the_join_secret_you_set

```

3. Your game receives the URL and reads the join secret
4. Use the secret to connect the player to the session

---

