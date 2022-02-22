<template>
  <v-row>
    <v-col>
      <div class="text-h6 text-sm-h5 mt-2">Events</div>
      <v-divider class="mb-4"></v-divider>
      <!-- Events List -->
      <v-card v-for="(event, index) in events" :key="index">
        <v-card-title>{{ event.title }}</v-card-title>
        <v-card-subtitle class="d-flex flex-column">
          <div>
            <v-chip class="mr-2" color="primary" small outlined
              ><v-icon small left>mdi-human</v-icon>Category</v-chip
            >
            <v-chip color="primary" small outlined>{{
              new Date(event.date).toDateString()
            }}</v-chip>
          </div>
          <div>Hosted by: {{ event.hostName }}</div></v-card-subtitle
        >
        <v-card-text>{{ event.description }}</v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Events",
  methods: {
    ...mapActions(["fetchEvents"]),
  },
  computed: {
    ...mapGetters(["events"]),
  },
  mounted() {
    this.fetchEvents();
  },
};
</script>

<style></style>
