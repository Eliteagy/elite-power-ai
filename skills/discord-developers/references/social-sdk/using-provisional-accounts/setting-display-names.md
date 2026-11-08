# Setting display names
Context: Discord developer reference: Setting display names
[Source](authentication-and-merging-index.md) / [Previous source section](error-handling.md) / [Following source section](merging-provisional-accounts.md)
<a id="source-setting-display-names"></a>

### Setting Display Names

 With these credentials, Discord creates a limited account for the game and attempts to set its username using these rules:
- Bot issued tokens use the supplied `preferred_global_name`.
- For OIDC, the provisional account display name comes from the `preferred_username` claim when the ID token includes it. This optional field should be between 1 and 32 characters. Without it, the display name defaults to the unique username Discord generates at creation.
- [Steam session tickets](https://partner.steamgames.com/doc/features/auth) use the display name from the user's Steam account.
- [EOS Auth](https://dev.epicgames.com/docs/epic-account-services/auth/auth-interface) Access Tokens or ID Tokens use the user's Epic account name. EOS Connect ID Tokens do not expose a username, so the game must set the display name with [`Client::UpdateProvisionalAccountDisplayName`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a7485979ab2d4c533b75f8efd5e50bc60).
- [Unity Services ID Tokens](https://services.docs.unity.com/docs/client-auth/) use the display name from the user's Unity Player Account.
 To set a provisional account display name directly, call [`Client::UpdateProvisionalAccountDisplayName`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a7485979ab2d4c533b75f8efd5e50bc60).

```
client->UpdateProvisionalAccountDisplayName("CoolPlayer123", [](discordpp::ClientResult result) {
    if (result.Successful()) {
      std::cout << "✅ Display name updated\n";
    }
  }
);

```

---

