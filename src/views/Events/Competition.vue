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
              ><v-icon small left>mdi-office-building</v-icon>Company Clash</v-chip
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
                <v-tab-item class="mb-5">
                  <div class="d-flex justify-end mb-3">
                    <v-btn
                      v-if="tab == 1 && isCompeting(competition)"
                      @click="openSubmissionForm"
                      small
                      outlined
                      >Add<v-icon small right>mdi-plus</v-icon></v-btn
                    >
                  </div>
                  <div
                    v-if="competition.submissions.items.length <= 0"
                    class="d-flex justify-center align-center pa-10"
                  >
                    No One has submitted anything yet...
                  </div>

                  <div v-else class="photo-grid">
                    <div
                      v-for="submission in competition.submissions.items"
                      :key="submission.id"
                      class="d-flex mx-auto align-center justify-center"
                    >
                      <video
                        v-if="submission.type == 'VIDEO'"
                        @click="openVideo(submission, $event)"
                        :src="submission.url"
                        height="100%"
                        class="clickable"
                      ></video>
                      <amplify-s3-image
                        @click="openPhoto(submission, $event)"
                        v-else
                        :img-key="submission.s3Key"
                        class="clickable"
                      ></amplify-s3-image>
                      <div
                        v-if="submission.isApproved"
                        class="label"
                        title="Approved Submission"
                      >
                        <v-icon color="success"
                          >mdi-check-circle-outline</v-icon
                        >
                      </div>
                    </div>
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
              <template #[`item.fullName`]="{ item }"
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
            v-if="!isCompeting(competition)"
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
    <v-dialog v-model="submissionDialog" width="700">
      <v-card :disabled="saving" :loading="saving">
        <v-card-title
          ><div>Add Submission</div>
          <v-spacer></v-spacer>
          <v-btn @click="closeSubmissionForm" fab depressed x-small outlined
            ><v-icon>mdi-close</v-icon></v-btn
          ></v-card-title
        >
        <v-card-text>
          <v-form ref="submissionform" :disabled="saving">
            <v-file-input
              v-model="newSubmission.media"
              @change="uploadMedia"
              @click:clear="removeMedia"
              label="Photo or Video"
              accept="image/*,video/*"
              prepend-icon="mdi-camera"
              truncate-length="50"
              required
              :rules="mediaRules"
            ></v-file-input>
            <v-textarea
              v-model="newSubmission.description"
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
          <div v-if="mediaURL" class="submission-container">
            <v-img
              v-if="newSubmission.media.type.includes('image')"
              class="submission"
              :src="mediaURL"
              contain
            ></v-img>
            <video
              v-else
              class="submission"
              @loadeddata="setVideoDuration"
              id="submission-video-player"
              :src="mediaURL"
              controls
              width="100%"
            ></video>
          </div>
        </v-card-text>
        <v-card-actions class="d-flex justify-end">
          <v-btn
            @click="submitMedia"
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
        <v-card-title class="px-0"
          ><v-img :src="dialogPhoto.src" max-height="500" contain
        /></v-card-title>

        <v-card-text class="text-caption">
          <div>
            <strong>Submitted By: </strong>{{ dialogPhoto.submittedBy }}
          </div>
          <div><strong>Description: </strong>{{ dialogPhoto.description }}</div>
        </v-card-text>
        <v-card-actions class="pb-5">
          <div v-if="isEditor">
            <v-btn
              v-if="!selectedSubmission.isApproved"
              @click="approve"
              color="var(--mh-blue)"
              dark
              small
              depressed
              >Approve Submission</v-btn
            >
            <v-btn
              v-else
              @click="deny"
              color="var(--mh-blue)"
              dark
              small
              depressed
              >Deny Submission</v-btn
            >
          </div>
          <v-btn
            v-if="canRemoveSubmission"
            @click="removeSubmission"
            class="ml-2"
            small
            depressed
            outlined
            :loading="saving"
            ><v-icon small left>mdi-delete</v-icon>Delete</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Video Dialog -->
    <v-dialog v-model="videoDialog" class="overflow-auto">
      <v-card width="700">
        <div class="d-flex justify-end pr-5 pt-2">
          <v-btn @click="videoDialog = false" fab depressed x-small outlined
            ><v-icon>mdi-close</v-icon></v-btn
          >
        </div>
        <div class="dialog-video-container my-3">
          <video
            class="dialog-video"
            :src="dialogVideo.src"
            frameborder="5px"
            controls
          ></video>
        </div>

        <v-card-text class="text-caption">
          <div>
            <strong>Submitted By: </strong>{{ dialogVideo.submittedBy }}
          </div>
          <div><strong>Description: </strong>{{ dialogVideo.description }}</div>
        </v-card-text>
        <v-card-actions class="pb-5">
          <div v-if="isEditor">
            <v-btn
              v-if="!selectedSubmission.isApproved"
              @click="approve"
              color="var(--mh-blue)"
              dark
              small
              depressed
              >Approve Submission</v-btn
            >
            <v-btn
              v-else
              @click="deny"
              color="var(--mh-blue)"
              dark
              small
              depressed
              >Deny Submission</v-btn
            >
          </div>
          <v-btn
            v-if="canRemoveSubmission"
            @click="removeSubmission"
            class="ml-2"
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
      videoDialog: false,
      videoDuration: null,
      mediaURL: null,
      dialogPhoto: {
        src: "",
        description: "",
        submittedBy: "",
      },
      dialogVideo: {
        src: "",
        description: "",
        submittedBy: "",
      },
      tab: null,
      newSubmission: {
        media: null,
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
      mediaRules: [
        (v) => !!v || "A photo or video is required",
        () =>
          this.newSubmission.media?.type.includes("image") ||
          this.videoDuration < 60 ||
          "Video duration must be less than 60 seconds",
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
    canRemoveSubmission() {
      return (
        this.selectedSubmission.userId == this.user.attributes.sub ||
        this.isEditor
      );
    },
  },
  methods: {
    ...mapActions([
      "addCompetitor",
      "addSubmission",
      "approveSubmission",
      "deleteSubmission",
      "denySubmission",
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
    isCompeting({ competitors }) {
      let index = competitors.items
        ? competitors.items.findIndex(
            (competitor) => competitor.userId == this.user.attributes.sub
          )
        : -1;

      return index >= 0 ? true : false;
    },
    uploadMedia(e) {
      if (e) {
        const file = e;
        this.mediaURL = URL.createObjectURL(file);
      }
    },
    removeMedia() {
      this.mediaURL = null;
    },
    async submitMedia() {
      if (!this.$refs.submissionform.validate()) {
        return;
      }

      let mediaType = this.newSubmission.media.type.includes("image")
        ? "PHOTO"
        : "VIDEO";

      let submission = {
        competitorId: this.competitorId,
        competitionId: this.competition.id,
        userId: this.user.attributes.sub,
        media: this.newSubmission.media,
        description: this.newSubmission.description,
        submittedBy: `${this.user.attributes.given_name} ${this.user.attributes.family_name}`,
        type: mediaType,
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
    openVideo(submission, e) {
      let video = e.target;
      video.onplay = () => video.pause();
      this.dialogVideo.description = submission.description;
      this.dialogVideo.src = video.currentSrc;
      this.dialogVideo.submittedBy = submission.submittedBy;
      this.videoDialog = true;
      this.selectedSubmission = submission;
    },
    openSubmissionForm() {
      this.newSubmission = { photo: null, description: "" };
      this.mediaURL = null;
      this.submissionDialog = true;
      if (this.$refs.submissionform) {
        this.$refs.submissionform.resetValidation();
      }
    },
    closeSubmissionForm() {
      this.submissionDialog = false;
      this.videoDuration = null;
    },
    async approve() {
      await this.approveSubmission(this.selectedSubmission);
      this.selectedSubmission.isApproved = true;
    },
    async deny() {
      await this.denySubmission(this.selectedSubmission);
      this.selectedSubmission.isApproved = false;
    },
    removeSubmission() {
      this.deleteSubmission(this.selectedSubmission.id);
      this.photoDialog = false;
      this.videoDialog = false;
    },
    setVideoDuration() {
      let videoPlayer = document.getElementById("submission-video-player");
      this.videoDuration = videoPlayer.duration;
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
/* .description,
.rsvp {
   grid-column: 1 / span 2; 
} */
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
.photo-grid > div {
  background-color: black;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  width: 100%;
}
.label {
  border: 1px solid #4caf50;
  background-color: white;
  position: absolute;
  border-radius: 5px;
  top: 5px;
  right: 5px;
}
amplify-s3-image {
  --width: 125%;
  position: relative;
  transform: translateX(-10%);
}
@media (max-width: 600px) {
  .grid {
    display: flex;
    flex-direction: column;
  }
  .photo-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-auto-rows: 250px;
  }
}
.dialog-video-container {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  background-color: black;
}
.dialog-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.submission-container {
  max-height: 500px;
  background-color: black;
}
.submission {
  max-height: inherit;
}
</style>
