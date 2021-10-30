<template>
  <div>
  <div v-if="Reviews.length>0">
  <v-container class="grey lighten-5">
    <v-row no-gutters>
      <v-col
        v-for="review in Reviews"
        :key="review.id"
        cols="12"
        xs="12"
        sm="12"
        md="12"
        lg="12"
        xl="12"
      >
        <v-card outlined tile>
          <h2>{{ review.title }}</h2>
          
          <StarRating
            :increment="0.01"
            :fixed-points="2"
            :rating="review.Rating / 2"
            :maxRating="5"
          ></StarRating>
          
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  </div>
  <div v-else>
  <p>You currently have not left any reviews</p>
  </div>
  </div>
</template>

<script>
import VueAxios from "vue-axios";
import Vue from "vue";
import axios from "axios";
import StarRating from "vue-star-rating";


Vue.use(VueAxios, axios);
export default {
  components: {
    StarRating,
  },
  data() {
    return {
      Reviews:[],
          UserID:localStorage.getItem("UserID"),


    };
  },
  mounted() {
    Vue.axios.post("http://localhost:3000/getReviews",{
      userID: this.UserID,
    }).then((response) => {
      console.log(response.data.data);
      this.Reviews=response.data.data;
    });
  },
};
</script>

<style></style>
