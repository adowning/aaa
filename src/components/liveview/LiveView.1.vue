<template>
<div>
  <!-- <div class="google-map" :id="mapName"></div>-->
  <div class="row q-pa-lg" >
  <!-- <div class="col-8"> -->
    <div class="google-map" id="map"></div>    
  <!-- </div> -->

  <!--<div class="col-4 q-pl-sm">
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
  </div>-->
  </div>
</div>
</template>


<script>
// var mqtt = require("mqtt");
// import mqtt from 'mqtt'
// import owntracks from "../utils/owntracks";
// import * as _ from 'lowdash'
import firebase from "../firebaseInit";

window._ = require("lodash");

export default {
  name: "google-map",
  props: ["name"],

  data: function() {
    return {
      map: null,
      markers: []
      // mapName: this.name + "-map",
      // markerCoordinates: [
      //   {
      //     latitude: 32.3112106941694,
      //     longitude: -95.2633916507901
      //   }
      // ],
      // map: null,
      // bounds: null,
      // markers: []
      // client: {},
      // tabletList: []
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
        console.log("not location");
        return;
      }
      if (!message.tst) {
        console.log("no tst setting new time");
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
    }
    // getMarkersFromDatabase() {
    //   this.markerCoordinates.forEach(coord => {
    //     const position = new google.maps.LatLng(
    //       coord.latitude,
    //       coord.longitude
    //     );
    //     const marker = new google.maps.Marker({
    //       position,
    //       map: this.map
    //     });
    //     this.markers.push(marker);
    //     // this.map.fitBounds(this.bounds.extend(position));
    //     this.markers.push(marker);
    //     // this.map.fitBounds(this.bounds.extend(position));
    //   });
    // }
  },
  beforeDestroy() {
    this.$mqtt.unsubscribe("owntracks/#");
  },
  mounted: function() {
    // this.bounds = new google.maps.LatLngBounds();
    // const element = document.getElementById(this.mapName);
    // const mapCentre = this.markerCoordinates[0];
    // const options = {
    //   center: new google.maps.LatLng(mapCentre.latitude, mapCentre.longitude),
    //   zoom: 12
    // };
    // this.map = new google.maps.Map(element, options);
    // this.map.setZoom(12);
    var vm = this;
    const mapStyle = [
      {
        elementType: "geometry",
        stylers: [{ color: "#eceff1" }]
      },
      {
        elementType: "labels",
        stylers: [{ visibility: "off" }]
      },
      {
        featureType: "administrative",
        elementType: "labels",
        stylers: [{ visibility: "on" }]
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#cfd8dc" }]
      },
      {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ visibility: "off" }]
      },
      {
        featureType: "road.local",
        stylers: [{ visibility: "off" }]
      },
      {
        featureType: "water",
        stylers: [{ color: "#b0bec5" }]
      }
    ];

    class MarkerManager {
      constructor(map) {
        this.map = map;
        this.markers = [];
      }

      add(location, icon, title) {
        const marker = new google.maps.Marker({
          position: location,
          map: this.map,
          icon: icon,
          title: title,
          optimized: false
        });
        this.markers.push(marker);
        console.log(this.markers[0]);
      }

      clear() {
        console.log("clearning");
        this.markers.forEach(marker => {
          marker.setMap(null);
        });
        this.markers.length = 0;
      }
    }

    // function colorToBusMarker(color) {
    //   switch (color) {
    //     case "FCE444":
    //       return "../../assets/dashboard/busmarker_yellow.png";
    //     case "C4E86B":
    //       return "../../assets/dashboard/busmarker_lime.png";
    //     case "00C1DE":
    //       return "../../assets/dashboard/busmarker_teal.png";
    //     case "FFAD00":
    //       return "../../assets/dashboard/busmarker_orange.png";
    //     case "0061C8":
    //       return "../../assets/dashboard/busmarker_indigo.png";
    //     case "8A8A8D":
    //       return "../../assets/dashboard/busmarker_caltrain.png";
    //     case "EA1D76":
    //       return "../../assets/dashboard/busmarker_sf.png";
    //     default:
    //       console.log(`colorToBusMarker(${color}) not handled`);
    //       return "";
    //   }
    // }

    // function geocodeAddress(address, map, icon, title) {
    //   const geocoder = new google.maps.Geocoder();
    //   geocoder.geocode({ address: address }, (results, status) => {
    //     if (status === "OK") {
    //       const marker = new google.maps.Marker({
    //         map: map,
    //         position: results[0].geometry.location,
    //         icon: icon,
    //         title: title,
    //         optimized: false
    //       });
    //     } else {
    //       console.log(
    //         "Geocode was not successful for the following reason: " + status
    //       );
    //     }
    //   });
    // }

    const map = new google.maps.Map(document.getElementById("map"), {
      // disableDefaultUI: true,
      // styles: mapStyle,
      zoom: 13,
      center: { lat: 32.3173, lng: -95.2473 }
    });

    // geocodeAddress(
    //   "2811 University Blvd, Tyler TX 75701",
    //   map,
    //   "/images/dashboard/logo_io_64.png",
    //   "Google I/O"
    // );

    const markerManager = new MarkerManager(map);
    const db = firebase.firestore();
    db
      .collection("trackedAssets")
      .where("_type", "==", "location")
      .onSnapshot(function(querySnapshot) {
        markerManager.clear();
        querySnapshot.forEach(function(doc) {
          console.log(doc.data());
          markerManager.add(
            {
              lat: Number(doc.lat),
              lng: Number(doc.lon)
            }
            // "test",
            // doc.owner
          );
          // trackedAssets.push(doc.data().name);
        });
        // console.log("Current cities in CA: ", cities.join(", "));
      });
    // db.collection("trackedAssets").onSnapshot(function(doc) {
    //   // console.log("value changed", doc);
    //   markerManager.clear();
    //   doc.forEach(marker => {
    //     console.log(marker);
    //     // markerManager.add(
    //     //   {
    //     //     lat: marker.lat,
    //     //     lng: marker.lon
    //     //   }
    //     //   //marker.iconPath,
    //     //   //marker.name
    //     // );
    //   });
    // });
    //   markerManager.clear();
    //   for (let key in val) {
    //     markerManager.add(
    //       {
    //         lat: val[key].lat,
    //         lng: val[key].lon
    //       },
    //       val[key].icon,
    //       // "/img/logo.png",/
    //       val[key].name
    //     );
    //   }
    // });
    // firebase.initializeApp(firebaseConfig);
    // const db = firebase.database();
    // // console.log(db);

    // db.ref("map/markers").on("value", snapshot => {
    //   console.log("value changed");
    //   const val = snapshot.val();
    //   // map.fitBounds({
    //   //   east: 32.001,
    //   //   north: 32.002,
    //   //   south: 32.003,
    //   //   west: 32.003
    //   // });

    //   markerManager.clear();
    //   for (let key in val) {
    //     markerManager.add(
    //       {
    //         lat: val[key].lat,
    //         lng: val[key].lon
    //       },
    //       val[key].icon,
    //       // "/img/logo.png",/
    //       val[key].name
    //     );
    //   }
    // });
    // if (val === null || !(key in val)) {
    //   markerManager.add(
    //     {
    //       lat: marker[key].lat,
    //       lng: marker.lng
    //     },
    //     marker.iconPath,
    //     marker.name
    //   );
    //   // const marker = busLocationMarkers[key];
    //   // marker.setMap(null);
    //   // delete busLocationMarkers[key];
    // }

    // snapshot.val().forEach(marker => {
    //   markerManager.add(
    //     {
    //       lat: marker.lat,
    //       lng: marker.lng
    //     },
    //     marker.iconPath,
    //     marker.name
    //   );
    // });

    const busLocationMarkers = {};

    // db.ref("bus-locations").on("value", snapshot => {
    //   console.log("bus changed");

    //   const val = snapshot.val();

    //   for (let key in busLocationMarkers) {
    //     if (val === null || !(key in val)) {
    //       const marker = busLocationMarkers[key];
    //       marker.setMap(null);
    //       delete busLocationMarkers[key];
    //     }
    //   }

    //   for (let key in val) {
    //     const bus = val[key];

    //     if (key in busLocationMarkers) {
    //       const marker = busLocationMarkers[key];
    //       marker.setPosition({
    //         lat: bus.lat,
    //         lng: bus.lng
    //       });
    //     } else {
    //       const url = colorToBusMarker(bus.route_color);
    //       const marker = new google.maps.Marker({
    //         position: {
    //           lat: bus.lat,
    //           lng: bus.lng
    //         },
    //         map: map,
    //         icon: {
    //           url,
    //           anchor: new google.maps.Point(30, 30) // Bus markers are 60x60 px
    //         },
    //         title: bus.route_name,
    //         optimized: false
    //       });
    //       busLocationMarkers[key] = marker;
    //     }
    //   }
    // });
  }
};
</script>
<style scoped>
.q-card {
  width: 100%;
}
.q-tab-pane {
  background-color: #4c566a !important;
}

.google-map {
  width: 100%;
  height: 800px;
  margin: 0 auto;
  /* background: gray; */
}
</style>
