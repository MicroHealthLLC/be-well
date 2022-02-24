<template>
  <v-row>
    <v-col>
      <div class="text-h6 text-sm-h5 mt-2">Live Events</div>
      <v-divider class="mb-4"></v-divider>
      <!-- Events List -->
      <v-card
        v-for="(event, index) in events"
        :key="index"
        class="d-sm-flex flex-sm-row-reverse justify-sm-space-between mb-2"
      >
        <div
          class="my-auto pa-sm-2"
          :class="{ 'card-image': $vuetify.breakpoint.smAndUp }"
        >
          <v-img
            :src="event.image"
            lazy-src="/img/placeholder.png"
            aspect-ratio="1.5"
          ></v-img>
        </div>

        <div
          class="d-flex flex-column"
          :class="{ 'card-info': $vuetify.breakpoint.smAndUp }"
        >
          <v-card-title>{{ event.title }}</v-card-title>
          <v-card-subtitle class="d-flex flex-column">
            <div class="text-caption mb-2">Hosted by: {{ event.hostName }}</div>
            <div class="mb-2">
              <v-chip class="mr-2" color="primary" small outlined
                ><v-icon small left>{{ cardTypeIcon(event.type) }}</v-icon
                >{{ event.type }}</v-chip
              >
              <v-chip color="primary" small outlined>{{
                new Date(event.date).toDateString()
              }}</v-chip>
            </div></v-card-subtitle
          >
          <v-card-text
            ><span class="clamp-text">{{
              event.description
            }}</span></v-card-text
          >
          <v-card-actions class="mt-auto pl-4 pb-4">
            <v-btn outlined small>View Details</v-btn>
            <v-btn outlined small>Join Event</v-btn>
            <v-btn outlined small :to="`/events/edit/${event.id}`">Edit</v-btn>
            <v-btn @click="removeEvent(event.id)" outlined small>Delete</v-btn>
          </v-card-actions>
        </div>
      </v-card>
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
export default {
  name: "Events",
  methods: {
    ...mapActions(["deleteEvent", "fetchEvents"]),
    cardTypeIcon(type) {
      return type == "Live Virtual" ? "mdi-laptop" : "mdi-account-group";
    },
    removeEvent(id) {
      this.deleteEvent(id);
    },
  },
  computed: {
    ...mapGetters(["events", "isEditor"]),
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
</style>
