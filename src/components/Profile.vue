<template>
  <q-page padding class="row justify-center">

    <div style="width: 800px; max-width: 90vw;" :v-if="userIsAuthenticated" >
    

      <q-tabs inverted color="secondary" align="justify">
        <q-tab default name="mails" slot="title" icon="business" label="Basic Info" />
        <q-tab name="alarms" slot="title" icon="devices other" label="Checked Assets" />
        <q-tab name="movies" slot="title" icon="history" label="Activity" />

        <q-tab-pane name="mails">
                    <div class="row">  
 <div class="col-md-3 col-lg-3 " >    
                         <img v-bind:src="user.avatar.medium" style="height: 160px;"> 
                  <div class="row justify-center">{{user.name}}</div>
                         </div>
        <div class=" col-md-9 col-lg-9 "> 
                  <q-list highlight>
                      <q-item>
                        <q-item-side label>Position:</q-item-side>
                       <q-item-main>

                        <q-item-tile v-if="user.employee_type != 5">{{user.group_name}}</q-item-tile>
                        <q-item-tile v-else>Contractor</q-item-tile>
                         </q-item-main>
                      </q-item>
                      <q-item>
                        <q-item-side label>Hire date:</q-item-side>
                       <q-item-main>
                        
                        <q-item-tile>{{user.work_start_date}}</q-item-tile>
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
                        <q-item-main><a href="mailto:" user.email >{{user.email}}</a></q-item-main>
                      </q-item>
                      <q-item>
                        <q-item-side label>Phone Number:</q-item-side>
                        <q-item-main>{{user.cell_phone}}
                        </q-item-main>
                      </q-item>
                     
                  </q-list>
                
                </div>
                    </div>
        </q-tab-pane>
        <q-tab-pane name="alarms">
			<template>
  <q-table
    ref="table"
    :data="serverData"
    :columns="columns"
    :filter="filter"
    row-key="name"
    :pagination.sync="serverPagination"
    :loading="loading"
    @request="request"
  >  
   <q-tr slot="body" slot-scope="props" :props="props">

    <q-td key="asset_tag" :props="props">{{ props.row.asset_tag }}</q-td>

         <q-td key="model" :props="props">{{ props.row.model.name }}</q-td>
        <q-td key="category" :props="props">{{ props.row.category.name }}</q-td>
   
   </q-tr>
  </q-table>
  <h5 v-if="serverData.length < 1">You have nothing checked out to you</h5>
</template>
		</q-tab-pane>
        <q-tab-pane name="movies">
			<q-list>
				
				
				<q-item tag="label">
  <q-item-main>
    <q-item-tile label>Last Active</q-item-tile>
    <q-item-tile sublabel><div v-utime>{{user.last_active}}</div></q-item-tile>
  </q-item-main>
				</q-item>
								<q-item tag="label">

  <q-item-main>
    <q-item-tile label>Last Visit</q-item-tile>
    <q-item-tile sublabel><div v-utime>{{user.last_visit}}</div></q-item-tile>
  </q-item-main>
  				</q-item>

				<q-item tag="label">

<q-item-main>
    <q-item-tile label>Last Email Sent</q-item-tile>
    <q-item-tile sublabel><div v-utime>{{user.last_email_sent}}</div></q-item-tile>
  </q-item-main>
  				</q-item>

				<q-item tag="label">

<q-item-main>
    <q-item-tile label>Last Post</q-item-tile>
    <q-item-tile sublabel><div v-utime>{{user.last_post}}</div></q-item-tile>
  </q-item-main>
  				</q-item>

				<q-item tag="label">

<q-item-main>
    <q-item-tile label>Last Search</q-item-tile>
    <q-item-tile sublabel><div v-utime>{{user.last_search}}</div></q-item-tile>
  </q-item-main>
  				</q-item>

				<q-item tag="label">
 
<q-item-main>
    <q-item-tile label>Last SMS Sent</q-item-tile>
    <q-item-tile sublabel><div v-utime>{{user.last_sms_sent}}</div></q-item-tile>
  </q-item-main>
 
				</q-item>

								
			</q-list>

		</q-tab-pane>
		
      </q-tabs>
      </div>
	<!-- <q-btn flat @click="bluetooth">Get Bluetooth</q-btn> -->
	  <!-- <button id="button">Get Bluetooth Device's Battery Level</button> -->
	  <!-- <q-btn flat @click="getBucketList">get list</q-btn> -->
</q-page>
    </template>
	
<script>
// import auth from "../utils/auth";
// import store from "../store";
import Vue from "vue";

import firebase from "./firebaseInit";

export default {
  name: "Profile",
  directives: {
    utime: {
      inserted: function(el, binding, vnode) {
        console.log(el.innerHTML);
        var date = new Date(el.innerHTML * 1000);
        console.log(date);
        el.innerHTML = date;
        return date;
      }
    }
  },
  data: () => ({
    filter: "",
    loading: false,
    serverPagination: {
      page: 1,
      rowsNumber: 10 // specifying this determines pagination is server-side
    },

    serverData: [],
    columns: [
      {
        name: "asset_tag",
        label: "Asset Tag",
        field: "asset_tag",
        align: "left",
        sortable: true
      },
      {
        name: "model",
        label: "Model",
        field: "model",
        align: "left",
        sortable: true
      },
      {
        name: "category",
        label: "Category",
        field: "category",
        align: "left",
        sortable: true
      }
    ],
    imageSrc: "",

    errors: [],
    batteryStatus: "determining..."
  }),
  computed: {
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    user() {
      return this.$store.getters.user;
    },
    error() {
      return this.$store.getters.error;
    }
    // loading() {
    //   return this.$store.getters.loading;
    // }
  },
  watch: {
    user(value) {
      console.log(value);
      if (value == null || value == undefined) {
        // this.$router.push('/profile')
        console.log("lost user");
      }
    }
  },
  mounted() {},
  created() {
    window.addEventListener("batterystatus", this.updateBatteryStatus, false);
    var id = 1;
    this.$snipeit
      .post(`hardware/users/${id}/assets`, { sid: 1 })
      .then(response => {
        console.log(response.data);
      });
    this.request({
      pagination: this.serverPagination,
      filter: this.filter
    });

    console.log(this.$route.query.id); // outputs 'yay'
  },
  methods: {
    request({ pagination, filter }) {
      // we set QTable to "loading" state
      this.loading = true;

      // we do the server data fetch, based on pagination and filter received
      // (using Axios here, but can be anything; parameters vary based on backend implementation)

      this.$snipeit
        .post(`hardware/users/1/assets`, { sid: 1 })
        .then(({ data }) => {
          // updating pagination to reflect in the UI
          // this.serverPagination = pagination
          this.serverPagination.rowsNumber = data.rowsNumber;

          // we also set (or update) rowsNumber
          this.serverPagination.rowsNumber = data.rowsNumber;

          // then we update the rows with the fetched ones
          this.serverData = data.rows;

          // finally we tell QTable to exit the "loading" state
          this.loading = false;
        })
        .catch(error => {
          // there's an error... do SOMETHING
          // we tell QTable to exit the "loading" state
          //   this.loading = false;
        });
    },
    captureImage() {
      navigator.camera.getPicture(
        data => {
          // on success
          this.imageSrc = `data:image/jpeg;base64,${data}`;
          this.$q.notify("Boom ", data);
        },
        () => {
          // on fail
          this.$q.notify("Could not access device camera.");
        },
        {
          // camera options
        }
      );
    },
    updateBatteryStatus(status) {
      this.batteryStatus = `Level: ${status.level}, plugged: ${
        status.isPlugged
      }`;
    }
  }
};
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
