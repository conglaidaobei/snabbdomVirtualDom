import h from './mysnabbdom/h.js'

var myVode = h('div', {}, [
    h('p', {}, '111'),
    h('p', {}, '222'),
    h('p', {}, '333'),
    h('p', {},  h('p', {}, '444'))
])
console.log(myVode)