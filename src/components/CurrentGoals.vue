<template>
  <div class="flip-card">
    <div class="flip-card-inner" :class="{ 'is-flipped': isFlipped }">
      <div class="flip-card-front clickable">
        <!-- <span
            v-if="goal.reminders.items && goal.reminders.items.length == 0 "
            @click="openNewReminderForm"       
            class="newGoalBtn"
            ><small>Click here to achieve your goals</small> -->
        <span class="newGoalBtn3">
          <v-tooltip max-width="200" bottom>
            <div>Add Activity</div>
            <template v-slot:activator="{ on }">
              <div v-on="on" class="activitiesIcon activitiesCount" @click="openNewReminderForm">


                <span v-if="goal && goal.reminders.items && goal.reminders.items.length > 0">
                  <v-icon class="mr-1" color="white">mdi-yoga</v-icon>
                  <v-badge class="completed-count" :content="goal.reminders.items.length" color="success"></v-badge>
                </span>
                <span v-else>
                  <v-icon class="mr-1" color="white">mdi-yoga</v-icon>
                  <v-badge class="completed-count ml-1" :content="'0'" color="error"></v-badge>
                </span>
              </div>
            </template>
          </v-tooltip>
        </span>
        <span class="newGoalBtn3">
          <!-- <v-tooltip
              max-width="200"
              bottom
            >
            <div>{{ categoryString(goal.category) }}</div>
           <template v-slot:activator="{ on }">
            <div v-on="on" class="icon"
              > <v-icon color="white">{{
                categoryIcon(goal.category)
              }}</v-icon
              ></div
            >
           </template>
          
              </v-tooltip> -->
        </span>
        <div @click="isFlipped = !isFlipped" class="testC">
          <div class=" 
            px-3
            d-flex
            align-center
            justify-center     
            ">

            <v-tooltip max-width="200" bottom>
              <div>Due Date</div>
              <template v-slot:activator="{ on }">
                <div v-on="on" class="dueDate">
                  <v-icon color="white" small left class="mr-1">mdi-calendar</v-icon>
                  <small>{{ new Date(goal.dueDate).toLocaleDateString() }}</small>
                </div>
              </template>
            </v-tooltip>

            <div class="jw font-weight-bold pt-3">
              <h3 class="goalTitle">
                <v-tooltip max-width="200" bottom>
                  <div class="d-inline">{{ categoryString(goal.category) }}</div>
                  <template v-slot:activator="{ on }">
                    <div v-on="on" class="d-inline">
                      <v-icon color="white">{{
                          categoryIcon(goal.category)
                      }}</v-icon>
                    </div>
                  </template>
                </v-tooltip>
                {{ goal.title }}
              </h3>
            </div>

            <!-- Progress Bar -->
            <div class="d-flex align-center goal-progressbar pt-2 px-2">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-progress-linear :value="getGoalProgressValue(goal.reminders.items)" height="10" striped rounded
                    color="lime" v-bind="attrs" v-on="on"></v-progress-linear>
                </template>
                <span>{{ goal.reminders.items[0] ? Math.round(getGoalProgressValue(goal.reminders.items)) : 0 }}%</span>
              </v-tooltip>
            </div>
          </div>
        </div>

      </div>
      <div class="justify-space-between flip-card-back">
        <span class="addActivityBtn">
          <v-tooltip max-width="200" bottom>
            <div>Add Activity</div>
            <template v-slot:activator="{ on }">
              <div v-on="on">
                <span @click="openNewReminderForm" v-if="goal.reminders.items && goal.reminders.items.length < 1">
                  <v-icon small>mdi-plus</v-icon>
                  <v-icon>mdi-yoga</v-icon>
                </span>

              </div>
            </template>
          </v-tooltip>
        </span>
        <div class="clickable py-4 px-4">
          <v-icon class="editBtn" @click="openGoalForm(goal)" right>mdi-square-edit-outline</v-icon>

          <div class="row" @click="isFlipped = !isFlipped">
            <div class="col">
              <h5 class="orangeLabel d-flex">
                GOAL ACTIVITIES
              </h5>

            </div>
            <div class="col pr-0">
              <h5 class="orangeLabel d-flex">
                COMPLETED
              </h5>
            </div>
            <!-- <div class="col pl-0"> -->
            <!-- <v-progress-circular
              :rotate="360"
              :size="100"
              :width="15"
              :value="goal.completedCount / goal.stepCount "
              color="primary"
            >
             {{ goal.completedCount / goal.stepCount }} %
            </v-progress-circular>  -->
            <!-- <h5 class="orangeLabel pt-1 d-flex">
             GOAL PROGRESS
            </h5>    -->
            <!-- <v-progress-circular
              :rotate="360"
              :size="100"
              :width="15"
              :value="(goal.progress / goal.stepCount) * 100"
              color="primary"
            >
              {{ (goal.progress / goal.stepCount) * 100 }}%
            </v-progress-circular> -->
            <!-- </div>               -->
          </div>
          <div class="progressWrapper">
            <div class="row mt-0">
              <div class="col pt-0">
                <span v-if="goal.reminders.items && goal.reminders.items.length > 0">
                  <span v-for="item, i in goal.reminders.items" :key="i">
                    <h5 v-if="item.activity">{{ item.activity }}</h5>
                    <h5 v-else>{{ item.category }}</h5>
                  </span>
                </span>
                <span v-else>
                </span>
              </div>

              <div class="col pt-0 pr-0">
                <!-- The follwoing two span can be replaced once activities are ready to save progress -->
                <span v-if="goal.reminders.items && goal.reminders.items.length > 0">
                  <span v-for="g, i in goal.reminders.items" :key="i">
                    <h5>{{ getCompletedActivities(capitalizeFirstLet((g.category).toLowerCase()),
                        checkForNA(g.level)).length
                    }} of {{ getActivities(capitalizeFirstLet((g.category).toLowerCase()), checkForNA(g.level)).length}}</h5>
                  </span>
                </span>
              </div>
            </div>
          </div>

        </div>

        <!-- <span class="">
        Activities
        -->
        <!-- <v-checkbox
            v-for="(item, index) in reminders.filter(t => t.category == goal.category)"
            v-model="item.isComplete"
            @change="update(goal)"
            :key="index"
            class="mt-1"
            hide-details
            color="var(--mh-orange)"
          > -->
        <!-- <v-checkbox
            v-for="(item, index) in reminders.filter(t => t.category == goal.category)"
            @change="update(goal)"
            :key="index"
            class="mt-1"
            hide-details
            color="var(--mh-orange)"
          >
            <template v-slot:label
              ><div class="text-body-2">{{ item.contentType }}</div></template
            >
          </v-checkbox> -->
        <!-- <div class="d-block d-sm-flex justify-sm-end mt-5">
            <v-btn
              @click="openGoalForm(goal)"
              color="#2f53b6"
              :block="$vuetify.breakpoint.xsOnly"
              small
              outlined
              ><v-icon small left>mdi-pencil</v-icon>Edit Goal</v-btn
            >
          </div> -->


        <!-- <p class="d-flex justify-space-between text-caption ma-0">
            <span class="font-weight-bold">Category: </span
            ><v-chip x-small color="white"
              ><v-icon class="mr-1" x-small>{{
                categoryIcon(goal.category)
              }}</v-icon
              >{{ categoryString(goal.category) }}</v-chip
            >
          </p>
          <p class="d-flex justify-space-between text-caption ma-0">
            <span class="font-weight-bold">Last Completed: </span
            >{{ new Date(goal.updatedAt).toDateString() }}
          </p>
          <p class="d-flex justify-space-between text-caption">
            <span class="font-weight-bold">Completed Count: </span
            >{{ goal.completedCount }}
          </p> -->
        <!-- </span> -->

        <v-tooltip :disabled="incompleteGoals.length < 5" max-width="200" bottom>
          <!-- <template v-slot:activator="{ on }">
            <div v-on="on" class="d-flex justify-center">
              <v-btn
                @click="repeatGoal(goal)"
                :disabled="incompleteGoals.length > 4"
                outlined
                dark
                >Repeat Goal</v-btn
              >
            </div>
          </template> -->
          <div class="text-center">Active Goals maximum has been met</div>
        </v-tooltip>
      </div>
    <v-dialog v-model="activityDialog" max-width="600px">
      <v-card :disabled="saving" :loading="saving">
        <v-card-title
          ><span >Add New Activity</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="a_valid">        
            <!-- <v-select
              v-model="reminder.activity"
              :items="activities"
              item-text="title"
              item-value="title"
              label="Select Activity"
              :rules="[(v) => !!v || 'Activity required']"
              required
            ></v-select> -->
            <v-select
              v-model="reminder.activity"
              :items="filteredCategories"
              item-text="title"
              item-value="value"
              label="Select Activity"
              :rules="[(v) => !!v || 'Activity required']"
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
          <v-btn @click="activityDialog = false" color="secondary" outlined
            >Cancel</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
      <v-dialog v-model="dialog" width="750">
        <v-card :disabled="saving" :loading="saving">
          <v-card-title class="text-right pt-2 pb-0">
            <!-- <span v-if="goal.id">Edit Goal</span><span v-else><h2><b class="goalHeaders">Set A Goal...</b></h2></span>
          <v-spacer></v-spacer> -->
            <v-btn @click="closeGoalForm" fab depressed x-small outlined>
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-form ref="goalform" v-model="valid">
              <v-text-field v-model="goal.title" label="Goal" :rules="[(v) => !!v || 'Goal is required']" required>
              </v-text-field>
              <v-select v-model="goal.category" :items="filteredCategories" item-text="title" item-value="value"
                label="Focus Area" :rules="[(v) => !!v || 'Improvement category is required']" required></v-select>
              <!-- <v-text-field
              :disabled="goal.id != null || goal.id != undefined"
              v-model.number="goal.stepCount"
              @change="updateSteps"
              label="Number of Goal Steps"
              type="number"
              min="1"
              max="10"
              :rules="[
                (v) => !!v || 'Step Count is required',
                (v) => v > 0 || 'Must be greater than 0',
                (v) => v < 11 || 'Max Step Count is 10',
              ]"
              required
            ></v-text-field> -->
              <!-- <v-text-field
              v-model="goal.checklist[index].title"
              v-for="(step, index) in goal.checklist"
              :key="index"
              :label="`Step ${index + 1} Description`"
              :rules="[(v) => !!v || 'Step Description is required']"
              required
            ></v-text-field> -->
              <v-menu v-model="menu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition"
                offset-y min-width="auto">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field v-model="goal.dueDate" label="I want to accomplish this goal by..."
                    prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"
                    :rules="[(v) => !!v || 'Date required']" required></v-text-field>
                </template>
                <v-date-picker v-model="goal.dueDate" @input="menu = false"></v-date-picker>
              </v-menu>
            </v-form>
          </v-card-text>
          <v-card-actions class="d-flex justify-end">
            <v-btn @click="saveGoal" class="px-10" color="var(--mh-blue)" depressed dark>Save</v-btn>
            <v-btn v-if="goal.id" color="error" @click="deleteGoal({ id: goal.id })" outlined>
              <v-icon>
                mdi-trash-can-outline
              </v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import utilitiesMixin from "../mixins/utilities-mixin";
