# Default audio processing web rtc
Context: Discord developer reference: Default audio processing web rtc
[Source](managing-voice-chat-index.md) / [Previous source section](noise-suppression-cancellation.md) / [Following source section](advanced-noise-cancellation-krisp.md)
<a id="source-default-audio-processing-webrtc"></a>

### Default Audio Processing (WebRTC)

 Every build includes these three WebRTC audio processors, and they start enabled by default:
- [`Client::SetNoiseSuppression`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#ae3f6e33b956964525adfa4536bd1fe73) - Reduces constant background sounds such as fans, keyboard noise, and room tone. Enabled by default.
- [`Client::SetEchoCancellation`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a1def244b7ecd388902ba5256ce506ca3) - Filters speaker echo captured by the microphone. Enabled by default.
- [`Client::SetAutomaticGainControl`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a818ae7f46b5bd3873dcd51dd3d9fa64d) - Automatically evens out mic level for clearer, steadier input. Enabled by default.

```
// Toggle individual WebRTC processors from a voice settings UI
client->SetNoiseSuppression(true);
client->SetEchoCancellation(true);
client->SetAutomaticGainControl(true);

```

