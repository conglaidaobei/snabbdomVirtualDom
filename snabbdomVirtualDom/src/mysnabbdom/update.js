import createElement from './createElement.js'
import patchVnode from './patchVnode.js'
function checkSameVnode (a, b) {
  return a.sel == b.sel && a.key == b.key
}
export default function update (parentElm, oldChildEle, newChildEle) {
  let oldStartIndex = 0
  let oldEndIndex = oldChildEle.length - 1
  let newStartIndex = 0
  let newEndIndex = newChildEle.length - 1

  let oldStartVnode = oldChildEle[0]
  let oldEndVnode = oldChildEle[oldEndIndex]
  let newStartVnode = newChildEle[0]
  let newEndVnode = newChildEle[newEndIndex]
  // 注意循环条件的等号
  while(newStartIndex <= newEndIndex && oldStartIndex <= oldEndIndex){
    if (oldChildEle[oldStartIndex] == undefined) {
      oldStartVnode = oldChildEle[++oldStartIndex]
    }else if (oldChildEle[oldEndIndex] == undefined) {
      oldEndVnode = oldChildEle[--oldEndIndex]
    }
    else if (newChildEle[newStartIndex] == undefined) {
      newStartVnode = newChildEle[++newStartIndex]
    }
    else if (newChildEle[newEndIndex] == undefined) {
      newEndVnode = newChildEle[--newEndIndex]
    }
    else if (checkSameVnode(oldStartVnode, newStartVnode)) {
      patchVnode(oldStartVnode, newStartVnode)
      oldStartVnode = oldChildEle[++oldStartIndex]
      newStartVnode = newChildEle[++newStartIndex]
    }else if (checkSameVnode(oldEndVnode, newEndVnode)) {
      patchVnode(oldEndVnode, newEndVnode)
      oldEndVnode = oldChildEle[--oldEndIndex]
      newEndVnode = newChildEle[--newEndIndex]
    }
    else if (checkSameVnode(oldStartVnode, newEndVnode)) {
      patchVnode(oldStartVnode, newEndVnode)
      parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling)
      oldStartVnode = oldChildEle[++oldStartIndex]
      newEndVnode = newChildEle[--newEndIndex]
    }
    else if (checkSameVnode(oldEndVnode, newStartVnode)) {
      patchVnode(oldEndVnode, newStartVnode)
      parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm)
      oldEndVnode = oldChildEle[--oldEndIndex]
      newStartVnode = newChildEle[++newStartIndex]
    }else { // 都没命中  .区别于下面while循环之外的是.这里是指 新旧没有任何一方 是 完全处理完的状态 
      var keyMap = {}
      for (let i = oldStartIndex;i <= oldEndIndex;i++) {
        if (oldChildEle[i]) { // 这个判断也莫名其妙 ..类型都确定了.居然会报undefined
          const isExit = oldChildEle[i].key
          if (isExit) {
            keyMap[isExit] = i
          }
        }
      }
      // noFindIndex 是指 不能在 新旧的 前后 直接找到,而是在中部
      const FindIndex = keyMap[newStartVnode.key]
      if (!FindIndex) { // 旧的里面没找这个新的数据,所以它是全新的    ==>添加
        parentElm.insertBefore(createElement(newStartVnode), oldStartVnode.elm)
      }else { // 旧的里有,但是在中部 ==>移动 
        const toMoveElem = oldChildEle[FindIndex]
        patchVnode(toMoveElem, newStartVnode)
        oldChildEle[FindIndex] = undefined
        // 移动
        parentElm.insertBefore(toMoveElem.elm, oldStartVnode.elm)
      }
      // 指针,节点下移        ==>所以进入while之前要判断节点存在,和 oldChildEle[FindIndex] 是否为 undefined .这些都表示已经处理过
      newStartVnode = newChildEle[++newStartIndex]
    }
  }
  /**  新旧有任何一方是完全处理完的状态    */

  // 注意循环条件的等号
  if (newStartIndex <= newEndIndex) { // 旧的已越界, 新的未越界    添加
    // const before = null == newChildEle[newEndIndex + 1] ? null : newChildEle[newEndIndex + 1].elm
    // console.log(newChildEle[newEndIndex + 1]) // undefined
    // console.log(before) //null
    // 注意循环条件的等号
    for (let i = newStartIndex;i <= newEndIndex;i++) {
      //  insertBefore 被插入的对象如果是null(也就是这里的before),则自动插到队尾.这和appenchlld是一样的
      // 如果是 undefined 则是第0个
      parentElm.insertBefore(createElement(newChildEle[i]), oldChildEle[oldStartIndex].elm)
    }
  }
  else if (oldStartIndex <= oldEndIndex) { // 新的已越界,旧的没越界 删除
    for (let i = oldStartIndex;i <= oldEndIndex;i++) {
      if (oldChildEle[i]) // 不加判单会报错 .但是不知道为什么元素会是undefined .就像我知道银行里面一定有钱,而银行却问我你是来抢劫的嘛F
        parentElm.removeChild(oldChildEle[i].elm)
    }
  }
}
