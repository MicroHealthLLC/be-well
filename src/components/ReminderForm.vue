<template>
  <v-card :disabled="saving" :loading="saving" :load="log(reminder)">
    <v-card-title
      ><span v-if="reminder.id && !associatedGoal">
      <v-icon color="var(--mh-green)" class="mr-1 mb-1"
      >mdi-yoga</v-icon>Edit Activity</span
      ><span v-if="associatedGoal && reminder.id">Add Goal to Activity</span
      ><span v-if="!reminder.id"><v-icon color="var(--mh-green)" class="mr-1 mb-1"
      >mdi-yoga</v-icon>Add Activity</span>
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
      <!-- reminder.activity will included activity names -->
        <!-- <v-select
          v-model="reminder.activity"
          :items="filteredCategories"
          item-text="title"
          item-value="title"
          label="Select Activity"
          :rules="[(v) => !!v || 'Activity is required']"
          required
        ></v-select> -->
         <v-select
          v-model="reminder.category"
          :items="filteredCategories"
          item-text="title"
          item-value="value"
          label="Select Activity"
          :rules="[(v) => !!v || 'Activity is required']"
          required
        ></v-select> 
        <v-select
          v-model="reminder.frequency"
          :items="['Daily', 'Mon/Wed/Fri', 'Tues/Thurs']"
          label="Frequency"
          :rules="[(v) => !!v || 'Frequency is required']"
          required
        ></v-select>
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
              label="Schedule A Reminder"
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
            format="ampm"
            ampm-in-title
            @click:minute="$refs.menu.save(reminder.time)"
            header-color="var(--mh-blue)"
          ></v-time-picker>
          </v-menu>
          <v-select
            v-model="reminder.goalId"
            :items="incompleteGoals"
            item-text="title"
            item-value="id"
            label="Associate with Goal?"
          ></v-select>  
      </v-form>
    </v-card-text>
    <v-card-actions class="d-flex justify-end">
      <v-btn @click="saveReminder" class="px-6" color="var(--mh-blue)" dark
        >Save</v-btn
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
  mounted() {
    if (!this.reminder.id) {
       this.$refs.form.reset();
    }
    console.log(this.reminder)
  },
  methods: {
    ...mapActions([
      "addReminder",
      "removeReminder",
      "fetchReminders",
      "SET_ASSOCIATED_GOAL",
      "updateReminderById",
    ]),
    ...mapMutations(["SET_ASSOCIATED_GOAL"]),
    log(e){
      console.log(e)
    },
    toggleReminderFormDialog() {
      this.$emit("toggleReminderFormDialog", false);    
      if (this.$refs.form) {
        this.$refs.form.resetValidation();
      }
      // this.SET_ASSOCIATED_GOAL(false)
   },
    async saveReminder() {
      
      if (!this.$refs.form.validate()) {
        return;
      }
      if(!this.reminder.goalId){
        let obj = this.reminder
        Object.keys(obj).forEach(key => {
        if (obj[key] === null) {
          delete obj[key];
        }
      });

       console.log(this.reminder)
      }

      try {
        if (this.reminder.id) {
          await this.updateReminderById({
            id: this.reminder.id,
            category: this.reminder.category,
            level: this.reminder.level,
            activity: this.reminder.activity,
            frequency: this.reminder.frequency,
            contentType: this.reminder.contentType,
            time: this.reminder.time,
            goalId: this.reminder.goalId,
          });
        } else {       
          this.reminder.contentType = "Videos";
          // this.reminder.category = this.activities.filter(t => t && t.title == this.reminder.activity)[0].category;
          this.reminder.level = this.userPrefLevel;
          // Call Vuex action to add reminder
          await this.addReminder(this.reminder);
        }
        // Close form and reset form values
        this.toggleReminderFormDialog();
        this.SET_ASSOCIATED_GOAL(false);
        this.$refs.form.reset();
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