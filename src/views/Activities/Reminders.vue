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
          <span class="text-h6 text-sm-h5"
            ><b class="goalHeaders">MY ACTIVITIES</b></span
          >
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
        <v-col cols="12" sm="6" md="4" lg="3">
          <div class="newGoalCard">
            <div class="newGoalCardInner">
              <div class="newGoalDiv">
                <v-btn
                  @click="openNewReminderForm"
                  class="newGoalBtn"
                  outlined
                  elevation="2"
                  :disabled="!(reminders.length < 8)"
                  :block="$vuetify.breakpoint.xsOnly"
                  ><v-icon class="checkmark">mdi-yoga</v-icon>CREATE AN
                  ACTIVITY...</v-btn
                >
              </div>
              <v-dialog v-model="dialog" max-width="600px">
                <ReminderForm :reminder="reminder" @toggleReminderFormDialog="toggleReminderFormDialog"></ReminderForm>
              </v-dialog>
          <v-tooltip max-width="200" bottom>
          <div>Create New Activity for Goal</div>
          <template v-slot:activator="{ on }">
            <div v-on="on" class="goalIcon activitiesCount">
            <span @click="toggleReminderFormDialog">
             <v-icon class="text-dark" 
                >mdi-flag-checkered</v-icon
              >
              <v-icon class="text-dark smPlusSign"
                >mdi-plus</v-icon
              >
            </span>
              
            </div>
          </template>
        </v-tooltip>
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
          <ReminderCard :reminder="reminder"> </ReminderCard>

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
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import utilitiesMixin from "../../mixins/utilities-mixin.js";
import ReminderCard from "../../components/ReminderCard.vue";
import ReminderForm from "../../components/ReminderForm.vue";

export default {
  name: "Activities",
  components: {
    ReminderCard,
    ReminderForm,
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
      "removeReminder",
      "fetchReminders",
    ]),
    ...mapMutations(["SET_SNACKBAR", "TOGGLE_REMINDERS_ON"]),
    log(e) {
      if (e) {
        console.log(e);
      }
    },
    requestPermission() {
      if (Notification.permission !== "granted") {
        Notification.requestPermission();
      }
    },
    openNewReminderForm() {
      this.toggleReminderFormDialog(true)
      if (this.$refs.form) {
        this.$refs.form.resetValidation();
      }
    },
    toggleReminderFormDialog(value){
      this.dialog = value;
      if (this.$refs.form) {
        this.$refs.form.resetValidation();
      }
    },
  },
  computed: {
    ...mapGetters(["reminders", "remindersOn", "saving", "incompleteGoals"]),
    remind: {
      get() {
        return this.remindersOn;
      },
      set(value) {
        this.TOGGLE_REMINDERS_ON(value);
      },
    },
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
  mounted() {
    this.fetchReminders();
  },
};
</script>

<style scoped>
/* .hide{
  visibility: ;
} */
.text-right {
  justify-content: right;
}
.newGoalDiv {
  height: 100%;
}
.newGoalBtn {
  color: white !important;
  top: 50%;
  margin: 0 auto;
  display: block;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
.newGoalCard {
  height: 150px;
  /* background-color: rgba(29,	51,	111,0.85); */
  perspective: 1000px; /* Remove this if you don't want the 3D effect */
}
.newGoalCardInner {
  width: 100%;
  height: 100%;
  background-color: rgba(29, 51, 111, 0.5);
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
.smPlusSign {
  font-size: 85%;
}
.goalHeaders {
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
.bg-img {
  /* padding: 20px; */
  background: url(../../assets/running_morning.jpg) no-repeat center center
    fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  min-height: 80vh;
  min-width: 1024px;
  width: 100%;
  height: 100%;
  border-radius: 0.25rem;
}
.bg-overlay {
  background-color: rgba(255, 255, 255, 0.6) !important;
  min-height: 80vh;
  min-width: 1024px;
  width: 100%;
  height: 100%;
  padding: 20px;
  border-radius: 0.25rem;
}
.goalCol {
  overflow-y: hidden !important; /* Hide vertical scrollbar */
  overflow-x: hidden !important;
}
.goalIcon {
  position: absolute;
  bottom: 10%;
  right: 1%;
}
.activitiesCount {
  transition: all 0.2s ease-in-out;
}
.activitiesCount:hover {
  transform: scale(1.2);
}
.text-dark {
  color: #072f94;
}
</style>
