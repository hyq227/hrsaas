import request from '@/utils/request'

// 封装登录接口
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}
// 获取用户信息接口
export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}
// 获取用户基本信息（头像）
export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`
  })
}

export function logout() {

}
