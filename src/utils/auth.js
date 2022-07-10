import Cookies from 'js-cookie'

const TokenKey = 'hrsaas-ihrmhyq-token' // 设定一个独一无一的key
const timeKey = 'hrsaas-timehyq-token'

// 获取token
export function getToken() {
  return Cookies.get(TokenKey)
}

// 存入token
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

// 清除token
export function removeToken() {
  return Cookies.remove(TokenKey)
}

// 获取时间戳
export function getTimeStamp() {
  return Cookies.get(timeKey)
}

// 设置时间戳
export function setTimeStamp() {
  Cookies.set(timeKey, Date.now())
}
