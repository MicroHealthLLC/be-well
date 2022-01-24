<template>
  <v-row>
    <v-col>
      <div class="grid-container">
        <v-card class="text-center">
          <v-img src="../assets/personal-goals-bro.svg"></v-img>
          <v-card-title class="d-flex justify-center"
            >Set Some Goals</v-card-title
          >
          <v-card-subtitle
            >Create and track goals to help you on your wellness
            journey</v-card-subtitle
          >
        </v-card>
        <v-card class="text-center">
          <v-img src="../assets/time-management-bro.svg"></v-img>
          <v-card-title class="d-flex justify-center"
            >Schedule an Activity Reminder</v-card-title
          >
          <v-card-subtitle
            >Choose a category, time, and content-type, and enjoy daily wellness
            reminders</v-card-subtitle
          >
        </v-card>
        <v-card class="text-center">
          <v-img src="../assets/training-at-home-bro.svg"></v-img>
          <v-card-title class="d-flex justify-center"
            >Browse Fitness Videos</v-card-title
          >
          <v-card-subtitle
            >Take a wellness break and follow along with a quick fitness
            video</v-card-subtitle
          >
        </v-card>
        <v-card class="text-center">
          <v-img src="../assets/online-article-bro.svg"></v-img>
          <v-card-title class="d-flex justify-center"
            >Browse Wellness Articles</v-card-title
          >
          <v-card-subtitle
            >Read articles filled with useful wellness tips and
            information</v-card-subtitle
          >
        </v-card>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import utilitiesMixin from "../mixins/utilities-mixin";

export default {
  name: "Home",
  mixins: [utilitiesMixin],
  data() {
    return {
      //
    };
  },
  methods: {
    //
  },
  computed: {
    //
  },
  async mounted() {
    //
  },
};
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}
::v-deep .v-card__title {
  word-break: unset;
  font-size: 16px;
}
</style>
