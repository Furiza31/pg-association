import { createApp } from "vue";
import App from "./App.vue";
import "./assets/index.css";
import { i18n } from "./plugins/i18n";
import { pinia } from "./plugins/pinia";
import { router } from "./plugins/router";

createApp(App).use(pinia).use(router).use(i18n).mount("#app");
