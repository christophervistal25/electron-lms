const electron = require('electron');
const url      = require('url');
const path     = require('path');


const { app , BrowserWindow, Menu, ipcMain } = electron;

let loginWindow, dashboardWindow;

app.on('window-all-closed', function () {
  app.quit();
});

// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', function () {
  // Create the browser window.
  loginWindow = new BrowserWindow({
    width: 500,
    height: 500,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  loginWindow.loadURL('file://' + __dirname + '/index.html');

  // Open the DevTools.
  // loginWindow.webContents.openDevTools()

  // Build menu from template
  // const mainMenu = Menu.buildFromTemplate([]);
  // Menu.setApplicationMenu(mainMenu);

  // Emitted when the window is closed.
  loginWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    loginWindow = null;
  });
});

// Catch if the user login successfully
ipcMain.on('auth:success', (e, user) => {
    loginWindow.hide();
    loginWindow = null;

   dashboardWindow = new BrowserWindow({
    show : false,
    webPreferences: {
        nodeIntegration: true
    }
  });

  dashboardWindow.loadURL('file://' + __dirname + '/dashboard.html');

   // Build menu from template
  // const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  // Menu.setApplicationMenu(mainMenu);

  dashboardWindow.maximize();
  dashboardWindow.show();
  
  dashboardWindow.on('closed', () => {
    dashboardWindow = null;
  });


});

const mainMenuTemplate = [
    {
      label : 'Options',
      submenu : [
        {
          label : 'Quit',
          accelerator : process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
          click() {
              app.quit();
          }
        },
      ]
    }
];