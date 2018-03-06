import { app, BrowserWindow } from "electron"
app.commandLine.appendSwitch("remote-debugging-port", "8315")
const Config = require("electron-config")
const config = new Config()
import { autoUpdater } from "electron-updater"
autoUpdater.checkForUpdatesAndNotify()
/**
 * Set `__statics` path to static files in production;
 * The reason we are setting it here is that the path needs to be evaluated at runtime
 */
if (process.env.PROD) {
  global.__statics = require("path")
    .join(__dirname, "statics")
    .replace(/\\/g, "\\\\")
}

let win

function createWindow() {
  /**
   * Initial window options
   */
  let opts = {
    show: false,
    backgroundColor: "#4c566a",
    webPreferences: {
      // nodeIntegration: false,
      partition: "persist:main",
    },
  }
  Object.assign(opts, config.get("winBounds"))
  win = new BrowserWindow(opts)
  win.loadURL(process.env.APP_URL)

  win.once("ready-to-show", win.show)

  win.loadURL(process.env.APP_URL)

  win.on("close", () => {
    config.set("winBounds", win.getBounds())
  })
}

app.on("ready", createWindow)

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", () => {
  if (win === null) {
    createWindow()
  }
})
