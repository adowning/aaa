const functions = require('firebase-functions')
const admin = require('firebase-admin')
const moment = require('moment')

admin.initializeApp(functions.config().firebase)
const today = moment().format('YYYY-MM-DD')

exports.updatePomodori = functions.database.ref('/tasks/{userId}/{taskId}')
  .onWrite((event) => {
    if (!event.data.previous.val()) {
      return
    }
    /* eslint-disable */
    const originalPomodori = event.data.previous.child('pomodori').val()
    const currentPomodori = event.data.child('pomodori').val()
    if (currentPomodori > originalPomodori) {
      console.log('A pomodoro has been added')
      console.log('Querying to see if a dailypoms entry exists for today...')
      admin.database().ref(`dailypoms/${event.params.userId}`).orderByChild('date').equalTo(today).limitToFirst(1).once('value', (snapshot) => {
        if (snapshot.exists()) {
          console.log('It does! Adding a pomodoro.')
          let theKey
          snapshot.forEach((childSnapshot) => {
            theKey = childSnapshot.key
          })
          const newDailyPoms = snapshot.child(`${theKey}/pomodori`).val() + 1
          return admin.database().ref(`dailypoms/${event.params.userId}/${theKey}`).update({ pomodori: newDailyPoms })
        } else {
          console.log('it doesn\'t exist')
          admin.database().ref(`dailypoms/${event.params.userId}`).push({ date: today, pomodori: 1 })
          return
        }
      })
    } else {
      console.log('No pomodoro added by user — nothing to do here.')
      return
    }
})

// [END all]
//  const functions = require('firebase-functions');

//  exports.helloWorld = functions.https.onRequest((request, response) => {
//   response.send("Hello from Firebase!");
//  });
// "use strict"
/** EXPORT ALL FUNCTIONS
 *
 *   Loads all `.f.js` files
 *   Exports a cloud function matching the file name
 *
 *   Based on this thread:
 *     https://github.com/firebase/functions-samples/issues/170
 */
// const glob = require("glob")
// const camelCase = require("camelcase")

// const files = glob.sync("./**/*.f.js", {
//   cwd: __dirname,
//   ignore: "./node_modules/**",
// })
// for (let f = 0, fl = files.length; f < fl; f++) {
//   const file = files[f]
//   const functionName = camelCase(
//     file
//       .slice(0, -5)
//       .split("/")
//       .join("_")
//   )
//   if (
//     !process.env.FUNCTION_NAME ||
//     process.env.FUNCTION_NAME === functionName
//   ) {
//     exports[functionName] = require(file)
//   }
// }


