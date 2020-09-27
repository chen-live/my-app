<template>
  <div>
    Demo1
    <Demo2
      name="attr"
      :foo="foo"
      :boo="boo"
      :coo="coo"
      :doo="doo"
      v-on="{ changeFoo, changeBoo, changeCoo, changeDoo }"
    />
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
      foo: "foo!",
      boo: "boo!",
      coo: "coo!",
      doo: "doo!",
    };
  },
  mounted(){
  },
  methods: {
    changeFoo(text) {
      this.foo = text;
    },
    changeBoo(text) {
      this.boo = text;
    },
    changeCoo(text) {
      this.coo = text;
    },
    changeDoo(text) {
      this.doo = text;
    },
  },
};
</script>

<style>
</style>