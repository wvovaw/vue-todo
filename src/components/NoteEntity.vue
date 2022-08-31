<template>
  <section class="note">
    <router-link :to="`/edit/${1}`">
      <h3 class="note-title">
        Some title of the note
      </h3>
    </router-link>
    <div class="todo-lilst">
      <TodoItem />
      <TodoItem />
      <TodoItem />
      <TodoItem />
    </div>
    <div v-show="true">
      . . .
    </div>
  </section>
</template>

<script>
import TodoItem from "@/components/TodoItem.vue";
export default {
  name: "NoteEntity",
  components: { TodoItem },
  props: {},
};
</script>

<style lang="scss" scoped>
a,
a:visited {
  text-decoration: none;
  color: black;
}
.note-title {
  border-bottom: 1px dashed black;
  margin: 0 0 1rem;
  max-width: 20rem;
}
.note {
  border: 2px solid black;
  padding: 1rem;
  max-height: 15rem;
}
</style>
