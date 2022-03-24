<template>
  <v-card
    class="d-sm-flex mb-2"
    :class="{ 'flex-sm-row-reverse': competition.image }"
    elevation="5"
  >
    <div
      v-if="competition.image"
      class="my-auto pa-sm-2"
      :class="{ 'card-image': $vuetify.breakpoint.smAndUp }"
    >
      <v-img
        :src="competition.image"
        lazy-src="/img/placeholder.png"
        aspect-ratio="1.5"
        :class="{ rounded: $vuetify.breakpoint.xsOnly }"
      ></v-img>
    </div>

    <div
      class="d-flex flex-column"
      :class="{ 'card-info': $vuetify.breakpoint.smAndUp }"
    >
      <v-card-title>{{ competition.title }}</v-card-title>
      <v-card-subtitle class="d-flex flex-column">
        <div class="text-caption mb-2">
          Hosted by: {{ competition.hostName }}
        </div>
        <div class="mb-2">
          <v-chip class="mr-2" color="primary" small outlined
            ><v-icon small left>mdi-office-building</v-icon
            >Company Clash</v-chip
          >
          <v-chip color="primary" small outlined>{{
            fullDate(competition.startDate)
          }}</v-chip>
        </div></v-card-subtitle
      >
      <v-card-text
        ><div class="clamp-text">{{ competition.description }}</div>
      </v-card-text>
      <v-card-actions class="mt-auto pl-4 pb-4">
        <v-btn
          outlined
          small
          :to="`/events/competitions/${competition.id}`"
          >View Details</v-btn
        >
      </v-card-actions>
    </div>
  </v-card>
</template>

<script>
import dateMixin from "../mixins/date-mixin";

export default {
  name: "CompetitionCard",
  mixins: [dateMixin],
  props: {
    competition: {
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
