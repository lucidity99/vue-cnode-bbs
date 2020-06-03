<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
    <Loading v-show="loading"></Loading>
  </div>
</template>

<script>
import Loading from "@/components/Loading";

export default {
  name: "App",
  components: { Loading },
  data() {
    return {
      loading: false,
    };
  },
};
</script>

<style lang="scss">
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
