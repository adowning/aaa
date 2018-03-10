<template>
  <q-table
    ref="table"
    :data="serverData"
    :columns="columns"
    :filter="filter"
    row-key="name"
    dark=true    
    color="primary"
    :pagination.sync="serverPagination"
    :loading="loading"
    @request="request"
  >
    <template slot="top-selection" slot-scope="props">
    <q-btn color="secondary" flat label="Action 1" class="q-mr-sm" />
    <q-btn color="secondary" flat label="Action 2" />
    <div class="col" />
    <q-btn color="negative" flat round delete icon="delete" @click="deleteRow" />
  </template>
    <template slot="top-right" slot-scope="props">
      <q-search hide-underline v-model="filter" />
    </template>
  </q-table>
</template>

<script>
import axios from 'axios'
var _ = require('lodash');

export default {
  data () {
    return {
      filter: '',
      loading: false,
      serverPagination: {
        page: 1,
        rowsNumber: 10 // specifying this determines pagination is server-side
      },

      serverData: [],
      columns: [
        {
          name: 'topic',
          // required: true,
          label: 'Topic',
          align: 'left',
          field: 'topic',
          sortable: true
        },
        { name: 'veh', label: 'Vehicle#', field: 'veh', sortable: true },
        { name: 'batt', label: 'Battery', field: 'batt', sortable: true },
        { name: 'lat', label: 'Latitude', field: 'lat', sortable: true },
        { name: 'lon', label: 'Longitude', field: 'lon', sortable: true },
        { name: 'time', label: 'Time', field: 'time', sortable: true },
        { name: 'geo', label: 'Geoloc', field: 'geo', sortable: true },

        // { name: 'last_name', label: 'Last Name', field: 'last_name', sortable: true },
        // { name: 'email', label: 'Email', field: 'email', sortable: true },
        // { name: 'department', label: 'Department', field: 'department' },     
        // { name: 'emp_lastname', label: 'Last Name', field: 'emp_lastname', sortable: true },
        // { name: 'emp_firstname', label: 'First Name', field: 'emp_firstname' },
        // { name: 'job_title_code', label: 'Job Title', field: 'job_title_code', sortable: true },
        // { name: 'work_station', label: 'Work Station', field: 'work_station', sortable: true },
        // { name: 'eeo_cat_code', label: 'Category', field: 'eeo_cat_code' },
      ]
    }
  },
  methods: {
    request ({ pagination, filter }) {
      // we set QTable to "loading" state
      this.loading = true

      // we do the server data fetch, based on pagination and filter received
      // (using Axios here, but can be anything; parameters vary based on backend implementation)

      this.$api
      // .get(`/data/${pagination.page}?sortBy=${pagination.sortBy}&descending=${pagination.descending}&filter=${filter}`)
      // .get(`/db/_table/Contact/`)
      .get(`/db-mqtt/_table/locs?limit=1000`)
      .then( data  => {
        // updating pagination to reflect in the UI
        this.serverPagination = pagination

        // we also set (or update) rowsNumber
        this.serverPagination.rowsNumber = data.rowsNumber

        // then we update the rows with the fetched ones
        // var newData = this.fixOwntracks(data.data.resource)
        this.serverData = data.data.resource

        // finally we tell QTable to exit the "loading" state
        this.loading = false
      })
      .catch(error => {
        // there's an error... do SOMETHING
      console.log(error)
        // we tell QTable to exit the "loading" state
        this.loading = false
      })
    },
    fixOwntracks(rawdata){
        _.forEach(rawdata, function(value) {
          var array = _.split(value.message);
          console.log(array)
    });

    }
  },
  mounted () {
    // once mounted, we need to trigger the initial server data fetch
    this.request({
      pagination: this.serverPagination,
      filter: this.filter
    })
  }
}
</script>
<style scoped>
.q-table-container{
  color: #ffffff !important
}
.q-table{
  color: #fff !important
}
.q-table td{
  color: #fff !important
}
.td{
  color: #fff !important
}
</style>
