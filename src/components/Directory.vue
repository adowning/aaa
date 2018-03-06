<template>
  <div id="Employees" >
  <q-page-container>
  <link rel="stylesheet" href="https://storage.googleapis.com/code.getmdl.io/1.0.2/material.blue-orange.min.css">


<q-card inline style="width: 500px">
  <q-card-media>
    <img src="../assets/sad.svg">
  </q-card-media>
  <q-card-title>
    Cafe Basilico
    <q-rating slot="subtitle" v-model="stars" :max="5" /> -->
    <div slot="right" class="row items-center">
      <q-icon name="place" /> 250 ft
   </div>
  </q-card-title>
  <q-card-main>
    <p>$・Italian, Cafe</p>
    <p class="text-faded">Small plates, salads & sandwiches in an intimate setting.</p>
  </q-card-main>
  <q-card-separator />
  <q-card-actions>
    <q-btn flat round dense icon="event" />
    <q-btn flat label="5:30PM" />
    <q-btn flat label="7:30PM" />
    <q-btn flat label="9:00PM" />
    <q-btn flat color="primary" label="Reserve" />
  </q-card-actions>
</q-card>
    <div class="col-8">
    <div class="mdl-card mdl-shadow--2dp demo-card-square">
    <div class="mdl-card__title mdl-card--expand">
      <h2 class="mdl-card__title-text">Card 1</h2>
    </div>
    <div class="mdl-card__supporting-text">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenan convallis.
    </div>
    <div class="mdl-card__actions mdl-card--border">
      <a class="mdl-button mdl-button--accent mdl-js-button mdl-js-ripple-effect">
          Action
        </a>
    </div>
  </div>
  </div>
   <!-- <q-card>
                <q-card-title>
                <span v-if="!editOn" class="headline">Create New Service</span>
                <span v-else class="headline">Edit Service</span>
                </q-card-title>
                <q-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12>
                                <v-form v-model="serviceFormValid" ref="serviceForm" lazy-validation>
                                    <v-text-field name="icon" label="icon" v-model="newService.icon" required
                                    :rules="[v => !!v || 'Item is required']"></v-text-field>
                                    <v-text-field name="title" label="title" v-model="newService.title" required
                                    :rules="[v => !!v || 'Item is required']"></v-text-field>
                                    <v-text-field textarea name="description" label="description" v-model="newService.description" required
                                    :rules="[v => !!v || 'Item is required']"></v-text-field>
                                    <v-text-field type="number" name="position" label="position" v-model="newService.position" required
                                    :rules="[v => !!v || 'Item is required']"></v-text-field>
                                </v-form>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </q-card-text>
                <q-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.native="resetNewService()">Cancel</v-btn>
                <v-btn v-if="!editOn" color="teal darken-1" flat @click.native="createNewService()" :disabled="!serviceFormValid">Submit</v-btn>
                <v-btn v-else color="teal darken-1" flat @click.native="updateService()" :disabled="!serviceFormValid">Submit</v-btn>
                </q-card-actions>
            </q-card> -->
 <!-- <v-card>
                <v-card-title>
                <span v-if="!editOn" class="headline">Create New Service</span>
                <span v-else class="headline">Edit Service</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12>
                                <v-form v-model="serviceFormValid" ref="serviceForm" lazy-validation>
                                    <v-text-field name="icon" label="icon" v-model="newService.icon" required
                                    :rules="[v => !!v || 'Item is required']"></v-text-field>
                                    <v-text-field name="title" label="title" v-model="newService.title" required
                                    :rules="[v => !!v || 'Item is required']"></v-text-field>
                                    <v-text-field textarea name="description" label="description" v-model="newService.description" required
                                    :rules="[v => !!v || 'Item is required']"></v-text-field>
                                    <v-text-field type="number" name="position" label="position" v-model="newService.position" required
                                    :rules="[v => !!v || 'Item is required']"></v-text-field>
                                </v-form>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.native="resetNewService()">Cancel</v-btn>
                <v-btn v-if="!editOn" color="teal darken-1" flat @click.native="createNewService()" :disabled="!serviceFormValid">Submit</v-btn>
                <v-btn v-else color="teal darken-1" flat @click.native="updateService()" :disabled="!serviceFormValid">Submit</v-btn>
                </v-card-actions>
            </v-card> -->
    </q-page-container>
  </div>
</template>
  <script src="https://storage.googleapis.com/code.getmdl.io/1.0.2/material.min.js"></script>

<script>
// import firebase from "firebase"
import firebase from "./firebaseInit";
import "firebase/firestore";
import "firebase/storage";

const db = firebase.firestore();
const storageRef = firebase.storage().ref();
const imagesRef = storageRef.child("home");

