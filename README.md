# webpack

## webpack.base.config.js

resolve函数，用于定义返回到app目录下,全局函数

```javascript
const path = require('path');
// __dirname = my-app/build
function resolve(dir){
  return path.join(__dirname,'..',dir)
}
```

### context

`context: path.resolve(__dirname, '../')`
  > context定义入口上下文，也可在**entry**入口处定义  
  > 没有定义的话会默认使用当前目录  
  > 定义过后**entry**可以直接用`./`指向my-app目录下  
  > `path.resolve(__dirname,'../')`会被解析为`__dirname/../`,  
  > 当前路径为 `my-app/build/webpack.base.config.js` ,即context上下文将指向 `my-app/`  

### entry

  定义webpack的入口文件，可以一个，也可以是多个

  ```javascript
  entry: {
    app: './src/main.js'
  },
  ```

### output

定义webpack的生成文件信息

1. **path** : 输出文件目录

    ```javascript
      output:{
        path:path.resolve(__dirname,'..','/dist');//src/dist
      }
    ```

2. **filename** : 通常是webpack利用hash算法自动生成

      ```javascript
      output:{
        filename:'[name].js'
      }
      ```

3. **publicPath** : index.html引入的js或者css前加上一层**publicPath**

      ```javascript
      output:{
        publicPath:'/'
      }
      /**
        * build出来后，引入的js路径为/static/js/[hash].js
        * 如果改成'../../' 引入的js路径就变为'../../js/[hash].js'
        * 改为'./' 则build出来后可以直接双击打开，但是webpack-dev-server则无法get到文件，服务器上也无法找到文件
        * 可以根据生产或开发环境(process.env.NODE_ENV==='production')来区分publicPath
      */
      ```

### resolve

1. **extensions** : 指定默认后缀名查找顺序

    ```javascript
    resolve:{
      extensions:['.js', '.vue', '.json']
    }
    /**
     * 如引入一个index,会第一个去查找index.js,接着查找index.vue,最后找index.json
    */
    ```

2. **aligns** : 给文件或者路径起别名

    ```javascript
    resolve:{
      aligns:{
        'src':resolve('src')
      }
    }
    /**
     * 为src起一个别名，例如一个文件在src/view/Home/home.vue
     * 如果要引入一个文件需要'../../../libs/fetch.js'
     * 配置别名过后可以直接直接用 src 进行引入 'src/libs/fetch.js'
    */
    ```

3. **modules** : 定义模块查找路径，通常情况下不需要定义，因为默认就是从node_modules中开始找，找不到在向外层找

    ```javascript
    resolve:{
      modules:[resolve("node_modules")]
    }
    ```

### module

1. **noParse**
webpack不会解析在noParse中正则匹配到的文件,可以忽略大型的library来提高性能

    ```javascript
    module:{
      noParse:function(content){
        return /lodash/.test(content)
      }
    }
    ```

2. 
