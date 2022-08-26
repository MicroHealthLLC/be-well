<template>
  <div class="flip-card">
    <div class="flip-card-inner" :class="{ 'is-flipped': isFlipped }">
      <div class="flip-card-front clickable fontWhite">
        <v-tooltip v-if="reminder.goal && reminder.goal.id" max-width="200" bottom>
          <div>
            <span>
              {{ reminder.goal.title }}
            </span>
          </div>
          <template v-slot:activator="{ on }">
            <div v-on="on" class="goalIcon activitiesCount">
              <span @click="showGoals">
                <v-icon class="mr-1 text-light">mdi-flag-checkered</v-icon>
              </span>
            </div>
          </template>
        </v-tooltip>
        <v-tooltip v-else max-width="200" bottom>
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
        <div @click="isFlipped = !isFlipped">
          <div class="row">
            <div class="col">
              <!-- <small class="d-block">Type</small> -->
              <h2>
                <span class="font-weight-bold text-light">
                  <v-icon color="white" class="mr-1">{{
                      categoryIcon(reminder.category)
                  }}</v-icon>
                  <span class="pt-1" v-if="reminder.activity">
                    {{ reminder.activity }}</span>
                  <span class="pt-1" v-else>
                    {{ categoryString(reminder.category) }}</span>
                </span>
              </h2>
            </div>
          </div>
          <div class="row mt-0 px-3">
            <div class="col">
              <v-progress-linear height="10" rounded striped color="lime" :value="getProgressValue(capitalizeFirstLet((reminder.category).toLowerCase()),
              checkForNA(reminder.level))">
              </v-progress-linear>

              <!-- <span>
             <v-chip small :color="levelColor(reminder.level)" dark>{{
            levelTitle(reminder.level)
            }}</v-chip>
            </span> -->
            </div>
          </div>

          <div class="row mt-0 px-1">
            <div class="col">
              <small class="d-block">Frequency</small>
              <span class="text-center">{{ reminder.frequency }}</span>
            </div>
            <div class="col">
              <small class="d-block">Time</small>
              <span class="text-center">{{ reminder.time }}</span>
            </div>
            <div class="col">
              <!-- <small class="d-block">Type</small> -->
              <span class="text-right">
                <!-- <span v-if="reminder.contentType == 'Articles'">
                 <v-icon class="mr-1" color="white">mdi-file-document-outline</v-icon>
              </span>
              <span v-else>
                <v-icon class="mr-1" color="white">mdi-youtube</v-icon>
               </span> -->
              </span>
            </div>
          </div>

          <div class="d-flex align-center justify-center"></div>
        </div>
      </div>

      <div class="justify-space-between px-4 flip-card-back">
        <div class="clickable py-4 px-4" @click="isFlipped = !isFlipped">
          <div class="row">
            <div class="col">
              <h5 class="orangeLabel d-flex">ACTIVITY PROGRESS</h5>
              {{ getCompletedActivities(capitalizeFirstLet((reminder.category).toLowerCase()),
                  checkForNA(reminder.level)).length
              }} of {{
    getActivities(capitalizeFirstLet((reminder.category).toLowerCase()), checkForNA(reminder.level)).length
}}
            </div>
          </div>
          <span class="levelBadge">
            <v-chip small :color="levelColor(reminder.level)" dark>{{
                levelTitle(reminder.level)
            }}</v-chip>
          </span>
        </div>

        <div class="row activityActions">
          <div class="col">
            <h5 class="orangeLabel font-weight-bold">ACTIVITY ACTIONS</h5>
            <span class="d-block">
              <v-btn @click="notify(reminder)" class="mr-3" color="var(--mh-blue)" outlined small
                title="Test Notification: Prototype Only">Test</v-btn>
              <v-btn @click="openReminderForm(reminder)" class="mr-3" color="var(--mh-orange)" small outlined>View/Edit
              </v-btn>
              <v-btn @click="deleteReminder({ id: reminder.id })" color="error" outlined small>
                <v-icon> mdi-trash-can-outline </v-icon>
              </v-btn>
            </span>
          </div>
        </div>
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
    // goal: {
    //   type: Object
    // },
  },
  data() {
    return {
      isFlipped: false,
      dialog: false,
      goalSelect: false,
      intervalId: null,
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
    log(e) {
      console.log(e);
    },
    toggleReminderFormDialog(value) {
      this.dialog = value;
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
      console.log("this works");
      this.$router.push("/activities/reminders");
    },
    getProgressValue(cat, lev) {
      return this.getCompletedActivities(cat, lev).length / this.getActivities(cat, lev).length * 100
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
  },
};
</script>

<style scoped>
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
  bottom: 10%;
  right: 1%;
}

.text-light {
  color: white !important;
}

.text-dark {
  color: #072f94;
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

.icon {
  position: absolute;
  bottom: 5%;
  right: 2.5%;
  color: var(--mh-orange) !important;
}

.levelBadge {
  position: absolute;
  top: 5%;
  right: 2.5%;
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
  height: 150px;
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
