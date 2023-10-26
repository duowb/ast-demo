/*
 * @Author: dwb
 * @Date: 2021-04-07 11:03:15
 * @LastEditors: dwb
 * @LastEditTime: 2021-04-07 11:03:28
 * @Description: file content
 */
const reg = /(log|info|error)$/

const isRemoveAllConsole = true

// ast (抽象语法分析树)

//引用@babel/parser包，将代码转换成ast
const parser = require('@babel/parser')
const traverse = require('@babel/traverse')
const generator = require('@babel/generator')
const types = require('@babel/types')

const fs = require('fs')

let testFileContent = fs.readFileSync('./test.js', 'utf-8')
const code = testFileContent

//1，先将代码转换成ast
const codeAst = parser.parse(code)

//2，解析代码并删除
//2.1创建一个访问者对象，把这个理解为，需要访问这个语法树中的哪些类型
let visitors = {
  // 如果是调用表达式
  CallExpression(path) {
    // 取出调用的节点信息
    const { callee } = path.node
    //判断是不是调用节点信息，并且是对象的名称是console，方法符合正则的判断
    if (
      types.isMemberExpression(callee) &&
      callee.object.name === 'console' &&
      reg.test(callee.property.name)
    ) {
      if (isRemoveAllConsole) {
        path.remove()
      } else {
        // 向上找，如果找到父元素是方法，就删除
        let parentFun = path.findParent(() => {
          return (
            // 如果是函数声明
            path.isFunctionDeclaration() ||
            // 如果是箭头函数表达式
            path.isArrowFunctionExpression() ||
            // 如果是函数表达式
            path.isFunctionExpression()
          )
        })
        if (parentFun) {
          path.remove()
        }
      }
    }
  },
}
traverse.default(codeAst, visitors)

//3，生成新的代码
let newCode = generator.default(codeAst, {}, code)

fs.writeFileSync('./newTest.js', newCode.code)
