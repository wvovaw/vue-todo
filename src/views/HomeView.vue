<!-- eslint-disable vue/max-attributes-per-line -->
<template>
  <div class="home">
    <nav class="panel">
      <p class="panel-heading">
        Notebook
      </p>
      <div class="panel-block">
        <p class="control has-icons-left">
          <input class="input" type="text" placeholder="Search">
          <span class="icon is-left">
            <i class="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>
      <router-link
        class="panel-block is-justify-content-space-between"
        v-for="page of $store.getters.pages"
        :key="page.id"
        :to="'/page/' + page.id"
      >
        <div>
          <span class="panel-icon">
            <i class="fas fa-book" aria-hidden="true" />
          </span>
          {{ page.title }}
        </div>
        <i
          class="button is-danger is-outlined is-small fas fa-trash"
          aria-hidden="true"
          @click.prevent="removePage($event, page.id)"
        />
      </router-link>
      <div class="panel-block">
        <p class="control has-icons-left">
          <input
            class="input"
            type="text"
            placeholder="New page"
            v-model="newPage.title"
          >
          <span class="icon is-left">
            <i class="fas fa-book" aria-hidden="true" />
          </span>
        </p>
        <button
          class="button is-link is-outlined is-aligned-flex-end"
          :disabled="newPage.title == ''"
          @click="addPage"
        >
          Add new page
        </button>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  components: {},
  data() {
    return {
      newPage: {
        title: "",
        notes: [],
        notesIdCounter: 0,
      },
    };
  },
  methods: {
    addPage() {
      this.$store.dispatch(
        "pushPage",
        JSON.parse(JSON.stringify(this.newPage))
      );
      this.newPage.title = "";
    },
    // TODO: Modal confirmation
    removePage(e, id) {
      this.$store.dispatch("removePage", id);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
