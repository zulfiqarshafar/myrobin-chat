import { createApp } from "vue";
import VueCookies from "vue-cookies";
import App from "./App.vue";
import router from "./router";

import "./assets/main.scss";

createApp(App).use(router).use(VueCookies).mount("#app");
