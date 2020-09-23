# webpack

## webpack.base.config.js

resolve函数，用于定义返回到app目录下

```javascript
const path = require('path');
// __dirname my-app/build
function resolve(dir){
  return path.join(__dirname,'..',dir)
}
```

1. context
    `context: path.resolve(__dirname, '../')`
    + context定义入口上下文，也可在**entry**入口处定义
    + 没有定义的话回默认指向C:/User/……
    + 定义过后**entry**可以直接用`./`指向my-app目录下
2. entry
    定义webpack的入口文件，可以一个，也可以是多个

    ```javascript
    entry: {
      app: './src/main.js'
    },
    ```

3. output
    定义webpack的生成文件信息
    + **path** : 输出文件目录

    ```javascript
     output:{
       path:path.resolve(__dirname,'..','/dist');//src/dist
     }
    ```

    + **name** : 通常是webpack利用hash算法自动生成

    ```javascript
    output:{
      name:'[name].js'
    }
    ```

    + **publicPath** : index.html引入的js或者css前加上一层**publicPath**

    ```javascript
    output:{
      publicPath:'/'
    }
    /**
     * build出来后，引入的js路径为/static/js/[hash].js
     * 如果改成'../../' 引入的js路径就变为'../../js/[hash].js'
     * 改为'./' 则build出来后可以直接双击打开
     * 可以根据生产或开发环境(process.env.NODE_ENV==='production')来区分publicPath
    */
    ```

4. resolve
