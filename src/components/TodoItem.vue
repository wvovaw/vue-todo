<template>
  <div class="item">
    <input type="checkbox" :checked="todo.done" disabled />
    <label>
      {{ todo.task }}
    </label>
  </div>
</template>

<script>
export default {
  name: "TodoItem",
  props: { todo: { type: Object, default() {} } },
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
