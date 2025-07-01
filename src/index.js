const { app, BrowserWindow } = require('electron');




function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 700,
    frame: true,
    transparent: false,
    backgroundColor: '#222222',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: false, // Disable for script injection
      preload: require('path').join(__dirname, 'preload.js')
    }
  });


  win.webContents.on('did-finish-load', () => {
    // Remove box, background, border, and shadow from the system-hint/tools button
    win.webContents.insertCSS(`
      #system-hint-button,
      #system-hint-button.composer-btn,
      #system-hint-button[aria-haspopup="menu"] {
        background: none !important;
        border: none !important;
        box-shadow: none !important;
        outline: none !important;
        border-radius: 0 !important;
        /* Remove box but keep pointer events */
        padding: 0.25em 0.5em !important;
        pointer-events: auto !important;
        cursor: pointer !important;
      }
      #system-hint-button .icon {
        background: none !important;
        box-shadow: none !important;
        border: none !important;
      }
      #system-hint-button span {
        background: none !important;
        box-shadow: none !important;
        border: none !important;
      }
      /* Ensure menu options remain clickable */
      [role="menu"], [role="menuitem"], .menu, .menu-item, .__menu-item {
        pointer-events: auto !important;
        cursor: pointer !important;
      }
    `);
    // Aggressively hide ChatGPT upgrade/plan popups, overlays, and menu items
    win.webContents.insertCSS(`
      /* Hide modals, overlays, popups, and upgrade banners */
      [role="dialog"],
      [aria-modal="true"],
      [data-testid*="upsell"],
      [data-testid*="popover"],
      [class*="popover"],
      [class*="upsell"],
      [class*="upgrade"],
      [class*="plan"],
      [id*="popover"],
      [id*="upsell"],
      [id*="upgrade"],
      [id*="plan"],
      .fixed.z-50, .fixed.z-40, .fixed.z-30, .fixed.z-20, .fixed.z-10,
      .absolute.inset-0, .absolute.top-0.left-0.right-0.bottom-0,
      .overflow-hidden[style*="z-index"],
      .bg-black.bg-opacity-50,
      .bg-black.bg-opacity-60,
      .bg-black.bg-opacity-70,
      .bg-black.bg-opacity-80,
      .bg-black.bg-opacity-90,
      /* Hide sticky upgrade banner at bottom */
      .bg-token-bg-elevated-secondary.sticky.bottom-0.z-30.py-1\.5,
      .bg-token-bg-elevated-secondary.sticky.bottom-0.z-30,
      .bg-token-bg-elevated-secondary.sticky.bottom-0,
      .bg-token-bg-elevated-secondary.sticky,
      /* Hide menu items with Upgrade plan text (fallback for Chromium <121) */
      div.__menu-item .truncate,
      div.__menu-item .not-group-data-disabled\:text-token-text-tertiary
      {
        display: none !important;
        visibility: hidden !important;
        pointer-events: none !important;
        z-index: -1 !important;
        opacity: 0 !important;
      }
      /* Hide parent menu-item if child contains Upgrade plan or More access text */
      div.__menu-item:has(.truncate:contains('Upgrade plan')),
      div.__menu-item:has(.truncate:contains('Upgrade Plan')),
      div.__menu-item:has(.truncate:contains('Plus')),
      div.__menu-item:has(.truncate:contains('Pro')),
      div.__menu-item:has(.truncate:contains('More access to the best models')),
      div.__menu-item:has(.truncate:contains('Upgrade')),
      div.__menu-item:has(.truncate:contains('plan')) {
        display: none !important;
        visibility: hidden !important;
        pointer-events: none !important;
        z-index: -1 !important;
        opacity: 0 !important;
      }
    `);
    win.webContents.insertCSS(`
      /* Hide ChatGPT upgrade/plan popups and overlays */
      [id*="popover"], [class*="popover"], [class*="upgrade"], [class*="upsell"], [class*="plan"], [data-testid*="upsell"], [data-testid*="popover"], [aria-label*="upgrade"], [aria-label*="plan"], [aria-label*="upsell"], [aria-modal="true"] {
        display: none !important;
        visibility: hidden !important;
        pointer-events: none !important;
        z-index: -1 !important;
      }
      /* Make all text white */
      html, body, *, *::before, *::after {
        color: #fff !important;
      }

      /* Subtle dark gradient background for the whole app */
      html, body, .min-h-screen, .h-full, .bg-token-main-surface, .dark, .bg-black {
        background: linear-gradient(120deg, #23243a 0%, #3a185c 60%, #00bcd4 100%) fixed !important;
        background-size: cover !important;
      }

      /* Sidebar: glassy, slightly lighter */
      nav, .md\:w-\[260px\], .md\:flex-shrink-0, .md\:border-r {
        background: rgba(40, 30, 60, 0.7) !important;
        backdrop-filter: blur(10px) saturate(1.1);
        -webkit-backdrop-filter: blur(10px) saturate(1.1);
        border-right: 1px solid rgba(255,255,255,0.06) !important;
      }

      /* Remove all backgrounds, borders, box-shadows, and border-radius from all elements */
      *, *:before, *:after {
        background: none !important;
        border: none !important;
        box-shadow: none !important;
        border-radius: 0 !important;
      }

      /* Input area: clean, slightly glassy */
      form, .sticky.bottom-0, .w-full.py-2 {
        background: rgba(30, 20, 40, 0.92) !important;
        border-radius: 12px !important;
        box-shadow: 0 2px 8px 0 #0003;
        padding: 10px 16px !important;
      }
      textarea, input, button, .btn {
        background: rgba(255,255,255,0.10) !important;
        color: #fff !important;
        border-radius: 8px !important;
        border: 1px solid rgba(255,255,255,0.10) !important;
        font-size: 1em !important;
        transition: background 0.2s, box-shadow 0.2s;
      }
      textarea:focus, input:focus, button:focus, .btn:focus {
        background: rgba(255,255,255,0.18) !important;
        outline: none !important;
      }


      /* Remove all box-shadows and borders from containers, icons, and tools */
      *, *:before, *:after {
        box-shadow: none !important;
      }
      .border, .border-black, .border-gray-900, .border-gray-800, .border-gray-700, .border-gray-600, .border-gray-500, .border-gray-400, .border-gray-300, .border-gray-200, .border-gray-100,
      .bg-token-main-surface-secondary, .bg-token-main-surface-tertiary, .bg-token-main-surface,
      .bg-token-surface-primary, .bg-token-surface-secondary, .bg-token-surface-tertiary, .bg-token-surface,
      .bg-default, .bg-white, .rounded-lg, .rounded-xl, .rounded-2xl, .rounded-md, .rounded, .shadow, .overflow-hidden {
        border: none !important;
        background: none !important;
      }
      .flex.items-center.justify-center, .flex.items-center, .icon, .p-2, .p-3, .p-4, .rounded-full, .rounded-md, .rounded-lg, .rounded-xl, .rounded-2xl {
        background: none !important;
        border: none !important;
      }

      /* Scrollbar: slim and modern */
      ::-webkit-scrollbar {
        width: 8px;
        background: rgba(0,0,0,0.10);
      }
      ::-webkit-scrollbar-thumb {
        background: rgba(58,24,92,0.22);
        border-radius: 6px;
      }

      /* Make links and highlights pop with cyan */
      a, .text-blue-500, .text-token-text-primary, .text-token-text-secondary {
        color: #00bcd4 !important;
      }

      /* Subtle hover for buttons */
      button:hover, .btn:hover {
        background: rgba(0,188,212,0.18) !important;
        color: #fff !important;
      }
    `);
  });

  // Load ChatGPT directly in the main window
  win.loadURL('https://chat.openai.com');
}

app.whenReady().then(createWindow);
