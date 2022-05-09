import h from './mysnabbdom/h.js'
import patch from './mysnabbdom/patch'

const myVnode1 = h('ul', {}, [
  h('li', {key: 'A'}, 'A'),
  h('li', {key: 'B'}, 'B'),
  h('li', {key: 'C'}, 'C'),
  h('li', {key: 'D'}, 'D'),
  h('li', {key: 'E'}, 'E')
])

const myVnode2 = h('ul', {}, [
  h('li', {key: 'Q'}, 'Q'),
  h('li', {key: 'P'}, 'P'),
  h('li', {key: 'A'}, 'A'),
  h('li', {key: 'B'}, 'B'),
  h('li', {key: 'G'}, 'G'),
  h('li', {key: 'C'}, 'C'),
  h('li', {key: 'E'}, 'E'),
  h('li', {key: 'D'}, 'D')
])
const container = document.getElementById('container')

patch(container, myVnode1)

btn.onclick = () => {
  patch(myVnode1, myVnode2)
}
