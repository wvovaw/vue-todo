<template>
  <div class="home">
    <nav>
      <div class="nav-item">
        <h3 class="title">
          Notes
        </h3>
      </div>
      <div class="nav-item">
        <button @click="createNewNote">
          Create new
        </button>
      </div>
    </nav>
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
  methods: {
    createNewNote() {
      console.log("createNewNote");
      this.$router.push("/edit/new");
    },
  },
};
</script>

<style lang="scss" scoped>
nav {
  border-bottom: 2px solid black;
  padding: 0.5rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  justify-content: space-around;

  .title {
    margin: 0.5rem;
  }

  .nav-item {
    align-self: center;
  }
}
button {
  background-color: #4caf50; /* Green */
  border: none;
  padding: 1rem 2rem;

  &:hover {
    background-color: #46a149; /* Green */
    cursor: pointer;
  }
}
</style>