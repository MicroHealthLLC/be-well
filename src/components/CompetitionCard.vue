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
        <div style= "color:#616D7E" class="text-caption mb-2">
          Hosted by: {{ competition.hostName }} <br>
          {{ shortISODate(competition.startDate) }} - {{ shortISODate(competition.endDate) }}
        </div>
        <!-- beginning of chips -->
        <div class="mb-2">
          <v-chip 
            v-if="this.competition.campaignType"
            class="mr-2" 
            color="primary" 
            small 
            outlined
            >
            <v-icon small left>mdi-bullhorn-variant</v-icon
            >{{ this.competition.campaignType }}</v-chip
          >
          <v-chip 
            v-if="this.competition.category === 'Mental Health'"
            class="mr-2" 
            color="primary" 
            small 
            outlined
            >
            <v-icon small left>mdi-brain</v-icon
            >Mental Health</v-chip
          >
          <v-chip 
            v-if="this.competition.category === 'Fitness'"
            class="mr-2" 
            color="primary" 
            small 
            outlined
            >
            <v-icon small left>mdi-run</v-icon
            >Fitness</v-chip
          >
          <v-chip 
            v-if="this.competition.category === 'Weight Loss'"
            class="mr-2" 
            color="primary" 
            small 
            outlined
            >
            <v-icon small left>mdi-scale-bathroom</v-icon
            >Weight Loss</v-chip
          >
          <v-chip 
            v-if="this.competition.category === 'Cooking'"
            class="mr-2" 
            color="primary" 
            small 
            outlined
            >
            <v-icon small left>mdi-chef-hat</v-icon
            >Cooking</v-chip
          >
          <v-chip 
            v-if="this.competition.category === 'Balance'"
            class="mr-2" 
            color="primary" 
            small 
            outlined
            >
            <v-icon small left>mdi-gymnastics</v-icon
            >Balance</v-chip
          >
          <v-chip 
            v-if="this.competition.category === 'Nutrition'"
            class="mr-2" 
            color="primary" 
            small 
            outlined
            >
            <v-icon small left>mdi-food-apple</v-icon
            >Cooking</v-chip
          >
          <v-chip 
            v-if="this.competition.category === 'Stretch'"
            class="mr-2" 
            color="primary" 
            small 
            outlined
            >
            <v-icon small left>mdi-yoga</v-icon
            >Stretch</v-chip
          >
          <v-chip 
            v-if="this.competition.category === 'Miscellaneous'"
            class="mr-2" 
            color="primary" 
            small 
            outlined
            >
            <v-icon small left>mdi-shape-plus</v-icon
            >Miscellaneous</v-chip
          >
          <v-chip 
            v-if="this.competition.isPrivate"
            class="mr-2" 
            color="primary" 
            small 
            outlined
            >
            <v-icon small left>mdi-lock</v-icon
            >Private</v-chip
          >
          <v-chip 
            v-if="!this.competition.isPrivate"
            class="mr-2" 
            color="primary" 
            small 
            outlined
            >
            <v-icon small left>mdi-lock-open-variant</v-icon
            >Public</v-chip
          >
          <!-- <v-chip 
            v-if="this.competition.isAnonymous"
            class="mr-2" 
            color="primary" 
            small 
            outlined
            >
            <v-icon small left>mdi-incognito</v-icon
            >Anonymous</v-chip
          > -->
          <v-chip 
            v-if="this.competition.groupParticipation"
            class="mr-2" 
            color="primary" 
            small 
            outlined
            >
            <v-icon small left>mdi-human-queue</v-icon
            >Group</v-chip
          >
          <v-chip 
            v-if="!this.competition.groupParticipation"
            class="mr-2" 
            color="primary" 
            small 
            outlined
            >
            <v-icon small left>mdi-human</v-icon
            >Individual</v-chip
          >
          <v-chip 
            class="mr-2" 
            :color="deadlinePassed(this.competition.deadline, this.competition.timeZone)"
            small 
            outlined
            >
            <v-icon small left>mdi-clipboard-account</v-icon
            >{{ shortISODate(this.competition.deadline) }}</v-chip
          >
        </div></v-card-subtitle
      >
      <!-- end of chips -->
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
