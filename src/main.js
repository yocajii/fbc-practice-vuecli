import { createApp } from "vue";
import App from "./App.vue";
import "./style.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faPlus,
  faFile,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

library.add(faPlus, faFile, faPenToSquare);

const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
