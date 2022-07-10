import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getTimeStamp } from '@/utils/auth'
import router from '@/router'

const timeout = 3600 // 超时时间

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API
  // timeout: 5000 // 超时时间
})

// 请求拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    if (isCheckTimeout()) {
      // 如果为真说明超时
      store.dispatch('user/logout') // 删除token
      router.push('/login') // 跳转到登录页面
      return Promise.reject(new Error('token超时了'))
    }
    config.headers['Authorization'] = `Bearer ${store.getters.token}` // 统一注入token
  }
  return config // 返回配置
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(response => {
  const { success, message, data } = response.data
  if (success) {
    return data
  } else {
    Message.error(message) // 提示错误信息
    return Promise.reject(new Error(message)) //
  }
}, error => {
  if (error.response && error.response.data && error.response.data.code === 10002) {
    // 后端告诉我们token失效
    store.dispatch('user/logout') // 删除token
    router.push('/login') // 跳转到登录页面
  } else {
    Message.error(error.message)
  }
  return Promise.reject(error) // 返回执行错误 让当前的执行链跳出成功 直接进入 catch
})

// 是否超时
function isCheckTimeout() {
  const currentTime = Date.now() // 当前时间戳
  const timeStamp = getTimeStamp() // 缓存时间戳
  return (currentTime - timeStamp) / 1000 > timeout
}
export default service
