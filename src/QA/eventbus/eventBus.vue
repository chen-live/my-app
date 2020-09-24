<template>
  <div id="app">
    <router-view></router-view>
    <p>{{ message.message }}</p>
    <div class="show-back">{{ backCount }}</div>
    <button @click="routerHandle('/eventBus/eventBusDecrement')">
      go decrement
    </button>
    <button @click="routerHandle('/eventBus/eventBusIncrement')">
      go increment
    </button>
    <!-- <Increment ref="Increment" /> -->
  </div>
</template>

<script>
import Vue from "vue";
import { eventBus } from "./event-bus.js";
import Increment from "./children/increment";
import Decrement from "./children/decrement";
export default {
  provide() {
    let _this = this;
    return {
      message: this.message,
      changeMessage: this.changeMessage,
    };
  },
  components: {
    Increment,
    Decrement,
  },
  name: "App",
  data() {
    return {
      backCount: 0,
      message: { message: "hello world" },
    };
  },
  created() {
    // this.$nextTick(() => {
    //   console.log(this.$refs.Increment);
    //   this.$refs.Increment.num = 1000;
    // });
  },
  mounted() {
    // setInterval((_) => {
    //   console.log(this.message);
    // }, 1000);
    eventBus.$on("incremented", ({ num }) => {
      this.$nextTick(() => {
        this.backCount += num;
      });
    });
    eventBus.$on("decreased", ({ num }) => {
      this.$nextTick(() => {
        this.backCount -= num;
      });
    });
  },
  methods: {
    changeMessage(text) {
      this.$nextTick(() => {
        this.message.message = text;
        console.log(this);
      });
    },
    routerHandle(path) {
      if (location.pathname === path) {
        return;
      }
      this.$router.push({ path: path });
    },
  },
};
</script>