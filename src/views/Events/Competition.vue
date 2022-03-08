<template>
  <div>
    <div
      class="d-flex justify-center flex-column mx-auto competition-container"
    >
      <div class="d-flex justify-end mb-2 align-center">
        <v-btn
          to="/events/competitions"
          exact-path
          color="#2f53b6"
          dark
          outlined
          small
          ><v-icon>mdi-arrow-left</v-icon>Competitions</v-btn
        >
        <v-btn
          v-if="isEditor"
          :to="`/events/competitions/edit/${competition.id}`"
          class="ml-2"
          outlined
          small
          ><v-icon left small>mdi-pencil</v-icon>Edit</v-btn
        >
      </div>
      <v-card class="px-0" flat color="#f0f3f7">
        <v-chip color="var(--mh-blue)" dark class="category-chip" x-small label
          >COMPETITION</v-chip
        >
        <v-card-title class="px-0 pt-0 text-h4 break-word">{{
          competition.title
        }}</v-card-title>
        <v-card-subtitle class="d-flex flex-column px-0"
          ><div class="mb-2">Hosted by: {{ competition.hostName }}</div>
          <div>
            <v-chip class="mr-1" color="primary" outlined small
              ><v-icon small left>{{ typeIcon(competition.type) }}</v-icon
              >{{ competition.type }}</v-chip
            ><v-chip color="primary" outlined small>{{
              timeDistance(
                competition.startDate,
                competition.startTime,
                competition.timeZone
              )
            }}</v-chip>
          </div>
        </v-card-subtitle>
        <v-divider class="mx-0 mb-5 pa-0" color="#9ec64c"></v-divider>
        <div v-if="competition.imageURL" class="px-0 mb-5">
          <v-img
            lazy-src="/img/placeholder.png"
            :src="competition.imageURL"
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
          <!-- Competition Details -->
          <div>
            <div class="pb-2">
              <strong class="pr-2"
                ><v-icon small left>mdi-calendar</v-icon>Begins:</strong
              >
              {{ longISODate(competition.startDate) }} at
              {{ competition.startTime }} {{ competition.timeZone }}
            </div>
            <div class="pb-2">
              <strong class="pr-2"
                ><v-icon small left>mdi-calendar</v-icon>Ends:</strong
              >{{ longISODate(competition.endDate) }} at
              {{ competition.endTime }} {{ competition.timeZone }}
            </div>
            <div class="pb-2 text-truncate">
              <strong class="pr-2 break-all"
                ><v-icon small left>mdi-account</v-icon>Hosted By:</strong
              >{{ competition.hostName }}
            </div>
            <div class="pb-2 text-truncate">
              <strong class="pr-2 break-all"
                ><v-icon small left>mdi-email-outline</v-icon>Host
                Email:</strong
              >
              <a :href="`mailto: ${competition.hostEmail}`">{{
                competition.hostEmail
              }}</a>
            </div>
            <div class="d-flex flex-column description text-pre-wrap pb-2 mt-5">
              <div><strong class="pr-2">Description:</strong></div>
              <div>{{ competition.description }}</div>
            </div>
            <div class="d-flex flex-column rules text-pre-wrap pb-2 mt-2">
              <div><strong class="pr-2">Rules:</strong></div>
              <div>{{ competition.rules }}</div>
            </div>
          </div>
          <!-- Leaderboard -->
          <div class="leaderboard">
            <v-data-table
              class="leaderboard-table"
              :headers="headers"
              :items="competitors"
              no-data-text="No one has signed up yet"
            >
              <template v-slot:top
                ><div class="text-h6 pl-4 pt-4">
                  <v-icon left>mdi-trophy</v-icon>Leaderboard
                </div></template
              >
            </v-data-table>
          </div>
        </v-card-text>
        <v-card-actions class="d-flex justify-end px-0">
          <v-btn class="px-5" color="var(--mh-blue)" dark
            >Join Competition<v-icon right>mdi-plus</v-icon></v-btn
          ></v-card-actions
        >
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import dateMixin from "../../mixins/date-mixin";

export default {
  name: "Competition",
  mixins: [dateMixin],
  data() {
    return {
      headers: [
        {
          text: "Name",
          value: "name",
        },
        {
          text: "Score",
          value: "score",
        },
      ],
      competitors: [
        {
          name: "Christopher Calderon",
          score: "150",
        },
        {
          name: "Ahu Olcer",
          score: "95",
        },
        {
          name: "Efe Effrat",
          score: "50",
        },
        {
          name: "Cheuk Kwan Yiu",
          score: "200",
        },
        {
          name: "Joanna Tran",
          score: "25",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["competition", "isEditor", "user"]),
  },
  methods: {
    ...mapActions(["addParticipant", "fetchCompetition", "removeParticipant"]),
    typeIcon(type) {
      return type == "Live Virtual" ? "mdi-laptop" : "mdi-account-group";
    },
  },
  mounted() {
    this.fetchCompetition(this.$route.params.competitionId);
  },
};
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  column-gap: 2rem;
}
@media (max-width: 600px) {
  .grid {
    display: flex;
    flex-direction: column;
  }
}
.description,
.rsvp {
  /* grid-column: 1 / span 2; */
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
.leaderboard-table {
  background-color: var(--mh-orange);
  color: white;
  border: 1px solid gray;
}
.leaderboard-table >>> tr:hover {
  background-color: var(--mh-orange) !important;
  filter: brightness(105%);
}
</style>
