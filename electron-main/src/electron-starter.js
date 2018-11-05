const {app, BrowserWindow} = require('electron');
const serverUrl = require('./urls').server;

let splashScreenUrl = serverUrl+'/splash.html';

let mainWindow;
let splashScreen;

function createWindow() {
    const windowStateKeeper = require('electron-window-state');
    let mainWindowState = windowStateKeeper({
        defaultWidth: 1024,
        defaultHeight: 768
    });
    mainWindow = new BrowserWindow({
        x: mainWindowState.x,
        y: mainWindowState.y,
        width: mainWindowState.width,
        height: mainWindowState.height,
        show: false
    });
    mainWindowState.manage(mainWindow);
    mainWindow.loadURL(serverUrl);

    splashScreen = new BrowserWindow({width: 800, height: 600, frame: false, show: false});
    splashScreen.loadURL(splashScreenUrl);

    splashScreen.once('ready-to-show', () => {
        splashScreen.show();
    });
    mainWindow.once('ready-to-show', () => {
        setTimeout(() => {
            splashScreen.destroy();
            mainWindow.show();
        }, 5000);
    });

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
require('./index');
