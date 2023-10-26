/*
 * @Author: dwb
 * @Date: 2021-04-07 11:05:04
 * @LastEditors: dwb
 * @LastEditTime: 2021-04-07 14:39:49
 * @Description: file content
 */
var postcss = require('postcss')
const plugin = require('./postcssplug')

const fs = require('fs')

const options = { isRemoveNull: true, isRemoveComment: false }

let testFileContent = fs.readFileSync('./test.css', 'utf-8')

async function run(input, opts = {}) {
  let result = await postcss([plugin(opts)]).process(input, {
    from: undefined,
  })
  fs.writeFileSync('./newTest.css', result.css)
}

// run(testFileContent, options)
run(
  `/**
* Paste or drop some CSS here and explore
* the syntax tree created by chosen parser.
* Enjoy!
*/
/*test1*/
ul li {
  /*test2*/
 padding: 5px;
 /*test3*/
   width: 10%;/*test4*/
   /*test5*/
}

/*test6*/
@media screen and (min-width: 480px) {
  /*test7*/
   body {
    /*test8*/
       background-color: lightgreen;
       /*test9*/
   }
   /*test1*/
}
/*test11*/

#main {
 /*test12*/
   border: 1px solid black;/*test14*/
   /*test13*/
}
/*test15*/
ul li {
  /*test16*/
 padding: 5px;/*test17*/
 /*test18*/
}
/*test19*/

ul li {
  width: 10%;
 padding: 5px;
}
`,
  options
)
