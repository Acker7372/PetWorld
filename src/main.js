/* Set up using Vue 3 */

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import './assets/style/all.scss';

// fontawesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faLocationDot,
  faVenusMars,
  faCalendarDays,
  faPencil,
} from '@fortawesome/free-solid-svg-icons';
library.add(faLocationDot, faVenusMars, faCalendarDays, faPencil);

// element-plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ElementPlus);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
