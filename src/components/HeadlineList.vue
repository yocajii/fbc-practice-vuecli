<template>
  <a
    class="panel-block is-active"
    v-for="note in notes"
    :key="note.id"
    @click="$emit('select-note', note.id)"
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

  methods: {
    headline(note) {
      const headline = note.body.split("\n")[0];
      return headline.length > 10 ? headline.slice(0, 9) + "..." : headline;
    },
  },
};
</script>
