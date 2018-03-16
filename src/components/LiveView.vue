<template>
  <!-- <div class="google-map" :id="mapName"></div>-->
  <div class="row q-pa-lg" >
  <div class="col-8">
    <div class="google-map" :id="mapName"></div>    
  </div>

  <div class="col-4 q-pl-sm">
       <q-tabs  color="secondary" align="justify">
        <q-tab  name="movies" slot="title" icon="history" label="Jobs" />
        <q-tab  default name="tablets" slot="title" icon="android" label="Tablet List" />
        
        <q-tab  name="vehicles" slot="title" icon="local shipping" label="Vehicle List" />

        <q-tab-pane name="tablets">
          
          <q-list >
  <q-item class="q-caption on-left" v-for="tablet in tabletList"  v-bind:data="tablet" v-bind:key="tablet.tid">
    <q-item-side right icon="local shipping" />
    <q-item-main  :label="tablet.tid"/>{{tablet.position}}</q-item>
 
          </q-list>
          
               </q-tab-pane>
                      <q-tab-pane name="vehicles">
          
          <q-list v-for="tablet in tabletList"  v-bind:data="tablet" v-bind:key="tablet.tid">
  <q-item class="q-caption on-left">
    <q-item-side right icon="local shipping" />
    <q-item-main  :label="tablet.tid"/>{{tablet.position}}</q-item>
 
          </q-list>
          
               </q-tab-pane>
        <q-tab-pane name="jobs">History</q-tab-pane>
      </q-tabs>
  </div>
 
</div>
</template>
<script src="https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.0.1/mqttws31.min.js" type="text/javascript"></script>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAmwNvsV8ANcjbaAhgdrNhx39Qst6EUEeo"></script>  


<script>
// var mqtt = require("mqtt");
// import mqtt from 'mqtt'
// import owntracks from "../utils/owntracks";
// import * as _ from 'lowdash'
window._ = require('lodash');


export default {
  name: "google-map",
  props: ["name"],
  data: function() {
    return {
      mapName: this.name + "-map",
      markerCoordinates: [
        {
          latitude: 32.3112106941694,
          longitude: -95.2633916507901
        }
       
      ],
      map: null,
      bounds: null,
      markers: [],
      client: {},
      tabletList: []
    };
  },
  methods: {
    refreshMarkers(_message) {
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
      // console.log(message)
      var tabletTracked = _.find(this.tabletList, { tid: message.tid });
      if (tabletTracked) {
        // console.log(tabletTracked);
        var curPosition = new google.maps.LatLng(message.lat, message.lon);
        tabletTracked.position = curPosition;
        // this.map.fitBounds(this.bounds.extend(tabletTracked.position));
      } else {
        console.log("new");
        var curPosition = new google.maps.LatLng(message.lat, message.lon);
        var marker = new google.maps.Marker({
          position: curPosition,
          map: this.map,
          tid: message.tid,
          title: message.tid
        });
        vm.tabletList.push(marker);
        // this.map.fitBounds(this.bounds.extend(marker.position));
      }
    },
    getMarkersFromDatabase() {
      this.markerCoordinates.forEach(coord => {
        const position = new google.maps.LatLng(
          coord.latitude,
          coord.longitude
        );
        const marker = new google.maps.Marker({
          position,
          map: this.map
        });
        this.markers.push(marker);
        // this.map.fitBounds(this.bounds.extend(position));
        this.markers.push(marker);
        // this.map.fitBounds(this.bounds.extend(position));
      });
    },
    startMQTTClient() {
      var vm = this;
      this.client.on("message", function(topic, message) {
        //  var m = owntracks.parseMessage(message)
        vm.refreshMarkers(message);
      });
    }
  },
  mounted: function() {
    this.bounds = new google.maps.LatLngBounds();
    const element = document.getElementById(this.mapName);
    const mapCentre = this.markerCoordinates[0];
    const options = {
      center: new google.maps.LatLng(mapCentre.latitude, mapCentre.longitude),
      zoom: 12
    };
    this.map = new google.maps.Map(element, options);
    this.map.setZoom(12)
    // this.markerCoordinates.forEach(coord => {
    //   const position = new google.maps.LatLng(coord.latitude, coord.longitude);
    //   const marker = new google.maps.Marker({
    //     position,
    //     map: this.map
    //   });
    //   this.markers.push(marker);
    //   this.map.fitBounds(this.bounds.extend(position));
    // });
  //  var _client = mqtt.connect("mqtt://47.219.112.177:9001");
var _client  = new Paho.MQTT.Client(location.hostname, Number(location.port), "clientId");

    _client.on("connect", function() {
      // _client.subscribe("presence");
      // _client.subscribe("owntracks");
      _client.subscribe("owntracks/#");
      // _client.subscribe("owntracks/+/+");
      // _client.publish("presence", "Hello mqtt");
    });
    //    _client.on('message', function (topic, message) {
    //   // message is Buffer
    //   console.log(message.toString())
    //   console.log(topic.toString())

    // })
    this.client = _client;

    this.startMQTTClient(this.map);
  }
};
</script>
<style scoped>
.q-card {
  width: 100%;

}
.q-tab-pane {
  background-color: #4c566a !important
}

.google-map {
  width: 100%;
  height: 800px;
  margin: 0 auto;
  /* background: gray; */
}
</style>
