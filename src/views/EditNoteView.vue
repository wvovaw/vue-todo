<!-- eslint-disable vue/max-attributes-per-line -->
<template>
  <div class="edit">
    <ControlsBar>
      <template #left>
        {{ note.title }}
      </template>
      <template #right>
        <div class="buttons">
          <button class="button is-small is-success" @click="runDialog(modal.types.save)">
            <span class="icon">
              <i class="fas fa-floppy-disk" />
            </span>
            <span>Save changes</span>
          </button>
          <button class="button is-small is-warning" @click="runDialog(modal.types.revert)">
            <span class="icon">
              <i class="fas fa-rotate-left" />
            </span>
            <span>Revert changes</span>
          </button>
          <button class="button is-small is-warning" @click="runDialog(modal.types.exit)">
            <span class="icon">
              <i class="fas fa-door-open" />
            </span>
            <span>Exit</span>
          </button>
          <button class="button is-small is-danger" @click="runDialog(modal.types.delete)">
            <span class="icon">
              <i class="fas fa-trash" />
            </span>
            <span>Delete note</span>
          </button>
        </div>
      </template>
    </ControlsBar>
    <ControlsBar class="mb-5">
      <template #left>
        <div class="buttons">
          <button
            class="button is-small is-link is-inverted"
            @click="undoLastChange"
            :disabled="!this.canUndo"
          >
            <span class="icon">
              <i class="fas fa-rotate-left" />
            </span>
            <span>Undo</span>
          </button>
          <button
            class="button is-small is-link is-inverted"
            @click="redoLastChange"
            :disabled="!this.canRedo"
          >
            <span class="icon">
              <i class="fas fa-rotate-right" />
            </span>
            <span>Redo</span>
          </button>
        </div>
      </template>
      <template #right>
        <div class="buttons">
          <button class="button is-small is-info is-inverted" @click="addTodoEntry">
            Add todo
          </button>
        </div>
      </template>
    </ControlsBar>
    <div class="note-title">
      <label><strong>Note title: </strong></label>
      <input class="input is-half-width" type="text" v-model="note.title">
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
import ModalDialog from "@/components/core/ModalDialog.vue";

export default {
  name: "EditNoteView",
  components: { ControlsBar, TodoItem, ModalDialog },
  data() {
    return {
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
      note: {}, // Reactive note object
      backupNote: {}, // Initial note state. It is initialized before EditView comp mounts
      pending: {}, // The note state pending to be written in done array
      done: [], // Undo array
      undone: [], // Redo array
      newMutation: false, // Flag that saves watching.note from undo/redo operatitons
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
      const pageId = this.$route.params.pageId;
      this.$router.push(`/page/${pageId}`);
    },
    deleteNote() {
      const pageId = this.$route.params.pageId;
      this.$store.dispatch("removeNote", {
        pageId,
        noteId: this.note.id,
      });
      this.$router.push(`/page/${pageId}`);
    },
    saveChanges() {
      const pageId = this.$route.params.pageId;
      this.$store.dispatch("pushNote", {
        pageId,
        note: JSON.parse(JSON.stringify(this.note)),
      });
      if (this.$route.params.noteId == "new") {
        const noteId = this.$store.getters.lastNote(pageId).id;
        this.note.id = noteId;
        this.$router.push(`/page/${pageId}/note/${noteId}`);
      }
    },
    revertChanges() {
      this.note = JSON.parse(this.backupNote);
      this.undone = [];
      this.done = [];
    },
    addTodoEntry() {
      this.note.todo.push({ task: "", done: false });
    },
    deleteTodoEntry(ix) {
      this.note.todo.splice(ix, 1);
    },
    undoLastChange() {
      if (this.canUndo) {
        this.undone.push(JSON.stringify(this.note));
        this.newMutation = false;
        this.note = JSON.parse(this.done.pop());
      }
    },
    redoLastChange() {
      if (this.canRedo) {
        this.done.push(JSON.stringify(this.note));
        this.newMutation = false;
        this.note = JSON.parse(this.undone.pop());
      }
    },
  },
  computed: {
    canUndo() {
      return this.done.length > 0;
    },
    canRedo() {
      return this.undone.length > 0;
    },
  },
  watch: {
    // Watching on note.todo changes.
    "note.todo": {
      deep: true,
      handler() {
        if (this.newMutation) {
          // If it's not an undo or redo change but users change
          this.undone = []; // Clear undo array
          this.done.push(this.pending); // Save prev note state
          this.pending = JSON.stringify(this.note); // The next note's history state to save
        } else {
          console.log("Working in history tree");
          this.pending = JSON.stringify(this.note); // The next note's history state to save
          this.newMutation = true; // turn off the undo/redo flag
        }
      },
    },
  },
  beforeCreate() {
    // Check if user is trying to access invalid route before component created
    // "page/x/note/new" route is used for creating new note
    const pageId = this.$route.params.pageId;
    const noteId = this.$route.params.noteId;
    if (noteId != "new")
      if (this.$store.getters.noteById(pageId, noteId) == undefined)
        if (this.$store.getters.pageById(pageId) == undefined)
          this.$router.push("/");
        // Redirect to "/" if there is no such note and page
        else this.$router.push(`/page/${pageId}`); // Redirect to "/page/x" if there is no such note but page
  },
  beforeMount() {
    // Create not reactive copy of the note that appropriate to the route
    // It can be manipulated without impact on the main storage
    // Changes may be written if user push save button
    const pageId = this.$route.params.pageId;
    const noteId = this.$route.params.noteId;
    if (noteId == "new")
      this.note = JSON.parse(JSON.stringify({ title: "New note", todo: [] }));
    if (this.$store.getters.noteById(pageId, noteId) != undefined)
      this.note = JSON.parse(
        JSON.stringify(this.$store.getters.noteById(pageId, noteId))
      );
    this.backupNote = this.pending = JSON.stringify(this.note);
  },
};
</script>

<style lang="scss" scoped>
.note-title {
  text-align: center;
  border-bottom: 1px dashed black;
  padding-bottom: 1rem;
  .input {
    width: 50%;
  }
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
