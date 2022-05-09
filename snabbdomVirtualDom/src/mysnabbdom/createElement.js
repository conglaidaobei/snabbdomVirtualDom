
export default function createElement(vnode) {
    let domNode = document.createElement(vnode.sel)
    if (vnode.text != '' && (vnode.children == undefined || vnode.children.length == 0)) {
        domNode.innerText = vnode.text    
         //这里为什么不上树呢. 是因为当他是一个文本类(即没有子数组.),
        //而createElement方法只传入了自身的虚拟节点,所以方法中只能实现  将自身作为 字数组 的附着点(上树目标).
        //而把自己上树的事情,放到patch方法里去做,因为patch方法里传入了新旧两个节点,此时就有了自己的附着点

    } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
        //递归
        vnode.children.forEach(Vnode => {
            let childDom = createElement(Vnode)
            domNode.appendChild(childDom)  //vnod 是上一层A, 遍历的是 A的数组(也就是子元素组) ,所以子 加到 父上
        });
    }
    vnode.elm = domNode
    return domNode      //返回一个n-1层的dom对象 , 并提供给第n层的 appendChild()方法作为 标杆 ,来添加元素   ==>即第11行domNode.appendChild(childDom)
}