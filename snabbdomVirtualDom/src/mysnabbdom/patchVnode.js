import createElement from './createElement'
import update from './update'

export default function patchVnode (oldVnode, newVnode) {
  // 同一节点
  // 同一对象
  if (oldVnode == newVnode) return
  // 新的有text属性
  if (newVnode.text != undefined && (newVnode.children == undefined || newVnode.children.length == 0)) {
    if (newVnode.text != oldVnode.text) { //内容相同,覆盖
      oldVnode.elm.innerText = newVnode.text
    }
    //内容不同  无动作
  }else {
   
    // 新的没有text属性  /也就是有children
    // 老的有children
    if (oldVnode.children != undefined && oldVnode.children.length > 0) {
      update(oldVnode.elm, oldVnode.children, newVnode.children)
    } else {
      // 老的没有children,新的有
      oldVnode.elm.innerHTML = ''
      newVnode.children.forEach(item => {
        let dom = createElement(item)
        oldVnode.elm.appendChild(dom)
      })
    }
  }
}
