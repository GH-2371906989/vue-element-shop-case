import Vue from 'vue'
import VueRouter from 'vue-router'

/* home 路由 */
import home from './HomeRouter.js'
Vue.use(VueRouter)

const routes = [
  {
    path:'',
    redirect:'/login'
  },
  {
    path:'/login',
    component:()=>import('components/common/login/Login')
  },home
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//前置钩子
router.beforeEach((to,from,next)=>{
  //如果用户访问的登录页，直接放行
  if (to.path === '/login') return next()
  //从sessionStorage 中获取到保存的token 值
  const tokenStr = window.sessionStorage.getItem('token')
  //没有token, 强制跳转到登录页
  if (!tokenStr) return next('/login' )
  next ()
})

//后置钩子
router.afterEach((to,from)=>{
  //从from跳转到to
// console.log('-------------')
})
export default router