<!-- eslint-disable vue/max-attributes-per-line -->
<template>
  <div class="home">
    <ControlsBar>
      <template #brand>
        TODO Notes
      </template>
    </ControlsBar>
    <div class="notification">
      <h5 class="title is-5">Create pages and save todo notes on them.</h5>
    </div>
    <div class="column is-flex is-justify-content-center">
      <nav class="panel column is-two-thirds">
        <div class="panel-heading">
          <p class="icon">
            <i class="fas fa-list" />
          </p>
          Notebook
        </div>
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
              <i class="fas fa-file" aria-hidden="true" />
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
              @keyup.enter="addPage()"
            >
            <span class="icon is-left">
              <i class="fas fa-file" aria-hidden="true" />
            </span>
          </p>
          <button
            class="button is-link is-outlined is-aligned-flex-end ml-4"
            :disabled="newPage.title == ''"
            @click="addPage"
          >
            Add new page
          </button>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import ControlsBar from "@/components/ControlsBar.vue";
export default {
  name: "HomeView",
  components: { ControlsBar },
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
    removePage(e, id) {
      this.$store.dispatch("removePage", id);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
