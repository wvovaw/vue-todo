<template>
  <section class="note">
    <div class="note-header">
      <router-link :to="`/page/${this.$route.params.id}/note/${note.id}`">
        <h5 class="title is-5 note-title">
          {{ note.title }}
        </h5>
      </router-link>
      <button
        class="delete is-medium"
        @click="$emit('deleteNote', note.id)"
      />
    </div>
    <div class="todo-list">
      <div
        class="todo-item"
        v-for="(todo, ix) in note.todo.slice(0, 5)"
        :key="ix"
        :todo="todo"
      >
        <label>
          <input
            type="checkbox"
            :checked="todo.done"
            disabled
          >
          <span />
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
  }

  .todo-list {
    text-align: left;

    .todo-item {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin: 1rem 0;
      max-width: 20rem;
        border-bottom: 1px solid;
    }
  }
}
input {
  &[type="checkbox"] {
    & + span:before {
      font-size: 1.5rem;
    }
    &:checked + span:before {
      font-size: 1.5rem;
    }
  }
  }
</style>
