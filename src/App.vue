<template>
  <div>
    <div class="navbar">
      <router-link to="/"><h1>Movie Critc</h1></router-link>
      <router-link v-if="isLoggedIn === 'true'" to="/account"
        >Account</router-link
      >
      <router-link v-else to="/account">Log in</router-link>

    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from "axios";
import VueAxios from "vue-axios";
import Vue from "vue";

Vue.use(VueAxios, axios);

export default {
  name: "app",
  data() {
    return {
      isLoggedIn: localStorage.getItem("isLoggedIn"),
    };
  },
  mounted() {
    Vue.axios.post("http://localhost:3000/isLoggedIn").then((response) => {
      console.log(response);
    });
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");
* {
  margin: 0;
  font-family: "Quicksand";
  color: #333;
}
.navbar {
  padding: 20px;
  display: flex;
  align-items: center;
  margin: 0 auto;
  border-bottom: 1px solid #f2f2f2;
  background-color: #cf3039;
}
.navbar h1 {
  color: #ffffff;
}
.navbar .links {
  margin-left: auto;
}
.navbar a {
  margin-left: 16px;
  text-decoration: none;
  padding: 6px;
  color: #f2f2f2;
}
.navbar a:hover {
  font-weight: bold;
  text-decoration: underline;
}
</style>
