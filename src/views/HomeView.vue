<template>
  <div class="home">
    <ControlsBar>
      <template #left>
        Notes
      </template>
      <template #right>
        <button
          class="is-success"
          @click="createNewNote"
        >
          Create new
        </button>
      </template>
    </ControlsBar>
    <NotesList />
  </div>
</template>

<script>
import ControlsBar from "@/components/ControlsBar.vue";
import NotesList from "@/components/NotesList.vue";

export default {
  name: "HomeView",
  components: {
    ControlsBar,
    NotesList,
  },
  methods: {
    createNewNote() {
      this.$router.push("/edit/new");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>