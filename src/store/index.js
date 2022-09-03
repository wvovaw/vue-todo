import { createStore } from 'vuex';

export default createStore({
  state: {
    notes: [],            // Notes storage
    notesIdCounter: 0,    // Autoincrement notes index
  },
  getters: {
    notes: state => {
      return state.notes;
    },
    noteById: state => id => {
      const n = state.notes.find(note => note.id == id);
      return n;
    },
    lastNote: state => {
      const n = state.notes.find(note => note.id == state.notesIdCounter - 1);
      return n;
    }
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
    // Resolves if it is a new or not new note and handle it accordingly
    PUSH_NOTE: (state, note) => {
      const ix = state.notes.findIndex((n) => n.id == note.id);
      if (ix != -1) {
        state.notes[ix] = note;
      }
      else {
        note.id = state.notesIdCounter++;
        state.notes.push(note);
      }
    },
    // Removes note from state.notes if it exists
    REMOVE_NOTE: (state, id) => {
      if (id >= 0)
        state.notes = state.notes.filter(n => n.id !== id);
    },
  },
  actions: {
    pushNote: async (context, note) => {
      context.commit("PUSH_NOTE", note);
    },
    removeNote: async (context, id) => {
      context.commit("REMOVE_NOTE", id);
    },
  },
  modules: {
  }
});
