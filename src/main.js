import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios);

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//英语、日语语言切换功能
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
const messages = {
  'en': require('./utils/lang/en'),   // 英文语言包
  'ja': require('./utils/lang/ja')    // 日文语言包
}
const i18n = new VueI18n({
  locale: 'en',
  messages,
})

// import x2js from 'x2js'
// Vue.prototype.$x2js = new x2js()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
