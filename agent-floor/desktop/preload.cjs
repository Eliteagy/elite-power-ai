// Bridge for the floor page: the only native things it may ask for are the Windows file and
// folder pickers (to attach them to an order) and its own pop-out windows. Nothing else.
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('agentFloor', {
  /** Opens the native picker; resolves with the chosen absolute paths ([] when cancelled). */
  pick: (kind) => ipcRenderer.invoke('agent-floor:pick', kind === 'file' ? 'file' : 'folder'),
  /** Keep a pop-out panel above other windows. */
  setOnTop: (on) => ipcRenderer.invoke('agent-floor:on-top', Boolean(on)),
});
