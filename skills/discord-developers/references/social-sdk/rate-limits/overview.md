# Overview
Context: Discord developer reference: Overview
[Source](../debugging/logging-api-and-unicode-index.md) / [Previous source section](../debugging/overview-change-log.md) / [Following source section](checking-the-result.md)
<a id="source-overview-3"></a> <a id="source-overview-4"></a>

## Overview

### Overview

 This guide shows how to recognize and handle rate-limit failures from Discord Social SDK requests. When the SDK rate limits an operation, the callback gets a failed [`ClientResult`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1ClientResult.html#a685015ca8d29a50d47fd1ed5d469ac2e), [`ClientResult::Retryable`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1ClientResult.html#a0d220638f4a36c0b8b731f601e0ac02d) is `true`, and [`ClientResult::RetryAfter`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1ClientResult.html#ac739adca52b90d6b4cbed5753c30fd65) tells you how many seconds to wait.

---

