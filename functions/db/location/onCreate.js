const functions = require('firebase-functions')
const admin = require('firebase-admin')
try { admin.initializeApp(functions.config().firebase) } catch (e) { } // You do that because the admin SDK can only be initialized once.

exports.helloPubSub = functions.pubsub.topic("to-gateway").onPublish(event => {
  const pubSubMessage = event.data
  console.log(pubSubMessage)
  // Get the `name` attribute of the PubSub message JSON body.
  let name = null
  try {
    tid = pubSubMessage.json.tid
    console.log(tid)
  } catch (e) {
    console.error("PubSub message was not JSON", e)
  }
})
