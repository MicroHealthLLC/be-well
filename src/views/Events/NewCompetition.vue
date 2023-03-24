<template>
  <div>
    <div class="d-flex justify-space-between mb-2 align-center">
      <div class="text-h6 text-sm-h5">New Competition</div>
      <v-btn
        to="/events/competitions"
        exact-path
        color="#2f53b6"
        dark
        outlined
        small
        ><v-icon>mdi-arrow-left</v-icon>Competitions</v-btn
      >
    </div>
    <v-divider class="mb-4"></v-divider>
    <CompetitionForm />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import CompetitionForm from "../../components/CompetitionForm.vue";

export default {
  name: "Competition",
  components: {
    CompetitionForm,
  },
  computed: {
    ...mapGetters(["competition"]),
  },
  methods: {
    ...mapMutations(["SET_COMPETITION"]),
  },
  mounted() {
    this.SET_COMPETITION({
      title: "",
      hostName: "",
      hostEmail: "",
      startDate: "",
      endDate: "",
      startTime: null,
      endTime: null,
      image: null,
      description: "",
      rules: "",
      isPrivate: false,
      isAnonymous: false,
      groupParticipation: false,
      timeZone: "EST",
    });
  },
  watch: {
    competition() {
      if (this.competition.id) {
        this.$router.push(`/events/competitions/edit/${this.competition.id}`);
      }
    },
  },
};
</script>

<style scoped></style>
