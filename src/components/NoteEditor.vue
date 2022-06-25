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
        v-if="isPersisted"
        class="button is-danger is-medium"
        @click="$emit('remove', localNote.id)"
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
        @click="$emit('save', localNote.id)"
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

  data() {
    return {
      localNote: this.note,
    };
  },

  mounted() {
    this.$refs.editor.focus();
  },

  updated() {
    this.$refs.editor.focus();
  },

  watch: {
    note() {
      this.localNote = this.note;
    },
  },

  computed: {
    isPersisted() {
      return this.localNote.id !== undefined;
    },
  },
};
</script>
