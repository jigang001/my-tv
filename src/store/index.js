import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    version: '1.0.0',
    host: 'http://10.0.4.9:3000'
  }
})
