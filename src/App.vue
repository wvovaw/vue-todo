<template>
  <router-view />
</template>

<style lang="scss">
html,
body {
  height: 100%;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100%;
}
</style>

<script>

export default {
  beforeCreate() {
    this.$store.commit("LOAD_STORE"); // Load store from localStorage before app is created
  },
}
</script>

