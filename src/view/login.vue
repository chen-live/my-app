<template>
  <div>
    <button @click="addRouter('ucenter')">add router ucenter</button>
    <button @click="addRouter('udetail')">add router udetail</button>
  </div>
</template>

<script>
import router from "../router/index";
export default {
  data() {
    return {};
  },
  methods: {
    addRouter(paths) {
      router.addRoutes([
        {
          path: `/${paths}`,
          name: paths,
          component: () => import(`@/view/${paths}.vue`),
        },
      ]);
      this.$router.push(paths);
    },
  },
};
</script>

<style>
</style>