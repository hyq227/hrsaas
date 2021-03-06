// 权限管理路由规则
import layout from '@/layout'
// 每个子模块 其实 都是外层是layout  组件位于layout的二级路由里面
export default {
  path: '/permission',
  name: 'permissions',
  component: layout,
  children: [{
    path: '', // 这里当二级路由的path什么都不写的时候 表示该路由为当前二级路由的默认路由
    component: () => import('@/views/permission'),
    name: 'permissions',
    meta: {
      title: '权限管理',
      icon: 'lock'
    }
  }]
}
