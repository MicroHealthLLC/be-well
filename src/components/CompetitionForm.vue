<template>
  <v-card class="pa-sm-10">
    <v-card-text>
      <v-form ref="competitionform" v-model="formValid">
        <div class="grid">
          <v-text-field
            v-model="competition.title"
            class="title"
            label="Title"
            :rules="[(v) => !!v || 'Title is required']"
            required
          ></v-text-field>
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
          <!-- Start Time Picker -->
          <v-menu
            ref="starttimemenu"
            v-model="startTimeMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="competition.startTime"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="competition.startTime"
                label="Start Time"
                prepend-icon="mdi-clock-time-four-outline"
                :suffix="selectedTimeZone"
                readonly
                v-bind="attrs"
                v-on="on"
                :rules="[(v) => !!v || 'Start Time is required']"
                required
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="startTimeMenu"
              v-model="competition.startTime"
              format="24hr"
              full-width
              @click:minute="$refs.starttimemenu.save(competition.startTime)"
            >
              <template v-slot:default>
                <div class="mx-auto">
                  <v-btn-toggle
                    v-model="timeZone"
                    @change="updateTimeZone"
                    mandatory
                  >
                    <v-btn small>PST</v-btn>
                    <v-btn small>MST</v-btn>
                    <v-btn small>CST</v-btn>
                    <v-btn small>EST</v-btn>
                  </v-btn-toggle>
                </div>
              </template>
            </v-time-picker>
          </v-menu>
          <!-- End Time Picker -->
          <v-menu
            ref="endtimemenu"
            v-model="endTimeMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="competition.endTime"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="competition.endTime"
                label="End Time"
                prepend-icon="mdi-clock-time-four-outline"
                :suffix="selectedTimeZone"
                readonly
                v-bind="attrs"
                v-on="on"
                :rules="[(v) => !!v || 'End Time is required']"
                required
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="endTimeMenu"
              v-model="competition.endTime"
              format="24hr"
              full-width
              @click:minute="$refs.endtimemenu.save(competition.endTime)"
              ><template v-slot:default>
                <div class="mx-auto">
                  <v-btn-toggle
                    v-model="timeZone"
                    @change="updateTimeZone"
                    mandatory
                  >
                    <v-btn small>PST</v-btn>
                    <v-btn small>MST</v-btn>
                    <v-btn small>CST</v-btn>
                    <v-btn small>EST</v-btn>
                  </v-btn-toggle>
                </div>
              </template></v-time-picker
            >
          </v-menu>
          <!-- Photo Input -->
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
        >Add Competition</v-btn
      >
      <v-btn v-else @click="update" class="px-5" color="#2f53b6" dark
        >Update Competition</v-btn
      >
    </v-card-actions>
    <!-- Delete Dialog -->
    <v-dialog v-model="deleteDialog">
      <v-card>
        <v-card-title>Delete Competition?</v-card-title>
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

export default {
  name: "CompetitionForm",
  data() {
    return {
      formValid: true,
      startDateMenu: false,
      endDateMenu: false,
      startTimeMenu: false,
      endTimeMenu: false,
      timeZone: 3,
      timeZones: ["PST", "MST", "CST", "EST"],
      imageURL: null,
      deleteDialog: false,
    };
  },
  computed: {
    ...mapGetters(["competition"]),
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
      if (!this.$refs.competitionform.validate()) {
        return;
      }
      this.addCompetition(this.competition);
    },
    async update() {
      if (!this.$refs.competitionform.validate()) {
        return;
      }
      this.updateCompetition(this.competition);
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
  },
};
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 1rem;
}
.title,
.description,
.rules {
  grid-column: 1 / span 2;
}
</style>
