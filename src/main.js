import Vue from 'vue'
import App from './App'
import Store from './store'
import WXrequest from './utils/wx-request'

Vue.prototype.$store = Store
Vue.prototype.$httpWX = WXrequest

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
