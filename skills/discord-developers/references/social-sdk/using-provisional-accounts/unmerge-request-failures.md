# Unmerge request failures
Context: Discord developer reference: Unmerge request failures
[Source](merge-lifecycle-and-clients-index.md) / [Previous source section](data-migration-during-unmerging.md) / [Following source section](next-steps.md)
<a id="source-unmerge-request-failures"></a>

### Unmerge Request Failures

 An unmerge attempt can return an unmerge-specific error code:
| Code | HTTP Status | Meaning | Solution |
| --- | --- | --- | --- |
| 50229 | 400 | Invalid user type | User account is provisional and cannot be unmerged. |
| - | 404 | Unknown user | No user identity found for the provided external identity |

---

