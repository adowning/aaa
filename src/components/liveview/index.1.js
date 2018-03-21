const firebaseConfig = {
  apiKey: "AIzaSyDdspiJ0VAnGLeyRziofRCSld1bpBoms7E",
  authDomain: "andrewsadmin.firebaseapp.com",
  databaseURL: "https://andrewsadmin.firebaseio.com",
  projectId: "andrewsadmin",
  storageBucket: "andrewsadmin.appspot.com",
  messagingSenderId: "734746045873"
};

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
  }

  clear() {
    this.markers.forEach(marker => {
      marker.setMap(null);
    });
    this.markers.length = 0;
  }
}

function colorToBusMarker(color) {
  switch (color) {
    case "FCE444":
      return "/images/dashboard/busmarker_yellow.png";
    case "C4E86B":
      return "/images/dashboard/busmarker_lime.png";
    case "00C1DE":
      return "/images/dashboard/busmarker_teal.png";
    case "FFAD00":
      return "/images/dashboard/busmarker_orange.png";
    case "0061C8":
      return "/images/dashboard/busmarker_indigo.png";
    case "8A8A8D":
      return "/images/dashboard/busmarker_caltrain.png";
    case "EA1D76":
      return "/images/dashboard/busmarker_sf.png";
    default:
      console.log(`colorToBusMarker(${color}) not handled`);
      return "";
  }
}

function geocodeAddress(address, map, icon, title) {
  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({ address: address }, (results, status) => {
    if (status === "OK") {
      const marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location,
        icon: icon,
        title: title,
        optimized: false
      });
    } else {
      console.log(
        "Geocode was not successful for the following reason: " + status
      );
    }
  });
}
function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    disableDefaultUI: true,
    styles: mapStyle
  });

  geocodeAddress(
    "2811 University Blvd, Tyler TX 75701",
    map,
    "/images/dashboard/logo_io_64.png",
    "Google I/O"
  );

  const markerManager = new MarkerManager(map);

  firebase.initializeApp(firebaseConfig);
  const db = firebase.database();
  db.ref("map").on("value", snapshot => {
    const val = snapshot.val();
    map.fitBounds({
      east: val.northEastLng,
      north: val.northEastLat,
      south: val.southWestLat,
      west: val.southWestLng
    });

    markerManager.clear();
    val.markers.forEach(marker => {
      markerManager.add(
        {
          lat: marker.lat,
          lng: marker.lng
        },
        marker.iconPath,
        marker.name
      );
    });

    const busLocationMarkers = {};

    db.ref("bus-locations").on("value", snapshot => {
      const val = snapshot.val();

      for (let key in busLocationMarkers) {
        if (val === null || !(key in val)) {
          const marker = busLocationMarkers[key];
          marker.setMap(null);
          delete busLocationMarkers[key];
        }
      }

      for (let key in val) {
        const bus = val[key];

        if (key in busLocationMarkers) {
          const marker = busLocationMarkers[key];
          marker.setPosition({
            lat: bus.lat,
            lng: bus.lng
          });
        } else {
          const url = colorToBusMarker(bus.route_color);
          const marker = new google.maps.Marker({
            position: {
              lat: bus.lat,
              lng: bus.lng
            },
            map: map,
            icon: {
              url,
              anchor: new google.maps.Point(30, 30) // Bus markers are 60x60 px
            },
            title: bus.route_name,
            optimized: false
          });
          busLocationMarkers[key] = marker;
        }
      }
    });
  });
}
