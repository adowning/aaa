<template>
<q-layout >
	<q-page-container>
    <q-page padding class="row justify-center ">
    <div style="width: 600px; max-width: 90vw; ">
      <div class="flex-row-docs q-al-xl">
        <h4>Andrews Administration Application</h4>
        <div class="doc-container q-pa-xl">
          <div class="row justify-center ">
        <div class="input-group ">
          <span class="input-group-addon "><i class="fa fa-envelope"></i></span>
          <input class="form-control " name="email" placeholder="Email" type="text" model="form.email">
        </div>
        <div class="input-group  ">
          <span class="input-group-addon"><i class="fa fa-lock"></i></span>
          <input class="form-control" name="password" placeholder="Password" type="password" model="form.pass">
        </div>
		<div class="q-pa-sm">
           <q-btn  color="primary" @click="onSignin">Submit</q-btn>
		</div>
	
            </div>
          </div>
		       <div class="row justify-center">
        <q-alert
          color="warning"
          inline
          class="q-mb-lg"
        > Sometimes you will need to click on the submit button twice, I cant seem to track the bug down </q-alert>
      </div>
        </div>
      </div>
    </q-page>
    </q-page-container>
</q-layout>
</template>
<script>
import { required, email } from "vuelidate/lib/validators"
import { Notify } from "quasar"
import router from "../router"
import firebase from "./firebaseInit"
export default {
	data() {
		return {
			email: "",
			password: "",
			login: true,
		}
	},
	computed: {
		user() {
			return this.$store.getters.user
		},
		error() {
			return this.$store.getters.error
		},
		loading() {
			return this.$store.getters.loading
		},
	},
	watch: {
		user(value) {
			if (value !== null && value !== undefined) {
				this.$router.push("/profile")
			}
		},
	},
	methods: {
		onSignin() {
			window.localStorage.clear()
			this.$store.dispatch("signUserIn", {
				// {email: this.email, password: this.password}
				email: "d@d.com",
				password: "asdfasdf",
			})
		},
		// registerUser() {
		// 	this.$store.dispatch("registerUser", {
		// 		email: "d@d.com",
		// 		password: "asdfasdf",
		// 		username: this.username,
		// 		photoURL: this.photoURL,
		// 	})
		// },
		onDismissed() {
			this.$store.dispatch("clearError")
		},
	},
}
</script>

<style>
.error {
	color: red;
}
</style>
