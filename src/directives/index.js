// 管理所有的自定义指令

export const imagerror = {
  // 当前dom 元素插入到节点后执行
  inserted(dom, options) {
    // 判断地址是否为空的解决
    dom.src = dom.src || options.value
    // 图片加载失败后会触发的事件
    dom.onerror = function() {
      dom.src = options.value
    }
  },
  // 所在组件的VNode和其孩子的VNode全部更新时调用。
  componentUpdated(dom, options) {
    dom.src = dom.src || options.value
  }
}
