<template>
  <v-card :disabled="saving" :loading="saving">
    <v-card-title
      ><span v-if="reminder.id && !associatedGoal && !reminder.isComplete" >
      <v-icon color="var(--mh-green)" class="mr-1 mb-1"
      >mdi-yoga</v-icon>Edit Activity</span
      ><span v-if="associatedGoal && reminder.id">Add Goal to Activity</span
      ><span v-if="!reminder.id"><v-icon color="var(--mh-green)" class="mr-1 mb-1"
      >mdi-yoga</v-icon>Add Activity</span>
      <span v-if="reminder.isComplete">
      <v-icon color="var(--mh-green)" class="mr-1 mb-1"
      >mdi-yoga</v-icon>View Activity</span
      >
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
      <v-list disabled v-else-if="reminder.isComplete">
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title> <v-icon>{{categoryIcon(reminder.category)}}</v-icon>Focus Area</v-list-item-title>
            <v-list-item-subtitle class="ml-6">{{reminder.category}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title><v-icon class="mr-1">mdi-stairs</v-icon>Level</v-list-item-title>
            <v-list-item-subtitle class="ml-7">{{this.levelToString(reminder.level)}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title><v-icon class="mr-1">mdi-calendar-clock-outline</v-icon>Frequency</v-list-item-title>
            <v-list-item-subtitle class="ml-7">{{removeComma(reminder.frequency)}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title><v-icon class="mr-1">mdi-clock</v-icon>Time</v-list-item-title>
            <v-list-item-subtitle class="ml-7">{{reminder.time}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title><v-icon class="mr-1">mdi-flag-checkered</v-icon>Associated Goal</v-list-item-title>
            <v-list-item-subtitle class="ml-7" v-if="reminder.goal">{{reminder.goal.title}}</v-list-item-subtitle>
            <v-list-item-subtitle class="ml-7" v-else>No Goal Set</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <!-- <v-form ref="form" v-model="valid" v-else-if="reminder.isComplete">
         <v-select
          v-model="reminder.category"
          :items="reminder.category"
          item-text="title"
          item-value="value"
          label="Selected Activity"
          disabled
        ></v-select> 
        <v-select
          v-model="reminder.frequency"
          :items="reminder.frequency"
          label="Frequency"
          disabled
        ></v-select>
        <v-select
          v-model="reminder.time"
          :items="reminder.time"
          label="Time"
          disabled
        ></v-select>
          <v-select
            v-model="reminder.goal.title"
            :items="reminder.goal.title"
            item-text="title"
            item-value="id"
            label="Associated with Goal"
            disabled
          ></v-select>  
      </v-form> -->
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
          class="selectDays"
          v-model="freqArr"
          :items="['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']"
          label="Frequency"
          :rules="[(v) => !!v || 'Frequency is required']"
          multiple
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
      <v-list-item-subtitle v-if="reminder.goal && reminder.isComplete">See attached goal to reuse this activity</v-list-item-subtitle>

      <v-btn v-if="!reminder.isComplete" @click="saveReminder" class="px-6" color="var(--mh-blue)" dark
        >Save</v-btn
      >
      <v-btn v-if="!reminder.isComplete" @click="toggleReminderFormDialog" color="secondary" outlined
        >Cancel</v-btn
      >
      <v-btn v-else @click="toggleReminderFormDialog" color="secondary" outlined
        >Close</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import utilitiesMixin from "../mixins/utilities-mixin";
import videosMixin from "../mixins/videos-mixin";

export default {
  name: "ReminderForm",
  mixins: [utilitiesMixin, videosMixin],
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
      intervalId: 60000,
      valid: true,
      freqArr: []
    };
  },
  mounted() {
    if (!this.reminder.id) {
       this.$refs.form.reset();
    }
    this.freqStringToArray()

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
    freqStringToArray() {
      this.freqArr = this.reminder.frequency.split(",")
      this.freqArr = this.displayFreq(this.freqArr)
    },
    arrayToString(array) {
       return array.toString()
    },
    removeComma(string) {
      if (string.charAt(0) == ",") {
        return string.substring(1)
      }
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

       //console.log(this.reminder)
      }
      this.reminder.frequency = this.arrayToString(this.freqArr)

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
          //console.log(this.reminder)
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
    displayFreq(freq) {
     return freq.sort((a, b) => this.weekdays[a] - this.weekdays[b])
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
  watch: {
    reminder() {
      if(this.reminder.frequency && this.freqArr.length == 0) {
        let split = this.reminder.frequency.split(",")
        split.forEach((r) => this.freqArr.push(r))
      }
    }
  }
};
</script>

<style>
  .selectDays {
    max-height: 450px !important;
  }
  .v-menu__content{
    max-height: 450px !important;
  }
</style>