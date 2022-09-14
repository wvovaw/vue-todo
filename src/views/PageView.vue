<template>
  <div class="page">
    <ControlsBar>
      <template #brand>
        <router-link
          class="nav-item navbar-left label"
          to="/"
        >
          Notebook
        </router-link>
      </template>
      <template #left>
        {{ pageTitle }}
      </template>
      <template #right>
        <div class="buttons">
          <button
            class="button is-success is-small"
            @click="addNote"
          >
            New note
          </button>
        </div>
      </template>
    </ControlsBar>
    <div class="tabs is-left is-boxed is-small">
      <ul>
        <li
          :class="{ 'is-active': pageId == page.id }"
          v-for="page of $store.getters.pages"
          :key="page.id"
        >
          <router-link :to="'/page/' + page.id">
            <EditableSpan
              :data="page.title"
              @update:data="(newVal) => (pageTitle = newVal)"
            />
            <span class="icon"><button
              class="delete is-small"
              @click.prevent="pageToRemove = page.id; showModal = true"
            /></span>
          </router-link>
        </li>
        <li>
          <a @click="addPage">
            <span class="icon has-text-success">
              <i
                class="fas fa-plus"
                aria-hidden="true"
              />
            </span>
          </a>
        </li>
      </ul>
    </div>
    <NotesList />
    <ModalDialog
      title="Delete page?"
      subtitle="Are you sure you want to delete selected page?"
      confirm-text="Delete"
      cancel-text="Cancel"
      @cancel="showModal = false"
      @confirm="removePage(pageToRemove)"
      v-show="showModal"
    />
  </div>
</template>

<script>
import ControlsBar from "@/components/ControlsBar.vue";
import NotesList from "@/components/NotesList.vue";
import EditableSpan from "@/components/core/EditableSpan.vue";
import ModalDialog from "@/components/core/ModalDialog.vue";

export default {
  name: "PageView",
  components: {
    ControlsBar,
    NotesList,
    EditableSpan,
    ModalDialog
  },
  data() {
    return {
      showModal: false,
      pageToRemove: null
    };
  },
  computed: {
    pageId() {
      return this.$route.params.id;
    },
    pageTitle: {
      get() {
        const page = this.$store.getters.pageById(this.pageId);
        if (page != undefined) return page.title;
        else return null;
      },
      set(value) {
        const page = this.$store.getters.pageById(this.pageId);
        if (page != undefined) {
          page.title = value;
          this.$store.dispatch("pushPage", page);
        }
      },
    },
  },
  methods: {
    addPage() {
      this.$store.dispatch("pushPage", {
        title: "New page",
        notes: [],
        notesIdCounter: 0,
      });
      this.$router.push(`/page/${this.$store.getters.lastPage.id}`);
    },
    removePage(id) {
      this.showModal = false;
      let pages = this.$store.getters.pages;
      if (id != this.pageId) this.$store.dispatch("removePage", id);
      else if (pages.length > 1) {
        const ix = pages.findIndex((p) => p.id == id);
        this.$store.dispatch("removePage", id);
        pages = this.$store.getters.pages;

        if (pages[ix] != undefined) this.$router.push(`/page/${pages[ix].id}/`);
        else this.$router.push(`/page/${pages[ix - 1].id}`);
      } else
        this.$router.push(`/pages/`).then(() => {
          this.$store.dispatch("removePage", id);
        });
    },
    addNote() {
      this.$router.push(`/page/${this.$route.params.id}/note/new`);
    },
  },
};
</script>

<style lang="scss" scoped>
.tabs ul {
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>