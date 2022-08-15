<template>
<div class="bg-img" :load="log(reminder)">
  <div class="bg-overlay">
    <div
      class="
        d-sm-flex
        justify-space-between
        align-center
        mt-2
        mb-2 mb-sm-2
        mt-sm-4
      "
    >
    <div class="d-flex justify-space-between align-center">
        <span class="text-h6 text-sm-h5"><b class="goalHeaders">MY ACTIVITIES</b></span>
        <v-switch
          v-model="remind"
          @change="requestPermission"
          class="mt-1 ml-3"
          color="#2f53b6"
          hide-details
        ></v-switch>
      </div>
    </div>
    <v-divider class="mb-4"></v-divider>
       <v-row>
         <v-col        
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
        <div class="newGoalCard">
        <div class="newGoalCardInner"
        >
        <div class="newGoalDiv">
        <v-btn
        @click="openNewReminderForm" 
        class="newGoalBtn"
        outlined
        elevation="2"
        :disabled="!(reminders.length < 8)"      
        :block="$vuetify.breakpoint.xsOnly"        
      
        ><v-icon class="checkmark"
              >mdi-yoga</v-icon>CREATE AN ACTIVITY...</v-btn
            >
        </div>
       
        </div>
        </div>
         </v-col>
        <v-col
          v-for="(reminder, index) in reminders"
          :key="index"
          cols="12"
          sm="6"
          md="4"
          lg="3"
          class="goalCol"
        >
        <ReminderCard :reminder="reminder">
        </ReminderCard>

<!-- ACTIVITY CARDS FOR GOALS THAT HAVE NO REMINDERS SET -->
        </v-col>
          <!-- <v-col
          v-for="(goal, index) in incompleteGoals"
          :key="index"        
          cols="12"
          sm="6"
          md="4"
          lg="3"
        > 
       

         <div class="newGoalCard">
        <div class="newGoalCardInner"
        >
        <div class="newGoalDiv">  -->
        <!-- <v-btn
        @click="openNewReminderForm" 
        class="newGoalBtn"
        outlined
        elevation="2"
        :disabled="!(reminders.length < 8)"      
        :block="$vuetify.breakpoint.xsOnly"        
      
        > -->
        <!-- {{goal.category}}  -->
<!--         
        <v-icon class="checkmark"
              >mdi-yoga</v-icon>CREATE AN ACTIVITY...</v-btn
            >
        </div> -->
        <!-- </div>
        </div>
        </div> 
         </v-col>  -->
        </v-row>     
    
    <v-divider class="mb-4"></v-divider>
    <!-- Activity Reminders Table -->
    <!-- <v-card class="pa-sm-2">
   
    </v-card> -->
    <!-- Form Dialog -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card :disabled="saving" :loading="saving">
        <v-card-title
          ><span v-if="reminder.id">Edit Activity</span
          ><span v-else>Add New Activity</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-select
              v-model="reminder.category"
              :items="filteredCategories"
              item-text="title"
              item-value="value"
              label="My Focus Area"
              :rules="[(v) => !!v || 'Focus Area required']"
              required
            ></v-select>
            <!-- <v-select
              v-model="reminder.level"
              :items="[userPrefLevel]"
            ></v-select>   -->
            <v-select
              v-model="reminder.frequency"
              :items="['Daily', 'Mon/Wed/Fri', 'Tues/Thurs']"
              label="Frequency"
              :rules="[(v) => !!v || 'Frequency is required']"
              required
            ></v-select>
            <v-select
              v-model="reminder.contentType"
              label="Content Type"
              :items="['Articles', 'Videos']"
              :rules="[(v) => !!v || 'Content Type is required']"
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
                ampm-in-title
                format="ampm"
                @click:minute="$refs.menu.save(reminder.time)"
                header-color="var(--mh-blue)"
              ></v-time-picker>
            </v-menu>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-end">
          <v-btn @click="saveReminder" class="px-6" color="var(--mh-blue)" dark
            >Save</v-btn
          >
          <v-btn @click="dialog = false" color="secondary" outlined
            >Cancel</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import utilitiesMixin from "../../mixins/utilities-mixin.js";
import ReminderCard from "../../components/ReminderCard.vue";

