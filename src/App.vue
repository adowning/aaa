<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    getCurrentPosition() {
      // this.$vuexGeolocation.getCurrentPosition(10);
    }
  },
  created() {
    // this.$vuexGeolocation.getCurrentPosition(10);
    // navigator.geolocation.getCurrentPosition(success, error, options);
    //  if(navigator.geolocation) {
    //      var self = this;
    //      navigator.geolocation.getCurrentPosition(function(position){
    //       self.position = position.coords;
    //     })
    //   }
    console.log("loaded");
    this.$getLocation().then(coordinates => {
      console.log("logging coords");
      console.log(coordinates);
    });
  }
};
</script>

<style>

</style>
