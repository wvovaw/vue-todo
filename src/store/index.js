import { createStore } from 'vuex';

export default createStore({
  state: {
    // pages: require('./testStore.json').pages,
    // pagesIdCounter: require('./testStore.json').pagesIdCounter,
    pages: [],
    pagesIdCounter: 0
  },
  getters: {
    pages: state => state.pages,
    pageById: state => id => state.pages.find(page => page.id == id),
    noteById: (state, getters) => (pageId, noteId) => getters.pageById(pageId).notes.find(note => note.id == noteId),
    lastPage: state => state.pages.find(page => page.id == state.pagesIdCounter - 1),
    lastNote: (state, getters) => pageId => {
      const p = getters.pageById(pageId);
      console.log(p.notes.find(note => note.id == p.notesIdCounter - 1))
      return p.notes.find(note => note.id == p.notesIdCounter - 1)
    },
  },
  mutations: {
    // Initial mutation that load vuex state from localStorage if it exist
    LOAD_STORE: (state) => {
      if (localStorage.getItem("todo-app-state")) {
        try {
          Object.assign(state, JSON.parse(localStorage.getItem("todo-app-state")));
        }
        catch (e) {
          console.error("ERR: Could not initialize store.", e);
        }
      }
    },
    // Resolves if it is a new or not new note on the page and handle it accordingly
    PUSH_NOTE: (state, payload) => {
      const pix = state.pages.findIndex(p => p.id == payload.pageId);
      if (pix != -1) {
        const nix = state.pages[pix].notes.findIndex(n => n.id == payload.note.id);
        if (nix != -1)
          state.pages[pix].notes[nix] = payload.note;
        else {
          payload.note.id = state.pages[pix].notesIdCounter++;
          state.pages[pix].notes.push(payload.note);
        }
      }
    },
    // Removes note from state.pages[pageId].notes if it exists
    REMOVE_NOTE: (state, payload) => {
      const pix = state.pages.findIndex(p => p.id == payload.pageId);
      if (pix != -1)
        state.pages[pix].notes = state.pages[pix].notes.filter(n => n.id != payload.noteId);
    },
    // Resolves if it is a new or not new page and handle it accordingly
    PUSH_PAGE: (state, page) => {
      const pix = state.pages.findIndex(p => p.id == page.id);
      if (pix != -1)
        state.pages[pix] = page;
      else {
        page.id = state.pagesIdCounter++;
        state.pages.push(page);
      }
    },
    // Removes page from state.pages if it exists
    REMOVE_PAGE: (state, pageId) => {
      const pix = state.pages.findIndex(p => p.id == pageId);
      if (pix != -1)
        state.pages = state.pages.filter(p => p.id !== pageId);
    },
  },
  actions: {
    pushNote: async (context, payload) => {
      context.commit("PUSH_NOTE", payload);
    },
    removeNote: async (context, payload) => {
      context.commit("REMOVE_NOTE", payload);
    },
    pushPage: async (context, page) => {
      context.commit("PUSH_PAGE", page);
    },
    removePage: async (context, id) => {
      context.commit("REMOVE_PAGE", id)
    }
  },
  modules: {
  }
});
