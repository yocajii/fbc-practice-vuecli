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
        <HeadlineList :notes="notes" @select-note="setTargetNote" />
        <div class="panel-block">
          <button
            class="button is-primary is-outlined is-fullwidth"
            @click="setNewNote()"
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
      <NoteEditor :note="targetNote" @save="saveNote" @remove="removeNote" />
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
      targetNote: { body: "" },
    };
  },

  methods: {
    setTargetNote(id) {
      const index = this.findIndex(id);
      this.targetNote = { ...this.notes.slice(index)[0] };
    },

    setNewNote() {
      this.targetNote = { body: "" };
    },

    saveNote(id, body) {
      if (!body.trim()) {
        return;
      }
      const note = {
        id: id ?? crypto.randomUUID(),
        body,
      };
      const index = this.findIndex(note.id);
      if (index === -1) {
        this.notes.push(note);
      } else {
        this.notes.splice(index, 1, note);
      }
      this.storageAgent.save(this.storageKey, this.notes);
      this.setTargetNote(note.id);
    },

    removeNote(id) {
      this.notes.splice(this.findIndex(id), 1);
      this.storageAgent.save(this.storageKey, this.notes);
      this.setNewNote();
    },

    findIndex(id) {
      return this.notes.findIndex((note) => note.id === id);
    },
  },
};
</script>
