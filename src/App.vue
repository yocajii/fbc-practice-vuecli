<template>
  <section class="hero">
    <div class="hero-body has-text-centered">
      <h1 class="title is-1 is-family-sans-serif has-text-grey-dark">
        {{ this.appTitle }}
        <span class="icon ml-2">
          <font-awesome-icon icon="pen-to-square" />
        </span>
      </h1>
    </div>
  </section>
  <div class="container is-max-desktop columns">
    <section class="column is-one-quarter">
      <nav class="panel is-primary has-background-white">
        <HeadlineList
          :notes="notes"
          @select-note="setTargetNote"
          v-show="notes.length"
        />
        <div class="panel-block">
          <button
            class="button is-primary is-outlined is-fullwidth"
            @click="addNote()"
          >
            <span class="icon">
              <font-awesome-icon icon="plus" />
            </span>
            <span>Add note</span>
          </button>
        </div>
      </nav>
    </section>
    <section class="column">
      <NoteEditor
        v-model="currentNote"
        :note="targetNote"
        @save="saveNote"
        @remove="removeNote"
      />
    </section>
  </div>
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
