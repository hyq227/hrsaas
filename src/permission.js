// 权限拦截
import router from '@/router' // 引入路由实例
import store from '@/store' // 引入vuex store 实例
import NProgress from 'nprogress' // 引入一份进度条插件
import 'nprogress/nprogress.css' // 引入进度条样式

const whiteList = ['/login', '/404'] // 定义白名单 不受权限控制的页面

// 路由前置守卫
router.beforeEach(async(to, from, next) => {
  NProgress.start() // 开启进度条
  // 有无 token
  if (store.getters.token) {
    // 有 token 是否访问登录页
    if (to.path === '/login') {
      next('/') // 跳到主页
    } else {
      if (!store.getters.userId) {
        // 不存在用户id说明没有获取过，所以需要获取
        const { roles } = await store.dispatch('user/getUserInfo') // 必须改为同步，否则资料还没获取就放行了
        // 筛选用户的可用路由
        const routes = await store.dispatch('permission/filterRoutes', roles.menus)
        // 添加动态路由到路由表
        router.addRoutes([...routes, { path: '*', redirect: '/404', hidden: true }])
        next(to.path) // 不这样写会使页面刷新之后权限消失 相当于跳到对应的地址  相当于多做一次跳转 为什么要多做一次跳转
        // 进门了，但是进门之后我要去的地方的路还没有铺好，直接走，掉坑里，多做一次跳转，再从门外往里进一次，跳转之前 把路铺好，再次进来的时候，路就铺好了
      } else {
        next() // 放行
      }
    }
  } else {
    // 无 token
    if (whiteList.indexOf(to.path) > -1) {
      // 在白名单里面
      next()
    } else {
      next('/login') // 跳到登录页
    }
  }
  NProgress.done() // 手动强制关闭一次  为了解决手动切换地址时  进度条的不关闭的问题
})
// 路由后置守卫
router.afterEach(route => {
  NProgress.done() // 关闭进度条
})
