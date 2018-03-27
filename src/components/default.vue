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
		
                <span>{{user.name}}</span>
		
                    <q-btn flat round dense icon="exit to app" label="Logout"  @click="logOut()"></q-btn>
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
  <img :src="user.avatar.medium" class="avatar img-thumbnail hidden-print inline-block" > 
       </div>
   
      </div>
			  <!-- <div class="row justify-center q-mt-sm"> -->
						  <div class="row justify-center q-pt-sm" >
			 <span style="color: white; "><strong>{{user.name}}</strong></span>
       </div>
						  <div class="row justify-center " >
			 <div v-if="user.employee_type != 5">
			 <span style="color: purple;" v-if="currentTimeSheet">Clocked In</span>
			 <span class="q-body-1" v-else>You are not clocked in</span>
			 </div>
			 <div v-else>
         		 <span style="color: purple;" v-if="currentTimeSheet">Billing Hours Started</span>
               <span class="q-body-1" v-else>Contractor</span>
       </div>
						  </div>
       
			<div class="row justify-center q-mt-md" >
      <!-- <q-btn  size="sm" color="secondary" label="Profile" /> -->
			<template v-if="user.employee_type != 5">
      
			<template v-if="currentTimeSheet">
				<q-btn size="sm" color="secondary" label="Start Break"/>
			<p style="padding-left: 5px;"></p> 
      <q-btn size="sm" color="secondary" label="Clock Out" @click="clockOut(false)"/> </template> 
     <q-btn size="sm" color="secondary" label="Clock In" @click="clockIn(false)" v-else/>
 </template>
			<template v-else>
  
			<template v-if="currentTimeSheet">
				<q-btn size="sm" color="secondary" label="Start Break"/>
			<p style="padding-left: 5px;"></p> 
      <q-btn size="sm" color="secondary" label="Stop Billing" @click="clockOut(true)"/> </template> 
     <q-btn size="sm" color="secondary" label="Start Billing" @click="clockIn(true)" v-else/>

      </template>
 
			<template
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
        <q-item-main style="color: grey;" label="Dashboard"  />
      </q-item>
  <q-collapsible indent icon="devices other" label="Assets" >
      <q-item to="/hardware">
        <q-item-main label="Hardware"  />
      </q-item>
           <q-item to="/consumables">
        <q-item-main  label="Consumables"  />
      </q-item>
                 <q-item to="/groups">
        <q-item-main style="color: grey;" label="Groups"  />
      </q-item>
  </q-collapsible>
   <q-item to="/workshop">
        <q-item-side icon="build" />
        <q-item-main style="color: grey;" label="Work Shop"  />
      </q-item>
  <q-collapsible indent icon="person" label="Employees" >
      <q-item to="/directory">
        <q-item-main label="Directory"/>
      </q-item>
         <q-item to="/nowhere">
        <q-item-main style="color: grey;" label="Applicants"/>
      </q-item>
     <q-item :to="'/profile?id='+user.emp_id+''">
        <q-item-main label="My Profile"/>
      </q-item>
  </q-collapsible>
    <q-item to="/services">
        <q-item-side icon="assignment" />
        <q-item-main style="color: grey;" label="Customer Center"  />
      </q-item>
   <q-item to="/services">
        <q-item-side icon="assignment" />
        <q-item-main style="color: grey;" label="Documents"  />
      </q-item>
       
       <q-item to="/logs">
        <q-item-side icon="list" />
        <q-item-main style="color: grey;" label="Logs"  />
      </q-item>
</q-list>

</div>
    </q-layout-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-layout-footer v-model="footer"  >
      <q-toolbar :inverted="$q.theme === 'ios'" style="background-color: #b48ead !important; color:#4c566a;">
        <div class="row items-center">
           <!-- Battery status is: <strong>{{ batteryStatus }}</strong> -->
					<!-- Coords: {{location}} -->
        </div>
      </q-toolbar>
    </q-layout-footer>
     <q-modal v-model="opened" :content-css="{minWidth: '50vw', minHeight: '70vh'}">
  <q-modal-layout>
    <!-- <q-toolbar slot="header"> -->
      <!-- <q-btn
        flat
        round
        dense
        v-close-overlay
        icon="keyboard_arrow_left"
      />
      -->
    <!-- </q-toolbar> -->

    <q-toolbar slot="header">
    Enter 
    </q-toolbar>

    <q-toolbar slot="footer">
         <q-btn
        color="primary"
        v-close-overlay
        label="Submit"
        @click="contractorLogin()"
      />
         <q-btn
        color="primary"
        v-close-overlay
        label="Cancel"
      />
      </q-toolbar-title>
      
    </q-toolbar>
