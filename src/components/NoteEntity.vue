<template>
  <section class="note">
    <div class="note-header">
      <router-link :to="`/edit/${note.id}`">
        <h3 class="note-title">
          {{ note.title }}
        </h3>
      </router-link>
      <button @click="$emit('deleteNote', note.id)">
        &times;
      </button>
    </div>
    <div class="todo-list">
      <TodoItem
        v-for="(todo, ix) in note.todo.slice(0, 5)"
        :key="ix"
        :todo="todo"
      />
    </div>
    <div v-show="note.todo.length > 5">
      <b>. . .</b>
    </div>
  </section>
</template>

<script>
import TodoItem from "@/components/TodoItem.vue";
export default {
  name: "NoteEntity",
  components: { TodoItem },
  props: { note: { type: Object, default() {} } },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
a,
a:visited {
  text-decoration: none;
  color: black;
}
.note {
  border: 2px solid black;
  padding: 1rem;
  max-height: 15rem;
  width: 20rem;

  .note-header {
    border-bottom: 1px dashed black;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    button {
      background-color: rgb(231, 54, 54);
      border: none;
      border-radius: 10px;
      height: fit-content;

      &:hover {
        background-color: rgb(189, 39, 39);
        cursor: pointer;
      }
    }

    .note-title {
      margin: 0 0 1rem;
      max-width: 20rem;
    }
  }
}
.todo-list {
  text-align: left;
}
</style>
