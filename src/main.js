import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
//导入全局样式
import 'assets/css/global.css'

//导入图标
import 'assets/fonts/iconfont.css'


Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
