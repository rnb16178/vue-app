<template>
  <div v-if="renderComponent">
    <div v-if="watchList.length > 0">
      <v-container class="grey lighten-5">
        <v-row no-gutters>
          <v-col
            v-for="item in watchList"
            :key="item.id"
            cols="12"
            xs="12"
            sm="12"
            md="12"
            lg="12"
            xl="12"
          >
            <v-card outlined tile>
              <h2><img width="100px" v-bind:src="'/images/' + item.url" />{{ item.title }}</h2>
              <button v-on:click="deleteW(item)">Remove From Wishlist</button>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div v-else>
      <p>You currently do not have anything on your watch list</p>
    </div>
  </div>
</template>

<script>
import VueAxios from "vue-axios";
import Vue from "vue";
import axios from "axios";

Vue.use(VueAxios, axios);
export default {
  data() {
    return {
      watchList: [],
      UserID: localStorage.getItem("UserID"),
      renderComponent: true,
    };
  },
  mounted() {
    console.log(this.UserID);
    Vue.axios
      .post("http://localhost:3000/getWatchList", {
        userID: this.UserID,
      })
      .then((response) => {
        console.log(response.data.data);
        this.watchList = response.data.data;
      });
  },
  methods: {
    deleteW(item) {
      console.log(item);
      console.log(this.UserID);
      Vue.axios
        .post("http://localhost:3000/removeWatchListByID", {
          userID: this.UserID,
          id: item.MovieID,
        })
        .then((response) => {
          console.log(response);
          Vue.axios
            .post("http://localhost:3000/getWatchList", {
              userID: this.UserID,
            })
            .then((response) => {
              console.log(response.data.data);
              this.watchList = response.data.data;
            });
        });
    },
  },
};
</script>

<style></style>
