# CMake project setup
Context: Discord developer reference: CMake project setup
[Source](cpp-setup-and-authentication-index.md) / [Previous source section](runtime-dependencies.md) / [Following source section](initialization-program.md)
<a id="source-step-5-project-setup"></a>

### Step 5: Project Setup

 Using the Discord Social SDK from C++ requires the following:
- Include `discordpp.h` from your C++ source.
- Link the correct SDK libraries for your platform in your build system:
  - **Windows:** `discord_partner_sdk.dll`
  - **Linux**: `libdiscord_partner_sdk.so`
  - **macOS:** `libdiscord_partner_sdk.dylib`

 The SDK download archive contains all of these files. **Troubleshooting Tip:** unresolved external symbols usually mean the SDK library is not linked correctly in your build. Start by creating the project folder and Social SDK dependency layout:

```
mkdir MyGame
cd MyGame
mkdir lib

```

 Unzip the Social SDK archive into `lib`. When finished, `lib` should contain a `discord_social_sdk` folder. Inside the `MyGame` directory, create `CMakeLists.txt`:

```
touch CMakeLists.txt

```

 Place the following contents in `CMakeLists.txt` to configure the Social SDK dependency for the current operating system:

```
cmake_minimum_required(VERSION 3.10)
project(DiscordSDKExample)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED True)

add_executable(DiscordSDKExample main.cpp)

# Define some handy Social SDK variables
set(DISCORD_SDK_ROOT "${CMAKE_SOURCE_DIR}/lib/discord_social_sdk")
set(DISCORD_SDK_LIB_DIR "${DISCORD_SDK_ROOT}/lib/release")
set(DISCORD_SDK_BIN_DIR "${DISCORD_SDK_ROOT}/bin/release")
set(DISCORD_SDK_INCLUDE_DIR "${DISCORD_SDK_ROOT}/include")

# Include for Social SDK headers
target_include_directories(DiscordSDKExample PRIVATE ${DISCORD_SDK_INCLUDE_DIR})

# Platform-specific Social SDK library paths
if(WIN32)
    set(DISCORD_LIB_PATH "${DISCORD_SDK_LIB_DIR}/discord_partner_sdk.lib")
    set(DISCORD_SHARED_LIB "${DISCORD_SDK_BIN_DIR}/discord_partner_sdk.dll")
elseif(APPLE)
    set(DISCORD_LIB_PATH "${DISCORD_SDK_LIB_DIR}/libdiscord_partner_sdk.dylib")
    set(DISCORD_SHARED_LIB "${DISCORD_SDK_LIB_DIR}/libdiscord_partner_sdk.dylib")
else() # Linux
    set(DISCORD_LIB_PATH "${DISCORD_SDK_LIB_DIR}/libdiscord_partner_sdk.so")
    set(DISCORD_SHARED_LIB "${DISCORD_SDK_LIB_DIR}/libdiscord_partner_sdk.so")
endif()

# Link the Social SDK library
target_link_libraries(DiscordSDKExample PRIVATE ${DISCORD_LIB_PATH})

# Set the runtime search path (RPATH) for Linux and macOS
if(UNIX)
    # Use RPATH when building
    set(CMAKE_BUILD_WITH_INSTALL_RPATH TRUE)
    # Set the RPATH to use the lib directory relative to the executable
    set(CMAKE_INSTALL_RPATH "$ORIGIN")
    if(APPLE)
        set(CMAKE_INSTALL_RPATH "@executable_path")
    endif()
endif()

# Copy Social SDK shared library to output directory, so it's available at runtime.
add_custom_command(TARGET DiscordSDKExample POST_BUILD
    COMMAND ${CMAKE_COMMAND} -E copy_if_different
    "${DISCORD_SHARED_LIB}"
    $<TARGET_FILE_DIR:DiscordSDKExample>
)

```

 Create a main.cpp file:

