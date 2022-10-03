<template>
  <div class="flip-card">
    <div class="flip-card-inner" :class="{ 'is-flipped': isFlipped }">
      <div :class="{ 'completed': reminder.isComplete }" class="flip-card-front clickable fontWhite">

        <!-- <v-menu v-model="menu" :nudge-width="200" :nudge-right="6" offset-x
          open-on-hover origin="center center" transition="scale-transition">
          <template v-slot:activator="{ on, attrs }"> -->
        <v-tooltip v-if="reminder.goal && reminder.goal.id" max-width="200" bottom>
          {{ reminder.goal.title }}
          <template v-slot:activator="{ on }">
            <div v-if="!isFlipped" v-on="on" class="goalIcon activitiesCount">
              <span v-if="reminder.isComplete">
                <v-icon class="mr-1 text-blue">mdi-flag-checkered</v-icon>
              </span>
              <span v-else>
                <v-icon class="mr-1 text-light">mdi-flag-checkered</v-icon>
              </span>
            </div>
          </template>
        </v-tooltip>
        <!-- </template>

          <v-card>
            <v-list>
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title>
                    <v-icon class="mr-1">mdi-flag-checkered</v-icon>Goal
                  </v-list-item-title>
                  <v-list-item-subtitle class="ml-7">{{ reminder.goal.title }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title>
                    <v-icon class="mr-1">mdi-calendar</v-icon>Due Date
                  </v-list-item-title>
                  <v-list-item-subtitle class="ml-7">{{ reminder.goal.dueDate }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu> -->

        <v-tooltip v-if="!reminder.goal && !reminder.isComplete && !isFlipped" max-width="200" bottom>
          <div>Add Activity to Goal</div>
          <template v-slot:activator="{ on }">
            <div v-on="on" class="goalIcon activitiesCount">
              <span @click="showGoals">
                <v-icon class="text-dark">mdi-flag-checkered</v-icon>
                <v-icon class="text-dark smPlusSign">mdi-plus</v-icon>
              </span>
            </div>
          </template>
        </v-tooltip>

        <v-tooltip max-width="200" top>
          <div>Activity Completed</div>
          <template v-slot:activator="{ on }">
            <div v-on="on">
              <span v-if="reminder.isComplete">
                <v-icon class="mr-1 trophyIcon" color="yellow darken-2">mdi-trophy</v-icon>
              </span>
            </div>
          </template>
        </v-tooltip>

        <!-- <div>
          <span class="levelBadge-complete" v-if="reminder.isComplete">
            <v-chip small :color="levelColor(reminder.level)" dark>{{
               levelTitle(reminder.level) 
              }}
            </v-chip>
          </span>
        </div> -->

        <div @click="onClickCard">
          <div class="row">
            <div class="col mt-2">
              <!-- <small class="d-block">Type</small> -->
              <h3>
                <span v-if="reminder.isComplete" class="font-weight-bold text-blue">
                  <v-icon color="#1d336f" class="mr-1">{{
                  categoryIcon(reminder.activity) || categoryIcon(reminder.category)
                  }}
                  </v-icon>
                  <span class="pt-1" v-if="reminder.activity">
                    {{ this.capitalizeFirstLet((reminder.activity).toLowerCase()) }}</span>
                  <span class="pt-1" v-else>
                    {{ categoryString(reminder.category) }}</span>
                </span>
                <span v-else class="font-weight-bold text-light">
                  <v-icon color="white" class="mr-1">{{
                  categoryIcon(reminder.activity) || categoryIcon(reminder.category)
                  }}
                  </v-icon>
                  <span class="pt-1" v-if="reminder.activity">
                    {{ this.capitalizeFirstLet((reminder.activity).toLowerCase()) }}</span>
                  <span class="pt-1" v-else>
                    {{ categoryString(reminder.category) }}</span>
                </span>
              </h3>
            </div>
          </div>
          <div class="row mt-0 px-3">
            <div class="col">
              <v-progress-linear height="10" rounded striped color="lime"
                :value="getActivityProgressValue(reminder.category, reminder.level)">
              </v-progress-linear>
              <!-- <v-chip small color="lime" v-if="reminder.isComplete" class="centered text-blue px-8">
                    <strong>100%</strong>
                  </v-chip> -->
            </div>
          </div>

          <div v-if="!reminder.isComplete" class="row mt-0 px-1">
            <div class="col pb-0">
              <small class="d-block">Frequency</small>
              <span class="text-center pl-1">{{ displayFreq(reminder.frequency) }}</span>
            </div>
            <div class="col pb-0">
              <small class="d-block">Time</small>
              <span class="text-center">{{ reminder.time }}</span>
            </div>
            <div class="col lHeight pb-0">
              <!-- <small class="d-block">Type</small> -->
              <span class="text-right">
                <!-- <v-tooltip v-if="reminder.goal && reminder.goal.id" max-width="200" bottom>
          <div>
            <span>
             {{ reminder.goal.title }}
          </span></div>
          <template v-slot:activator="{ on }">
            <div v-on="on" >
              <span @click="showGoals">
              <v-icon class="mr-1 text-light">mdi-flag-checkered</v-icon>
              </span>
            </div>
          </template>
        </v-tooltip>
        <v-tooltip v-else max-width="200" bottom>
          <div>Add Activity to Goal</div>
          <template v-slot:activator="{ on }">
            <div v-on="on">
            <span @click="showGoals">
             <v-icon class="text-dark" 
                >mdi-flag-checkered</v-icon
              >
              <v-icon class="text-dark smPlusSign"
                >mdi-plus</v-icon
              >
            </span>
            </div>
          </template>
        </v-tooltip> -->
                <!-- <span v-if="reminder.contentType == 'Articles'">
                 <v-icon class="mr-1" color="white">mdi-file-document-outline</v-icon>
              </span>
              <span v-else>
                <v-icon class="mr-1" color="white">mdi-youtube</v-icon>
               </span> -->
              </span>
            </div>
          </div>
          <div v-else class="row mt-9 ml-2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn x-small class="text-light mx-1" color="yellow darken-3" @click="openReminderForm(reminder)"
                  v-bind="attrs" v-on="on">
                  <v-icon small color="white"> mdi-eye</v-icon>
                </v-btn>
              </template>
              <span>View</span>
            </v-tooltip>
            <v-tooltip v-if="!reminder.goal" bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn x-small class="text-light mx-1" color="green" @click="resetActivity(reminder)" v-bind="attrs"
                  v-on="on">
                  <v-icon small color="white"> mdi-recycle-variant</v-icon>
                </v-btn>
              </template>
              <span>Do it again!</span>
            </v-tooltip>
            <!-- <v-tooltip v-if="reminder.goal" bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" disabled x-small class="text-light mx-1" color="green">
                  <v-icon small color="white"> mdi-recycle-variant</v-icon>
                </v-btn>
              </template>
              <span>Disabled</span>
            </v-tooltip> -->
            <v-tooltip bottom v-if="!reminder.goal">
              <template v-slot:activator="{ on, attrs }">
                <v-btn x-small class="text-light mx-1" color="red darken-1" @click="deleteReminder({ id: reminder.id })"
                  v-bind="attrs" v-on="on">
                  <v-icon small color="white"> mdi-trash-can-outline </v-icon>
                </v-btn>
              </template>
              <span>Delete</span>
            </v-tooltip>
            <!-- <v-tooltip bottom v-if="reminder.goal">
              <template v-slot:activator="{ on, attrs }">
                <v-btn disabled x-small class="text-light mx-1" color="red darken-1"
                  @click="deleteReminder({ id: reminder.id })" v-bind="attrs" v-on="on">
                  <v-icon small color="white"> mdi-trash-can-outline </v-icon>
                </v-btn>
              </template>
              <span>Disabled</span>
            </v-tooltip> -->
            <!-- <div class="col lHeight pb-0">
              <span class="text-right">
              </span>
            </div> -->
          </div>
          <div class="d-flex align-center justify-center"></div>
        </div>
      </div>

      <div class="justify-space-between px-4 flip-card-back">
        <div class="clickable py-4 px-4" @click="onClickCard">
          <div class="row">
            <div class="col">
              <h5 class="orangeLabel d-flex">ACTIVITY PROGRESS</h5>
              <span>
                {{ getCompletedActivities(capitalizeFirstLet((checkForFlex(reminder.category)).toLowerCase()),
                checkForNA(reminder.level)).length
                }} of {{
                getActivities(capitalizeFirstLet((checkForFlex(reminder.category)).toLowerCase()),
                checkForNA(reminder.level)).length
                }}
              </span>
            </div>
          </div>
          <span class="levelBadge">
            <v-chip small :color="levelColor(reminder.level)" dark>{{
            levelTitle(reminder.level)
            }}</v-chip>
          </span>
        </div>


        <span class="cardBtns d-inline-flex">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon @click="notify(reminder)" class="mr-2" color="var(--mh-blue)" v-bind="attrs" v-on="on">
                mdi-timer-play-outline</v-icon>
            </template>
            <span>Start Activity</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon @click="openReminderForm(reminder)" class="mr-1" color="var(--mh-green)" v-bind="attrs" v-on="on">
                mdi-square-edit-outline</v-icon>
            </template>
            <span>Edit</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon @click="deleteReminder({ id: reminder.id })" color="error" v-bind="attrs" v-on="on">
                mdi-trash-can-outline</v-icon>
            </template>
            <span>Delete</span>
          </v-tooltip>

        </span>
      </div>
    </div>

    <v-dialog v-model="dialog" max-width="600px">
      <ReminderForm :reminder="reminder" @toggleReminderFormDialog="toggleReminderFormDialog"></ReminderForm>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import utilitiesMixin from "../mixins/utilities-mixin";
import videosMixin from "../mixins/videos-mixin";
import ReminderForm from "./ReminderForm.vue";

export default {
  mixins: [utilitiesMixin, videosMixin],
  components: {
    ReminderForm
  },
  props: {
    reminder: {
      type: Object,
    },
    showCompleted: Boolean,
    // goal: {
    //   type: Object
    // },
  },
  data() {
    return {
      isFlipped: false,
      dialog: false,
      goalSelect: false,
      intervalId: 60000,
      valid: true,
      goalId: "",
      goal: null,
    };
  },
  computed: {
    ...mapGetters(["incompleteGoals", "reminders", "saving", "associatedGoal"]),
    associatedGoal() {
      let val = false;
      if (this.incompleteGoals && this.incompleteGoals.length > 0) {
        let goalActivities = this.incompleteGoals.filter(
          (a) => a.goal_activities && a.goal_activities.length > 0
        );
        if (
          goalActivities &&
          goalActivities.filter((a) => a.id == this.reminder.id).length > 0
        ) {
          console.log(goalActivities.filter((a) => a.id == this.reminder.id));
          val = true;
        }
        return val;
      } else {
        return false;
      }
    },
  },
  mounted() {
    this.fetchReminders();
    this.fetchGoals();
  },
  methods: {
    ...mapActions([
      "updateReminderById",
      "updateGoalById",
      "fetchReminders",
      "removeReminder",
      "fetchGoals",
    ]),
    ...mapMutations(["SET_ASSOCIATED_GOAL"]),
    // log(e) {
    //   console.log(e);
    // },
    onClickCard() {
      !this.reminder.isComplete ? this.isFlipped = !this.isFlipped : this.isFlipped = false
    },
    toggleReminderFormDialog(value) {
      this.dialog = value;
    },
    displayFreq(frequency) {
      let split = frequency.split(",")
      if (split[0] == "") {
        split.shift()
      }
      if (split.length == 7) {
        return "Daily"
      } else if (split.length == 1) {
        return split[0]
      } else if (split.length <= 3) {
        let newFreq = []
        if (split.includes("Sunday")) {
          newFreq.push("Sun")
        }
        if (split.includes("Monday")) {
          newFreq.push("Mon")
        }
        if (split.includes("Tuesday")) {
          newFreq.push("Tue")
        }
        if (split.includes("Wednesday")) {
          newFreq.push("Wed")
        }
        if (split.includes("Thursday")) {
          newFreq.push("Thur")
        }
        if (split.includes("Friday")) {
          newFreq.push("Fri")
        }
        if (split.includes("Saturday")) {
          newFreq.push("Sat")
        }
        let joined = newFreq.join('/')
        return joined
      } else {
        let newFreq = []
        if (split.includes("Sunday")) {
          newFreq.push("Su")
        }
        if (split.includes("Monday")) {
          newFreq.push("M")
        }
        if (split.includes("Tuesday")) {
          newFreq.push("Tu")
        }
        if (split.includes("Wednesday")) {
          newFreq.push("W")
        }
        if (split.includes("Thursday")) {
          newFreq.push("Th")
        }
        if (split.includes("Friday")) {
          newFreq.push("F")
        }
        if (split.includes("Saturday")) {
          newFreq.push("Sa")
        }
        let joined = newFreq.join('/')
        return joined
      }
    },
    showGoals() {
      this.toggleReminderFormDialog(true);
      this.SET_ASSOCIATED_GOAL(true)
      console.log("this reminder on next line");
      console.log(this.reminder);
    },
    openReminderForm(reminder) {
      // this.reminder = reminder;
      this.toggleReminderFormDialog(true);
      console.log("reminder", reminder);
      this.SET_ASSOCIATED_GOAL(false);
    },
    async deleteReminder(id) {
      await this.removeReminder(id);
    },
    closeGoalForm() {
      this.goalsDialog = false;
    },
    levelColor(level) {
      return level == "L1" || level == "L2"
        ? "var(--mh-green)"
        : level == "L3" || level == "L4"
          ? "var(--mh-orange)"
          : level == "L5"
            ? "error"
            : "primary";
    },
    goToActivities() {
      this.$router.push("/activities/reminders");
    },
    async update(goal) {
      let updatedProgress = goal.checklist.reduce(
        (accumulator, item) =>
          item.isComplete ? accumulator + 1 : accumulator,
        0
      );
      let isComplete = updatedProgress == goal.stepCount;
      let completedCount = isComplete ? 1 : 0;

      await this.updateGoalById({
        id: goal.id,
        progress: updatedProgress,
        isComplete: isComplete,
        completedCount: goal.completedCount + completedCount,
        checklist: goal.checklist,
      });
    },
    repeatGoal(goal) {
      this.updateGoalById({
        id: goal.id,
        progress: 0,
        isComplete: false,
        checklist: this.resetChecklist(goal),
      });
    },
    resetChecklist(goal) {
      return goal.checklist.map((item) => ({
        isComplete: false,
        title: item.title,
      }));
    },
    resetActivity(reminder) {
      let filtered = this.watchedVideos.filter(v => v.category == this.capitalizeFirstLet((this.checkForFlex(reminder.category)).toLowerCase()) && v.level == this.checkForNA(reminder.level))
      console.log(filtered)
      filtered.forEach(v => {
        this.removeWatchedVideo({ id: v.id })
      })
      this.updateReminderById({
        id: reminder.id,
        isComplete: false,
      })

    },
    isComplete(reminder) {
      if (this.getActivityProgressValue(reminder.category, reminder.level) == 100) {
        if (!reminder.isComplete) {
          try {
            this.updateReminderById({
              id: reminder.id,
              isComplete: true,
            })
          } catch (err) {
            console.log(err)
          }
        }
        return true
      } else if (this.getActivityProgressValue(reminder.category, reminder.level) != 100) {
        if (reminder.isComplete) {
          this.updateReminderById({
            id: reminder.id,
            isComplete: false,
          })
        }
      }
    }
  },
  watch: {
    reminders() {
      let rem = this.reminders.filter(r => r)
      console.log(rem)
      for (let i = 0; i < rem.length; i++) {
        this.isComplete(rem[i])
        console.log(rem[i])
      }
    }
  }
};
</script>

<style scoped>
.centered {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.orangeLabel {
  color: var(--mh-orange);
}

.fontWhite {
  color: white;
}

.turnOver {
  position: absolute;
  right: 4%;
  bottom: 5%;
}

.lowerCase {
  text-transform: lowercase;
}

.dueDate {
  position: absolute;
  bottom: 10%;
  left: 4%;
  color: white !important;
}

.goalIcon {
  position: absolute;
  bottom: 12%;
  right: 2%;
}

.trophyIcon {
  position: absolute;
  top: 6%;
  right: 1%;
}

.text-light {
  color: white !important;
}

.text-dark {
  color: #072f94;
}

.text-black {
  color: black;
}

.text-blue {
  color: rgb(29, 51, 111) !important;
}

.activitiesCount {
  transition: all 0.2s ease-in-out;
}

.activitiesCount:hover {
  transform: scale(1.2);
}

.newGoalBtn {
  color: white !important;
  top: 55%;
  border: 0.8px solid white;
  border-radius: 0.25rem;
  background-color: rgba(29, 51, 111, 0.4) !important;
  margin: 5px auto 5px auto;
  position: absolute;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}

.cardBtns {
  position: absolute;
  bottom: 5%;
  left: 5%;
  cursor: pointer;
}

.lHeight {
  line-height: 3.5;
}

.icon {
  position: absolute;
  bottom: 5%;
  right: 2.5%;
  color: var(--mh-orange) !important;
}

.levelBadge {
  position: absolute;
  top: 12%;
  right: 5%;
}

.levelBadge-complete {
  position: absolute;
  top: 8%;
  left: 3%;
}

.smPlusSign {
  font-size: 85%;
}

.goal-progressbar {
  width: 100%;
  position: absolute;
  bottom: 4%;
}

.checkmark {
  font-size: 64px !important;
}

.card-title {
  color: var(--mh-blue);
  font-size: 12px;
  min-height: 50px;
}

.goalTitle {
  font-weight: 500;
  color: rgba(255, 255, 255);
  /* text-align: center;
 vertical-align: middle; */
}

.card-body {
  background-color: white;
}

.jw {
  /* text-align: center; */
  display: flex;
  align-items: center;
  justify-content: center;
}

.completed-count {
  position: absolute;
  right: 7px;
  top: 7px;
}

.activitiesIcon {
  position: absolute;
  bottom: 12%;
  right: 15%;
  color: white !important;
}

.flip-card {
  /* background-color: transparent; */
  height: 130px !important;
  perspective: 1000px;
  /* Remove this if you don't want the 3D effect */
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
  overflow-y: hidden !important;
  overflow-x: hidden !important;
  background-color: rgba(29, 51, 111, 0.75);
  -webkit-backface-visibility: hidden;
  /* Safari */
  backface-visibility: hidden;
  border-radius: 4px;
  box-shadow: 0px 6px 6px -3px rgba(0, 0, 0, 0.2),
    0px 10px 14px 1px rgba(0, 0, 0, 0.14), 0px 4px 18px 3px rgba(0, 0, 0, 0.12) !important;
}

.completed {
  background-color: whitesmoke;
}

.enduranceColor {
  background-color: rgba(29, 51, 111, 0.75);
}

.strengthColor {
  background-color: rgba(111, 92, 29, 0.75);
}

/* Style the front side (fallback if image is missing) */
.flip-card-front {
  text-align: center;
  overflow-y: hidden !important;
  /* Hide vertical scrollbar */
  overflow-x: hidden !important;
}

/* Style the back side */
.flip-card-back {
  color: var(--mh-blue);
  background-color: white;
  transform: rotateY(180deg);
  overflow-y: auto;
  overflow-x: hidden !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active below version 2.1.8 */
  {
  opacity: 0;
}

.font-weight-bold {
  color: white;
}

.activityActions {
  position: absolute;
  bottom: 5%;
}
</style>
