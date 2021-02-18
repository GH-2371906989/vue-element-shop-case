import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
//导入全局样式
import 'assets/css/global.css'

//导入axios并配置
import axios from 'axios'
const https = axios.create({
    baseURL: 'http://127.0.0.1:8888/api/private/v1/',
    responseType: 'json'
  })
 https.interceptors.request.use(config=>{
	  config.headers.authorization=window.sessionStorage.getItem('token')
    //console. log(config);
    // 1.比如config中的一些信息不符合服务器的要求
    // 2.比如每次发送网络请求时，都希望在界面中显示一个请求的图标
    //1 3.某些网络请求(比如登录(token)), 必须携带一 些特殊的信息
    return config 
  },err=>{
    console.log(err)
  })
  https.interceptors.response.use(res=>{
    return res.data
  },err=>{
    console.log(err)
  })
Vue.prototype.$http=https
import 'default-passive-events'
//导入图标
import 'assets/fonts/iconfont.css'


Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
