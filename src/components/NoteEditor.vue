<template>
  <textarea
    name="editor"
    rows="12"
    autocomplete="off"
    class="p-3 w-full border rounded"
    placeholder="何を書きますか？"
    v-model="localNote.body"
  />
  <div class="text-right">
    <button
      v-if="note.id > -1"
      class="mt-4 py-2 px-4 font-medium rounded text-white bg-indigo-600 hover:bg-indigo-700 active:ring-2 active:ring-offset-2 active:ring-indigo-500"
      @click="$emit('remove', note)"
    >
      削除
    </button>
    <button
      type="submit"
      class="mt-4 py-2 px-4 font-medium rounded text-white bg-indigo-600 hover:bg-indigo-700 active:ring-2 active:ring-offset-2 active:ring-indigo-500"
      @click="$emit('save')"
    >
      Save
    </button>
  </div>
</template>

<script>
export default {
  name: "NoteEditor.vue",
  props: {
    note: Object,
  },
  emits: ["save", "remove"],

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
