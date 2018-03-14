<template>
  <div id="Employees" style="padding: 100px;" >
  <!-- <q-page-container> -->
  <!-- <link rel="stylesheet" href="https://storage.googleapis.com/code.getmdl.io/1.0.2/material.blue-orange.min.css"> -->

	<q-page class="row">
	  <div class="row no-wrap q-ma-xl" style="max-height: 260px;"  v-for="employee in employees"  >
		  <q-card square color="secondary" >
			    <q-card-media style="background-color: #4c566a; text-align: center;">
  <img :src="employee.photoUrl" style="width: 140px; height: 140px;" class="avatar img-thumbnail hidden-print inline-block q-ma-sm" > 
    <!-- <img src="~assets/sad.svg"> -->
  </q-card-media>
  <!-- <q-card-title>
      {{employee.full_name}}

  </q-card-title> -->
  <q-card-main style="background-color: #4c566a; text-align: center;" >
   <!-- {{employee.full_name}}
    -->
	{{employee.full_name}}

    <!-- <p>$・Italian, Cafe</p>
    <p class="text-faded">Small plates, salads</p> -->
  </q-card-main>
  <q-card-separator />
 <q-card-actions >
        <q-btn flat>View</q-btn>
        <q-btn flat>Contact</q-btn>
        <!-- <q-btn flat>Photo</q-btn> -->
      </q-card-actions>
		  </q-card>
<!-- </q-card> -->
	  </div>
<!-- {{employee}} -->
	 <!-- </div> -->
	 <!-- </div> -->
	  <!-- <q-btn flat @click="createEmployees">Create employes</q-btn> -->
	  </q-page>
    <!-- </q-page-container> -->
  </div>
</template>
  <!--<script src="https://storage.googleapis.com/code.getmdl.io/1.0.2/material.min.js"></script>-->

<script>
// import firebase from "firebase"
import firebase from "./firebaseInit"
import "firebase/firestore"
import "firebase/storage"
import { ENGINE_METHOD_CIPHERS } from "constants"
const db = firebase.firestore()
const storageRef = firebase.storage().ref()
const imagesRef = storageRef.child("home")
// import Raven from 'raven-js'
// console.log(Raven.isSetup())

