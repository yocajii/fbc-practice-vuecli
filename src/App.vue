<template>
  <section class="container mx-auto text-slate-700">
    <h1 class="mt-12 mb-12 text-6xl text-center">{{ this.appTitle }}</h1>
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
import { storageAgent } from "@/modules/storageAgent";

export default {
  name: "App",
  components: {
    NoteEditor,
    HeadlineList,
  },

  beforeCreate() {
    this.storageAgent = storageAgent;
    this.storageKey = "my-memo";
    this.appTitle = "My Memo";
  },

  data() {
    return {
      notes: this.storageAgent.fetch(this.storageKey),
      targetNote: {},
    };
  },

  created() {
    console.log(this.storageAgent.fetch(this.storageKey));
    document.documentElement.setAttribute("lang", "ja");
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
          id: this.storageAgent.uid++,
          body: value,
        });
        this.targetNote = { ...this.notes.slice(-1)[0] };
      } else {
        this.notes.splice(this.targetNote.id, 1, this.targetNote);
      }
      this.storageAgent.save(this.storageKey, this.notes);
    },

    removeNote(target) {
      const index = this.notes.findIndex((note) => note.id === target.id);
      if (index > -1) {
        this.notes.splice(index, 1);
        this.storageAgent.save(this.storageKey, this.notes);
      }
      this.targetNote = {};
    },
  },
};
</script>
