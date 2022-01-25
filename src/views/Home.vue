<template>
  <v-row>
    <v-col>
      <div class="grid-container">
        <v-card
          @click="openPage(card.route)"
          v-for="(card, index) in navCards"
          :key="index"
          class="text-center"
        >
          <v-img
            :src="card.img"
            class="mx-auto"
            :class="{ 'mobile-svg-size': isXs }"
          />
          <v-card-title class="d-flex justify-center">{{
            card.title
          }}</v-card-title>
          <v-card-subtitle>{{ card.body }}</v-card-subtitle>
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
      navCards: [
        {
          title: "Set Some Goals",
          body: "Create and track goals to help you on your wellness journey",
          img: "/svg/personal-goals-bro.svg",
          route: "/activities/goals",
        },
        {
          title: "Schedule an Activity Reminder",
          body: "Choose a category, time, and content-type, and enjoy daily wellness reminders",
          img: "/svg/time-management-bro.svg",
          route: "/activities/reminders",
        },
        {
          title: "Browse Fitness Videos",
          body: "Take a wellness break and follow along with a quick fitness video",
          img: "/svg/training-at-home-bro.svg",
          route: "/activities/videos",
        },
        {
          title: "Browse Wellness Articles",
          body: "Read articles filled with useful wellness tips and information",
          img: "/svg/online-article-bro.svg",
          route: "/activities/articles",
        },
      ],
    };
  },
  methods: {
    openPage(route) {
      this.$router.push(route);
    },
  },
  computed: {
    isXs() {
      return this.$vuetify.breakpoint.xsOnly;
    },
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
.mobile-svg-size {
  width: 200px;
  height: 200px;
}
</style>
