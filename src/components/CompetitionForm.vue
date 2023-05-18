<template>
  <v-card :disabled="saving" :loading="saving" class="pa-sm-10">
    <v-card-text>
      <div
        class="d-flex justify-content-start"
        style="position: absolute; right: 5%; top: 2%"
      >
        <v-switch
          v-model="competition.isPrivate"
          class="isPrivate pr-7"
          label="Private"
        ></v-switch>
        <!-- <v-switch
            v-model="competition.isAnonymous"
            class="isAnonymous"
            label="Anonymous"
          ></v-switch> -->
        <v-switch
          v-model="competition.groupParticipation"
          class="groupParticipation"
          label="Group Participation"
        ></v-switch>
        <!-- Add Group Names -->
        <v-btn
          class="group-btn"
          small
          :disabled="!competition.groupParticipation"
          @click="groupDialog = true"
        >
          <v-dialog v-model="groupDialog" activator="parent">
            <v-card>
              <v-card-title class="d-flex pt-5">Add Groups</v-card-title>
              <!-- Beginning of Add Groups (Bootstrap)-->
              <div class="d-flex pt-5 pb-10 pl-10 pr-10">
                <b-form-tags v-model="competition.groupNames" no-outer-focus class="mb-2">
                  <template
                    v-slot="{
                      tags,
                      inputAttrs,
                      inputHandlers,
                      addTag,
                      removeTag,
                    }"
                  >
                    <b-input-group class="mb-2">
                      <b-form-input
                        v-bind="inputAttrs"
                        v-on="inputHandlers"
                        placeholder="New Group name - Press enter to add"
                        class="form-control"
                      ></b-form-input>
                      <b-input-group-append>
                        <b-button @click="addTag()" variant="primary"
                          >Add</b-button
                        >
                      </b-input-group-append>
                    </b-input-group>
                    <div class="d-inline-block" style="font-size: 1.25rem">
                      <b-form-tag
                        v-for="tag in tags"
                        @remove="removeTag(tag)"
                        :key="tag"
                        :title="tag"
                        variant="light"
                        class="mr-1"
                        >{{ tag }}</b-form-tag
                      >
                    </div>
                    <v-card-actions class="justify-end">
                <!-- Discard any changes made -->
                <v-btn
                  @click="cancelGroupChanges()"
                  color="secondary"
                  small
                  outlined
                  >Cancel</v-btn
                >
                <!-- Save changes -->
                <v-btn
                  @click="saveGroups(tags)"
                  class="px-5"
                  color="var(--mh-blue)"
                  small
                  dark
                  >Save</v-btn
                >
              </v-card-actions>
                  </template>
                </b-form-tags>
              </div>
              <!-- End of Add Groups (Bootstrap) -->
            </v-card>
          </v-dialog>
          Add Groups
        </v-btn>
        <!-- End of Add Group Names -->
      </div>
      <v-form ref="competitionform" v-model="formValid">
        <div class="form-fields mt-10">
          <div class="row" style="grid-column: 1 / span 2">
            <div class="col-9">
              <v-text-field
                v-model="competition.title"
                class="title"
                label="Title"
                :rules="[(v) => !!v || 'Title is required']"
                required
              ></v-text-field>
            </div>

            <div class="col-3">
              <v-select
                :items="campaignTypes"
                label="Campaign Type"
                class="campaignType"
                v-model="competition.campaignType"
                :rules="[(v) => !!v || 'Campaign Type is required']"
                required
              ></v-select>
            </div>
          </div>

          <v-text-field
            v-model="competition.hostName"
            label="Host Name"
            :rules="[(v) => !!v || 'Host Name is required']"
            required
          ></v-text-field>
          <v-text-field
            v-model="competition.hostEmail"
            label="Host Email"
            :rules="[
              (v) => !!v || 'Email is required',
              (v) =>
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                'Not a valid email address',
            ]"
            required
            validate-on-blur
          ></v-text-field>
          <div class="dates">
            <!-- Deadline date picker -->
            <v-menu
              v-model="deadlineMenu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="competition.deadline"
                  label="Sign-Up Deadline"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  :rules="[(v) => !!v || 'Sign-Up Deadline is required']"
                  required
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="competition.deadline"
                @input="menu = false"
              ></v-date-picker>
            </v-menu>
            <!-- Start Date Picker -->
            <v-menu
              v-model="startDateMenu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="competition.startDate"
                  label="Start Date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  :rules="[(v) => !!v || 'Start Date is required']"
                  required
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="competition.startDate"
                @input="menu = false"
              ></v-date-picker>
            </v-menu>
            <!-- End Date Picker -->
            <v-menu
              v-model="endDateMenu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="competition.endDate"
                  label="End Date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  :rules="[(v) => !!v || 'End Date is required']"
                  required
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="competition.endDate"
                @input="menu = false"
              ></v-date-picker>
            </v-menu>
          </div>

          <!-- Start Time Picker -->
          <div class="time">
            <v-icon>mdi-clock-time-four-outline</v-icon>
            <vue-timepicker
              v-model="competition.startTime"
              :minute-interval="15"
              input-width="10em"
              label="Start"
              placeholder="Start Time"
              format="hh:mm A"
              class="v-text-field"
              :class="[
                isValidTime(competition.startTime) == false && saved == true
                  ? 'st'
                  : '',
              ]"
              :rules="[(v) => !!v || 'Start Time is required']"
              required
            >
            </vue-timepicker>

            <!-- End Time Picker -->
            <vue-timepicker
              v-model="competition.endTime"
              lazy
              :minute-interval="15"
              input-width="10em"
              class="v-text-field"
              placeholder="End Time"
              format="hh:mm A"
              :class="[
                isValidTime(competition.endTime) == false && saved == true
                  ? 'st'
                  : '',
              ]"
              :rules="[(v) => !!v || 'End Time is required']"
              required
            >
            </vue-timepicker>

            <!-- Time Zone Picker -->
            <v-select
              :items="timeZones"
              label="TZ"
              class="end-timezone"
              v-model="competition.timeZone"
              :rules="[(v) => !!v || 'TZ is required']"
              required
            ></v-select>
          </div>

          <!-- Photo Input -->
          <!-- accept any image file types (i.e. png, jpg) -->
          <v-file-input
            v-if="newImage"
            v-model="competition.image"
            @change="uploadImage"
            @click:clear="removeImage"
            label="Header Photo"
            accept="image/*"
            prepend-icon="mdi-camera"
          ></v-file-input>
          <v-text-field
            v-else
            @click:clear="removeImage"
            v-model="competition.image"
            label="Header Photo"
            prepend-icon="mdi-camera"
            clearable
          ></v-text-field>
          <!-- Header Image -->
          <v-img
            v-if="imageURL"
            :src="imageURL"
            class="header-image mb-5"
          ></v-img>
          <v-select
            v-model="competition.category"
            label="Category"
            :items="categories"
            prepend-icon="mdi-shape"
            :rules="[(v) => !!v || 'Category is required']"
            required
          ></v-select>
          <v-textarea
            v-model="competition.description"
            class="description"
            label="Description"
            filled
            outlined
            auto-grow
            :rules="[(v) => !!v || 'Description is required']"
            required
          ></v-textarea>
          <v-textarea
            v-model="competition.rules"
            class="rules"
            label="Rules"
            filled
            outlined
            auto-grow
            :rules="[(v) => !!v || 'Rules is required']"
            required
          ></v-textarea>
          <div class="scoring">
            <v-checkbox
              v-model="competition.manualScoring"
              hide-details
              label="Enable manual scoring"
              class="shrink mr-2 mt-0"
            ></v-checkbox>
            <v-subheader
              class="scoring-message"
              v-if="!competition.manualScoring"
            >
              *Automatic scoring is 2 points per photo submission and 5 points
              per video submission
            </v-subheader>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-if="competition.manualScoring"
                  label="Input unit of measurement"
                  hint="e.g., Steps, Minutes, Meals"
                  v-model="competition.unit"
                  :rules="[(v) => !!v || 'Unit of Measurement is required']"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field
                  v-if="competition.manualScoring"
                  label="1 unit of measurement is worth:"
                  value="0.00"
                  type="number"
                  suffix="points"
                  hint="e.g., If 1 Step is worth 0.001 points, then 1,000 Steps = 1 point"
                  v-model="competition.scoringVal"
                  :rules="[
                    (v) => !!v || 'Scoring Value is required',
                    (v) => parseFloat(v) > 0.0 || 'Invalid Scoring Value',
                  ]"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </div>
        </div>
      </v-form>
    </v-card-text>
    <v-card-actions class="justify-end">
      <v-btn
        v-if="isEditing"
        @click="deleteDialog = true"
        color="secondary"
        outlined
        >Delete</v-btn
      >
      <v-btn
        v-if="!isEditing"
        @click="addNewCompetition"
        class="px-5"
        color="#2f53b6"
        dark
        >Add Campaign</v-btn
      >
      <v-btn v-else @click="update" class="px-5" color="#2f53b6" dark
        >Update Campaign</v-btn
      >
    </v-card-actions>
    <!-- Delete Dialog -->
    <v-dialog v-model="deleteDialog">
      <v-card>
        <v-card-title>Delete Campaign?</v-card-title>
        <v-card-text
          >Are you sure you want to delete
          <strong>{{ competition.title }}</strong
          >?</v-card-text
        >
        <v-card-actions class="justify-end">
          <v-btn @click="deleteDialog = false" color="secondary" small outlined
            >Cancel</v-btn
          >
          <v-btn
            @click="removeCompetition"
            class="px-5"
            color="var(--mh-blue)"
            small
            dark
            >Delete</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import VueTimepicker from "vue2-timepicker/src/vue-timepicker.vue";

