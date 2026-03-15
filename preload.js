const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  loadAge: () => ipcRenderer.invoke('load-age'),
  saveAge: (data) => ipcRenderer.invoke('save-age', data),
  getLicense: () => ipcRenderer.invoke('get-license'),
  printPage: () => ipcRenderer.invoke('print-page'),
  onMenuSave: (callback) => ipcRenderer.on('menu-save', callback),
  onCheckDirty: (callback) => ipcRenderer.on('check-dirty', () => callback()),
  sendDirtyState: (isDirty) => ipcRenderer.send('dirty-state', isDirty)
});
