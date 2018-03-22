<template>
  <q-table
    title="Table Title"
    :data="tableData"
    :columns="columns"
    row-key="name"
  />
</template>
<script>
export default {
  data() {
    return {
      filter: "",
      loading: false,
      serverPagination: {
        page: 1,
        rowsNumber: 10 // specifying this determines pagination is server-side
      },
      tableData: [
        // {
        //   name: 'Frozen Yogurt',
        //   calories: 159,
        //   fat: 6.0,
        //   carbs: 24,
        //   protein: 4.0,
        //   sodium: 87,
        //   calcium: '14%',
        //   iron: '1%'
        // },
      ],
      serverData: [],
      columns: [
        {
          name: "topic",
          // required: true,
          label: "Topic",
          align: "left",
          field: "topic"
          // sortable: true
        }
        // { name: "veh", label: "Vehicle#", field: "tid", sortable: true },
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
    updateTable(_message) {
      // console.log(JSON.parse(_message))
      var vm = this;
      var message = {};
      try {
        message = JSON.parse(_message);
        // console.log(JSON.parse(message.toString()))
      } catch (e) {
        return;
      }
      if (message._type != "location") {
        console.log("not location");
        return;
      }
      if (!message.tst) {
        console.log("no tst setting new time");
        message.tst = new Date();
      }
      this.tableData.push(message);
    }
  },
  mounted() {
    // this.serverData.push({ topic: "location" });
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
