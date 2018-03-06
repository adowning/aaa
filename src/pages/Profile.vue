<template>
  <q-page padding class="row justify-center">

    <div style="width: 800px; max-width: 90vw;" :v-if="userIsAuthenticated" >
    

      <q-tabs inverted color="secondary" align="justify">
        <q-tab default name="mails" slot="title" icon="business" label="Basic Info" />
        <q-tab name="alarms" slot="title" icon="devices other" label="Checked Assets" />
        <q-tab name="movies" slot="title" icon="history" label="History" />

        <q-tab-pane name="mails">
                    <div class="row">  
 <div class="col-md-3 col-lg-3 " >    
                         <img v-bind:src="user.photoURL" style="height: 160px;"> 
                  
                         </div>
        <div class=" col-md-9 col-lg-9 "> 
                  <q-list highlight>
                      <q-item>
                        <q-item-side label>Position:</q-item-side>
                       <q-item-main>
                        <q-item-tile>{{user.department}}</q-item-tile>
                         </q-item-main>
                      </q-item>
                      <q-item>
                        <q-item-side label>Hire date:</q-item-side>
                       <q-item-main>
                        
                        <q-item-tile>{{user.hire_date}}</q-item-tile>
                       </q-item-main>

                      </q-item>
                
                        <q-item>
                        <q-item-side label>Home Address:</q-item-side>
               <q-item-main>
                 {{user.address}}
                 <br>{{user.city}}
                 <br> {{user.country}}
                 </q-item-main>  
                      </q-item>
                      <q-item>
                        <q-item-side label>Email:</q-item-side>
                        <q-item-main><a href="mailto:" user.email>{{user.email}}</a></q-item-main>
                      </q-item>
                      <q-item>
                        <q-item-side label>Phone Number:</q-item-side>
                        <q-item-main>{{user.phone}}
                        </q-item-main>
                      </q-item>
                     
                  </q-list>
                
                </div>
                    </div>
        </q-tab-pane>
        <q-tab-pane name="alarms">Checked Assets</q-tab-pane>
        <q-tab-pane name="movies">History</q-tab-pane>
      </q-tabs>
      </div>
    
</q-page>
    </template>
<script>
// import auth from "../utils/auth";
// import store from "../store";

export default {
	name: "Profile",
	data: () => ({
		// profile: {},
		// userInfo: {},
		// imageURL: "",
		// okShow: false,
		errors: [],
	}),
	computed: {
		userIsAuthenticated() {
			return (
				this.$store.getters.user !== null &&
				this.$store.getters.user !== undefined
			)
		},
		user() {
			return this.$store.getters.user
		},
		error() {
			return this.$store.getters.error
		},
		loading() {
			return this.$store.getters.loading
		},
	},
	watch: {
		user(value) {
			console.log(value)
			if (value == null || value == undefined) {
				// this.$router.push('/profile')
				console.log("lost user")
			}
		},
	},
	methods: {
		//     getUserProfile() {
		//     if(window.localStorage.getItem("userInfo")){
		//       this.profile = JSON.parse(window.localStorage.getItem("profile"))
		//       this.imageURL = window.localStorage.getItem("image")
		//       this.userInfo = JSON.parse(window.localStorage.getItem("userInfo"))
		//       this.okShow = true
		// console.log(this.okShow)
		//     }
		//     }
	},
}
</script>


<style scoped>
img.avatar {
	width: 150px;
	height: 150px;
	border-radius: 50%;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2), 0 1px 1px rgba(0, 0, 0, 0.14),
		0 2px 1px -1px rgba(0, 0, 0, 0.12);
	vertical-align: middle;
}
.panel-heading {
	background: #8fbcbb;
}
.panel-footer {
	background: #ffffff;
}
.q-item-side {
	width: 120px;
	color: #8fbcbb;
}
</style>
