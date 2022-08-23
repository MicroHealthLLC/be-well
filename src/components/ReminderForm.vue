<template>
  <v-card :disabled="saving" :loading="saving">
    <v-card-title
      ><span v-if="reminder.id && !associatedGoal">Edit Activity Reminder</span
      ><span v-if="associatedGoal">Add Goal to Activity</span
      ><span v-else>Add New Activity Reminder</span>
    </v-card-title>
    <v-card-text>
       <v-form ref="form" v-model="valid" v-if="associatedGoal">
        <v-select
          v-model="reminder.goalId"
          :items="incompleteGoals"
          item-text="title"
          item-value="id"
          label="Select Goal"
        ></v-select>
       </v-form>
      <v-form ref="form" v-model="valid" v-else>
        <v-select
          v-model="reminder.goalId"
          :items="incompleteGoals"
          item-text="title"
          item-value="id"
          label="Select Goal"
        ></v-select>
        <v-select
          v-model="reminder.category"
          :items="filteredCategories"
          item-text="title"
          item-value="value"
          label="Category"
          :rules="[(v) => !!v || 'Category is required']"
          required
        ></v-select>
        <!-- <v-select
          v-model="reminder.level"
          :items="filteredLevels"
          item-text="title"
          item-value="value"
          label="Level"
          :rules="[(v) => !!v || 'Level is required']"
          required
        ></v-select> -->
        <v-select
          v-model="reminder.frequency"
          :items="['Daily', 'Mon/Wed/Fri', 'Tues/Thurs']"
          label="Frequency"
          :rules="[(v) => !!v || 'Frequency is required']"
          required
        ></v-select>
        <!-- <v-select
          v-model="reminder.contentType"
          label="Content Type"
          :items="['Articles', 'Videos']"
          :rules="[(v) => !!v || 'Content Type is required']"
          required
        ></v-select> -->
        <v-menu
          ref="menu"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="reminder.time"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="reminder.time"
              label="Scheduled Time"
              prepend-icon="mdi-clock-time-four-outline"
              readonly
              v-bind="attrs"
              v-on="on"
              :rules="[(v) => !!v || 'Time is required']"
              required
            ></v-text-field>
          </template>
          <v-time-picker
            v-model="reminder.time"
            format="24hr"
            @click:minute="$refs.menu.save(reminder.time)"
            header-color="var(--mh-blue)"
          ></v-time-picker>
        </v-menu>
      </v-form>
    </v-card-text>
    <v-card-actions class="d-flex justify-end">
      <v-btn @click="saveReminder" class="px-6" color="var(--mh-blue)" dark
        >Submit</v-btn
      >
      <v-btn @click="toggleReminderFormDialog" color="secondary" outlined
        >Cancel</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import utilitiesMixin from "../mixins/utilities-mixin";

export default {
  name: "ReminderForm",
  mixins: [utilitiesMixin],
  props: {
    reminder: {
      type: Object,
    },
    // goal: {
    //   type: Object
    // },
  },
  data() {
    return {
      dialog: false,
      intervalId: null,
      valid: true,
    };
  },
  methods: {
    ...mapActions([
      "addReminder",
      "removeReminder",
      "fetchReminders",
      "SET_ASSOCIATED_GOAL",
      "updateReminderById",
    ]),
        ...mapMutations([
      "SET_ASSOCIATED_GOAL",
    ]),
    resetForm() {
      this.reminder = {
        goalId: null,
        category: "",
        level: this.userPrefLevel,
        frequency: "",
        contentType: "Videos",
        time: null,
      };
    },
    toggleReminderFormDialog() {
      this.$emit("toggleReminderFormDialog", false);
      this.SET_ASSOCIATED_GOAL(!this.associatedGoal)
    },
    async saveReminder() {
      if (!this.$refs.form.validate()) {
        return;
      }

      try {
        if (this.reminder.id) {
          await this.updateReminderById({
            id: this.reminder.id,
            category: this.reminder.category,
            level: this.reminder.level,
            frequency: this.reminder.frequency,
            contentType: this.reminder.contentType,
            time: this.reminder.time,
            goalId: this.reminder.goalId,
          });
        } else {
          console.log("this.userPrefLevel", this.userPrefLevel);
          console.log("this.preferences", this.preferences);
          this.reminder.level = this.userPrefLevel;
          // if (this.goalId){
          //    this.reminder.goalId = this.goalId;
          // } else {
          //    this.reminder.goalId = "";
          // }

          this.reminder.contentType = 'Videos';
          // Call Vuex action to add reminder
          await this.addReminder(this.reminder);
        }
        // Close form and reset form values
        this.toggleReminderFormDialog();
        this.SET_ASSOCIATED_GOAL(!this.associatedGoal)
        this.resetForm();
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    ...mapGetters(["incompleteGoals", "saving", "associatedGoal"]),
    userPrefLevel() {
      // return this.reminders
      if (this.preferences && this.preferences[0] && this.reminder.category) {
        let strength = this.preferences[0].preference_items.map(
          (t) => t && t.category == "Strength"
        );
        let flex = this.preferences[0].preference_items.map(
          (t) => t && t.category == "Flexibility & Mobility"
        );
        let balance = this.preferences[0].preference_items.map(
          (t) => t && t.category == "Balance"
        );
        let nutri = this.preferences[0].preference_items.map(
          (t) => t && t.category == "Nutrition"
        );
        let rec = this.preferences[0].preference_items.map(
          (t) => t && t.category == "Recovery"
        );
        let erg = this.preferences[0].preference_items.map(
          (t) => t && t.category == "Ergonomics"
        );
        let endur = this.preferences[0].preference_items.map(
          (t) => t && t.category == "Endurance"
        );
        if (this.reminder.category == "STRENGTH" && strength) {
          return this.strengthLevel;
        }
        if (this.reminder.category == "BALANCE" && balance) {
          return this.balanceLevel;
        }
        if (this.reminder.category == "ENDURANCE" && endur) {
          return this.enduranceLevel;
        }
        if (this.reminder.category == "NUTRITION" && nutri) {
          return this.nutritionLevel;
        }
        if (this.reminder.category == "RECOVERY" && rec) {
          return this.recLevel;
        }
        if (this.reminder.category == "ERGONOMICS" && erg) {
          return this.ergLevel;
        }
        if (this.reminder.category == "FLEXIBILITY_MOBILITY" && flex) {
          return this.flexLevel;
        } else return "";
      } else {
        return "";
      }
    },
  },
};
</script>

<style></style>