import './app3.css'
import $ from 'jquery'

const html = `
  <section id="app3">
    <div class="square"></div>
  </section>
`
const $element = $(html).appendTo($('body>.page'))

const $square = $('#app3 .square')
const active = localStorage.getItem('localkey') ==='yes'

$square.toggleClass('active', active)


$square.on('click', ()=>{
 if($square.hasClass('active')) {
   $square.removeClass('active')
   localStorage.setItem('localkey', 'no')
 } else {
   $square.addClass('active')
   localStorage.setItem('localkey', 'yes')
 }
})