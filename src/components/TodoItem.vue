<template>
  <div class="item">
    <label>
      <input
        type="checkbox"
        :checked="done"
        @click="$emit('update:done', !done)"
      >
      <span />
    </label>
    <input
      class="input ml-3 mr-3"
      type="text"
      :value="task"
      @input="$emit('update:task', $event.target.value)"
    >
    <button
      class="button is-ghost"
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
.button.is-ghost {
  color: #da4343;
  font-size: 1.2rem;
  line-height: 1em;
  :hover {
    filter: brightness(85%);
  }
}
input {
  &[type="text"] {
    border: 2px solid hsl(0deg, 0%, 29%);
    border-top: none;
    border-left: none;
    border-right: none;
    border-radius: 0;
    width: 70%;
  }

  &[type="checkbox"] {
    & + span:before {
      font-size: 2.8rem;
      line-height: 1em;
    }
    &:checked + span:before {
      font-size: 2.8rem;
      line-height: 1em;
    }
  }
}
</style>
