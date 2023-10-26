/*
 * @Author: dwb
 * @Date: 2020-12-25 15:10:43
 * @LastEditors: dwb
 * @LastEditTime: 2021-04-07 11:01:31
 * @Description: 测试方法
 */
console.log('log----1-1')
console.info('info-----1-2')
console.error('error-----1-3')

function foo2() {
  console.log('log----2-1')
  console.info('info-----2-2')
  console.error('error-----2-3')
}

const foo3 = () => {
  console.log('log----3-1')
  console.info('info-----3-2')
  console.error('error-----3-3')
}

;(function () {
  console.log('log----4-1')
  console.info('info-----4-2')
  console.error('error-----4-3')
})()

$(function () {
  console.log('log----5-1')
  console.info('info-----5-2')
  console.error('error-----5-3')
})

const foo6 = {
  fun1: function () {
    console.log('log----6-1')
    console.info('info-----6-2')
    console.error('error-----6-3')
  },
}

const fun = function () {}
fun.prototype.test = function () {
  console.log('log----7-1')
  console.info('info-----7-2')
  console.error('error-----7-3')
}
