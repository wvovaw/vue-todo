<template>
  <div class="item">
    <input
      type="checkbox"
      :checked="done"
      @input="$emit('update:done', $event.target.checked)"
    >
    <input
      type="text"
      :value="task"
      @input="$emit('update:task', $event.target.value)"
    >
    <button
      class="is-danger"
      @click="removeTodo"
    >
      Del
    </button>
  </div>
</template>

<script>
export default {
  name: "TodoItem",
  props: { task: { type: String, default() {return "";} },
           done: { type: Boolean, default() {return false;}}
  },
  emits: ['update:done', 'update:task'],
  data() {
    return{
    }
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
input[type="text"] {
  width: 50%;
}
</style>
