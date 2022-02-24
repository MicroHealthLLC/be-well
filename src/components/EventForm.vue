<template>
  <v-card class="pa-sm-10">
    <v-card-text>
      <v-form>
        <div class="grid">
          <v-text-field
            v-model="event.title"
            class="title"
            label="Title"
          ></v-text-field>
          <v-text-field
            v-model="event.hostName"
            label="Host Name"
          ></v-text-field>
          <v-text-field
            v-model="event.hostEmail"
            label="Host Email"
          ></v-text-field>
          <v-select
            v-model="event.type"
            label="Category"
            :items="['Live Virtual', 'Live In-Person']"
          ></v-select>
          <!-- Date Picker -->
          <v-menu
            v-model="dateMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="event.date"
                label="Date"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                :rules="[(v) => !!v || 'Date is required']"
                required
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="event.date"
              @input="menu = false"
            ></v-date-picker>
          </v-menu>
          <!-- Start Time Picker -->
          <v-menu
            ref="starttimemenu"
            v-model="startTimeMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="event.startTime"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="event.startTime"
                label="Start Time"
                prepend-icon="mdi-clock-time-four-outline"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="startTimeMenu"
              v-model="event.startTime"
              format="24hr"
              full-width
              @click:minute="$refs.starttimemenu.save(event.startTime)"
            ></v-time-picker>
          </v-menu>
          <!-- End Time Picker -->
          <v-menu
            ref="endtimemenu"
            v-model="endTimeMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="event.endTime"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="event.endTime"
                label="End Time"
                prepend-icon="mdi-clock-time-four-outline"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="endTimeMenu"
              v-model="event.endTime"
              format="24hr"
              full-width
              @click:minute="$refs.endtimemenu.save(event.endTime)"
            ></v-time-picker>
          </v-menu>
          <!-- Photo Input -->
          <v-file-input
            v-if="newImage"
            v-model="event.image"
            @change="uploadImage"
            @click:clear="removeImage"
            label="Header Photo"
            accept="image/*"
            prepend-icon="mdi-camera"
          ></v-file-input>
          <v-text-field
            v-else
            @click:clear="removeImage"
            v-model="event.image"
            label="Header Photo"
            prepend-icon="mdi-camera"
            clearable
          ></v-text-field>
          <v-text-field v-model="event.link" label="Event Link"></v-text-field>
          <!-- Header Image -->
          <v-img
            v-if="imageURL"
            :src="imageURL"
            class="header-image mb-5"
          ></v-img>
          <v-textarea
            v-model="event.description"
            class="description"
            label="Description"
            filled
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
        @click="addNewEvent"
        class="px-5"
        color="#2f53b6"
        dark
        >Add Event</v-btn
      >
      <v-btn v-else @click="update" class="px-5" color="#2f53b6" dark
        >Update Event</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "EventForm",
  data() {
    return {
      dateMenu: false,
      startTimeMenu: false,
      endTimeMenu: false,
      imageURL: null,
    };
  },
  methods: {
    ...mapActions(["addEvent", "updateEvent"]),
    async addNewEvent() {
      this.addEvent(this.event);
    },
    async update() {
      this.updateEvent(this.event);
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
  },
  computed: {
    ...mapGetters(["event"]),
    isEditing() {
      return this.event.id;
    },
    newImage() {
      let imageType = typeof this.event.image;

      return !this.event.image || !this.event.id || imageType != "string";
    },
  },
  watch: {
    event() {
      if (this.event.image) {
        this.imageURL = this.event.imageURL;
      }
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
.description {
  grid-column: 1 / span 2;
}
</style>
