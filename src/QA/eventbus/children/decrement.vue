<!-- DecreaseCount.vue -->
<template>
  <div>
    <button id="iii" @click="decrease()">-{{num}}</button>
    <br />
  </div>
</template>

<script>
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
    decrease() {
      eventBus.$emit("decreased", {
        num: this.num,
      });
    },
  },
};
</script>

