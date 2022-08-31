<template>
  <div class="item">
    <input type="checkbox" checked disabled>
    <label>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius dolorum
      minima numquam maxime vitae ducimus ratione esse, explicabo repellat qui
    </label>
  </div>
</template>

<script>
export default {
  name: "TodoItem",
  props: {},
};
</script>

<style lang="scss" scoped>
label {
  border-bottom: 1px solid black;
}
.item {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 1rem 0;
  max-width: 20rem;
}
</style>
