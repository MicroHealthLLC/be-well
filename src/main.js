import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Amplify from "aws-amplify";
import aws_exports from "./aws-exports";

Amplify.configure({
  ...aws_exports,
  Auth: {
    mandatorySignIn: true,
    region: process.env.VUE_APP_AWS_REGION,
    uerPoolId: process.env.VUE_APP_AWS_IDENTITY_POOL_ID,
    clientId: process.env.VUE_APP_AWS_POOL_WEB_CLIENT_ID,
  },
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
