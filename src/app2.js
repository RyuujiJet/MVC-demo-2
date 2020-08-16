import './app2.css'
import $ from 'jquery'

const eventBus = $(window)

const localkey = 'app2.index'
// 数据相关都放到M
const m = {
   data: {
     index: parseInt(localStorage.getItem(localkey)) || 0
   },
   create() {},
   delete() {},
   update(data) {
     Object.assign(m.data, data)
     eventBus.trigger('xxx')
     localStorage.setItem('index', m.data.index)
   },
   get() {}
 }
// 视图相关都放到V
const v = {
   el: null,
  html: (index) =>{
     return `
   <div>
      <ol class="tab-bar">
         <li class="${ index === 0 ? 'selected' : '' }" data-index="0"><span>111</span></li>
         <li class="${ index === 1 ? 'selected' : '' }" data-index="1"><span>222</span></li>
      </ol>
      <ol class="tab-content">
         <li class="${ index === 0 ? 'active' : '' }">内容1</li>
         <li class="${ index === 1 ? 'active' : '' }">内容2</li>
      </ol>
   </div>
   `},
   init(container) {
     v.el = $(container)
   },
   render(index) {
     if (v.el.children.length !== 0) v.el.empty()
     $(v.html(index)).appendTo(v.el)
   }
 }
// 其他都放C
const c = {
   init(container) {
     v.init(container)
     v.render(m.data.index) 
     c.autoBindEvents()
     eventBus.on('xxx', () => {
       v.render(m.data.index)
     })
   },
   events: {
     'click .tab-bar li': 'x'
   },
   x(e) {
      const index = parseInt(e.currentTarget.dataset.index)
      m.update({index: index})
   },
   autoBindEvents() {
     for( let key in c.events) {
       const value = c[c.events[key]]
       const spaceIndex = key.indexOf(' ')
       const part1 = key.slice(0, spaceIndex)
       const part2 = key.slice(spaceIndex + 1)
       v.el.on(part1, part2, value)
     }
   }
 }

 export default c