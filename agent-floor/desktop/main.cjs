// Agent Floor desktop app (Electron).
//
// Opens the floor in its own window, with no browser involved. The floor server
// runs inside this process unless one is already running. The window can be
// closed; the app keeps listening from the menu bar / system tray so hooks
// never have to relaunch it. "Quit" pauses auto-launch for a while.
const { app, BrowserWindow, Menu, Tray, nativeImage, shell, nativeTheme, dialog, ipcMain } = require('electron');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { markPng } = require('./icon.cjs');
const { snooze } = require('./state.cjs');

const PORT = Number(process.env.AGENT_FLOOR_PORT) || 4317;
const URL = `http://127.0.0.1:${PORT}/?app=1`;
const ORIGIN = `http://127.0.0.1:${PORT}`;
const PRELOAD = path.join(__dirname, 'preload.cjs');
/** A pop-out panel of the floor itself (Comando or Guia), e.g. /?app=1&panel=comando. */
const isPanelUrl = (url) => {
  try {
    const u = new globalThis.URL(url);
    return u.origin === ORIGIN && /^(comando|guia)$/.test(u.searchParams.get('panel') || '');
  } catch {
    return false;
  }
};
const startedByHook = process.argv.includes('--from-hook');
/** `--floor=3` opens straight on that floor (also when the app is already running). */
const floorArg = (argv) => argv.find((a) => a.startsWith('--floor='))?.slice(8);
const urlFor = (argv) => {
  const n = floorArg(argv);
  if (argv.includes('--building')) return `${URL}&view=building`;
  return n && /^\d+$/.test(n) ? `${URL}&floor=${n}` : URL;
};

app.setName('Agent Floor');

