import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Mint from "mint-ui"
import "@/assets/css/reset.css";
import 'mint-ui/lib/style.css'
import "@/assets/css/main.css";
import "@/assets/css/font/iconfont.css";

Vue.config.productionTip = false;
//Vue.prototype.bus = new Vue;
Vue.use(Mint)

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
