<template>
  <v-row>
    <v-col>
      <div class="text-h6 text-sm-h5 mt-2">Live Events</div>
      <v-divider class="mb-4"></v-divider>
      <!-- Events List -->
      <div v-if="events.length > 0">
        <EventCard
          v-for="(event, index) in events"
          :key="index"
          :event="event"
        />
      </div>
      <div v-else class="d-flex flex-column justify-center align-center py-10">
        <div>
          <v-icon class="mr-2">mdi-calendar-outline</v-icon> No Live Events...
        </div>
        <v-btn
          v-if="isEditor"
          to="/events/new"
          class="mt-5"
          color="primary"
          text
          >Add a New Live Event</v-btn
        >
      </div>
    </v-col>
    <!-- Editor Button -->
    <v-btn
      v-if="isEditor"
      to="/events/new"
      class="floating-btn"
      color="var(--mh-blue)"
      fab
      large
      dark
      ><v-icon large>mdi-plus</v-icon></v-btn
    >
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import EventCard from "../components/EventCard.vue";

export default {
  name: "Events",
  components: { EventCard },
  methods: {
    ...mapActions(["fetchEvents"]),
  },
  computed: {
    ...mapGetters(["events", "isEditor", "user"]),
  },
  mounted() {
    this.fetchEvents();
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
