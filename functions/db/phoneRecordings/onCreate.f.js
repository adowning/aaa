

const functions = require('firebase-functions')
const admin = require('firebase-admin')
try { admin.initializeApp(functions.config().firebase) } catch (e) { } // You do that because the admin SDK can only be initialized once.

exports = module.exports = functions.storage.bucket('phonerec').object().onChange((event) => {
  console.log(`Hitting`);
  var db = admin.firestore();

  const object = event.data;

  if (object.resourceState === 'not_exists') {
    // Ignore file deletions
  console.log(`Does not exist`);
    
    return true;
  } else if (!/^recordings\/\S+\/audio\.wav$/.test(object.name)) {
    // Ignore changes to non-audio files
  // console.log(``);
    //return true;
  }

  console.log(`Analyzing gs://${object.bucket}/${object.name}`);

  // Imports the Google Cloud client library
const speech = require('@google-cloud/speech');

// Creates a client
const client = new speech.SpeechClient();

const gcsUri = `gs://${object.bucket}/${object.name}`;
// const encoding = 'LINEAR16'; // or FLAC ?
const encoding = 'MULAW'; // or FLAC ?
const sampleRateHertz = 8000;
const languageCode = 'en-US';

const config = {
  encoding: encoding,
  sampleRateHertz: sampleRateHertz,
  languageCode: languageCode,
};

const audio = {
  uri: gcsUri,
};

const request = {
  config: config,
  audio: audio,
};

// Detects speech in the audio file. This creates a recognition job that you
// can wait for now, or get its result later.
client
  .longRunningRecognize(request)
  .then(data => {
    console.log(data)
    const operation = data[0];
    // Get a Promise representation of the final result of the job
    return operation.promise();
  })
  .then(data => {
    const response = data[0];
    console.log(response)
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');
    console.log(`Transcription: ${transcription}`);
    // var docRef = db.collection('transcriptions').doc(object.name);

    // return docRef.set({
    //     // first: 'Ada',
    //     // last: 'Lovelace',
    //     data: transcription,
    //     // born: 1815
    // });
    return grantRef = admin.firestore().ref(`transcriptions/${object.name}`).set({data: transcription})
    // .then(() => {
    //   console.log('set added:')
    // })
  }).then(result => {
    console.log(result)
    return result
  })
  .catch(err => {
    console.error('ERROR:', err);
  });

})