export default {
	name: "Employees",
	data() {
		return {
			employeeDialog: false,
			employeeFormValid: true,
			newEmployee: {
				id: null,
				name: null,
				url: null,
			},
			employees: [],
			servicesLoading: false,
			editOn: false,
		}
	},
	methods: {
		listEmployees() {
			this.employeesLoading = true
			this.employees = []
			db
				.collection("employees")
				.get()
				.then(querySnapshot => {
					querySnapshot.forEach(doc => {
						const data = {
							name: doc.data.cdl,
							// id: doc.id,
							// emp_id: doc.emp_id,
							// gender: doc.gender,
							// marital_status: doc.marital_status,
							// self_id_method: doc.self_id_method,
							// state: doc.state,
							// vet_type: doc.vet_type,
							// authorised_db_user: doc.authorised_db_user,
							// cdl: doc.cdl,
							// new_hire: doc.new_hire,
							// recent_date_of_hire: doc.recent_date_of_hire,
							// snapshotlogin_name: doc.snapshotlogin_name,
							// password: null,
							// first_name: doc.data.first_name,
							// middle_initial: doc.data.middle_initial,
							// last_name: doc.data.last_name,
							// suffix: doc.data.suffix,
							// preferred_name: doc.data.preferred_name,
							// suffix: doc.data.suffix,
							// other_lastnames: doc.data.suffixother_lastnames,
							// date_of_birth: doc.data.date_of_birth,
							// mailing_address_line_1: doc.data.emp_id,
							// mailing_address_line_2:
							// 	doc.data.mailing_address_line_1,
							// zipcode: doc.data.zipcode,
							// cell_phone: doc.data.cell_phone,
							// alt_phone: doc.data.alt_phone,
							// home_fax: doc.data.home_fax,
							// home_email: doc.data.home_email,
							// photoURL: doc.data.photoURL,
							// notes: doc.data.notes,
							// drivers_license_nbr: doc.data.drivers_license_nbr,
							// signed_docs: doc.data.signed_docs,
						}
						doc.data().photoUrl = '../statics/quasar-logo.png'
						
						// console.log(data)
						// console.log(doc.data.photoUrl)
						// console.log(doc.data().photoUrl)
					// 	if(!doc.data().photoUrl){
					// this.employees.push(doc.data())
					// 	return
					// 	}
					// 		console.log(doc.data().photoUrl)
							
						doc.data().photoUrl = '../statics/quasar-logo.png'
						// console.log(doc.data().photoUrl)
						this.employees.push(doc.data())

})
				})
			this.employeesLoading = false
		},
		createEmployees() {
			let list = [
				{
					first_name: "Ash",
					last_name: "Downing",
					full_name: "Ash Downing",
					gender: "M",
					position: "Techician",
					cellPhone: "903-530-1197",
					wage: 50,
				},
				{
					first_name: "Adreain",
					last_name: "Dunn",
					full_name: "Adreain Dunn",
					gender: "M",
					position: "Lead",
					cellPhone: "903-372-5013",
					wage: 50,
				},
				{
					first_name: "Codey",
					last_name: "Rush",
					gender: "M",
					full_name: "Codey Rush",
					position: "Helper",
					cellPhone: null,
					wage: 50,
				},
				{
					first_name: "Dairi",
					last_name: "Bustos",
					gender: "F",
					full_name: "Dairi Bustos",
					position: "Helper",
					cellPhone: null,
					wage: 50,
				},
				{
					first_name: "Darien",
					last_name: "Dunn",
					gender: "M",
					full_name: "Darien Dunn",
					position: "Helper",
					cellPhone: "903-330-9874",
					wage: 50,
				},
				{
					first_name: "Hilaria",
					last_name: "Robles",
					gender: "F",
					full_name: "Hilaria Robles",
					position: "Techician",
					cellPhone: null,
					wage: 50,
				},

				{
					first_name: "Jerran",
					last_name: "McGee",
					gender: "M",
					full_name: "Jerran McGee",
					position: "Helper",
					cellPhone: "402-598-8309",
					wage: 50,
				},

				{
					first_name: "Jessica",
					last_name: "Johnson",
					gender: "F",
					full_name: "Jessica Johnson",
					position: "Lead",
					cellPhone: "903-603-0837",
					wage: 50,
				},
				{
					first_name: "John",
					last_name: "Chance",
					gender: "M",
					full_name: "John Chance",
					position: "Supervisor",
					cellPhone: "903-571-9131",
					wage: 50,
				},
				{
					first_name: "John",
					last_name: "Weldon",
					gender: "M",
					full_name: "John Weldon",
					position: "Contractor",
					cellPhone: "903-780-3373",
					wage: 50,
				},

				{
					first_name: "Juan",
					last_name: "Leon",
					gender: "M",
					full_name: "Juan Leon",
					position: "Lead",
					cellPhone: "903725013",
					wage: 50,
				},
				{
					first_name: "Kathy",
					last_name: "Loftis",
					gender: "F",
					full_name: "Kathy Loftis",
					position: "Office",
					cellPhone: null,
					wage: 50,
				},
				{
					first_name: "Kayla",
					last_name: "Rush",
					gender: "F",
					full_name: "Kayla Rush",
					position: "Helper",
					cellPhone: "903-780-7073",
					wage: 50,
				},

				{
					first_name: "Letesia",
					last_name: "Ford",
					gender: "F",
					full_name: "Letesia Ford",
					position: "Helper",
					cellPhone: "903-705-5094",
					wage: 50,
				},

				{
					first_name: "Mark",
					last_name: "Schrader",
					gender: "M",
					full_name: "Mark Schrader",
					position: "Manager",
					cellPhone: "903725013",
					wage: 50,
				},
				{
					first_name: "Randi",
					last_name: "Newton",
					gender: "F",
					full_name: "Randi Newton",
					position: "Supervisor",
					cellPhone: "903-617-3485",
					wage: 50,
				},
				{
					first_name: "Nathan",
					last_name: "Dungca",
					gender: "M",
					full_name: "Nathan Dungca",
					position: "Supervisor",
					cellPhone: "903-504-3544",
					wage: 50,
				},

				{
					first_name: "Tawnya",
					last_name: "Jackson",
					gender: "F",
					full_name: "Tawnya Jackson",
					position: "Supervisor",
					cellPhone: "903-705-5467",
					wage: 50,
				},
				{
					first_name: "Virginia",
					last_name: "Rodriguez",
					gender: "F",
					full_name: "Virginia Rodriguez",
					position: "Lead",
					cellPhone: "903-952-7065",
					wage: 50,
				},
			]
			console.log("creating list ", list)
			var i = 0
			for (let value of list) {
				var _userId = (
					value.first_name.charAt(0) +
					"." +
					value.last_name
				).toLowerCase()
				var _email = _userId + "@ashdevtools.com"
				if (i < 10) {
					var _emp_id = "000" + (i++).toString()
				} else {
					var _emp_id = "00" + (i++).toString()
				}
				var _photoUrl =
					"https://firebasestorage.googleapis.com/v0/b/andrewsadmin.appspot.com/o/profilePhotos%2F" +
					_emp_id +
					".jpg?alt=media"
					try{
					console.log(_photoUrl)
					console.log('yay')
					}catch(e){
						console.log(e)
						console.log('get img')
					}
						console.log(doc.data().photoUrl)
				var _fullname = value.first_name + " " + value.last_name
				console.log(_userId)
				// console.log(value.first_name,value.last_name,user_name,_email,cellPhone,position,'0001','0001')
				// db
				// 	.collection("employees")
				// 	.doc(_userId)
				// 	.set({
				// 		emp_id: _emp_id,
				// 		gender: "M",
				// 		work_email: _email,
				// 		marital_status: "s",
				// 		vet_type: null,
				// 		authorised_db_user: true,
				// 		cdl: false,
				// 		new_hire: false,
				// 		recent_date_of_hire: "01/01/2000",
				// 		user_name: _userId,
				// 		password: null,
				// 		first_name: value.first_name,
				// 		middle_initial: null,
				// 		last_name: value.last_name,
				// 		suffix: null,
				// 		preferred_name: _fullname,
				// 		full_name: _fullname,
				// 		other_lastnames: null,
				// 		date_of_birth: "03/06/1975",
				// 		mailing_address_line_1: "3654 Hanover Pl",
				// 		mailing_address_line_2: null,
				// 		zipcode: "75701",
				// 		state: "TX",
				// 		city: "Tyler",
				// 		cell_phone: value.cellPhone,
				// 		alt_phone: null,
				// 		home_fax: null,
				// 		home_email: null,
				// 		notes: [],
				// 		photoUrl: _photoUrl,
				// 		drivers_license_nbr: null,
				// 		position: value.position,
				// 		documents: [],
				// 		wage: value.wage,
				// 	})
			}
		},
		// resetNewService() {
		// 	this.newService = {
		// 		id: null,
		// 		icon: null,
		// 		title: null,
		// 		description: null,
		// 		position: null,
		// 	}
		// 	this.editOn = false
		// 	this.newServiceDialog = false
		// 	this.$refs.serviceForm.reset()
		// },
		// startEdit(service) {
		// 	this.newService = {
		// 		id: service.id,
		// 		icon: service.icon,
		// 		title: service.title,
		// 		description: service.description,
		// 		position: service.position,
		// 	}
		// 	this.editOn = true
		// 	this.newServiceDialog = true
		// },
		// updateService() {
		// 	if (
		// 		!this.newService.icon ||
		// 		!this.newService.title ||
		// 		!this.newService.description ||
		// 		!this.newService.position
		// 	)
		// 		return
		// 	const docRef = db.collection("services").doc(this.newService.id)
		// 	docRef
		// 		.set({
		// 			title: this.newService.title,
		// 			description: this.newService.description,
		// 			position: this.newService.position,
		// 			icon: this.newService.icon,
		// 		})
		// 		.then(doc => {
		// 			this.listServices()
		// 			console.log("Document successfully written!", doc)
		// 			this.resetNewService()
		// 		})
		// 		.catch(() => {
		// 			console.error("Error writing document: ", error)
		// 		})
		// },
		// deleteService(service) {
		// 	if (confirm("Are you sure?")) {
		// 		const docRef = db
		// 			.collection("services")
		// 			.doc(service.id)
		// 			.delete()
		// 			.then(data => {
		// 				this.listServices()
		// 				console.log("Document successfully deleted!")
		// 			})
		// 			.catch(error => {
		// 				console.error("Error removing document: ", error)
		// 			})
		// 	}
		// },
	},
	created() {
		this.listEmployees()
	},
}
</script>

<style scoped>

</style>
