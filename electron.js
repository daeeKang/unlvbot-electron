const { app, BrowserWindow } = require('electron')
const puppet = require('./puppet')
const path = require('path')
const ipc = require('electron').ipcMain

let win

function createWindow () {
  win = new BrowserWindow({
    width: 800,
    height: 700,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile(path.join(__dirname + '/renderer/index.html'))
  win.webContents.openDevTools()
  win.on('closed', () => {
    win = null
  })


}

//get classes with puppeteer
ipc.on('get-class', (event, arg) => {
  let classInfo = arg;
  puppet.getClass(classInfo.className, classInfo.classNum, classInfo.isOpen).then(data => {
    event.sender.send('got-class', data);
  })
})

ipc.on('enlarge-window', (event, arg) => {
  win.setBounds({
    width: 1400
  })
})

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