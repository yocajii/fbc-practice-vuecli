<template>
  <section class="container mx-auto text-slate-700">
    <h1 class="mt-12 mb-12 text-6xl text-center">{{ title }}</h1>
    <div class="flex flex-row">
      <section class="basis-1/4">
        <button class="destroy btn btn-outline-danger" @click="addNote()">
          Add note
        </button>
        <ul v-show="notes.length">
          <li v-for="note in notes" :key="note.id">
            <button class="underline" @click="setTargetNote(note)">
              {{ note.body.split("\n")[0] }}
            </button>
          </li>
        </ul>
      </section>
      <section class="basis-3/4">
        <textarea
          name="about"
          rows="12"
          autocomplete="off"
          class="p-3 w-full border rounded"
          placeholder="何を書きますか？"
          v-model="targetNote.body"
        />
        <div class="text-right">
          <button
            v-if="targetNote.id > -1"
            class="mt-4 py-2 px-4 font-medium rounded text-white bg-indigo-600 hover:bg-indigo-700 active:ring-2 active:ring-offset-2 active:ring-indigo-500"
            @click="removeNote(targetNote)"
          >
            削除
          </button>
          <button
            type="submit"
            class="mt-4 py-2 px-4 font-medium rounded text-white bg-indigo-600 hover:bg-indigo-700 active:ring-2 active:ring-offset-2 active:ring-indigo-500"
            @click="saveNote"
          >
            Save
          </button>
        </div>
      </section>
    </div>
  </section>
  <!--  <HelloWorld msg="Welcome to Your Vue.js App" />-->
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";

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
    // HelloWorld,
  },

  created() {
    document.documentElement.setAttribute("lang", "ja");
  },

  data() {
    return {
      title: "My Memo",
      notes: memoStorage.fetch(),
      targetNote: {},
    };
  },

  methods: {
    setTargetNote(note) {
      this.targetNote = note;
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
        this.targetNote = this.notes.slice(-1)[0];
      }
      memoStorage.save(this.notes);
    },

    removeNote(note) {
      const index = this.notes.indexOf(note);
      if (index > -1) {
        this.notes.splice(index, 1);
      }
      this.targetNote = {};
    },
  },
};
</script>
