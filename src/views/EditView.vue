<template>
  <div class="edit">
    <ControlsBar>
      <template #left>
        Edititng note: {{ $route.params.id }}
      </template>
      <template #right>
        <button
          class="is-success"
          @click="saveChanges"
        >
          Save changes
        </button>
        <button
          class="is-warning"
          @click="revertChanges"
        >
          Revert changes
        </button>
        <button
          class="is-warning"
          @click="exit"
        >
          exit
        </button>
        <button
          class="is-danger"
          @click="deleteNote"
        >
          Delete note
        </button>
      </template>
    </ControlsBar>
    <ControlsBar>
      <template #left>
        <div class="buttons">
          <button
            class="is-regular"
            @click="undoLastChange"
          >
            Undo
          </button>
          <button
            class="is-regular"
            @click="redoLastChange"
          >
            Redo
          </button>
        </div>
      </template>
      <template #right>
        <div class="buttons">
          <button
            class="is-info"
            @click="addTodoEntry"
          >
            Add todo
          </button>
        </div>
      </template>
    </ControlsBar>
    <h1 class="note-title">
      <input
        type="text"
        v-model="newNote.title"
      >
    </h1>
    <section class="todo-list">
      <TodoItem
        class="todo-item"
        v-for="(todo, ix) in newNote.todo.length"
        :key="ix"
        :task="newNote.todo[ix].task"
        :done="newNote.todo[ix].done"
        @update:task="(newVal) => (newNote.todo[ix].task = newVal)"
        @update:done="(newVal) => (newNote.todo[ix].done = newVal)"
        @deleteTodo="(todoId) => openDialog(deleteTodoEntry, todoId)"
      />
    </section>
    <ModalDialog
      :title="modal.title"
      :subtitle="modal.subtitle"
      :confirm-text="modal.confirmText"
      :cancel-text="modal.cancelText"
      @cancel="onDialogCancel"
      @confirm="onDialogConfirm"
      v-show="modal.show"
    />
  </div>
</template>

<script>
import ControlsBar from "@/components/ControlsBar.vue";
import TodoItem from "@/components/TodoItem.vue";
import ModalDialog from "@/components/ModalDialog.vue";

export default {
  name: "EditView",
  components: { ControlsBar, TodoItem, ModalDialog },
  data() {
    return {
      isNewNote: false,
      newNote: {},
      modal: {
        show: false,
        title: "",
        subtitle: "",
        confirmText: "Yes",
        cancelText: "Cancel",
      },
    };
  },
  methods: {
    exit() {
      // NEED CONFIRMATION
      this.$router.push("/");
    },
    deleteNote() {
      // NEED CONFIRMATION
    },
    saveChanges() {
    },
    revertChanges() {
      // NEED CONFIRMATION
    },
    undoLastChange() {},
    redoLastChange() {},
    addTodoEntry() {
      this.newNote.todo.push({task: "", done: false});
    },
    deleteTodoEntry() {},

    onDialogCancel() {},
    onDialogConfirm() {},
  },
  computed: {
    note() {
      // If query is "/edit/new"
      if (this.$route.params.id == "new")
        return { title: "New note", todo: [] };

      // If query has an id that there is the note with the same id "/edit/:id"
      if (this.$store.state.notes[this.$route.params.id] != undefined)
        return this.$store.state.notes[this.$route.params.id];

      // Otherwise the query was incorrect so return empty object.
      return {};
    },
  },
  beforeCreate() {
    if (this.$route.params.id == "new")
      // "/edit/new" route is used for creating new note
      this.isNewNote = true;
    else if (this.$store.state.notes[this.$route.params.id] == undefined)
      // Redirect to "/" if there is no a note with that id
      this.$router.push("/");
  },
  beforeMount() {
    this.newNote = JSON.parse(JSON.stringify(this.note));
  }
};
</script>

<style lang="scss" scoped>
.note-title {
  text-align: center;
  border-bottom: 1px dashed black;
  padding-bottom: 1rem;
}

.todo-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-items: center;
  align-content: space-around;

  .todo-item {
    margin: 1rem 0;
    &:last-child {
      margin-bottom: 0;
    }
    &:first-child {
      margin-top: 0;
    }
  }
}
</style>
