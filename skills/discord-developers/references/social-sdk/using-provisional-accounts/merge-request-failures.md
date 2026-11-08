# Merge request failures
Context: Discord developer reference: Merge request failures
[Source](merge-lifecycle-and-clients-index.md) / [Previous source section](data-migration-during-merging.md) / [Following source section](unmerging-provisional-accounts.md)
<a id="source-merge-request-failures"></a>

### Merge Request Failures

 A merge attempt can return a merge-specific error code:
| Code | HTTP Status | Meaning | Solution |
| --- | --- | --- | --- |
| 530014 | 400 | Invalid merge source | The source account is not a provisional account. |
| 530016 | 400 | Invalid merge destination | The destination account is provisional |
| 530017 | 400 | Merge source user banned | The provisional account selected for merge is banned from the platform. |
| 530023 | 400 | Too many application identities | The user already has an external identity linked for this application. |
| - | 423 | Resource locked | Transient error, wait and retry |

 Error `530017` usually appears after a link had previously succeeded. If the linked Discord account is banned, Discord severs that identity into a new provisional account in a **restricted** state. That restricted provisional account cannot merge into another Discord account until a temporary ban expires or the ban is removed. Ban-Driven Unmerge describes the complete lifecycle.

---

