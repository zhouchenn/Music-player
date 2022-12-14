import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store/index.js'
const routes = [
  {
    // 主页
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    // 关于
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    // 音乐列表
    path: '/itemMusic',
    name: 'ItemMusic',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "itemMusic" */ '../views/ItemMusic.vue')
  },
  {
    // 搜索
    path: '/search',
    name: 'Search',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "search" */ '../views/Search.vue')
  },
  {
    // 登录
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    // 个人中心
    path: '/infoUser',
    name: 'InfoUser',
    // 判断已经登录或有token或能获取token
    // beforeEnter:(to,from,next)=>{
    //   if(store.state.isLogin || store.state.token || localStorage.getItem('token')){
    //     next()
    //   }else{
    //     // 返回登录页
    //     next('/login')
    //   }
    // },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "infoUser" */ '../views/InfoUser.vue')
  }
  ,
  {
    path: '/shipin',
    name: 'ShiPin',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "ShiPin" */ '../views/ShiPin.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
// 判断是否现实底部
router.beforeEach((to,from)=>{
  if(to.path==='/login'){
    store.state.isFooterMusic=true
  }else{
    store.state.isFooterMusic=false
  }
})
export default router
