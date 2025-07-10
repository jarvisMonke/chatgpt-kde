const { app, BrowserWindow } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 700,
    frame: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: false
    }
  });
  win.loadURL('https://chat.openai.com');
}

app.whenReady().then(createWindow);
