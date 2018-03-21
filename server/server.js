var http = require("http");
var express = require("express");
var RED = require("node-red");

// Create an Express app
var app = express();

// Add a simple route for static content served from 'public'
app.use("/", express.static("public"));

// Create a server
var server = http.createServer(app);

// Create the settings object - see default settings.js file for other options
var settings = {
  uiPort: process.env.PORT || 8000,
  mqttReconnectTime: 15000,
  serialReconnectTime: 15000,
  userDir: "./nodered/",
  debugMaxLength: 1000,
  httpAdminRoot: "/red",
  httpNodeRoot: "/api",
  debugUseColors: true,
  flowFilePretty: true,
  userDir: "/home/ash/andrews-admin/server/red/",
  httpNodeCors: {
    origin: "*",
    methods: "GET,PUT,POST,DELETE"
  },
  functionGlobalContext: {
    Firestore: require("@google-cloud/firestore"),
    jwtdecode: require("jwt-decode"),
    os: require("os"),
    myfirestore: require("./myfirestore")
  },
  logging: {
    console: {
      // Level of logging to be recorded. Options are:
      // fatal - only those errors which make the application unusable should be recorded
      // error - record errors which are deemed fatal for a particular request + fatal errors
      // warn - record problems which are non fatal + errors + fatal errors
      // info - record information about the general running of the application + warn + error + fatal errors
      // debug - record information which is more verbose than info + info + warn + error + fatal errors
      // trace - record very detailed logging + debug + info + warn + error + fatal errors
      // off - turn off all logging (doesn't affect metrics or audit)
      level: "debug",
      metrics: false,
      audit: false
    }
  },
  editorTheme: {
    projects: {
      enabled: true
    }
  }
};

// // Initialise the runtime with a server and settings
RED.init(server, settings);

// // Serve the editor UI from /red
app.use(settings.httpAdminRoot, RED.httpAdmin);

// // Serve the http nodes UI from /api
app.use(settings.httpNodeRoot, RED.httpNode);

server.listen(8000);

// Start the runtime
RED.start();
