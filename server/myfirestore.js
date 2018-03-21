const Firestore = require("@google-cloud/firestore");
var fs = {};
const firestore = new Firestore({
  projectId: "andrewsadmin",
  keyFilename: "./red/keyfile.json"
});

fs.addDeployedAsset = function(data) {
  const document = firestore.doc(`deployedAssets/${data.id}`);
  document
    .set(data)
    .then(() => {
      console.log("Created deployedAsset " + data.id);
      return "good";
    })
    .catch(error => {
      console.log(error);
      return error;
    });
};
fs.addTrackedAsset = function(data) {
  const document = firestore.doc(`trackedAssets/${data.tid}`);
  document
    .set(data)
    .then(() => {
      console.log("Created trackedAsset " + data.tid);
      return "good";
    })
    .catch(error => {
      console.log(error);
      return error;
    });
};

// // Update an existing document.
// document
//   .update({
//     body: "My first Firestore app"
//   })
//   .then(() => {
//     // Document updated successfully.
//   });

// // Read the document.
// document.get().then(doc => {
//   // Document read successfully.
// });

// // Delete the document.
// document.delete().then(() => {
//   // Document deleted successfully.
// });

module.exports = fs;