export default {
  name: "CompetitionForm",
  components: {
    VueTimepicker,
  },
  data() {
    return {
      formValid: true,
      startDateMenu: false,
      endDateMenu: false,
      deadlineMenu: false,
      timeZones: ["CST", "EST", "MST", "PST"],
      campaignTypes: [
        "Awareness",
        "Challenge",
        "Competition",
        "Event",
        "Other",
      ],
      imageURL: null,
      deleteDialog: false,
      categories: [
        "Balance",
        "Cooking",
        "Fitness",
        "Mental Health",
        "Nutrition",
        "Stretch",
        "Weight Loss",
        "Miscellaneous",
      ],
      saved: false,
      groupDialog: false,
      recentGroups: [],
    };
  },
  computed: {
    ...mapGetters(["competition", "saving"]),
    isEditing() {
      return this.competition.id;
    },
    newImage() {
      let imageType = typeof this.competition.image;

      return (
        !this.competition.image || !this.competition.id || imageType != "string"
      );
    },
    selectedTimeZone() {
      return this.timeZones[this.timeZone];
    },
  },
  methods: {
    ...mapActions(["addCompetition", "deleteCompetition", "updateCompetition"]),
    async addNewCompetition() {
      this.saved = true;
      //all 3 conditions must be true to call addCompetition, otherwise return
      if (
        this.$refs.competitionform.validate() &&
        this.isValidTime(this.competition.startTime) &&
        this.isValidTime(this.competition.endTime)
      ) {
        this.addCompetition(this.competition);
        console.log(this.competition);
      }
      return;
    },
    async update() {
      this.saved = true;
      //all 3 conditions must be true to call updateCompetition, otherwise return
      if (
        this.$refs.competitionform.validate() &&
        this.isValidTime(this.competition.startTime) &&
        this.isValidTime(this.competition.endTime)
      ) {
        this.updateCompetition(this.competition);
        console.log(this.competition);
      }
      return;
    },
    async removeCompetition() {
      await this.deleteCompetition(this.competition.id);
      this.deleteDialog = false;
      this.$router.push("/events/competitions");
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
    updateTimeZone() {
      this.competition.timeZone = this.selectedTimeZone;
    },
    saveGroups(tags) {
      this.groupDialog = false;
      this.competition.groupNames = [];
      this.competition.groupNames = tags;
      this.recentGroups = this.competition.groupNames;
      console.log("recentGroups: " + this.recentGroups )
      console.log("Group Names: " + this.competition.groupNames)
    },
    cancelGroupChanges() {
      this.competition.groupNames = this.recentGroups;
      this.groupDialog = false;
    },
    isValidTime(str) {
      // Regex to check valid
      // time in 12-hour format
      let regex = new RegExp(/((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))/);

      //  if str
      // is empty return false
      if (str == null) {
        return false;
      }

      // Return true if the str
      // matched the ReGex
      if (regex.test(str) == true) {
        return true;
      } else {
        return false;
      }
    },
  },
  watch: {
    competition() {
      if (this.competition.image) {
        this.imageURL = this.competition.imageURL;
      }
      this.timeZone = this.timeZones.findIndex(
        (zone) => zone == this.competition.timeZone
      );
      if (this.competition.startTime) {
        this.competition.startTime = this.competition.startTime.toString();
      }
      if (this.competition.endTime) {
        this.competition.endTime = this.competition.endTime.toString();
      }
    },
  },
  mounted() {
    this.$refs.competitionform.resetValidation();
  },
};
</script>

<style scoped>
.form-fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 1rem;
}

.header-image,
.description,
.rules,
.scoring {
  grid-column: 1 / span 2;
}
@media (max-width: 600px) {
  .form-fields {
    display: flex;
    flex-direction: column;
  }
}

.time {
  font-size: 16px;
  display: flex;
  column-gap: 8px;
}

.dates {
  display: flex;
}

.vue__time-picker.st ::v-deep input.display-time {
  border: 1px solid red;
}

.scoring-message {
  left: 0px;
  position: relative;
  font-size: 12.5px;
  padding: inherit;
  color: indianred;
}

.group-btn {
  display: flex;
  margin-left: 15px;
  margin-top: 17px;
}
</style>
