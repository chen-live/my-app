# 事件总线(eventBus)

## 简介

`eventBus`,又称事件总线,在Vue中可以使用`eventBus`作为沟通的桥梁,可以堪称所有组件公用的事件中心

## 如何使用

### 初始化

> 目录  
> event-bus.js
> eventBus.vue
> children
>> decrement.vue
>> increment.vue

1. 创建事件总线(Vue的实例对象)
2. 导出事件总线
    >event-bus.js  

    ```javascript
    import Vue from "vue"
    export const eventBus = new Vue()
    ```

    >main.js 全局注册  

    ```javascript
    Vue.prototype.$eventBus = new Vue();
    ```

3. 其他模块进行注册事件进行监听

    >eventBus.vue  

    ```javascript
    <template>
      <div id="app">
        <router-view></router-view>
        <!-- 局部变量backCount -->
        <div class="show-back">{{ backCount }}</div>
        <!-- 路由跳转 -->
        <button @click="routerHandle('/eventBus/eventBusDecrement')">
          go decrement
        </button>
        <button @click="routerHandle('/eventBus/eventBusIncrement')">
          go increment
        </button>
      </div>
    </template>
    <script>
    import { eventBus } from "./event-bus.js";
    export default {
      name: "App",
      data() {
        return {
          fontCount: 0,
          backCount: 0,
        };
      },
      mounted() {
        // 注册监听事件 incremented
        eventBus.$on("incremented", ({ num }) => {
          this.fontCount += num;
          this.$nextTick(() => {
            this.backCount += num;
          });
        });
        // 注册监听事件 decreased
        eventBus.$on("decreased", ({ num }) => {
          this.fontCount -= num;
          this.$nextTick(() => {
            this.backCount -= num;
          });
        });
      },
      methods: {
        routerHandle(path) {
          if (location.pathname === path) {
            return;
          }
          this.$router.push({ path: path });
        },
      },
    };
    </script>
    ```

    > decrement.vue

    ```javascript
    <template>
      <div>
        <button @click="decrease()">-{{num}}</button>
        <br />
      </div>
    </template>
    <script>
    // 引入event-bus
    import { eventBus } from "../event-bus";
    export default {
      name: "DecreaseCount",
      data() {
        return {
          num: 1,
        };
      },
      methods: {
        routerHandle(path) {
          this.$router.replace(
            { path: path },
          );
        },
        // 触发eventBus.vue注册的decreased事件
        decrease() {
          eventBus.$emit("decreased", {
            num: this.num,
          });
        },
      },
    };
    </script>
    ```

    >increment.vue

    ```javascript
    <template>
      <div>
        <button @click="increment()">+{{num}}</button>
        <br />
      </div>
    </template>
    <script>
    import { eventBus } from "../event-bus";
    export default {
      name: "IncrementCount",
      data() {
        return {
          num: 1,
        };
      },
      methods: {
        routerHandle(path) {
          this.$router.replace(
            {path: path},
          );
        },
        increment() {
          eventBus.$emit("incremented", {
            num: this.num,
          });
        },
      },
    };
    </script>
    ```

### 组件间通讯的其他方式

1. 父 -> 子
    + **`props`**
        在子组件的标签上添加`属性名=属性值`,子组件通过props接收  
2. 子 -> 父
    + **`$on` `$emit`**  
        子组件通过`$on`创建监听方法  父组件引入后通过`$emit`调用方法  
3. 获取父子组件实例
    + **`$ref`**  
        在引入的子组件标签上添加ref属性,通过`this.$ref.属性名`获取子组件实例  
    + **`$parent` `$children`**  
        父组件可用`$children`访问页面中用到的子组件的实例  
        子组件的`$parent`默认指向VueRouter注册的父路由对应的实例,没有父路由则指向App.vue实例,在被引入使用时,指向使用者对应的组件实例  
    + **`Provide` `inject`**  
        多层级注入  
        父组件提供使用`provide`提供值,子组件使用`inject`接收并使用  
        **非响应式:**  

        > eventBus.vue

        ```javascript
        export default {
          provide() {
            return {
              message: this.message,
              changeMessage: this.changeMessage,
            };
          },
          data(){
            return {
              message:"hello world"
            }
          },
          methods:{
            changeMessage(text){
              this.message = text;
            }
          }
        }
        ```

        >increment.vue

        ```javascript
        export default {
          inject:['message','changeMessage'],
          mounted(){
            console.log('message: '+this.message)// message: hello world
            setTimeout(()=>{
              this.changeMessage("hello vue")
            },5000)
            setInterval(()=>{
              console.log(this.message) // 一直打印hello world
            },1000)
          }
        }
        ```

        **响应式:**  
        将`Provide`和`inject`设置为响应式,将message的值改为引用类型即可

        > eventBus.vue

        ```javascript
        export default {
          provide() {
            return {
              message: this.message,
              changeMessage: this.changeMessage,
            };
          },
          data(){
            return {
              message:{message:"hello world"}
            }
          },
          methods:{
            changeMessage(text){
              this.message.message = text;
            }
          }
        }
        ```

    + **`$attrs` `$listeners`**
        结构 demo1引入demo2,demo2引入demo3
        > demo1  
        >> demo2
        >>> demo3
    > increment.vue

    ```javascript
    export default {
      inject:['message','changeMessage'],
      mounted(){
        console.log('message: '+this.message)// message: hello world
        setTimeout(()=>{
          this.changeMessage("hello vue")
        },5000)
        setInterval(()=>{
          console.log(this.message.message) // 五秒内打印 hello world 五秒后打印 hello vue
        },1000)
      }
    }
    ```

### vueRouter嵌套路由

1. 使用children定义子路由
2. 子路由中的path不要加`/`
3. 父组件中需要添加一个`<router-view></router-view>`标签进行占位,否则无法跳转
4. 跳转时需要跳转路由全名
5. 子路由组件中`$parent`默认指向父路由组件
