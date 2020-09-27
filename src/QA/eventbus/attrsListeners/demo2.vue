<template>
  <div>
    <div></div>
    <Demo3 v-bind="$attrs" :foo="foo" />
  </div>
</template>

<script>
import Demo3 from "./demo3";
export default {
  inheritAttrs: false,
  props: {
    foo: {
      type: String,
      default: "foo Demo2",
      value:"demo2 props foo"
    },
  },
  data(){
    return {
      // foo:"demo2 foo!"
    }
  },
  components: {
    Demo3,
  },
  created() {
    // 接收传递而来的方法
    // console.log(this.$listeners, "Demo2");
    setTimeout(() => {
      // 一个组件在父组件中被引用，$attrs就是组件标签上的静态属性值（attr）和动态属性值（：attr）的对象集合，这个集合不包含class， style和事件属性,
      // 若子组件声明了prop，$attrs中声明的prop将会剔除，如果父级有参数而子级也有参数，传递到孙及时，会以父级为准
      console.log(this.$attrs, "Demo2");
      this.$listeners.changeBoo("boo change");
    }, 2000);
  },
};
</script>

<style>
</style>