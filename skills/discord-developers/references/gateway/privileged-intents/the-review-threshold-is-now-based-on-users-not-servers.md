# The review threshold is now based on users not servers
Context: Discord developer reference: The review threshold is now based on users not servers
[Source](privileged-intent-policy-index.md) / [Owning endpoint, event, object or procedure conditions](what-are-privileged-intents.md) / [Previous source section](what-s-changed.md) / [Following source section](apps-must-reapply-annually-for-continued-access.md)
<a id="source-1-the-review-threshold-is-now-based-on-users-not-servers"></a>

### 1. The review threshold is now based on users, not servers

 The old threshold used server count: fewer than 100 servers could use Developer Portal toggles, while 100+ servers required an application. The new threshold is the count of unique users who can access your app across every server where it is installed. When that reach is more than 10,000 users, the app must request Privileged Intent access. A bot in 50 high-population servers can therefore cross the line, while a bot in 200 small servers may remain below it. The metric is user reach, not installation count.

