const { app, BrowserWindow } = require('electron');


function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 700,
    frame: true,
    transparent: true,
    backgroundColor: '#00000000',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: false, // Disable for script injection
      preload: require('path').join(__dirname, 'preload.js')
    }
  });

  // Make ChatGPT's background transparent after load
  win.webContents.on('did-finish-load', () => {
    win.webContents.insertCSS(`
      html, body { background: transparent !important; }
      #thread-bottom-container {
        background: transparent !important;
        background-color: transparent !important;
        box-shadow: none !important;
        -webkit-backdrop-filter: blur(24px) !important;
        backdrop-filter: blur(24px) !important;
      }
    `);
    // Also clear via JS in case of inline styles or shadow DOM
    win.webContents.executeJavaScript(`
      const el = document.getElementById('thread-bottom-container');
      if (el) {
        el.style.background = 'transparent';
        el.style.backgroundColor = 'transparent';
        el.style.boxShadow = 'none';
        el.style.backdropFilter = 'blur(24px)';
        el.style.webkitBackdropFilter = 'blur(24px)';
      }
    `);
  });

  // Load ChatGPT directly in the main window
  win.loadURL('https://chat.openai.com');
}

app.whenReady().then(createWindow);
