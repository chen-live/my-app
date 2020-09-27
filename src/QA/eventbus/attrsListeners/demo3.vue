<template>
  <div>{{$attrs.boo}}</div>
</template>

<script>
export default {
  inheritAttrs:false,
  created() {
    console.log(this.$attrs, "Demo3");
  },
};
</script>

<style>
</style>