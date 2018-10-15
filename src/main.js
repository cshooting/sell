import Vue from 'vue'
import App from './App'
import vueRouter from 'vue-router'
import routers from './router/router'
import axios from 'axios'
//引入全局样式
import './common/less/base.styl'
import './common/less/icon.styl'
const router = new vueRouter({ //这里名字只能是router
  linkActiveClass:"active",
  mode: 'history',
  routes: routers
});
Vue.use(vueRouter);
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
