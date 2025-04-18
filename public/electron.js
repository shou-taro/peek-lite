const {app, BrowserWindow} = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.ts')
        }
    });

    mainWindow.loadURL(
        isDev ? (
            'http://localhost:3000'
        ) : (
            `file://${path.join(__dirname, '../build/index.html')}`
        )
    );
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})
