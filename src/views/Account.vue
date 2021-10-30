<template>
  <div>
    <div v-if="isLoggedIn === 'true'">
      <b-tabs content-class="mt-3">
        <b-tab title="Your Details" active>
          <h2>Your Account</h2>
            <h3>{{username}}</h3>
            <h3>{{UserID}}</h3>
        </b-tab>
        <b-tab title="Watch List">
        <h2>Your Watch List</h2>
        <WatchList/>
        </b-tab>
        <b-tab title="Reviewed Movies">
            <h2>Your reviews</h2>
            <ReviewedList/>
        </b-tab>
      </b-tabs>
      <button v-on:click="logout">Log out</button>
    </div>
    <div v-else>
      <h2>Login</h2>

      <input
        type="text"
        name="username"
        v-model="input.username"
        placeholder="Username"
      />
      <input
        type="password"
        name="password"
        v-model="input.password"
        placeholder="Password"
      />
      <button type="button" v-on:click="login()">Login</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import VueAxios from "vue-axios";
import Vue from "vue";
import { BootstrapVue } from "bootstrap-vue";
import WatchList from"../components/WatchList";
import ReviewedList from"../components/ReviewedList";
import VueSession from 'vue-session'

Vue.use(VueAxios, axios, BootstrapVue);
Vue.use(VueSession);

export default {
  name: "Account",
  data() {
    return {
      isLoggedIn: localStorage.getItem("isLoggedIn"),
        username: localStorage.getItem("username"),
        UserID: localStorage.getItem("UserID"),
      input: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      if (this.input.username != "" && this.input.password != "") {
        Vue.axios
          .post("http://localhost:3000/login", {
            credentials:true,
            username: this.input.username,
            password: this.input.password,
          })
          .then((response) => {
            console.log(response.data);
            if (response.data.success) {
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("username", this.input.username);
                localStorage.setItem("UserID", response.data.userID);
            } else {
              localStorage.setItem("isLoggedIn", false);
              alert("login not successful");
            }
          })
          .then(() => {
            window.location.reload(false);
          });
      } else {
        alert();
      }
    },
    logout() {
      Vue.axios
        .post("http://localhost:3000/logout", {})
        .then(() => {
          localStorage.setItem("isLoggedIn", false);
          this.$forceUpdate();
        })
        .then(() => {
          window.location.reload(false);
        });
    },
  },
  components:{
      WatchList,
      ReviewedList
  }
};
</script>
