<template>
  <q-table
    title="Table Title"
    :data="tableData"
    :columns="columns"
    row-key="name"
  >
    <q-tr slot="body" slot-scope="props" :props="props">

        <q-td key="id" :props="props"></q-td>
       
   </q-tr>
   </q-table>
</template>
<script>
import firebase from "../components/firebaseInit";
import axios from "axios";
export default {
  data() {
    return {
      filter: "",
      loading: false,
      serverPagination: {
        page: 1,
        rowsNumber: 10 // specifying this determines pagination is server-side
      },
      tableData: [],
      serverData: [],
      columns: [
        {
          name: "topic",
          // required: true,
          label: "Topic",
          align: "left",
          field: "topic",
          sortable: true
        },
        { name: "veh", label: "Vehicle#", field: "tid", sortable: true }
        // { name: "batt", label: "Battery", field: "batt", sortable: true },
        // { name: "lat", label: "Latitude", field: "lat", sortable: true },
        // { name: "lon", label: "Longitude", field: "lon", sortable: true },
        // { name: "time", label: "Time", field: "tst", sortable: true },
        // { name: "geo", label: "Geoloc", field: "geo", sortable: true }
      ]
    };
  },
  methods: {
    addRow: function(index) {
      try {
        this.rows.splice(index + 1, 0, {});
      } catch (e) {
        console.log(e);
      }
    },
    request({ pagination, filter }) {
      console.log("updating");
      this.loading = true;
    }
  },
  mounted() {
    var user = firebase.auth().currentUser;

    if (user) {
      console.log(user);
    } else {
      console.log("wtf");
    }
    axios.get(
      // "https://www.googleapis.com/storage/v1/b/phonerec/o?key=AIzaSyDdspiJ0VAnGLeyRziofRCSld1bpBoms7E"
      "https://www.googleapis.com/storage/v1/b/phonerec/"
    );
  }
};
</script>
<style scoped>
.q-table-container {
  color: #ffffff !important;
}
.q-table {
  color: #fff !important;
}
.q-table td {
  color: #fff !important;
}
.td {
  color: #fff !important;
}
</style>
