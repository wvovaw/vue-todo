<template>
  <section class="note">
    <div class="note-header">
      <router-link :to="`/edit/${note.id}`">
        <h3 class="note-title">
          {{ note.title }}
        </h3>
      </router-link>
      <a
        class="delbtn is-danger"
        @click="$emit('deleteNote', note.id)"
      >
        &times;
      </a>
    </div>
    <div class="todo-list">
      <div
        class="todo-item"
        v-for="(todo, ix) in note.todo.slice(0, 5)"
        :key="ix"
        :todo="todo"
      >
        <input
          type="checkbox"
          :checked="todo.done"
          aria-disabled="true"
        >
        <label>
          {{ todo.task }}
        </label>
      </div>
    </div>
    <div v-show="note.todo.length > 5">
      <b>. . .</b>
    </div>
  </section>
</template>

<script>
export default {
  name: "NoteEntity",
  components: {},
  props: { note: { type: Object, default() {} } },
  methods: {},
};
</script>

<style lang="scss" scoped>
.note {
  padding: 1rem;
  max-height: 25rem;
  width: 20rem;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px,
    rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px,
    rgba(0, 0, 0, 0.07) 0px 16px 16px;

  .note-header {
    border-bottom: 1px dashed black;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .note-title {
      margin: 0 0 1rem;
      max-width: 20rem;
    }

    .delbtn {
      display: block;
      width: 15px;
      height: 15px;
      font-size: 0.85em;
      border-radius: 100%;

      &:hover {
        text-decoration: none;
        filter: brightness(85%);
        cursor: pointer;
      }
    }
  }

  .todo-list {
    text-align: left;

    .todo-item {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin: 1rem 0;
      max-width: 20rem;
      label {
        border-bottom: 1px solid black;
      }
    }
  }
}
</style>
