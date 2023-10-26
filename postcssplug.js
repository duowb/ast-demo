/*
 * @Author: dwb
 * @Date: 2021-04-07 11:33:31
 * @LastEditors: dwb
 * @LastEditTime: 2021-04-07 16:00:31
 * @Description: file content
 */
/**
 * 递归删除所有的注释
 * @param {*} nodes
 */
const recursionRemoveComment = (nodes) => {
  nodes &&
    nodes.forEach((decl) => {
      decl.type === 'comment' && decl.remove()
      decl.nodes && decl.nodes.length > 0 && recursionRemoveComment(decl.nodes)
    })
}
const defOpts = {
  // 是否删除空的样式
  isRemoveNull: false,
  // 是否删除所有的注释
  isRemoveComment: false,
}
module.exports = (opts = defOpts) => {
  // Work with options here
  return {
    postcssPlugin: 'postcss-test-plugin',
    Root(root, postcss) {
      // Transform CSS AST here

      // 所有的注释
      opts.isRemoveComment &&
        root.walkComments((comment) => {
          // 删除所有的注释
          comment.remove()
        })

      // recursionRemoveComment(root.nodes)
      console.log('--start--')
      const nSet = new Set()
      root.walkRules(function (rule) {
        const { type, selector } = rule
        let flag = true
        // console.log(`type:${type}/selector:${selector}`)
        // text = rule_ul li_padding:5px;width:10px;
        let text = `${type}_${selector}_`
        let decls = []
        rule.walkDecls(function (decl) {
          flag = false
          // text += `${decl.prop}:${decl.value};`
          // 为什么要换成数组?如果样式的内容一样,但是位置不同,比如: a{width:10px;padding:10px} a{padding:10px;width:10px}
          decls.push(`${decl.prop}:${decl.value}`)
        })
        text += decls.sort().join(';')
        if (opts.isRemoveNull && flag) {
          rule.remove()
        }
        if (!nSet.has(text)) {
          nSet.add(text)
        } else {
          rule.remove()
        }
      })
      console.log('--end--')
    },

    /*
    Declaration (decl, postcss) {
      // The faster way to find Declaration node
    }
    */

    /*
    Declaration: {
      color: (decl, postcss) {
        // The fastest way find Declaration node if you know property name
      }
    }
    */
  }
}
module.exports.postcss = true

// 字符串	rule_ul li_padding:5px;width:10%;
// 16位 小写	acd42f14059e7fff
// 16位 大写	ACD42F14059E7FFF
// 32位 小写	fa27796aacd42f14059e7fffa88d552a
// 32位 大写	FA27796AACD42F14059E7FFFA88D552A

// 字符串	rule_ul li_width:10%;padding:5px;
// 16位 小写	46cbb3df4793dd05
// 16位 大写	46CBB3DF4793DD05
// 32位 小写	2355fdde46cbb3df4793dd05961b6ee8
// 32位 大写	2355FDDE46CBB3DF4793DD05961B6EE8
