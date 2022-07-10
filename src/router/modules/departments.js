// 组织架构路由规则
import layout from '@/layout'
// 每个子模块 其实 都是外层是layout  组件位于layout的二级路由里面
export default {
  path: '/departments',
  name: 'departments',
  component: layout,
  children: [{
    path: '', // 这里当二级路由的path什么都不写的时候 表示该路由为当前二级路由的默认路由
    component: () => import('@/views/departments'),
    name: 'departments',
    meta: {
      title: '组织架构',
      icon: 'tree'
    }
  }]
}
