<template>
  <v-row>
    <v-col>
      <div class="grid-container">
        <v-card
          @click="openPage(card.route)"
          v-for="(card, index) in navCards"
          :key="index"
          class="nav-card text-center"
        >
          <v-img
            :src="card.img"
            class="mx-auto"
            :class="{ 'mobile-svg-size': isXs }"
          />
          <v-card-title class="d-flex justify-center mb-2"
            ><div class="card-title" :class="`card-title-${index}`">
              {{ card.title }}
            </div></v-card-title
          >
          <v-card-subtitle>{{ card.body }}</v-card-subtitle>
        </v-card>
      </div>
    </v-col>
    <v-dialog v-model="showQuestionnaire" persistent
      ><FavoritesQuestionnaire
    /></v-dialog>
  </v-row>
</template>

<script>
import utilitiesMixin from "../mixins/utilities-mixin";
import FavoritesQuestionnaire from "../components/FavoritesQuestionnaire.vue";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  mixins: [utilitiesMixin],
  components: {
    FavoritesQuestionnaire,
  },
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
    ...mapGetters(["showQuestionnaire"]),
    isXs() {
      return this.$vuetify.breakpoint.xsOnly;
    },
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
.card-title {
  line-height: 1;
  border-bottom: 5px solid #fff;
  -webkit-transition: border 500ms ease-out;
  -moz-transition: border 500ms ease-out;
  -o-transition: border 500ms ease-out;
  transition: border 500ms ease-out;
}
.nav-card:hover .card-title-0 {
  border-bottom: 5px solid var(--mh-orange);
}
.nav-card:hover .card-title-1 {
  border-bottom: 5px solid var(--mh-green);
}
.nav-card:hover .card-title-2 {
  border-bottom: 5px solid var(--mh-blue);
}
.nav-card:hover .card-title-3 {
  border-bottom: 5px solid var(--mh-orange);
}
</style>
