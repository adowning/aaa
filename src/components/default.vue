<template>
  <q-layout view="lHh Lpr fFf">
    <!-- <div @once="logOut">asdf</div> -->
    <q-layout-header>
      <q-toolbar color="primary">
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
        >
          <q-icon name="menu" />
        </q-btn>
        <q-toolbar-title>
          <!-- Andrews Group -->
          <!-- <div slot="subtitle">Administration Application v0.0.1</div> -->
        </q-toolbar-title>
        <q-search inverted v-model="search" color="none" value="x" class="q-mr-xl" />
                <q-btn flat round dense icon="exit to app" label="Logout"  @click="logOut()"></q-btn>
                <span>{{user.username}}</span>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      content-class="bg-grey-2"
    >
		<div >
 <q-toolbar-title class="row justify-center q-mt-md" >
          Andrews Group
          <!-- <div slot="subtitle">Administration Application v0.0.1</div> -->
        </q-toolbar-title>
		</div>
     <div id="profile" class="row justify-center">
       <div row class="q-pt-lg">
  <img :src="user.photoURL" class="avatar img-thumbnail hidden-print inline-block" > 
       </div>
   
      </div>
			  <!-- <div class="row justify-center q-mt-sm"> -->
						  <div class="row justify-center q-pt-sm" >
			 <span style="color: white; "><strong>{{user.username}}</strong></span>
       </div>
						  <div class="row justify-center " >
			 
			 <span style="color: green;" v-if="user.isClockedIn">On Shift</span>
			 <span class="q-body-1" v-else>No scheduled shifts</span>
			 
			 <!-- <div class="q-caption">Administration Applicat</div>  -->
						  </div>
       <!-- </div> -->
			 
			<div class="row justify-center q-mt-md" >
      <!-- <q-btn  size="sm" color="secondary" label="Profile" /> -->
			<template v-if="user.isClockedIn">
				<q-btn size="sm" color="secondary" label="Start Break" @click="takeBreak()"/>
			<p style="padding-left: 5px;"></p> 
      <q-btn size="sm" color="secondary" label="Clock Out" @click="clockOut()"/></template>
     <q-btn size="sm" color="secondary" label="Clock In" @click="clockIn()" v-else/>
  
			
			</div>
			<hr>
     <div row>
     <q-list no-border link >
      <q-item to="/liveview"  >
        <q-item-side icon="local shipping" />
        <q-item-main label="Live View"  />
      </q-item>
       <q-item to="/dashboard"  >
        <q-item-side icon="local shipping" />
        <q-item-main label="Dashboard"  />
      </q-item>
  <q-collapsible indent icon="devices other" label="Assets" >
      <q-item to="/hardware">
        <q-item-main label="Hardware"  />
      </q-item>
           <q-item to="/consumables">
        <q-item-main label="Consumables"  />
      </q-item>
                 <q-item to="/groups">
        <q-item-main label="Groups"  />
      </q-item>
  </q-collapsible>
   <q-item to="/workshop">
        <q-item-side icon="build" />
        <q-item-main label="Work Shop"  />
      </q-item>
  <q-collapsible indent icon="person" label="Employees" >
      <q-item to="/directory">
        <q-item-main label="Directory"/>
      </q-item>
     <q-item :to="'/profile?id='+user.emp_id+''">
        <q-item-main label="My Profile"/>
      </q-item>
  </q-collapsible>
   <q-item to="/services">
        <q-item-side icon="assignment" />
        <q-item-main label="Documents"  />
      </q-item>
       <q-item to="/logs">
        <q-item-side icon="list" />
        <q-item-main label="Logs"  />
      </q-item>
</q-list>

</div>
    </q-layout-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-layout-footer v-model="footer"  >
      <q-toolbar :inverted="$q.theme === 'ios'" style="background-color: #b48ead !important; color:#4c566a;">
        <q-toolbar-title class="q-caption">
           <!-- Battery status is: <strong>{{ batteryStatus }}</strong> -->

        </q-toolbar-title>
      </q-toolbar>
    </q-layout-footer>
  </q-layout>
</template>

<script>
import { openURL } from "quasar"
import router from "../router"
import footer from "quasar"
// import store from "../store"
import { Notify } from "quasar"
const querystring = require("querystring")
export default {
	name: "LayoutDefault",
	data() {
		return {
			leftDrawerOpen: true,
			search: " ",
			footer: true,
			batteryStatus: "determining...",
		}
	},
	// beforeRouteEnter(to, from, next) {
	// 	var vm = this
	// 	if (!store.getters.user) {
	// 		router.push("/login")
	// 	}
	// },
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
		onlineUsers() {
			return this.$store.getters.onlineUsers
		},
	},
	watch: {
		user(value) {
			console.log("USER CHANGED")
			console.log(value)
			if (value == null || value == undefined) {
				this.$router.push("/login")
			}
		},
	},
	created() {
		// console.log("default layout created")
		// if (!this.userIsAuthenticated) {
		// 	console.log("  xfering to login")
		// 	this.$router.push("/login")
		// }
		window.addEventListener(
			"batterystatus",
			this.updateBatteryStatus,
			false,
		)

		this.$store.dispatch("loadOnlineUsers")
	},
	beforeDestroy() {
		// we make some cleanup;
		// we need to remove the event listener
		window.removeEventListener(
			"batterystatus",
			this.updateBatteryStatus,
			false,
		)
	},
	methods: {
		clockOut() {
			var vm = this
			this.$store
				.dispatch("clockUserOutDeputy", {})
				.then(function() {
					// Notify.create("You have been loged out")
					// vm.$router.push({ path: "/" })
				})
				.catch(function(error) {
					console.log(error)
				})
		},
		clockIn() {
			var vm = this
			this.$store
				.dispatch("clockUserInDeputy", {})
				.then(function() {
					// Notify.create("You have been loged out")
					// vm.$router.push({ path: "/" })
				})
				.catch(function(error) {
					console.log(error)
				})
		},
		updateBatteryStatus(status) {
			this.batteryStatus = `Level: ${status.level}, plugged: ${
				status.isPlugged
			}`
		},
		// openURL,
		logOut(reason) {
			var vm = this
			this.$store
				.dispatch("signUserOut", {})
				.then(function() {
					Notify.create("You have been loged out")
					vm.$router.push({ path: "/" })
				})
				.catch(function(error) {
					console.log(error)
				})
		},
		beforeDestroy() {
			// we make some cleanup;
			// we need to remove the event listener
			window.removeEventListener(
				"batterystatus",
				this.updateBatteryStatus,
				false,
			)
		},
	},
}
</script>

<style scoped>
img.avatar {
	width: 100px;
	height: 100px;
	border-radius: 50%;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2), 0 1px 1px rgba(0, 0, 0, 0.14),
		0 2px 1px -1px rgba(0, 0, 0, 0.12);
	vertical-align: bottom;
}
#profile {
	height: 120px;
}
</style>
