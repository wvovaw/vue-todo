<!-- eslint-disable vue/max-attributes-per-line -->
<template>
  <div class="edit">
    <ControlsBar>
      <template #left>
        Edititng note: {{ $route.params.id }}
      </template>
      <template #right>
        <button class="is-success" @click="runDialog(modal.types.save)">
          Save changes
        </button>
        <button class="is-warning" @click="runDialog(modal.types.revert)">
          Revert changes
        </button>
        <button class="is-warning" @click="runDialog(modal.types.exit)">
          exit
        </button>
        <button class="is-danger" @click="runDialog(modal.types.delete)">
          Delete note
        </button>
      </template>
    </ControlsBar>
    <ControlsBar>
      <template #left>
        <div class="buttons">
          <button class="is-regular" @click="undoLastChange">
            Undo
          </button>
          <button class="is-regular" @click="redoLastChange">
            Redo
          </button>
        </div>
      </template>
      <template #right>
        <div class="buttons">
          <button class="is-info" @click="addTodoEntry">
            Add todo
          </button>
        </div>
      </template>
    </ControlsBar>
    <div class="note-title">
      <label><strong>Note title: </strong></label>
      <input type="text" v-model="note.title">
    </div>
    <section class="todo-list">
      <TodoItem
        class="todo-item"
        v-for="(todo, ix) in note.todo.length"
        :key="ix"
        :task="note.todo[ix].task"
        :done="note.todo[ix].done"
        @update:task="(newVal) => (note.todo[ix].task = newVal)"
        @update:done="(newVal) => (note.todo[ix].done = newVal)"
        @deleteTodo="deleteTodoEntry(ix)"
      />
      <h1 v-show="note.todo.length < 1">
        Todo list is empty. Add some tasks
      </h1>
    </section>
    <ModalDialog
      :title="modal.type.title"
      :subtitle="modal.type.subtitle"
      :confirm-text="modal.type.confirmText"
      :confirm-btn-class="modal.type.confirmBtnClass"
      :cancel-text="modal.type.cancelText"
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
      note: {},
      backupNote: {},
      modal: {
        show: false,
        type: {}, // anchor for modal.types
        types: {
          exit: {
            title: " Do you want to exit?",
            subtitle: "Unsaved changes won't be saved.",
            confirmBtnClass: "is-warning",
            callBack: this.exit,
          },
          save: {
            title: " Save changes?",
            subtitle: "Are you sure you want to save changes?",
            confirmBtnClass: "is-success",
            callBack: this.saveChanges,
          },
          revert: {
            title: "Revert changes?",
            subtitle:
              "Are you sure you want to revert all changes? It will restore the initial note state.",
            confirmBtnClass: "is-warning",
            callBack: this.revertChanges,
          },
          delete: {
            title: "Delete note?",
            subtitle: "Carefull! this action can not be reverted!",
            confirmBtnClass: "is-danger",
            callBack: this.deleteNote,
          },
        },
      },
    };
  },
  methods: {
    runDialog(type) {
      this.modal.type = type;
      this.modal.show = true;
    },
    onDialogConfirm() {
      this.modal.type.callBack();
      this.modal.show = false;
    },
    onDialogCancel() {
      this.modal.show = false;
      this.modal.type = {};
    },
    exit() {
      this.$router.push("/");
    },
    deleteNote() {
      this.$store.dispatch("removeNote", this.note.id);
      this.$router.push("/");
    },
    saveChanges() {
      this.$store.dispatch("pushNote", JSON.parse(JSON.stringify(this.note)));
      if (this.$route.params.id == "new") {
        const id = this.$store.getters.lastNote.id;
        this.$router.push(`/edit/${id}`);
      }
    },
    revertChanges() {
      this.note = JSON.parse(this.backupNote);
    },
    addTodoEntry() {
      this.note.todo.push({ task: "", done: false });
    },
    deleteTodoEntry(ix) {
      this.note.todo.splice(ix, 1);
    },
    undoLastChange() {},
    redoLastChange() {},
  },
  beforeCreate() {
    // Check if user is trying to access invalid route before component created
    // "/edit/new" route is used for creating new note
    const id = this.$route.params.id;
    if (id != "new")
      if (this.$store.getters.noteById(id) == undefined)
        this.$router.push("/"); // Redirect to "/" if there is no such note with that id
  },
  beforeMount() {
    // Create not reactive copy of the note that appropriate to the route
    // It can be manipulated without impact on the main storage
    // Changes may be written if user push save button
    const id = this.$route.params.id;
    if (id == "new") this.note = JSON.parse(JSON.stringify({ title: "New note", todo: [] }));
    if (this.$store.getters.noteById(id) != undefined)
        this.note = JSON.parse(JSON.stringify(this.$store.getters.noteById(id)));
    this.backupNote = JSON.stringify(this.note);
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
