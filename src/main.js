import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

App.listen(8080, () => {
  console.log("Server is running on port 8080");
});