import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth'
import { login, getUserInfo, getUserDetailById } from '@/api/user'
import { resetRouter } from '@/router'
const state = {
  token: getToken(), // 设置token初始状态
  userInfo: {}
}
const mutations = {
  setToken(state, token) {
    state.token = token // 设置vuex中缓存
    setToken(token) // 本地缓存
  },
  // 删除缓存
  removeToken(state) {
    state.token = null // 删除vuex中缓存
    removeToken() // 本地缓存
  },
  // 设置用户信息
  setUserInfo(state, result) {
    state.userInfo = { ...result }
  },

  // 删除用户信息
  removeUserInfo(state) {
    state.userInfo = {}
  }
}
const actions = {
  // 登录
  async login(context, data) {
    const result = await login(data)
    context.commit('setToken', result)
    setTimeStamp() // 存入时间戳
  },
  // 获取用户资料action
  async getUserInfo({ commit }) {
    const result = await getUserInfo() // 用户基本信息
    const baseInfo = await getUserDetailById(result.userId) // 用户头像
    commit('setUserInfo', { ...result, ...baseInfo })
    return result
  },
  // 登出
  logout({ commit }) {
    // 删除token
    commit('removeToken')
    // 删除用户信息
    commit('removeUserInfo')
    // 重置路由
    resetRouter()
    // 清空permission模块下的state数据
    commit('permission/setRoutes', [], { root: true })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}

