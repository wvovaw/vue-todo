<template>
  <div class="notes">
    <NoteEntity
      v-for="(note, ix) in notes"
      :key="ix"
      :note="note"
      @deleteNote="(noteId) => openDialog(noteId)"
    />
    <ModalDialog
      title="Delete note?"
      subtitle="Are you sure you want to delete this note?"
      confirm-text="Delete"
      cancel-text="Cancel"
      @cancel="showModal = false"
      @confirm="deleteNote"
      v-show="showModal"
    />
  </div>
</template>

<script>
import NoteEntity from "@/components/NoteEntity.vue";
import ModalDialog from "@/components/ModalDialog.vue";

export default {
  name: "NotesList",
  components: { NoteEntity, ModalDialog },
  props: {},
  data() {
    return {
      showModal: false,
      noteIdToDelete: 0
    };
  },
  computed: {
    notes() {
      return this.$store.state.notes;
    },
  },
  methods: {
    openDialog(noteId) {
      this.noteIdToDelete = noteId;
      this.showModal = true;
    },
    deleteNote() {
      const id = this.noteIdToDelete;
      this.$store.dispatch("removeNote", id);
      this.showModal = false;
      this.noteIdtoDelete = null;
    }
  }
};
</script>

<style scoped lang="scss">
.notes {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  text-align: center;
  justify-content: space-around;
  gap: 3rem;
}
</style>
