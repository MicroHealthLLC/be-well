<template>
  <v-card
    elevation="5"
    max-width="375"
  >
    <v-card-title>{{ group.groupName }}</v-card-title>
  </v-card>
</template>

<script>
import dateMixin from "../mixins/date-mixin";

export default {
  name: "GroupCard",
  mixins: [dateMixin],
  props: {
    group: {
      type: Object,
    },
  },
  methods: {
    cardTypeIcon(type) {
      return type == "Live Virtual" ? "mdi-laptop" : "mdi-account-group";
    },
  },
};
</script>

<style scoped>
.card-info {
  width: 60%;
}
.card-image {
  width: 40%;
}
.clamp-text {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}
.rounded {
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  border-bottom-left-radius: revert !important;
  border-bottom-right-radius: revert !important;
}
</style>
