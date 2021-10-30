<template>
  <div>
    <h1>{{ movie.title }}</h1>
   <iframe
    :src="`https://www.youtube.com/embed/`+ movie.trailer"
    width="560px"
    height="315"
    justifycontent="center"

    
  ></iframe>
      <h2>About</h2>

    <p>{{ movie.description }}</p>

    <v-row no-gutters>
      <v-col
        cols="12"
        xs="12"
        sm="6"
        md="6"
        lg="6"
        xl="6"
      >
      <h2>Meta Critic Rating</h2>
      <StarRating
            :increment="0.01"
            :fixed-points="2"
            :rating="movie.criticRating / 2"
            read-only
            :maxRating="5"
                        :show-rating="false"

          ></StarRating>

      </v-col>
      <v-col
        cols="12"
        xs="12"
        sm="6"
        md="6"
        lg="6"
        xl="6"
      >
      <h2>User Rating</h2>
      <StarRating
            :increment="0.01"
            :fixed-points="2"
            :rating="this.avgRating"
            read-only
            :maxRating="10"
            :show-rating="false"

          ></StarRating>
      </v-col>
      <v-col 
      v-if="isLoggedIn === 'true'" 
        cols="12"
        xs="12"
        sm="6"
        md="6"
        lg="6"
        xl="6"
      >
      <h2>Your Rating</h2>
           <StarRating
            :increment="0.01"
            :fixed-points="2"
            :rating="this.userRating"
            :maxRating="10"
            :show-rating="false"
            @rating-selected ="updateRating"

          ></StarRating>
      </v-col>
      </v-row>
  </div>
</template>

<script>
import Vue from 'vue'
import VueIframe from 'vue-iframes'
import StarRating from "vue-star-rating";


Vue.use(VueIframe)

export default {
  name: "Details",
  components: {
    StarRating,
  },
  props: {
    movie: Object,
  },
  data(){
    return{
    avgRating:0,
    userRating:0,
    movieID:"",
    UserID:localStorage.getItem("UserID"),
    isLoggedIn:localStorage.getItem("isLoggedIn"),

    };
  },
  mounted() {

    Vue.axios.post("http://localhost:3000/getAvgRating",{
      MovieID:this.movie.id
    }).then((response) => {
      console.log(response.data.avgRating);
      this.avgRating=response.data.avgRating;
    });
    Vue.axios.post("http://localhost:3000/getUserMovieRating",{
      MovieID:this.movie.id,
      UserID:1
    }).then((response) => {
      console.log(response.data.userRating);
            this.userRating=response.data.userRating;
            this.movieID =response.data.movieID

    });
  },
    methods: {
      updateRating(rat){
        console.log(rat)
        this.userRating=rat;

      }

    }
};
</script>
