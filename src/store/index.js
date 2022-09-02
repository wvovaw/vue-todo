import { createStore } from 'vuex';

export default createStore({
  state: {
    notesIdCounter: 3,
    notes: [
      {
        id: 0,
        title: "Some dumb title",
        todo: [
          { task: "work on an TA", done: true },
          { task: "ride a bike", done: false },
          { task: "sleep", done: false },
        ]
      },
      {
        id: 1,
        title: "Empty note",
        todo: [
        ]
      },
      {
        id: 2,
        title: "Large note",
        todo: [
          { task: "very long text that won't fit in the preview", done: false },
          { task: "><", done: true },
          { task: "LALALALALALALLALALLALALALLALALALALAALALLALALALALA", done: false },
          { task: "nothing", done: true },
          { task: "work on an TA", done: false },
          { task: "ride a bike", done: false },
          { task: "sleep", done: false },
        ]
      },
    ]
  },
  getters: {
  },
  mutations: {
    _addNote: (state, note) => {
      note.id = state.notesIdCounter++;
      state.notes.push(note);
    },
    _editNote: (state, note) => {
      const ix = state.notes.findIndex((n) => n.id == note.id);
      if (ix != -1) {
        state.notes[ix] = note;
      }
    },
    _removeNote: (state, id) => {
      if (id >= 0)
        state.notes = state.notes.filter(n => n.id !== id);
    },
  },
  actions: {
    addNote: async (context, note) => {
      context.commit("_addNote", note);  // Performing mutation 'addNote'
    },
    editNote: async (context, note) => {
      context.commit("_editNote", note);  // Performing mutation 'editNote'
    },
    removeNote: async (context, id) => {
        context.commit("_removeNote", id);  // Performing mutation 'removeNote'
    },
  },
  modules: {
  }
});
