<template>
  <div class="item field has-addons is-justify-content-center">
    <input
      type="checkbox"
      :checked="done"
    ><label
      @click="$emit('update:done', !done)"
    />
    <input
      class="input has-addons"
      type="text"
      :value="task"
      @input="$emit('update:task', $event.target.value)"
    >
    <button
      class="button is-danger"
      @click="$emit('deleteTodo')"
    >
      <span class="icon">
        <i class="fas fa-trash" />
      </span>
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
    width: 80%;
  }
  &[type="checkbox"] {
    text-align: center;
    & + label {
      cursor: pointer;
      display: inline-block;
      vertical-align: middle;
      margin-top: 0;
      padding-top: 0;
      margin-left: 2em;

      &:before {
        width: 2.4em;
        height: 2.4em;
        margin: 0;
        padding: 0;
      }
    }
  }
}
</style>
