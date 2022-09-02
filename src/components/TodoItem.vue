<template>
  <div class="item">
    <input
      type="checkbox"
      :checked="done"
    ><label
      @click="$emit('update:done', !done)"
    />
    <input
      type="text"
      :value="task"
      @input="$emit('update:task', $event.target.value)"
    >
    <button
      class="is-danger"
      @click="$emit('deleteTodo')"
    >
      Del
    </button>
  </div>
</template>

<script>
export default {
  name: "TodoItem",
  props: {
    task: { type: String, default: "" },
    done: { type: Boolean, default: false },
  },
  emits: ["deleteTodo", "update:task", "update:done"],
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
input {
  &[type="text"] {
    width: 50%;
  }
  &[type="checkbox"] {
    text-align: center;
    & + label {
      cursor: pointer;
      display: inline-block;
      vertical-align: middle;

      &:before {
        width: 2.8em;
        height: 2.8em;
        margin: 0;
        padding: 0;
      }
    }
  }
}
</style>
