import Vue from 'vue'
import VueNotifications from 'vue-notifications'

if (process.BROWSER_BUILD) {
  Vue.use(VueNotifications)
}
