# Rich presence program declarations
Context: Two coupled same-file fragments. main217–303 stays whole, including all nested callbacks and loop. Link includes/application ID/signal handler and actual full-program stage194.
[Source](cpp-relationships-and-presence-index.md) / [Required complete example component](rich-presence-program-main.md) / [Exact example stage and preceding setup](rich-presence-troubleshooting.md)

```
#define DISCORDPP_IMPLEMENTATION
#include "discordpp.h"
#include <iostream>
#include <thread>
#include <atomic>
#include <string>
#include <functional>
#include <csignal>

// Replace with your Discord Application ID
const uint64_t APPLICATION_ID = 1349146942634065960;

// Create a flag to stop the application
std::atomic<bool> running = true;

// Signal handler to stop the application
void signalHandler(int signum) {
    running.store(false);
}

```
