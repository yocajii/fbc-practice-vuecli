<template>
  <ul v-show="notes.length">
    <li v-for="note in notes" :key="note.id">
      <button class="underline" @click="$emit('select-note', note)">
        {{ headline(note) }}
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  name: "HeadlineList",
  props: {
    notes: Array,
  },

  emits: ["select-note"],

  computed: {
    headline: () => (note) => {
      let headline = note.body.split("\n")[0];
      if (headline.length > 12) {
        headline = headline.slice(0, 12) + "...";
      }
      return headline;
    },
  },
};
</script>
