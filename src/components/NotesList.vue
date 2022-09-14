<template>
  <div class="notes">
    <NoteEntity
      v-for="(note, ix) in notes"
      :key="ix"
      :note="note"
      @deleteNote="(noteId) => openDialog(noteId)"
    />
    <h1 v-show="notes.length < 1">
      Notes list is empty. Create new one!
    </h1>
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
import ModalDialog from "@/components/core/ModalDialog.vue";

export default {
  name: "NotesList",
  components: { NoteEntity, ModalDialog },
  props: {},
  data() {
    return {
      showModal: false,
      noteIdToDelete: 0,
    };
  },
  computed: {
    notes() {
      const page = this.$store.getters.pageById(this.$route.params.id);
      if (page != undefined )
        return page.notes;
      else return [];
    },
  },
  methods: {
    openDialog(noteId) {
      this.noteIdToDelete = noteId;
      this.showModal = true;
    },
    deleteNote() {
      this.$store.dispatch("removeNote", {
        pageId: this.$route.params.id,
        noteId: this.noteIdToDelete,
      });
      this.showModal = false;
      this.noteIdtoDelete = null;
    },
  },
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
  padding-bottom: 1rem;
}
</style>