<q-alert
          color="warning"
          inline
          class="q-mb-md"
        > I plan to tie this into the assets we have to track what is costing what. If you make a mistake or forget to clock in be sure to let me know so I can adjust. </q-alert>
    <div class="layout-padding">
 <!-- Single Line Input -->
 <q-form>

<label dark>Enter equipment you plan to work on:</label>
<q-input v-model="item1" float-label="Item 1" placeholder="" />
<q-input v-model="item2" float-label="Item 2" placeholder="" />
<q-input v-model="item3" float-label="Item 3" placeholder="" />
<br>
<!-- Multiple Line Input -->
<q-input
  v-model="modal_notes"
  type="textarea"
  float-label="Enter notes here and please include what was originally wrong"
  :max-height="100"
  rows="7"
/><!-- max-height refers to pixels -->
 </q-form>

     
      <!-- <p>Enter notes here</p> -->
    </div>
  </q-modal-layout>
</q-modal>
  </q-layout>
</template>
</template>
<script>
import { openURL } from "quasar";
import router from "../router";
import footer from "quasar";
// import store from "../store"
import { Notify } from "quasar";
const querystring = require("querystring");
export default {
  name: "LayoutDefault",
  data() {
    return {
      item1: "",
      item2: "",
      item3: "",
      modal_notes: "",
      opened: false,
      leftDrawerOpen: true,
      search: " ",
      footer: true,
      batteryStatus: "determining..."
    };
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
      );
    },
    currentTimeSheet() {
      return this.$store.getters.currentTimeSheet;
    },
    user() {
      return this.$store.getters.user;
    },
    error() {
      return this.$store.getters.error;
    },
    onlineUsers() {
      return this.$store.getters.onlineUsers;
    }
    // location() {
    //   return this.$getLocation();
    // }
  },
  watch: {
    user(value) {
      console.log("USER CHANGED");
      console.log(value);
      if (value == null || value == undefined) {
        this.$router.push("/login");
      }
    }
  },
  created() {
    // console.log("default layout created")
    // if (!this.userIsAuthenticated) {
    // 	console.log("  xfering to login")
    // 	this.$router.push("/login")
    // }
    window.addEventListener("batterystatus", this.updateBatteryStatus, false);

    // var position = this.$vuexGeolocation.getCurrentPosition(10);

    this.$store.dispatch("loadOnlineUsers");
  },
  beforeDestroy() {
    // we make some cleanup;
    // we need to remove the event listener
    window.removeEventListener(
      "batterystatus",
      this.updateBatteryStatus,
      false
    );
  },
  methods: {
    contractorLogin() {
      var notes =
        this.item1 +
        "," +
        this.item1 +
        "," +
        this.item1 +
        "," +
        this.modal_notes;
      console.log(notes);
    },
    clockOut(contractor) {
      var vm = this;
      this.$store
        .dispatch("clockUserOutDeputy", {})
        .then(function() {
          // Notify.create("You have been loged out")
          // vm.$router.push({ path: "/" })
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    clockIn(contractor) {
      if (contractor) {
        this.opened = true;
      }
      var vm = this;
      this.$store
        .dispatch("clockUserInDeputy", {})
        .then(function() {
          // Notify.create("You have been loged out")
          // vm.$router.push({ path: "/" })
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    updateBatteryStatus(status) {
      this.batteryStatus = `Level: ${status.level}, plugged: ${
        status.isPlugged
      }`;
    },
    // openURL,
    logOut(reason) {
      var vm = this;
      this.$store
        .dispatch("signUserOut", {})
        .then(function(x) {
          console.log(x);
          Notify.create("You have been loged out");
          //vm.$router.push({ path: "/" });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    beforeDestroy() {
      // we make some cleanup;
      // we need to remove the event listener
      window.removeEventListener(
        "batterystatus",
        this.updateBatteryStatus,
        false
      );
    }
  }
};
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
