import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h,
} from "snabbdom";
//创建patch函数
const patch = init(
  [
    classModule,
    propsModule,
    styleModule,
    eventListenersModule
  ]);

//创建虚拟节点
const myVonde1 = h(
  'a', {
  props:
  {
    href: 'https://www.baidu.com',
    target: '_blank'
  }
},
  '百度')
console.log(myVonde1)
const myVonde2 = h('ul',[
  h('li','aa'),
  h('li','bb'),
  h('li','aca')
],)
console.log(myVonde2)
//让虚拟节点上树
const container = document.getElementById('container');
patch(container, myVonde2);