import Vue from "vue";
import VueRouter from "vue-router";
import Movie from "../views/Movie.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Movie,
  },
  {
    path: "/movies",
    name: "Movies",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Movie.vue"),
  },
  {
    path: "/movie",
    name: "movie",
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/MovieDetails.vue"),
      props: true

  },
  {
    path:"/account",
    name:"Account",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Account.vue"),
  }
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
