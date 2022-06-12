<template>
  <textarea
    name="editor"
    rows="18"
    autocomplete="off"
    class="textarea"
    placeholder="何を書きますか？"
    v-model="localNote.body"
    ref="editor"
  />
  <div class="columns mt-3">
    <div class="column">
      <button
        v-if="note.id > -1"
        class="button is-danger"
        @click="$emit('remove', note)"
      >
        Remove
      </button>
    </div>
    <div class="column has-text-right">
      <button type="submit" class="button is-primary" @click="$emit('save')">
        Save
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "NoteEditor.vue",
  props: {
    note: Object,
  },
  emits: ["save", "remove"],

  mounted() {
    this.$refs.editor.focus();
  },

  updated() {
    this.$refs.editor.focus();
  },

  computed: {
    localNote: {
      get() {
        return this.note;
      },
      set() {
        this.$emit("save");
      },
    },
  },
};
</script>
