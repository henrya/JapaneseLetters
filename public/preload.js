const { contextBridge } = require('electron');

// Expose protected methods that allow the renderer process to use
// ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // Add any secure APIs you need here in the future
  // Example:
  // sendMessage: (channel, data) => {
  //   const validChannels = ['toMain'];
  //   if (validChannels.includes(channel)) {
  //     ipcRenderer.send(channel, data);
  //   }
  // },
  // onMessage: (channel, func) => {
  //   const validChannels = ['fromMain'];
  //   if (validChannels.includes(channel)) {
  //     ipcRenderer.on(channel, (event, ...args) => func(...args));
  //   }
  // }
});

// For now, this preload script just sets up the secure bridge
// Add specific APIs as needed for future features
