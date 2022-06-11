<template>
  <section class="container mx-auto text-slate-700">
    <h1 class="mt-12 mb-12 text-6xl text-center">{{ appTitle }}</h1>
    <div class="flex flex-row">
      <section class="basis-1/4">
        <button @click="addNote()">Add note</button>
        <HeadlineList :notes="notes" @select-note="setTargetNote" />
      </section>
      <section class="basis-3/4">
        <NoteEditor
          v-model="currentNote"
          :note="targetNote"
          @save="saveNote"
          @remove="removeNote"
        />
      </section>
    </div>
  </section>
</template>

<script>
import HeadlineList from "@/components/HeadlineList";
import NoteEditor from "@/components/NoteEditor";
const STORAGE_KEY = "my-memo";
const memoStorage = {
  fetch() {
    const notes = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    notes.forEach((note, index) => {
      note.id = index;
    });
    memoStorage.uid = notes.length;
    return notes;
  },
  save(notes) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  },
};

export default {
  name: "App",
  components: {
    NoteEditor,
    HeadlineList,
  },

  created() {
    document.documentElement.setAttribute("lang", "ja");
  },

  data() {
    return {
      appTitle: "My Memo",
      notes: memoStorage.fetch(),
      targetNote: {},
    };
  },

  methods: {
    setTargetNote(note) {
      this.targetNote = { ...note };
    },

    addNote() {
      this.targetNote = {};
    },

    saveNote() {
      const value = this.targetNote.body && this.targetNote.body.trim();
      if (!value) {
        return;
      }
      if (this.targetNote.id === undefined) {
        this.notes.push({
          id: memoStorage.uid++,
          body: value,
        });
        this.targetNote = { ...this.notes.slice(-1)[0] };
      } else {
        this.notes.splice(this.targetNote.id, 1, this.targetNote);
      }
      memoStorage.save(this.notes);
    },

    removeNote(target) {
      const index = this.notes.findIndex((note) => note.id === target.id);
      alert(index);
      if (index > -1) {
        this.notes.splice(index, 1);
      }
      this.targetNote = {};
    },
  },
};
</script>
