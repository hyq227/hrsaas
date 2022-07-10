// 专门处理权限路由的模块
import { constantRoutes, asyncRoutes } from '@/router' // 引入静态路由
const state = {
  routes: constantRoutes // 所有人默认拥有静态路由
}
const mutations = {
  // newRoutes 认为是我们登陆成功需要添加的路由
  setRoutes(state, newRoutes) {
    state.routes = [...constantRoutes, ...newRoutes] // 每次都是在静态路由的基础上去添加新的路由
  }
}
const actions = {
  // 筛选权限路由
  // 第二个参数表示当前用户所拥有的菜单的权限
  filterRoutes({ commit }, menu) {
    const routes = []
    // 筛选动态路由中和menus能够对上的路由
    menu.forEach(key => {
      // key 就是标识
      // 有没有对象中的name属性等于 key的 如果找不到就没权限 如果找到了 要筛选出来
      routes.push(...asyncRoutes.filter(item => item.name === key)) // 得到的是数组，要通过push添加需要解构
    })
    // 得到的routes是所有模块中满足权限要求的路由数组
    // routes就是当前用户所拥有的 动态路由的权限
    commit('setRoutes', routes)
    return routes // state数据 是用来 显示左侧菜单用的  return  是给路由addRoutes用的
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
