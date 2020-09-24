<template>
  <div>
    Demo1
    <Demo2 name="attr" :foo="foo" :boo="boo" :coo="coo" :doo="doo" />
  </div>
</template>

<script>
import Demo2 from "./demo2";
export default {
  components: {
    Demo2,
  },
  data() {
    return {
      foo: "Hello World!",
      boo: "Hello Javascript!",
      coo: "Hello Vue",
      doo: "Last",
    };
  },
};
</script>

<style>
</style>