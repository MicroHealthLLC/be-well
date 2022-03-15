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
              ><v-icon small left>mdi-run</v-icon>Step Count</v-chip
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
        <div v-if="competition.imageURL" class="px-0">
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
            <v-tabs
              v-model="tab"
              background-color="transparent"
              height="35"
              dense
            >
              <v-tabs-slider color="var(--mh-green)">></v-tabs-slider>
              <v-tab>Details</v-tab>
              <v-tab>Submissions</v-tab>
              <v-spacer></v-spacer>
              <v-btn
                v-if="tab == 1"
                class="mt-auto"
                @click="openSubmissionForm"
                small
                outlined
                >Add Photo<v-icon small right>mdi-plus</v-icon></v-btn
              >
              <v-tabs-items v-model="tab" class="pt-5">
                <v-tab-item class="mb-5">
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
                  <div
                    class="
                      d-flex
                      flex-column
                      description
                      text-pre-wrap
                      pb-2
                      mt-5
                    "
                  >
                    <div><strong class="pr-2">Description:</strong></div>
                    <div>{{ competition.description }}</div>
                  </div>
                  <div class="d-flex flex-column rules text-pre-wrap pb-2 mt-2">
                    <div><strong class="pr-2">Rules:</strong></div>
                    <div>{{ competition.rules }}</div>
                  </div>
                </v-tab-item>
                <!-- Submission Photos -->
                <v-tab-item class="photo-grid mb-5">
                  <div
                    v-for="submission in competition.submissions.items"
                    :key="submission.id"
                    @click="openPhoto(submission, $event)"
                    class="d-flex mx-auto align-center clickable"
                  >
                    <amplify-s3-image
                      :img-key="submission.image"
                    ></amplify-s3-image>
                  </div>
                </v-tab-item>
              </v-tabs-items>
            </v-tabs>
          </div>
          <!-- Leaderboard Table -->
          <div class="leaderboard">
            <v-data-table
              ref="leaderboard"
              class="leaderboard-table"
              :headers="headers"
              :items="competitors"
              sort-by="score"
              sort-desc
              no-data-text="No one has signed up yet"
            >
              <template #item.fullName="{ item }"
                >{{ item.firstName }} {{ item.lastName }}</template
              >
              <template v-slot:top
                ><div class="text-h6 pl-4 pt-4">
                  <v-icon left>mdi-trophy</v-icon>Leaderboard
                </div></template
              >
            </v-data-table>
          </div>
        </v-card-text>
        <v-card-actions class="px-0">
          <v-btn
            v-if="!competing(competition)"
            @click="joinCompetition"
            class="px-5"
            color="var(--mh-blue)"
            dark
            >Join Competition<v-icon right>mdi-plus</v-icon></v-btn
          >
          <v-btn v-else @click="leaveCompetition" outlined
            >Withdraw from Competition</v-btn
          >
        </v-card-actions>
      </v-card>
    </div>
    <!-- Submission Dialog -->
    <v-dialog v-model="submissionDialog" width="800">
      <v-card>
        <v-card-title
          ><div>Submit Photo</div>
          <v-spacer></v-spacer>
          <v-btn @click="closeSubmissionForm" fab depressed x-small outlined
            ><v-icon>mdi-close</v-icon></v-btn
          ></v-card-title
        >
        <v-card-text>
          <v-form ref="submissionform">
            <v-file-input
              v-model="photoSubmission.photo"
              @change="uploadImage"
              @click:clear="removeImage"
              label="Photo"
              accept="image/*"
              prepend-icon="mdi-camera"
              required
              :rules="[(v) => !!v || 'A photo is required']"
            ></v-file-input>
            <v-textarea
              v-model="photoSubmission.description"
              label="Description"
              class="mt-2"
              filled
              outlined
              counter="300"
              rows="4"
              auto-grow
              required
              :rules="[
                (v) => !!v || 'Description is required',
                (v) => v.length <= 300 || 'Max 300 characters',
              ]"
            ></v-textarea>
          </v-form>
          <v-img v-if="imageURL" :src="imageURL"></v-img>
        </v-card-text>
        <v-card-actions class="d-flex justify-end">
          <v-btn
            @click="submitPhoto"
            class="px-5"
            :disabled="saving"
            color="var(--mh-blue)"
            depressed
            :dark="!saving"
            :loading="saving"
            >Submit</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Photo Dialog -->
    <v-dialog v-model="photoDialog" class="overflow-auto">
      <v-card max-width="700">
        <div class="d-flex justify-end pr-5 pt-2">
          <v-btn @click="photoDialog = false" fab depressed x-small outlined
            ><v-icon>mdi-close</v-icon></v-btn
          >
        </div>
        <v-card-title
          ><v-img :src="dialogPhoto.src" max-height="500" contain
        /></v-card-title>

        <v-card-text class="text-caption">
          <div>
            <strong>Submitted By: </strong>{{ dialogPhoto.submittedBy }}
          </div>
          <div><strong>Description: </strong>{{ dialogPhoto.description }}</div>
        </v-card-text>
        <v-card-actions class="pb-5">
          <v-btn
            v-if="!selectedSubmission.isApproved"
            @click="approve"
            color="var(--mh-blue)"
            dark
            small
            depressed
            >Approve Submission</v-btn
          >
          <v-btn v-else color="var(--mh-blue)" dark small depressed
            >Deny Submission</v-btn
          >
          <v-btn
            @click="removeSubmission"
            small
            depressed
            outlined
            :loading="saving"
            ><v-icon small left>mdi-delete</v-icon>Delete</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      submissionDialog: false,
      photoDialog: false,
      imageURL: null,
      dialogPhoto: {
        src: "",
        description: "",
        submittedBy: "",
      },
      tab: null,
      photoSubmission: {
        photo: null,
        description: "",
      },
      selectedSubmission: {},
      headers: [
        {
          text: "Name",
          value: "fullName",
        },
        {
          text: "Score",
          value: "score",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["competition", "competitors", "isEditor", "saving", "user"]),
    competitorId() {
      return this.competition.competitors.items.find(
        (competitor) => competitor.userId == this.user.attributes.sub
      ).id;
    },
    additionalCompetitors() {
      return [
        ...this.competition.competitors.items,
        {
          firstName: "John",
          lastName: "Doe",
          score: 150,
        },
        {
          firstName: "Jane",
          lastName: "Doe",
          score: 250,
        },
      ];
    },
  },
  methods: {
    ...mapActions([
      "addCompetitor",
      "addSubmission",
      "approveSubmission",
      "deleteSubmission",
      "fetchCompetition",
      "deleteCompetitor",
    ]),
    joinCompetition() {
      let competitor = {
        userId: this.user.attributes.sub,
        competitionId: this.competition.id,
        firstName: this.user.attributes.given_name,
        lastName: this.user.attributes.family_name,
      };
      this.addCompetitor(competitor);
    },
    leaveCompetition() {
      this.deleteCompetitor(this.competitorId);
    },
    typeIcon(type) {
      return type == "Live Virtual" ? "mdi-laptop" : "mdi-account-group";
    },
    competing({ competitors }) {
      let index = competitors.items
        ? competitors.items.findIndex(
            (competitor) => competitor.userId == this.user.attributes.sub
          )
        : -1;

      return index >= 0 ? true : false;
    },
    uploadImage(e) {
      if (e) {
        const file = e;
        this.imageURL = URL.createObjectURL(file);
      }
    },
    removeImage() {
      this.imageURL = null;
    },
    async submitPhoto() {
      if (!this.$refs.submissionform.validate()) {
        return;
      }
      let submission = {
        competitorId: this.competitorId,
        competitionId: this.competition.id,
        userId: this.user.attributes.sub,
        image: this.photoSubmission.photo,
        description: this.photoSubmission.description,
        submittedBy: `${this.user.attributes.given_name} ${this.user.attributes.family_name}`,
      };
      await this.addSubmission(submission);
      this.closeSubmissionForm();
    },
    openPhoto(submission, e) {
      let photoURL = e.path[0].src;
      this.dialogPhoto.description = submission.description;
      this.dialogPhoto.src = photoURL;
      this.dialogPhoto.submittedBy = submission.submittedBy;
      this.photoDialog = true;
      this.selectedSubmission = submission;
    },
    openSubmissionForm() {
      this.photoSubmission = { photo: null, description: "" };
      this.imageURL = null;
      this.submissionDialog = true;
      if (this.$refs.submissionform) {
        this.$refs.submissionform.resetValidation();
      }
    },
    closeSubmissionForm() {
      this.submissionDialog = false;
    },
    async approve() {
      await this.approveSubmission(this.selectedSubmission);
      this.selectedSubmission.isApproved = true;
    },
    removeSubmission() {
      this.deleteSubmission(this.selectedSubmission.id);
      this.photoDialog = false;
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
  grid-template-columns: 1.95fr 1.05fr;
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
.v-tabs-items {
  background-color: transparent;
}
.v-tab {
  text-transform: capitalize;
}
.photo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
  grid-auto-rows: 175px;
  grid-gap: 1rem;
}
.photo-grid div {
  background-color: lightgrey;
  /* border: 1px solid gray; */
  border-radius: 5px;
  overflow: hidden;
}
amplify-s3-image {
  --width: 125%;
  position: relative;
  transform: translateX(-10%);
}
</style>
