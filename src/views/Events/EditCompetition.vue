<template>
  <div>
    <div class="d-flex justify-space-between mb-2 align-center">
      <div class="text-h6 text-sm-h5">Edit Campaign</div>
      <v-btn 
        to="/events/competitions" 
        exact-path 
        color="#2f53b6" 
        dark 
        outlined 
        small
        ><v-icon>mdi-arrow-left</v-icon>Campaigns</v-btn
      >
    </div>
    <v-divider class="mb-4"></v-divider>
    <CompetitionForm />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CompetitionForm from "../../components/CompetitionForm.vue";
export default {
  name: "EditCompetition",
  components: {
    CompetitionForm,
  },
  computed: {
    ...mapGetters(["competition"]),
  },
  methods: {
    ...mapActions(["fetchCompetition"]),
  },
  mounted() {
    this.fetchCompetition(this.$route.params.competitionId);
  },
};
</script>

<style scoped></style>
