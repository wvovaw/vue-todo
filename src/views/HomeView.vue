<template>
  <div class="home">
    <h1>Notes board</h1>
    <NotesList />
  </div>
</template>

<script>
import NotesList from "@/components/NotesList.vue";

export default {
  name: "HomeView",
  components: {
    NotesList,
  },
};
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
}
</style>