# Activity instance management
Context: Discord developer reference: Activity instance management
[Source](participants-avatars-and-lifecycle-index.md) / [Following source section](using-instance-id.md)
<a id="source-multiplayer-experience-networking-production-readiness"></a> <a id="source-overview"></a> <a id="source-activity-instance-management"></a> <a id="source-activity-instance-management-1"></a>

# Multiplayer Experience, Networking, Production Readiness

> Discord Developers reference. Original prose; identifiers preserved verbatim.

## Overview

Covers: Activity Instance Management; Activity Proxy Considerations; Cache Busting.

## Activity Instance Management

### Activity Instance Management

 When someone selects `Join Application`, they expect to land in the same running experience as their friends. That may be a drawing canvas, board game, shared playlist, shooter, or another collaborative app, but all participants need access to the same shared state. These docs call that shared state an **application instance**. (Figure: join-application) The Embedded App SDK provides two-way communication between your app and the Discord Client. `instanceId` lets both your application and Discord identify the particular application instance being addressed.

