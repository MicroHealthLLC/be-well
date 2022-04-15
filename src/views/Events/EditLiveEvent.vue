<template>
  <div>
    <div class="d-flex justify-space-between mb-2 align-center">
      <div class="text-h6 text-sm-h5">Edit Event</div>
      <v-btn to="/events" exact-path color="#2f53b6" dark outlined small
        ><v-icon>mdi-arrow-left</v-icon>Events</v-btn
      >
    </div>
    <v-divider class="mb-4"></v-divider>
    <EventForm />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import EventForm from "../../components/EventForm.vue";
export default {
  name: "EditLiveEvent",
  components: {
    EventForm,
  },
  data() {
    return {
      //
    };
  },
  computed: {
    ...mapGetters(["event"]),
  },
  methods: {
    ...mapActions(["fetchEvent"]),
  },
  mounted() {
    this.fetchEvent(this.$route.params.eventId);
  },
};
</script>

<style scoped></style>