if (!app.requestSingleInstanceLock()) {
  // Another window is already open; it will focus itself (see second-instance).
  app.quit();
} else {
  let win = null;
  let tray = null;
  let floor = null;
  let quitting = false;

  async function serverIsUp() {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/health`, { signal: AbortSignal.timeout(600) });
      return res.ok;
    } catch {
      return false;
    }
  }

  async function ensureServer() {
    if (await serverIsUp()) return;
    const { startServer } = await import(pathToFileURL(path.join(__dirname, '../server/index.mjs')).href);
    floor = await startServer({ port: PORT, log: () => {} });
  }

  function createWindow(_event, args) {
    // Tray and menu clicks pass other things here; only second-instance passes argv.
    const argv = Array.isArray(args) ? args : [];
    if (win) {
      if (floorArg(argv) || argv.includes('--building')) win.loadURL(urlFor(argv));
      if (win.isMinimized()) win.restore();
      win.show();
      win.focus();
      return;
    }
    win = new BrowserWindow({
      width: 1440,
      height: 920,
      minWidth: 720,
      minHeight: 480,
      title: 'Agent Floor',
      show: false,
      backgroundColor: nativeTheme.shouldUseDarkColors ? '#0b0e13' : '#e7ebf0',
      titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'default',
      autoHideMenuBar: true,
      icon: nativeImage.createFromBuffer(markPng(256, { background: true })),
      webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: true, backgroundThrottling: true, preload: PRELOAD },
    });
    win.once('ready-to-show', () => {
      // Opened by an agent hook: show without stealing focus from your editor.
      if (startedByHook && process.platform === 'darwin') win.showInactive();
      else win.show();
    });
    // Links (like the GitHub button) open in the real browser; the window stays on the floor.
    // Pop-out panels (Comando, Guia) open as their own small windows on the desktop.
    win.webContents.setWindowOpenHandler(({ url }) => {
      if (isPanelUrl(url)) {
        return {
          action: 'allow',
          // Glass on the desktop: Windows 11 Acrylic (macOS vibrancy) blurs whatever is behind the
          // window; the page stays transparent and draws the rim and sheen. The title bar is hidden
          // and the native buttons float over the panel header (titleBarOverlay).
          overrideBrowserWindowOptions: {
            width: 620,
            height: 780,
            minWidth: 420,
            minHeight: 420,
            autoHideMenuBar: true,
            backgroundColor: '#00000000',
            ...(process.platform === 'win32' ? { backgroundMaterial: 'acrylic' } : {}),
            ...(process.platform === 'darwin' ? { vibrancy: 'under-window', visualEffectState: 'active' } : {}),
            titleBarStyle: 'hidden',
            titleBarOverlay: { color: '#00000000', symbolColor: nativeTheme.shouldUseDarkColors ? '#eef1f5' : '#141821', height: 44 },
            icon: nativeImage.createFromBuffer(markPng(256, { background: true })),
            webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: true, preload: PRELOAD },
          },
        };
      }
      if (/^https?:\/\//.test(url)) shell.openExternal(url);
      return { action: 'deny' };
    });
    win.webContents.on('did-create-window', (child) => {
      child.webContents.setWindowOpenHandler(({ url }) => {
        if (/^https?:\/\//.test(url)) shell.openExternal(url);
        return { action: 'deny' };
      });
      child.webContents.on('will-navigate', (e, url) => {
        if (!url.startsWith(ORIGIN)) e.preventDefault();
      });
    });
    win.webContents.on('will-navigate', (e, url) => {
      if (!url.startsWith(`http://127.0.0.1:${PORT}`)) {
        e.preventDefault();
        shell.openExternal(url);
      }
    });
    win.on('close', (e) => {
      // Closing the window keeps the floor listening in the tray.
      if (!quitting) {
        e.preventDefault();
        win.hide();
      }
    });
    win.on('closed', () => (win = null));
    win.loadURL(urlFor(process.argv));
  }

  function createTray() {
    const image =
      process.platform === 'darwin'
        ? nativeImage.createFromBuffer(markPng(32, { template: true }), { scaleFactor: 2 })
        : nativeImage.createFromBuffer(markPng(32));
    if (process.platform === 'darwin') image.setTemplateImage(true);
    tray = new Tray(image);
    tray.setToolTip('Agent Floor');
    tray.setContextMenu(
      Menu.buildFromTemplate([
        { label: 'Show Agent Floor', click: createWindow },
        { type: 'separator' },
        {
          label: 'Quit (pause auto-open for 6 hours)',
          click: () => {
            snooze(6);
            quitting = true;
            app.quit();
          },
        },
        {
          label: 'Quit',
          click: () => {
            quitting = true;
            app.quit();
          },
        },
      ]),
    );
    tray.on('click', createWindow);
  }

  // Native pickers for attaching folders/files to an order. Only pages served by the floor may ask.
  const fromFloor = (event) => {
    try {
      return new globalThis.URL(event.senderFrame?.url || '').origin === ORIGIN;
    } catch {
      return false;
    }
  };
  ipcMain.handle('agent-floor:pick', async (event, kind) => {
    if (!fromFloor(event)) return [];
    const owner = BrowserWindow.fromWebContents(event.sender);
    const result = await dialog.showOpenDialog(owner, {
      title: kind === 'file' ? 'Anexar ficheiros à ordem' : 'Anexar pastas à ordem',
      properties: kind === 'file' ? ['openFile', 'multiSelections'] : ['openDirectory', 'multiSelections'],
    });
    return result.canceled ? [] : result.filePaths.slice(0, 8);
  });
  ipcMain.handle('agent-floor:on-top', (event, on) => {
    if (!fromFloor(event)) return false;
    const w = BrowserWindow.fromWebContents(event.sender);
    if (!w || w === win) return false;
    w.setAlwaysOnTop(Boolean(on));
    return w.isAlwaysOnTop();
  });

  app.on('second-instance', createWindow);
  app.on('activate', createWindow);
  app.on('before-quit', () => (quitting = true));
  app.on('window-all-closed', () => {
    /* keep running in the tray */
  });
  app.on('will-quit', () => floor?.close());

  app.whenReady().then(async () => {
    if (process.platform === 'darwin') app.dock?.setIcon(nativeImage.createFromBuffer(markPng(512, { background: true })));
    Menu.setApplicationMenu(
      Menu.buildFromTemplate([
        ...(process.platform === 'darwin' ? [{ role: 'appMenu' }] : []),
        { role: 'editMenu' },
        { label: 'View', submenu: [{ role: 'reload' }, { role: 'toggleDevTools' }, { type: 'separator' }, { role: 'togglefullscreen' }] },
        { role: 'windowMenu' },
      ]),
    );
    await ensureServer();
    createTray();
    createWindow();
  });
}
