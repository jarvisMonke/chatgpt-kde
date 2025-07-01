const { app, BrowserWindow } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 700,
    frame: true,
    transparent: true,
    vibrancy: 'ultra-dark', // This mostly works on macOS, but keep it in
    visualEffectState: 'active', // Electron 25+ — helps on some Linux setups
    backgroundColor: '#00000000', // Fully transparent
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // Use a local HTML file if you want full styling control
  win.loadFile('index.html');

  // If you want to load ChatGPT directly
  //win.loadURL('https://chat.openai.com');
}

app.whenReady().then(createWindow);
