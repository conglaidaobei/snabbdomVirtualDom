npm init
npm i -s snabbdom
npm i -D webpack@5 webpack-cli@3 webpack-dev-server@3


.d.ts 文件:
 ts ===> js  的ts文件的类型映射

 webpack: 构建工具
 webpack-dev-serve : 8080 virtualport

webpack.config.js ====> 虚拟打包路径要用:publicPath
// "test": "echo \"Error: no test specified\" && exit 1"  ====> "dev": "webpack-dev-server"


虚拟dom: 用js对象 描述 dom的层次结构 .dom中的一切属性都在虚拟dom中有对应的属性

.研究1:虎拟DOM如何被渲染函数(h函数)产生?    h函数用来产生 虚拟节点 (vnode)
        我们要手写h函数
虚拟节点属性:
            chiledren      子元素
            data    属性,样式
            elm     真正的dom节点,undefined表示还没上树
            key     节点的唯一标识,服务于最小更新的
            sel     选择器
            text    文本
            
·研究2: diff算法原理?
        我们要手写diff算法
·研究3:虚拟DOM如何通过diff变为真正的DOM的
        事实上，虚拟DOM变回真正的DOM，是涵盖在diff算法里面的

key是节点的唯一标识,告诉diff算法,在更新前后它们是同一个dom节点. 同一节点的判定:选择器和key相同
只有是同一个虚拟节点,才进行精细化比较
只进行同层比较,不进行跨层比较.即使是同一片虚拟节点,但是跨层了,精细化比较失效,而是删除全部旧的,插入新的