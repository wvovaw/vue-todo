<template>
  <div class="notes">
    <NoteEntity />
    <NoteEntity />
    <NoteEntity />
    <NoteEntity />
    <NoteEntity />
  </div>
</template>

<script>
import NoteEntity from "@/components/NoteEntity.vue";
export default {
  name: "NotesList",
  components: { NoteEntity },
  props: {},
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
