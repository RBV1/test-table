import Vue from 'vue'
import App from './components/App.vue'
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import router from '@/router'
import store from '@/store'


// loads the Icon plugin
UIkit.use(Icons);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
