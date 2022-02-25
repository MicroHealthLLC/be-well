<template>
  <v-card
    class="d-sm-flex mb-2"
    :class="{ 'flex-sm-row-reverse': event.image }"
    elevation="5"
  >
    <div
      v-if="event.image"
      class="my-auto pa-sm-2"
      :class="{ 'card-image': $vuetify.breakpoint.smAndUp }"
    >
      <v-img
        :src="event.image"
        lazy-src="/img/placeholder.png"
        aspect-ratio="1.5"
        :class="{ rounded: $vuetify.breakpoint.xsOnly }"
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
        ><div class="clamp-text">{{ event.description }}</div>
        <div
          v-if="participating(event)"
          class="text-caption success--text font-weight-bold mt-5"
        >
          <v-icon color="success" x-small>mdi-check</v-icon> You are attending
          this event
        </div>
      </v-card-text>
      <v-card-actions class="mt-auto pl-4 pb-4">
        <v-btn outlined small :to="`/events/${event.id}`">View Details</v-btn>
        <v-btn
          v-if="!participating(event)"
          outlined
          small
          @click="attend(event)"
          >RSVP to Event</v-btn
        >
        <v-btn v-else @click="cancelAttend(event)" outlined small
          >Cancel RSVP</v-btn
        >
      </v-card-actions>
    </div>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "EventCard",
  props: {
    event: {
      type: Object,
    },
  },
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    ...mapActions(["addParticipant", "fetchEvents", "removeParticipant"]),
    cardTypeIcon(type) {
      return type == "Live Virtual" ? "mdi-laptop" : "mdi-account-group";
    },
    attend(event) {
      const eventId = event.id;
      const participants = event.participants ? event.participants : [];
      const participant = {
        id: this.user.attributes.sub,
        firstName: this.user.attributes.given_name,
        lastName: this.user.attributes.family_name,
        email: this.user.attributes.email,
      };
      const payload = {
        eventId: eventId,
        participants: participants,
        participant: participant,
      };

      this.addParticipant(payload);
    },
    cancelAttend(event) {
      let eventId = event.id;
      let participants = event.participants;
      let index = participants.findIndex(
        (participant) => participant.id == this.user.attributes.sub
      );
      participants.splice(index, 1);
      this.removeParticipant({ eventId: eventId, participants: participants });
    },
    participating({ participants }) {
      let index = participants
        ? participants.findIndex(
            (participant) => participant.id == this.user.attributes.sub
          )
        : -1;

      return index >= 0 ? true : false;
    },
  },
};
</script>

<style scoped>
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
.rounded {
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  border-bottom-left-radius: revert !important;
  border-bottom-right-radius: revert !important;
}
</style>
