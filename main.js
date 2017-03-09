var menubar = require('menubar')


var mb = menubar({
    width: 250,
    height: 300,
    center: true,
});

mb.on('before-show', function ready () {
  mb.window.reload()
})

mb.on('hide', function ready () {
  mb.window.reload()
})

mb.on('after-create-window', function ready () {
  //mb.window.openDevTools();
  mb.window.isResizable(true);
})


var ipcMain = require('electron').ipcMain;
ipcMain.on('asynchronous-message', (event, data) => {
  mb.window.setSize(data.width, data.height);
})