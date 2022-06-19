<template>
  <textarea
    name="editor"
    rows="18"
    autocomplete="off"
    class="textarea is-primary"
    placeholder="何を書きますか？"
    v-model="localNote.body"
    ref="editor"
  />
  <div class="columns mt-3">
    <div class="column">
      <button
        v-if="note.id !== undefined"
        class="button is-danger is-medium"
        @click="$emit('remove', note)"
      >
        <span class="icon">
          <font-awesome-icon icon="trash-can" />
        </span>
      </button>
    </div>
    <div class="column has-text-right">
      <button
        type="submit"
        class="button is-primary is-medium"
        @click="$emit('save')"
      >
        <span class="icon">
          <font-awesome-icon icon="box-archive" />
        </span>
        <span>Save</span>
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
