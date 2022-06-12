<template>
  <a
    class="panel-block is-active"
    v-for="note in notes"
    :key="note.id"
    @click="$emit('select-note', note)"
  >
    <span class="panel-icon">
      <font-awesome-icon icon="file" />
    </span>
    {{ headline(note) }}
  </a>
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
      if (headline.length > 10) {
        headline = headline.slice(0, 9) + "...";
      }
      return headline;
    },
  },
};
</script>
