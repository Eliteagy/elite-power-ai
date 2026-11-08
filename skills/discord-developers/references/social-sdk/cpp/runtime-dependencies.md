# Runtime dependencies
Context: Discord developer reference: Runtime dependencies
[Source](cpp-setup-and-authentication-index.md) / [Previous source section](download-the-discord-sdk-for-cpp.md) / [Following source section](cmake-project-setup.md)
<a id="source-runtime-dependencies"></a>

### Runtime Dependencies

 When distributing a build with the Social SDK, include its runtime dependencies:
- **Windows:** Put `discord_partner_sdk.dll` in the executable directory.
- **Linux/macOS:** Ensure `libdiscord_partner_sdk.so/libdiscord_partner_sdk.dylib` can be found through `LD_LIBRARY_PATH` or placed next to the binary.

---

