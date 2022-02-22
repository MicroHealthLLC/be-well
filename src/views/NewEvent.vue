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
import { mapGetters } from "vuex";
import EventForm from "../components/EventForm.vue";
export default {
  name: "NewEvent",
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
    // ...mapMutations(["SET_EVENT"]),
  },
  mounted() {
    // this.SET_EVENT({
    //   title: "",
    //   author: `${this.user.attributes.given_name} ${this.user.attributes.family_name}`,
    //   lastEditedBy: `${this.user.attributes.given_name} ${this.user.attributes.family_name}`,
    //   category: "ENDURANCE",
    //   level: "BEGINNER",
    //   body: "",
    // });
  },
  watch: {
    // event() {
    //   if (this.event.id) {
    //     this.$router.push(`/events/edit/${this.event.id}`);
    //   }
    // },
  },
};
</script>

<style scoped></style>
