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
                timeDistance(event.date, event.startTime)
              }}</v-chip>
            </div>
          </v-card-subtitle>
          <v-divider class="mx-0 mb-5 pa-0" color="#9ec64c"></v-divider>
          <div v-if="event.imageURL" class="px-0 mb-5">
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
            <v-divider class="mx-0 mt-5 pa-0" color="#9ec64c"></v-divider>
          </div>
          <v-card-text class="grid px-0">
            <div class="pb-2">
              <strong class="pr-2"
                ><v-icon small left>mdi-calendar</v-icon>Date:</strong
              >
              {{ longDate(event.date) }}
            </div>
            <div class="pb-2">
              <strong class="pr-2"
                ><v-icon small left>mdi-clock-outline</v-icon>Time:</strong
              >{{ event.startTime }} - {{ event.endTime }}
            </div>
            <div class="pb-2 text-truncate">
              <strong class="pr-2 break-all"
                ><v-icon small left>mdi-account</v-icon>Hosted By:</strong
              >{{ event.hostName }}
            </div>
            <div class="pb-2 text-truncate">
              <strong class="pr-2 break-all"
                ><v-icon small left>mdi-email-outline</v-icon>Host
                Email:</strong
              >
              <a :href="`mailto: ${event.hostEmail}`">{{ event.hostEmail }}</a>
            </div>
            <div class="pb-2 text-truncate">
              <strong class="pr-2"
                ><v-icon small left>mdi-link</v-icon>Link:</strong
              >
              <a :href="event.link">{{ event.link }}</a>
            </div>
            <div class="pb-2 text-truncate">
              <strong class="pr-2"
                ><v-icon small left>{{ typeIcon(event.type) }}</v-icon>
                Type:</strong
              >{{ event.type }}
            </div>
            <div class="description text-pre-wrap pb-2">
              <strong class="pr-2">Description:</strong> {{ event.description }}
            </div>
            <div class="d-flex">
              <strong class="pr-2">Participants:</strong>
              <div class="participants" v-if="hasParticipants">
                <v-chip
                  v-for="(participant, index) in event.participants"
                  :key="index"
                  class="mr-1 mb-1"
                  color="var(--mh-green)"
                  small
                  >{{ participant.firstName }} {{ participant.lastName }}
                </v-chip>
              </div>
              <div v-else class="font-italic">No one has signed up yet</div>
            </div>
            <div
              v-if="participating(event)"
              class="rsvp text-caption success--text font-weight-bold mt-5"
            >
              <v-icon color="success" x-small>mdi-check</v-icon> You are
              attending this event
            </div>
          </v-card-text>
          <v-card-actions class="d-flex justify-end px-0">
            <v-btn
              v-if="!participating(event)"
              @click="attend(event)"
              class="px-5"
              color="var(--mh-blue)"
              dark
              >RSVP to Event<v-icon right>mdi-plus</v-icon></v-btn
            ><v-btn v-else @click="cancelAttend(event)" outlined
              >Cancel RSVP</v-btn
            ></v-card-actions
          >
        </v-card>
      </div></v-col
    ></v-row
  >
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import timeMixin from "../mixins/time-mixin";

export default {
  name: "Event",
  mixins: [timeMixin],
  computed: {
    ...mapGetters(["event", "isEditor", "user"]),
    hasParticipants() {
      return this.event.participants && this.event.participants.length > 0;
    },
  },
  methods: {
    ...mapActions(["addParticipant", "fetchEvent", "removeParticipant"]),
    typeIcon(type) {
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
  mounted() {
    this.fetchEvent(this.$route.params.eventId);
  },
};
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 0.5rem;
}
@media (max-width: 600px) {
  .grid {
    display: flex;
    flex-direction: column;
  }
}
.description,
.participants,
.rsvp {
  grid-column: 1 / span 2;
}
.break-word {
  word-break: break-word;
}
.break-all {
  word-break: break-all;
}
.text-pre-wrap {
  white-space: pre-wrap;
}
a {
  text-decoration: none;
}
</style>
