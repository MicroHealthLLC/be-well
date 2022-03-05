<template>
  <v-row>
    <v-col>
      <div class="d-flex justify-space-between mb-2 align-center">
        <div class="text-h6 text-sm-h5">New Event</div>
        <v-btn to="/events" exact-path color="#2f53b6" dark outlined small
          ><v-icon>mdi-arrow-left</v-icon>Events</v-btn
        >
      </div>
      <v-divider class="mb-4"></v-divider>
      <EventForm />
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import EventForm from "../../components/EventForm.vue";

export default {
  name: "NewLiveEvent",
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
    ...mapMutations(["SET_EVENT"]),
  },
  mounted() {
    this.SET_EVENT({
      title: "",
      hostName: "",
      hostEmail: "",
      description: "",
      type: "Live Virtual",
      date: "",
      startTime: null,
      endTime: null,
      timeZone: "EST",
      image: null,
      link: "",
    });
  },
  watch: {
    event() {
      if (this.event.id) {
        this.$router.push(`/events/live-events/edit/${this.event.id}`);
      }
    },
  },
};
</script>

<style scoped></style>
