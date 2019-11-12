import Vue from 'vue'
import App from './App'
import http from "./http/index.js"
import store from "./store/index.js"
import loding from "./compents/loding.vue"
import common from "./common/common.js";
import Toast from "./compents/toast/toast.vue"
Vue.prototype.$common = common;
Vue.component("loding",loding);
Vue.component("Toast",Toast);
Vue.prototype.$http = http;
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	store,
  ...App
})
app.$mount()
