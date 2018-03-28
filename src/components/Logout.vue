<template>

</template>
<script>
import router from "../router";
import { Notify } from "quasar";

export default {
  data() {
    return {};
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
    // error() {
    //   return this.$store.getters.error;
    // },
    // loading() {
    //   return this.$store.getters.loading;
    // }
  },
  watch: {
    user(value) {
      if (value == null && value == undefined) {
        this.$router.push("/");
        console.log(value);
      }
    }
  },
  mounted() {
    console.log("logging out");
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
  }
};
</script>

<style scoped>
.error {
  color: red;
}
.logo {
  height: 100px;
  width: 50%;
}
</style>
