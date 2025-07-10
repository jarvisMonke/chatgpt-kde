const { app, BrowserWindow, shell } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 700,
    frame: true,
    icon: '/usr/share/pixmaps/chatgpt_cool.png',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: false
    }
  });
  win.loadURL('https://chat.openai.com');

  // Open external links in default browser
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  win.webContents.on('will-navigate', (event, url) => {
    if (url !== win.webContents.getURL()) {
      event.preventDefault();
      shell.openExternal(url);
    }
  });
}

app.whenReady().then(createWindow);
