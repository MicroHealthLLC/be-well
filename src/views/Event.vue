<template>
  <v-row
    ><v-col>
      <div class="d-flex justify-center flex-column mx-auto event-container">
        <div class="d-flex justify-end mb-2 align-center">
          <v-btn to="/events" exact-path color="#2f53b6" dark outlined small
            ><v-icon>mdi-arrow-left</v-icon>Events</v-btn
          >
          <v-btn
            v-if="isEditor"
            :to="`/events/edit/${this.event.id}`"
            class="ml-2"
            outlined
            small
            ><v-icon left small>mdi-pencil</v-icon>Edit</v-btn
          >
        </div>
        <v-card class="px-0" flat color="#f0f3f7">
          <v-chip
            color="var(--mh-blue)"
            dark
            class="category-chip"
            x-small
            label
            >EVENT</v-chip
          >
          <v-card-title class="px-0 pt-0 text-h4 break-word">{{
            event.title
          }}</v-card-title>
          <v-card-subtitle class="d-flex flex-column px-0"
            ><div class="mb-2">Hosted by: {{ event.hostName }}</div>
            <div>
              <v-chip class="mr-1" color="primary" outlined small
                ><v-icon small left>{{ typeIcon(event.type) }}</v-icon
                >{{ event.type }}</v-chip
              ><v-chip color="primary" outlined small>{{
                new Date(event.date).toDateString()
              }}</v-chip>
            </div>
          </v-card-subtitle>
          <div v-if="event.imageURL" class="px-0 mb-5">
            <v-divider class="mx-0 mb-5 pa-0" color="#9ec64c"></v-divider>
            <v-img
              lazy-src="/img/placeholder.png"
              :src="event.imageURL"
              class="header-image mx-0 fill-width"
              max-height="600"
              ><template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    size="50"
                    width="5"
                    indeterminate
                    color="var(--mh-orange)"
                  ></v-progress-circular>
                </v-row> </template
            ></v-img>
          </div>
          <v-card-text class="px-0">
            <p>
              <strong>Date:</strong> {{ new Date(event.date).toDateString() }}
            </p>
            <p>
              <strong>Time:</strong> {{ event.startTime }} - {{ event.endTime }}
            </p>
            <p><strong>Hosted By:</strong> {{ event.hostName }}</p>
            <p>
              <strong>Host Email:</strong> 
              <a :href="`mailto: ${event.hostEmail}`">{{ event.hostEmail }}</a>
            </p>
            <p>
              <strong>Link:</strong> <a :href="event.link">{{ event.link }}</a>
            </p>
            <p><strong>Description:</strong> {{ event.description }}</p>
          </v-card-text>
        </v-card>
      </div></v-col
    ></v-row
  >
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Event",
  computed: {
    ...mapGetters(["event", "isEditor"]),
  },
  methods: {
    ...mapActions(["fetchEvent"]),
    typeIcon(type) {
      return type == "Live Virtual" ? "mdi-laptop" : "mdi-account-group";
    },
  },
  mounted() {
    this.fetchEvent(this.$route.params.eventId);
  },
};
</script>

<style scoped>
.break-word {
  word-break: break-word;
}
</style>
