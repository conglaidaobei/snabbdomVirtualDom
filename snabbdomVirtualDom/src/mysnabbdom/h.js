import vnode from "./vnode.js";
/**
 * h('div',{},文字)
 * h('div',{},[])
 * h('div',{},h())
 * 
 * @param {*} sel 
 * @param {*} data 
 * @param {*} c 
 * @returns 
 */
export default function (sel, data, c) {
    if (arguments.length != 3) throw new Error('形参个数不为3')
    if (typeof c == 'string' || typeof c == 'number') return vnode(sel, data, undefined, c, undefined);
    else if (Array.isArray(c)) {
        let children = []
        c.forEach(h => {
            if (!(typeof h == 'object' && h.hasOwnProperty('sel'))) {
                throw new Error('数组内对象存在不是h函数的元素')
            }
            children.push(h)
        })
        return vnode(sel, data, children, undefined, undefined)
    } else if (typeof c == 'object' && c.hasOwnProperty('sel')) {
        let children = [c]
        return vnode(sel, data, children, undefined, undefined)
    }else   throw new Error('第三个参数类型错误')

}