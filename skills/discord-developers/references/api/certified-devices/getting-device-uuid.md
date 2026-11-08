# Getting device uuid
Context: Discord developer reference: Getting device uuid
[Source](certified-devices-index.md) / [Previous source section](query-string-params.md) / [Following source section](http-request-example.md)
<a id="source-getting-device-uuid"></a> <a id="source-microphone-id-example"></a> <a id="source-speaker-id-example"></a>

### Getting Device UUID

 Each device in a `SET_CERTIFIED_DEVICES` payload has an `id` field. On Windows, set `id` to the device UUID from the native Windows API; the value resembles `{0.0.1.00000000}.{6cff2b76-44a8-46b9-b528-262ad8609d9f}`. On macOS, use the device name as the `id`.

###### Microphone Id Example

```
id = waveInMessage((HWAVEIN)IntToPtr(index),
                      DRV_QUERYFUNCTIONINSTANCEID,
                      (DWORD_PTR)pstrEndpointId,
                      cbEndpointId);

```

###### Speaker Id Example

```
id = waveOutMessage((HWAVEIN)IntToPtr(index),
                      DRV_QUERYFUNCTIONINSTANCEID,
                      (DWORD_PTR)pstrEndpointId,
                      cbEndpointId);

```

