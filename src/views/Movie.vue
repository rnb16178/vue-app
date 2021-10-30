<template>
  <v-container>
    <v-row no-gutters>
      <v-col
        v-for="movie in movies"
        :key="movie.id"
        cols="12"
        xs="12"
        sm="6"
        md="6"
        lg="3"
        xl="3"
      >
        <v-card outlined tile>
          <h2>{{ movie.title }}</h2>
          <img width="100%" v-bind:src="'/images/' + movie.url" />
          <router-link :to="{ name: 'movie', params: { movie: movie } }">
           <button>More Info</button></router-link
          >
          <StarRating
            :increment="0.01"
            :fixed-points="2"
            :rating="movie.criticRating / 2"
            read-only
            :maxRating="5"
            :show-rating="false"
          ></StarRating>
          <button
            v-if="CheckIfOnWatchList(movie.id)"
            v-on:click="deleteW(movie)"
          >
            Remove from Watch List
          </button>
          <button v-else v-on:click="addToWatchList(movie.id)">
            Add to Watch List
          </button>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import StarRating from "vue-star-rating";
import axios from "axios";
import VueAxios from "vue-axios";
import Vue from "vue";

Vue.use(VueAxios, axios);

export default {
  name: "Movie",
  components: {
    StarRating,
  },
  data() {
    return {
      movies: [],
      UserID: localStorage.getItem("UserID"),
      watchList: [],
    };
  },
  mounted() {
    Vue.axios.get("http://localhost:3000/getMovies").then((response) => {
      this.movies = response.data.data;
    });
    Vue.axios
      .post("http://localhost:3000/getWatchList", {
        userID: this.UserID,
      })
      .then((response) => {
        for (let i = 0; i < response.data.data.length; i++) {
          this.watchList[i] = response.data.data[i].MovieID;
        }
        this.$forceUpdate();
      });
  },
  methods: {
    CheckIfOnWatchList(id) {
      if (this.watchList.length > 0) {
        return this.watchList.includes(id);
      }
    },
    addToWatchList(id) {
      console.log(id);
      console.log(this.UserID);
      Vue.axios
        .put("http://localhost:3000/addToWishList", {
          userID: this.UserID,
          movieID: id,
        })
        .then(() => {
          this.watchList.push(id);
        });
    },
    deleteW(movie) {
      console.log(movie);
      console.log(this.UserID);
      Vue.axios
        .post("http://localhost:3000/removeWatchListByID", {
          userID: this.UserID,
          id: movie.id,
        })
        .then(() => {
          this.watchList = this.watchList.filter((n) => {
            return n != movie.id;
          });
        });
    },
  },
};
</script>
