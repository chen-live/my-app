<template>
  <div>
    <button @click="increment()">+{{ num }}</button>
    <br />
  </div>
</template>

<script>
import { eventBus } from "../event-bus";
export default {
  name: "IncrementCount",
  inject: ["message", "changeMessage"],
  data() {
    return {
      num: 1,
    };
  },
  mounted() {
    console.log(this.$parent);
    setTimeout((_) => {
      this.changeMessage("hello vue");
    }, 5000);
    setInterval((_) => {
      console.log(this.message);
    }, 1000);
  },
  methods: {
    routerHandle(path) {
      this.$router.replace({ path: path });
    },
    increment() {
      eventBus.$emit("incremented", {
        num: this.num,
      });
    },
  },
};
</script>