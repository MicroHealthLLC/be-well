<template>
  <div>
    <div class="text-h6 text-sm-h5 mt-2 mb-2 mt-sm-4">Competitions</div>
    <v-divider class="mb-4"></v-divider>

    <CompetitionCard
      v-for="(competition, index) in competitions"
      :key="index"
      :competition="competition"
    />
    <!-- Editor Button -->
    <v-btn
      v-if="isEditor"
      to="/events/competitions/new"
      class="floating-btn"
      color="var(--mh-blue)"
      fab
      large
      dark
      ><v-icon large>mdi-plus</v-icon></v-btn
    >
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CompetitionCard from "../../components/CompetitionCard.vue";

export default {
  name: "Competitions",
  components: {
    CompetitionCard,
  },
  computed: {
    ...mapGetters(["competitions", "isEditor"]),
  },
  methods: {
    ...mapActions(["fetchCompetitions"]),
  },
  mounted() {
    this.fetchCompetitions();
  },
};
</script>

<style scoped>
.floating-btn {
  bottom: 0;
  right: 0;
  position: fixed;
  margin-right: 7vw;
  margin-bottom: 7vh;
}
</style>
