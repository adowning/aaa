<template>
  <q-table
    title="Table Title"
    :data="tableData"
    :columns="columns"
    row-key="name"
  />
</template>
<script src="https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.0.1/mqttws31.min.js" type="text/javascript"></script>
<script>
export default {
  data () {
    return {
      filter: '',
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
          name: 'topic',
          // required: true,
          label: 'Topic',
          align: 'left',
          field: 'topic',
          sortable: true
        },
        { name: 'veh', label: 'Vehicle#', field: 'tid', sortable: true },
        { name: 'batt', label: 'Battery', field: 'batt', sortable: true },
        { name: 'lat', label: 'Latitude', field: 'lat', sortable: true },
        { name: 'lon', label: 'Longitude', field: 'lon', sortable: true },
        { name: 'time', label: 'Time', field: 'tst', sortable: true },
        { name: 'geo', label: 'Geoloc', field: 'geo', sortable: true },
      ]
    }
  },
  methods: {

    addRow: function (index) {
            try {
                this.rows.splice(index + 1, 0, {});
            } catch(e)
            {
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
      console.log('not location')        
        return;
      }
      if (!message.tst) {
        console.log('no tst setting new time')
        message.tst = new Date();
      }
      this.tableData.push(message)

    },
     startMQTTClient() {
      var vm = this;
      this.client.on("message", function(topic, message) {
        vm.updateTable(message);
      });
    }
  },
  mounted () {
    // once mounted, we need to trigger the initial server data fetch
    // this.request({
    //   pagination: this.serverPagination,
    //   filter: this.filter
    // })
     var _client = mqtt.connect("mqtt://47.219.112.177:9001");

    _client.on("connect", function() {
      // _client.subscribe("presence");
      // _client.subscribe("owntracks");
      _client.subscribe("owntracks/#");
      // _client.subscribe("owntracks/+/+");
      // _client.publish("presence", "Hello mqtt");
    });
     this.client = _client;

    this.startMQTTClient();
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
