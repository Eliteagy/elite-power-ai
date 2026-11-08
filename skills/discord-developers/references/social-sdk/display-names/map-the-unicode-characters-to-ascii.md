# Map the unicode characters to ascii
Context: Discord developer reference: Map the unicode characters to ascii
[Source](../debugging/logging-api-and-unicode-index.md) / [Owning endpoint, event, object or procedure conditions](use-a-font-family-that-supports-unicode.md) / [Previous source section](use-a-font-family-that-supports-unicode.md) / [Following source section](use-the-discord-username-as-a-fallback.md)
<a id="source-map-the-unicode-characters-to-ascii"></a>

### Map the Unicode characters to ASCII

 A tool such as [Unidecode](https://metacpan.org/pod/Text::Unidecode), available in many languages, can transliterate many Unicode characters to ASCII. When a Display Name contains unsupported glyphs, you can pass it through such a library before display. **Tradeoffs:**
- Transliteration can be wrong or surprising. A perfect Unicode-to-ASCII conversion does not exist for every case, so libraries may produce an inaccurate, inappropriate, or offensive display name.
- Coverage is not complete. Some Unicode characters have no ASCII equivalent; for example, consider what should happen to a Display Name like `ʕ•͡-•ʔ`.
- Many transliteration libraries assume English output.
- Users may object if their display names are altered without notice or consent.

