# Initialization program
Context: Discord developer reference: Initialization program
[Source](cpp-setup-and-authentication-index.md) / [Owning endpoint, event, object or procedure conditions](cmake-project-setup.md) / [Following source section](macos-library-permission.md)

```
touch main.cpp

```

 Add this code to `main.cpp`:

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
const uint64_t APPLICATION_ID = 123456789012345678;

// Create a flag to stop the application
std::atomic<bool> running = true;

// Signal handler to stop the application
void signalHandler(int signum) {
  running.store(false);
}

int main() {
  std::signal(SIGINT, signalHandler);
  std::cout << "🚀 Initializing Discord SDK...\n";

  // Create our Discord Client
  auto client = std::make_shared<discordpp::Client>();

  // Keep application running to allow SDK to receive events and callbacks
  while (running) {
      std::this_thread::sleep_for(std::chrono::milliseconds(10));
  }

  return 0;
}

```

 Compile and run the project:

```
mkdir build && cd build
cmake ..
cmake --build .
./DiscordSDKExample

```

 At this stage the code has mostly created a client instance, so the console should print output like this:

```
🚀 Initializing Discord SDK...

```

