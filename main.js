const { app, BrowserWindow, Menu, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const os = require('os');

const AGE_FILE = path.join(os.homedir(), '.age');

let mainWindow;
let isDirty = false;
let quitRequested = false;

function parseAgeFile() {
  try {
    const content = fs.readFileSync(AGE_FILE, 'utf-8');
    const data = {};
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIndex = trimmed.indexOf('=');
      if (eqIndex === -1) continue;
      const key = trimmed.substring(0, eqIndex).trim();
      const value = trimmed.substring(eqIndex + 1).trim();
      data[key] = value;
    }
    return data;
  } catch {
    return null;
  }
}

function writeAgeFile(data) {
  let content = '';
  content += `Over18=${data.Over18}\n`;
  if (data.Over18 === 'false' && data.age) {
    content += `age=${data.age}\n`;
  }
  fs.writeFileSync(AGE_FILE, content, 'utf-8');
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 450,
    height: 350,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'src', 'index.html'));

  mainWindow.on('close', (e) => {
    if (isDirty) {
      e.preventDefault();
      quitRequested = true;
      mainWindow.webContents.send('check-dirty');
    }
  });
}

function createMenu() {
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Save',
          accelerator: 'CmdOrCtrl+S',
          click: () => {
            mainWindow.webContents.send('menu-save');
          }
        },
        { type: 'separator' },
        {
          label: 'Exit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            if (isDirty) {
              quitRequested = true;
              mainWindow.webContents.send('check-dirty');
            } else {
              app.quit();
            }
          }
        }
      ]
    },
    {
      label: 'Laws',
      submenu: [
        {
          label: 'AB 1043',
          click: () => openDialog('ab1043.html', 'AB 1043', 700, 600)
        },
        {
          label: 'Prop 65',
          click: () => openDialog('prop65.html', 'Prop 65 Warning', 550, 350)
        }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: '18',
          click: () => openDialog('eighteen.html', '18', 300, 250)
        },
        {
          label: 'About',
          click: () => openDialog('about.html', 'About Over 18', 600, 550)
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

function openDialog(file, title, width, height) {
  const win = new BrowserWindow({
    width,
    height,
    title,
    parent: mainWindow,
    modal: true,
    resizable: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.setMenuBarVisibility(false);
  win.loadFile(path.join(__dirname, 'src', file));
}

// IPC handlers
ipcMain.handle('load-age', () => {
  return parseAgeFile();
});

ipcMain.handle('print-page', (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (win) {
    win.webContents.print({}, (success, failureReason) => {
      if (!success && failureReason !== 'cancelled') {
        console.error('Print failed:', failureReason);
      }
    });
  }
});

ipcMain.handle('save-age', (_event, data) => {
  writeAgeFile(data);
  isDirty = false;
  return true;
});

ipcMain.handle('get-license', () => {
  try {
    return fs.readFileSync(path.join(__dirname, 'LICENSE.txt'), 'utf-8');
  } catch {
    return 'GPL-2.0 License text not found.';
  }
});

ipcMain.on('dirty-state', (_event, dirty) => {
  isDirty = dirty;
  if (dirty === false && quitRequested) {
    app.quit();
  }
  quitRequested = false;
});

app.whenReady().then(() => {
  createMenu();
  createWindow();
});

app.on('window-all-closed', () => {
  app.quit();
});
