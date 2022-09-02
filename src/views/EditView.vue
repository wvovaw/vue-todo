<template>
  <div class="edit">
    <ControlsBar>
      <template #left>
        Edititng note: {{ $route.params.id }}
      </template>
      <template #right>
        <button
          class="is-success"
          @click="
            runDialog(
              {
                title: ' Save changes?',
                subtitle: 'Are you sure you want to save changes?',
                confirmBtnClass: 'is-success',
              },
              saveChanges
            )"
        >
          Save changes
        </button>
        <button
          class="is-warning"
          @click="
            runDialog(
              {
                title: 'Revert changes?',
                subtitle:
                  'Are you sure you want to revert all changes? It will restore the initial state.',
              },
              revertChanges
            )"
        >
          Revert changes
        </button>
        <button
          class="is-warning"
          @click="
            runDialog(
              {
                title: 'Exit?',
                subtitle: 'Warning! Unsaved changes will not be saved!',
              },
              exit
            )"
        >
          exit
        </button>
        <button
          class="is-danger"
          @click="
            runDialog(
              {
                title: 'Delete note?',
                subtitle: 'Are you sure you want to delete the note?',
              },
              deleteNote
            )"
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
    <div class="note-title">
      <label><strong>Note title: </strong></label>
      <input
        type="text"
        v-model="newNote.title"
      >
    </div>
    <section class="todo-list">
      <TodoItem
        class="todo-item"
        v-for="(todo, ix) in newNote.todo.length"
        :key="ix"
        :task="newNote.todo[ix].task"
        :done="newNote.todo[ix].done"
        @update:task="(newVal) => (newNote.todo[ix].task = newVal)"
        @update:done="(newVal) => (newNote.todo[ix].done = newVal)"
        @deleteTodo="deleteTodoEntry(ix)"
      />
      <h1 v-show="newNote.todo.length < 1">
        Todo list is empty. Add some tasks
      </h1>
    </section>
    <ModalDialog
      :title="modal.title"
      :subtitle="modal.subtitle"
      :confirm-text="modal.confirmText"
      :confirm-btn-class="modal.confirmBtnClass"
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
      backupNote: {},
      modal: {
        show: false,
        title: "",
        subtitle: "",
        callBack: () => {},
      },
    };
  },
  methods: {
    runDialog(params, cb) {
      this.modal = {
        show: true,
        title: params.title,
        subtitle: params.subtitle,
        confirmBtnClass: params.confirmBtnClass,
        callBack: cb,
      };
    },
    cleanModal() {
      this.modal = {
        show: false,
        title: "",
        subtitle: "",
        callBack: () => {},
      };
    },
    onDialogConfirm() {
      this.modal.callBack();
      this.cleanModal();
    },
    onDialogCancel() {
      this.cleanModal();
    },
    exit() {
      this.$router.push("/");
    },
    deleteNote() {
      this.$store.dispatch("removeNote", this.newNote.id);
      this.$router.push("/");
    },
    saveChanges() {
      if (this.$route.params.id == "new") {
        this.$store.dispatch("addNote", this.newNote);
        this.$router.push(`/edit/${this.newNote.id}`);
      }
      else this.$store.dispatch("editNote", this.newNote);
    },
    revertChanges() {
      this.newNote = JSON.parse(this.backupNote);
    },
    undoLastChange() {},
    redoLastChange() {},
    addTodoEntry() {
      this.newNote.todo.push({ task: "", done: false });
    },
    deleteTodoEntry(ix) {
      this.newNote.todo.splice(ix, 1);
    },
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
    if (this.$route.params.id != "new") // "/edit/new" route is used for creating new note
      if (this.$store.state.notes[this.$route.params.id] == undefined) // Redirect to "/" if there is no a note with that id
        this.$router.push("/");
  },
  beforeMount() {
    this.newNote = JSON.parse(JSON.stringify(this.note));
    this.backupNote = JSON.stringify(this.newNote);
  },
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
  }
}
</style>