export default {
  name: "Employees",
  data() {
    return {
      newServiceDialog: false,
      serviceFormValid: true,
      newService: {
        id: null,
        name: null,
        url: null
        // description: null,
        // position: null,
      },
      // tableHeaders: [
      // 	{ text: "Position", value: "position" },
      // 	{ text: "Icon", value: "icon" },
      // 	// { text: "Title", value: "title" },
      // 	// { text: "Description", value: "description" },
      // ],
      services: [],
      servicesLoading: false,
      editOn: false
    };
  },
  methods: {
    listServices() {
      this.servicesLoading = true;
      this.services = [];
      db
        .collection("employees")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const data = {
              id: doc.id,
              icon: doc.data().name,
              title: doc.data().url
              // description: doc.data().description,
              // position: doc.data().position,
            };
            this.services.push(data);
          });
        });
      this.servicesLoading = false;
    },
    createNewService() {
      if (
        !this.newService.name ||
        !this.newService.url
        // !this.newService.description ||
        // !this.newService.position
      )
        return;
      db
        .collection("services")
        .add({
          icon: this.newService.name,
          title: this.newService.url
          // description: this.newService.description,
          // position: this.newService.position,
        })
        .then(docRef => {
          this.listServices();
          this.resetNewService();
          this.newServiceDialog = false;
        })
        .catch(error => console.log(err));
    },
    resetNewService() {
      this.newService = {
        id: null,
        icon: null,
        title: null,
        description: null,
        position: null
      };
      this.editOn = false;
      this.newServiceDialog = false;
      this.$refs.serviceForm.reset();
    },
    startEdit(service) {
      this.newService = {
        id: service.id,
        icon: service.icon,
        title: service.title,
        description: service.description,
        position: service.position
      };
      this.editOn = true;
      this.newServiceDialog = true;
    },
    updateService() {
      if (
        !this.newService.icon ||
        !this.newService.title ||
        !this.newService.description ||
        !this.newService.position
      )
        return;
      const docRef = db.collection("services").doc(this.newService.id);
      docRef
        .set({
          title: this.newService.title,
          description: this.newService.description,
          position: this.newService.position,
          icon: this.newService.icon
        })
        .then(doc => {
          this.listServices();
          console.log("Document successfully written!", doc);
          this.resetNewService();
        })
        .catch(() => {
          console.error("Error writing document: ", error);
        });
    },
    deleteService(service) {
      if (confirm("Are you sure?")) {
        const docRef = db
          .collection("services")
          .doc(service.id)
          .delete()
          .then(data => {
            this.listServices();
            console.log("Document successfully deleted!");
          })
          .catch(error => {
            console.error("Error removing document: ", error);
          });
      }
    }
  },
  created() {
    this.listPhotos();
  }
};
// processFiles(event) {
//   this.photosToUpload = event.target.files;
// },
// uploadPhotos() {
//   this.uploadOn = true;
//   const ref = "homePhotos";
//   Array.from(this.photosToUpload).forEach(photo => {
//     var uploadTask = storageRef.child(ref + "/" + photo.name).put(photo);
//     // Register three observers:
//     // 1. 'state_changed' observer, called any time the state changes
//     // 2. Error observer, called on failure
//     // 3. Completion observer, called on successful completion
//     uploadTask.on(
//       "state_changed",
//       function(snapshot) {
//         // Observe state change events such as progress, pause, and resume
//         // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//         this.uploadProgress = parseInt(
//           snapshot.bytesTransferred / snapshot.totalBytes * 100
//         );
//         console.log("Upload is " + this.uploadProgress + "% done");
//       },
//       error => {
//         // Handle unsuccessful uploads
//       },
//       () => {
//         // Handle successful uploads on complete
//         // For instance, get the download URL: https://firebasestorage.googleapis.com/...
//         console.log("snapshot", uploadTask.snapshot);
//         var downloadURL = uploadTask.snapshot.downloadURL;
//         // Add a new document with a generated id.
//         var photoObj = {
//           url: downloadURL,
//           path: ref + "/" + photo.name,
//           name: photo.name
//         };
//         db
//           .collection(ref)
//           .add(photoObj)
//           .then(docRef => {
//             this.listPhotos();
//             console.log("Document written with ID: ", docRef.id);
//           })
//           .catch(error => {
//             console.error("Error adding document: ", error);
//           });
//       }
//     );
//     this.uploadOn = false;
//     this.uploadDialog = false;
//     this.photosToUpload = [];
//   });
// },
// cancelUpload() {
//   this.uploadDialog = false;
//   this.photosToUpload = [];
// },
// positionPhoto(photo, collection) {
//   const docRef = db.collection(collection).doc(photo.id);
//   docRef
//     .set({
//       id: photo.id,
//       name: photo.name,
//       path: photo.path,
//       url: photo.url,
//       position: photo.position
//     })
//     .then(doc => {
//       this.cancelPosition();
//     })
//     .catch(() => {
//       console.error("Error editing document: ", error);
//     });
// },
// cancelPosition() {
//   this.positionDialog = false;
//   this.currentPhoto = {
//     id: null,
//     name: null,
//     path: null,
//     url: null,
//     position: null
//   };
// },
// startPosition(photo) {
//   this.positionDialog = true;
//   this.currentPhoto = photo;
// },
// deletePhoto(photo, collection) {
//   if (confirm("Are you sure?")) {
//     var desertRef = storageRef.child(photo.path);
//     // Delete the file
//     desertRef
//       .delete()
//       .then(function() {
//         // File deleted successfully
//       })
//       .catch(function(error) {
//         // Uh-oh, an error occurred!
//       });
//     db
//       .collection(collection)
//       .doc(photo.id)
//       .delete()
//       .then(data => {
//         this.listPhotos();
//         console.log("Document successfully deleted!");
//       })
//       .catch(error => {
//         console.error("Error removing document: ", error);
//       });
//   }
// },
// openPreview() {
//   this.previewDialog = true;
// },
// closePreview() {
//   this.previewDialog = false;
// }
</script>

<style scoped>
.demo-card-square.mdl-card {
  width: 320px;
  height: 320px;
  float: left;
  margin: 1rem;
  position: relative;
}

.demo-card-square.mdl-card:hover {
  box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14),
    0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);
}

.demo-card-square > .mdl-card__title {
  color: #fff;
  background: #03a9f4;
}

.demo-card-square > .mdl-card__accent {
  background: #ff9800;
}

body {
  padding: 20px;
  background: #fafafa;
  position: relative;
}
</style>
