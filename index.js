const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')
const settings = require('./package.json').settings
const ipcMain = require('electron').ipcMain;
const UCIEngine = require('./src/vendor/purefan/uciengine')

require('electron-reload')(settings.path.dist)

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win
const uciengine = new UCIEngine()

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({ width: 800, height: 600 })
    win.maximize()
    // and load the index.html of the app.
    win.loadURL(url.format({
        pathname: path.join(__dirname, settings.path.dist, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))

    // Open the DevTools.
    win.webContents.openDevTools()

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null
    })

    ipcMain.on('from-a-modular-browser', function (event, channel, data) {
        console.log('process::main::ipcMain', channel, data);  // prints "ping"
        // const all_data = Array.prototype.slice.call(arguments, 1);
        // event.sender.send('from-the-main-process', 'pong');
        console.log(win.webContents)
        win.webContents.send('from-main-process', channel, data)
    });

    ipcMain.on('uciengine-init', function(internal, settings) {
        uciengine.init(settings)
        uciengine.event_manager.on('vendor.purefan.uciengine.uciok', function(){
            console.log('[IPC::uciengine] on ready')
            win.webContents.send('uciengine-status', {state: uciengine.state})
        // win.webContents.send('uciengine-status')
        })
        uciengine.event_manager.on('vendor.purefan.engine.info', function(info){
            console.log('[Main::UCI::info]', info)
            win.webContents.send('vendor.purefan.engine.info', info)
        })
    })
    ipcMain.on('uciengine-analyse', function(internal, params) {
        console.log('[IPC::uciengine::analyze]', params)
        uciengine.analyze(params)
    })

    ipcMain.on('uciengine-status', function(internal) {
        console.log('[IPC::uciengine::status]', uciengine.state)
        win.webContents.send('uciengine-status', {state: uciengine.state})
    })



    /* ipcMain.on('synchronous-message', function (event, arg) {
        console.log(arguments);  // prints "ping"
        event.returnValue = 'pong';
    }); */
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.