<template>
  <nav class="navbar">
    <slot name="brand" />
    <div class="nav-item">
      <h3 class="title">
        <slot name="left" />
      </h3>
    </div>
    <div class="nav-item">
      <slot name="right" />
    </div>
  </nav>
</template>

<script>
export default {
  name: "ControlsBar",
  props: {},
};
</script>

<style lang="scss" scoped>
nav {
  border-bottom: 2px solid black;
  padding: 0.5rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex-grow: 1;
  gap: 1rem;
  justify-content: space-around;

  .title {
    margin: 0.5rem;
  }
  // Makes possible to imply scoped scss rulles on in-slot elements
  :deep(.nav-item) {
    align-self: center;
  }
}
</style>