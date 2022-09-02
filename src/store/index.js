import { createStore } from 'vuex';

export default createStore({
  state: {
    notes: [],
    notesIdCounter: 0,
  },
  getters: {
  },
  mutations: {
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
    ADD_NOTE: (state, note) => {
      note.id = state.notesIdCounter++;
      state.notes.push(note);
    },
    EDIT_NOTE: (state, note) => {
      const ix = state.notes.findIndex((n) => n.id == note.id);
      if (ix != -1) {
        state.notes[ix] = note;
      }
    },
    REMOVE_NOTE: (state, id) => {
      if (id >= 0)
        state.notes = state.notes.filter(n => n.id !== id);
    },
  },
  actions: {
    addNote: async (context, note) => {
      context.commit("ADD_NOTE", note);
    },
    editNote: async (context, note) => {
      context.commit("EDIT_NOTE", note);
    },
    removeNote: async (context, id) => {
      context.commit("REMOVE_NOTE", id);
    },
  },
  modules: {
  }
});
