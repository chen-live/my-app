<template>
  <div>
    {{ count }}<br />
    <Button v-on:click="increment" type="primary">add</Button>
  </div>
</template>
<script>
import { Button } from "element-ui";
import { mapGetters } from "vuex";
export default {
  components: {
    Button,
  },
  mounted() {
    // const loading=this.$loading({
    //   lock: true,
    //   text: "Loading",
    //   spinner: "el-icon-loading",
    //   background: "rgba(0, 0, 0, 0.7)",
    // });
    console.log(this.$store);
  },
  computed: {
    ...mapGetters({
      count: "GET_COUNT",
    }),
  },
  methods: {
    increment() {
      this.$store.dispatch({
        type: "ACTION_B",
        dispatch: "INCREMENT",
      });
    },
  },
};
</script>

<style>
</style>