import videosMixin from "../mixins/videos-mixin";

export default {
  mixins: [utilitiesMixin, videosMixin],
  props: {
    goal: {
      type: Object,
    },
  },
  data() {
    return {
      isFlipped: false,
      activityDialog: false,
      dialog: false,
      reminder: {
        category: "",
        level: this.userPrefLevel,
        activity: "",
        frequency: "",
        contentType: "",
        time: null,
      },
      valid: true,
      a_valid: true,
      menu: false,
    };
  },
  computed: {
    ...mapGetters(["incompleteGoals", "reminders", "saving", "preferences"]),
    userPrefLevel() {
      // return this.reminders
      if (this.preferences && this.preferences[0] && this.goal) {
        console.log("yes")
        console.log(this.preferences)
        let strength = this.preferences[0].preference_items.map(t => t && t.category == "Strength")
        let flex = this.preferences[0].preference_items.map(t => t && t.category == "Flexibility & Mobility")
        let balance = this.preferences[0].preference_items.map(t => t && t.category == "Balance")
        let nutri = this.preferences[0].preference_items.map(t => t && t.category == "Nutrition")
        let rec = this.preferences[0].preference_items.map(t => t && t.category == "Recovery")
        let erg = this.preferences[0].preference_items.map(t => t && t.category == "Ergonomics")
        let endur = this.preferences[0].preference_items.map(t => t && t.category == "Endurance")
        if (this.goal.category == 'STRENGTH' && strength) {
          return this.strengthLevel
        }
        if (this.goal.category == 'BALANCE' && balance) {
          return this.balanceLevel
        }
        if (this.goal.category == 'ENDURANCE' && endur) {
          return this.enduranceLevel
        }
        if (this.goal.category == 'NUTRITION' && nutri) {
          return this.nutritionLevel
        }
        if (this.goal.category == 'RECOVERY' && rec) {
          return this.recLevel
        }
        if (this.goal.category == 'ERGONOMICS' && erg) {
          return this.ergLevel
        }
        if (this.goal.category == 'FLEXIBILITY_MOBILITY' && flex) {
          return this.flexLevel
        } else return ""

      } else {
        return ""
      }
    },
  },
  methods: {
    ...mapActions(["updateGoalById", "addGoal", "removeGoal", "addReminder", "fetchReminders"]),
    log(e) {
      console.log(e)
    },
    openNewReminderForm() {
      console.log("this works")
      this.resetForm();
      this.activityDialog = true;
      if (this.$refs.form) {
        this.$refs.form.resetValidation();
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
    openGoalForm(goal) {
      this.dialog = true;
      this.goal = goal;
    },
    closeGoalForm() {
      this.dialog = false;
    },
    async saveGoal() {
      if (!this.$refs.goalform.validate()) {
        return;
      }
      try {
        if (this.goal.id) {
          console.log(this.goal.id)
          await this.updateGoalById({
            id: this.goal.id,
            title: this.goal.title,
            category: this.goal.category,
            dueDate: this.goal.dueDate,
            progress: this.goal.progress,
            checklist: this.goal.checklist,
          });
        } else {
          // console.log(this.goal)
          await this.addGoal(this.goal);
        }
      } catch (error) {
        console.log(error);
      }
      this.closeGoalForm();
    },
    async deleteGoal(id) {
      try {
        await this.removeGoal(id);
      } catch (error) {
        console.log(error);
      }
      this.closeGoalForm();
    },
    async saveReminder() {
      if (!this.$refs.form.validate()) {
        return;
      }

      try {
        this.reminder.level = this.userPrefLevel
        this.reminder.category = this.goal.category
        this.reminder.contentType = 'Videos'
        this.reminder.goalId = this.goal.id
        await this.addReminder(this.reminder);

        // Close form and reset form values
        this.activityDialog = false;
        this.resetForm();
      } catch (error) {
        console.log(error);
      }
    },
    goToActivities() {
      console.log("this works")
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
  },
};
</script>

<style scoped>
.progressWrapper {
  overflow-y: scroll;
  overflow-x: hidden;
}

.editBtn {
  position: absolute;
  top: 5%;
  right: 1.5%;
  color: var(--mh-green);
  font-weight: 300 !important;
}

.turnOver {
  position: absolute;
  right: 4%;
  bottom: 5%
}

.lowerCase {
  text-transform: lowercase;
}

.dueDate {
  position: absolute;
  bottom: 12%;
  left: 4%;
  color: white !important;
}

.activitiesIcon {
  position: absolute;
  bottom: 12%;
  right: 3%;
  color: white !important;
}

/* .activitiesCount {transition: all .2s ease-in-out;}
.activitiesCount:hover { transform: scale(1.2); } */
.newGoalBtn {
  color: white !important;
  top: 60%;
  position: absolute;
  margin: 0 auto;
  display: block;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}

.newGoalBtn2 {
  color: white !important;
  bottom: 12%;
  right: 45%;
  position: absolute;
  margin: 0 auto;
  display: block;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}

.newGoalBtn3 {
  color: white !important;
  bottom: 12%;
  right: 8%;
  position: absolute;
  margin: 0 auto;
  display: block;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}

.icon {
  position: absolute;
  bottom: 13%;
  right: 4%;
  color: white !important;
}

.arrowIcon {
  position: absolute;
  bottom: 5%;
  right: 2.5%;
  color: var(--mh-orange) !important;
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
  overflow-y: hidden;
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
}

/* Style the back side */
.flip-card-back {
  color: var(--mh-blue);
  background-color: white;
  transform: rotateY(180deg);
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

.activityActions {
  position: absolute;
  bottom: 5%;
}

.text-right {
  justify-content: right;
}

.orangeLabel {
  color: var(--mh-orange)
}

.testC {
  height: 100%;
}

.addActivityBtn {
  position: absolute;
  top: 30%;
  left: 10%;
  cursor: pointer;
}
</style>
