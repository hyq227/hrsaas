import request from '@/utils/request'

// 获取所有角色列表
export function getRoleList(params) {
  return request({
    method: 'GET',
    url: '/sys/role',
    params
  })
}

// 获取公司信息
export function getCompanyInfo(id) {
  return request({
    url: `/company/${id}`
  })
}

// 删除角色
export function deleteRole(id) {
  return request({
    method: 'DELETE',
    url: `/sys/role/${id}`
  })
}

// 获取角色详情
export function getRoleDetail(id) {
  return request({
    url: `/sys/role/${id}`
  })
}

// 修改角色
export function updateRole(data) {
  return request({
    method: 'PUT',
    url: `/sys/role/${data.id}`,
    data
  })
}

// 添加角色
export function addRole(data) {
  return request({
    method: 'POST',
    url: '/sys/role',
    data
  })
}

// 给角色分配权限
export function assignPerm(data) {
  return request({
    method: 'PUT',
    url: '/sys/role/assignPrem',
    data
  })
}
