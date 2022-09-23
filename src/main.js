import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { TiptapVuetifyPlugin } from "tiptap-vuetify";
import "tiptap-vuetify/dist/main.css";
import { Amplify } from "aws-amplify";
import sso_config from "./sso-exports"
//import aws_exports from "./aws-exports";
import VueConfetti from 'vue-confetti'
import {
  applyPolyfills,
  defineCustomElements,
} from "@aws-amplify/ui-components/loader";

applyPolyfills().then(() => {
  defineCustomElements(window);
});

Amplify.configure(sso_config);

Vue.config.productionTip = false;
Vue.use(VueConfetti)
Vue.use(TiptapVuetifyPlugin, {
  vuetify,
  iconsGroup: "mdi",
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
