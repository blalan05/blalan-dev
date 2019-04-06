import Vue from 'vue';
// import vuetify from './plugins/vuetify'
import Vuetify from 'vuetify/lib'
let vuetifyOpts = {
  icons: {
    iconfont: 'fa'
  },
  rtl: false
}
import 'vuetify/src/styles/main.sass'
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import '@fortawesome/fontawesome-free/css/all.css'

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify: new Vuetify(vuetifyOpts),
  render: (h) => h(App),
}).$mount('#app');
