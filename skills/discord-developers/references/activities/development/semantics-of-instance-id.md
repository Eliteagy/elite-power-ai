# Semantics of instance id
Context: Discord developer reference: Semantics of instance id
[Source](participants-avatars-and-lifecycle-index.md) / [Owning endpoint, event, object or procedure conditions](activity-instance-management.md) / [Owning endpoint, event, object or procedure conditions](using-instance-id.md) / [Following source section](activity-instance-management-instance-participants.md)
<a id="source-semantics-of-instanceid"></a>

##### Semantics of instanceId

 An instance ID is created when a user launches an application. Other users who join that same application instance receive the same `instanceId`. After every user in that channel leaves or closes the application, the instance lifecycle ends and the ID is not reused. A later launch in that channel receives a new `instanceId`.

---