export default {
  name: "Activities",
   components: {
    ReminderCard
  },
  mixins: [utilitiesMixin],
  data() {
    return {
      dialog: false,
      intervalId: null,
      valid: true,
      reminder: {
        category: "",
        level: this.userPrefLevel,
        frequency: "",
        contentType: "",
        time: null,
      },
  
    };
  },
  methods: {
    ...mapActions([
      "addReminder",
      "removeReminder",
      "fetchReminders",
      "updateReminderById",
    ]),
    ...mapMutations(["SET_SNACKBAR", "TOGGLE_REMINDERS_ON"]),
   log(e){
      if (e){
       console.log(e)
      }
    },
    resetForm() {
      this.reminder = {
        category: "",
        level: this.userPrefLevel,
        frequency: "",
        contentType: "",
        time: null,
      };
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
          });
        } else {
          this.reminder.level = this.userPrefLevel
          // Call Vuex action to add reminder   
          await this.addReminder(this.reminder);
        }
        // Close form and reset form values
        this.dialog = false;
        this.resetForm();
      } catch (error) {
        console.log(error);
      }
    },
    requestPermission() {
      if (Notification.permission !== "granted") {
        Notification.requestPermission();
      }
    },  
    openNewReminderForm() {
      this.resetForm();
      this.dialog = true;
      if (this.$refs.form) {
        this.$refs.form.resetValidation();
      }
    },
  },
  computed: {
    ...mapGetters(["reminders", "remindersOn", "saving", "incompleteGoals"]),    
    userPrefLevel() {
      // return this.reminders
      if (this.preferences && this.preferences[0] && this.reminder.category){
        let strength = this.preferences[0].preference_items.map(t => t && t.category == "Strength")
        let flex = this.preferences[0].preference_items.map(t => t && t.category == "Flexibility & Mobility")
        let balance = this.preferences[0].preference_items.map(t => t && t.category == "Balance")
        let nutri = this.preferences[0].preference_items.map(t => t && t.category == "Nutrition")
        let rec = this.preferences[0].preference_items.map(t => t && t.category == "Recovery")
        let erg = this.preferences[0].preference_items.map(t => t && t.category == "Ergonomics")
        let endur = this.preferences[0].preference_items.map(t => t && t.category == "Endurance")
        if (this.reminder.category == 'STRENGTH' && strength ){
          return this.strengthLevel
        }
        if (this.reminder.category == 'BALANCE' && balance ){
          return this.balanceLevel
        }
        if (this.reminder.category == 'ENDURANCE' && endur ){
          return this.enduranceLevel
        }
        if (this.reminder.category == 'NUTRITION' && nutri ){
          return this.nutritionLevel
        }
        if (this.reminder.category == 'RECOVERY' && rec ){
          return this.recLevel
        }
        if (this.reminder.category == 'ERGONOMICS' && erg ){
          return this.ergLevel
        }
        if (this.reminder.category == 'FLEXIBILITY_MOBILITY' && flex ){
          return this.flexLevel                
        } else return ""

      } else {
         return ""
     }
    },
    remind: {
      get() {
        return this.remindersOn;
      },
      set(value) {
        this.TOGGLE_REMINDERS_ON(value);
      },
    },
  },
  mounted() {
    this.fetchReminders();
  },
  
};
</script>

<style scoped>
/* .hide{
  visibility: ;
} */
.text-right{
  justify-content: right;
}
.newGoalDiv{
  height:100%;  
}
.newGoalBtn{
  color: white !important; 
  top: 50%;
  margin:0 auto;
  display:block;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
 
}
.newGoalCard {
  height: 150px;
 /* background-color: rgba(29,	51,	111,0.85); */
  perspective: 1000px; /* Remove this if you don't want the 3D effect */
}
.newGoalCardInner{ 
  width: 100%;
  height: 100%;
  background-color: rgba(29,	51,	111,0.50);
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
  border-radius: 4px;
  box-shadow: 0px 6px 6px -3px rgba(0, 0, 0, 0.2),
    0px 10px 14px 1px rgba(0, 0, 0, 0.14), 0px 4px 18px 3px rgba(0, 0, 0, 0.12) !important;
}


.flip-card {
  background-color: transparent;
  height: 150px;
  perspective: 1000px; /* Remove this if you don't want the 3D effect */
}

/* This container is needed to position the front and back side */
.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

/* Do an horizontal flip when you move the mouse over the flip box container */
.flip-card-inner.is-flipped {
  transform: rotateY(180deg);
}

/* Position the front and back side */
.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
  border-radius: 4px;
  box-shadow: 0px 6px 6px -3px rgba(0, 0, 0, 0.2),
    0px 10px 14px 1px rgba(0, 0, 0, 0.14), 0px 4px 18px 3px rgba(0, 0, 0, 0.12) !important;
}

/* Style the front side (fallback if image is missing) */
.flip-card-front {
  text-align: center;
  background-color: var(--mh-green);
}

/* Style the back side */
.flip-card-back {
  background-color: var(--mh-blue);
  color: white;
  transform: rotateY(180deg);
}
.goalHeaders{
 color: var(--mh-blue);
}
::v-deep .text-start:first-child {
  font-weight: 600;
}
::v-deep tr:hover {
  cursor: pointer;
}
::v-deep tr.v-data-table__empty-wrapper {
  margin: auto;
}
.bg-img{
  /* padding: 20px; */
  background: url(../../assets/running_morning.jpg) no-repeat center center fixed; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  min-height: 80vh;
  min-width: 1024px;
  width: 100%;
  height: 100%;
  border-radius: .25rem;
}  
.bg-overlay{
  background-color: rgba(255, 255, 255,0.6) !important;
  min-height: 80vh;
  min-width: 1024px;
  width: 100%;
  height: 100%;
  padding: 20px;
  border-radius: .25rem;
}
.goalCol {
  overflow-y: hidden !important; /* Hide vertical scrollbar */
  overflow-x: hidden !important; 
}
</style>
