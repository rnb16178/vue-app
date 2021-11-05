import Vue from "vue";
import App from "./App.vue";
import AxiosPlugin from 'vue-axios-cors';
import router from "./router";
import vuetify from '@/plugins/vuetify' // path to vuetify export
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";


Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(AxiosPlugin)

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
