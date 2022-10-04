<template>
  <div class="bg-img">
    <div class="bg-overlay">
      <div class="        
        align-center
        mt-2
        mb-2 mb-sm-2
        mt-sm-4
      ">
        <div class="d-flex justify-space-between align-center">
          <span>
            <h2 v-if="!showCompleted"><b class="goalHeaders">MY CURRENT GOALS</b></h2>
            <h2 v-else><b class="goalHeaders">MY COMPLETED GOALS</b></h2>
          </span>
          <v-switch class="align-right" v-model="showCompleted" label="Show Completed" color="#2f53b6">
          </v-switch>
        </div>
        <v-tooltip :disabled="incompleteGoals.length < 5" max-width="200" bottom>
          <div class="text-center">Active Goals maximum has been met</div>
        </v-tooltip>
      </div>
      <v-divider class="mb-4"></v-divider>
      <div>
        <v-row>
          <v-col v-if="!showCompleted" cols="12" sm="6" md="4" lg="3">
            <div class="newGoalCard">
              <div class="newGoalCardInner">
                <div class="newGoalDiv">
                  <v-btn @click="openNewGoalForm" class="newGoalBtn" outlined elevation="2"
                    :disabled="validCategories.length < 1">
                    <v-icon class="checkmark">mdi-flag-checkered</v-icon>SET A GOAL...
                  </v-btn>
                </div>

              </div>
            </div>
          </v-col>
          <v-col v-for="goal in completedGoals" v-show="showCompleted" :key="goal.id" cols="12" sm="6" md="4" lg="3"
            class="goalCol">
            <CurrentGoals :goal="goal" />
          </v-col>
          <v-col v-for="goal in incompleteGoals" v-show="!showCompleted" :key="goal.id" cols="12" sm="6" md="4" lg="3"
            class="goalCol">
            <CurrentGoals :goal="goal" />
          </v-col>
        </v-row>
      </div>
      <!-- Dialog Form -->
      <v-dialog v-model="dialog" width="650">
        <v-card :disabled="saving" :loading="saving">
          <v-card-title class="text-right pt-2 pb-0">
            <!-- <span v-if="goal.id">Edit Goal</span><span v-else><h2><b class="goalHeaders">Set A Goal...</b></h2></span>
            <v-spacer></v-spacer> -->
          </v-card-title>
          <v-card-text>
            <v-form ref="goalform" v-model="valid">
              <!-- <v-text-field
                v-model="goal.title"
                label="My Goal is..."
                :rules="[(v) => !!v || 'Goal title is required']"
                required
              ></v-text-field> -->
              <v-select v-model="goal.category" :items="validCategories" item-text="title" item-value="value"
                label="I want to improve my..." :rules="[(v) => !!v || 'Improvement category is required']" required>
              </v-select>

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
            <v-tooltip max-width="200" bottom>
              <div>Save</div>
              <template v-slot:activator="{ on }" >
                <v-btn @click="saveGoal" class="px-2 mr-2" v-on="on" color="var(--mh-blue)" depressed dark small>
              <v-icon>mdi-content-save</v-icon>
            </v-btn>
              </template>
            </v-tooltip>
            <v-tooltip max-width="200" bottom>
            <div>Cancel</div>
            <template v-slot:activator="{ on }">
              <v-btn @click="closeGoalForm" v-on="on" depressed outlined small>
              <v-icon>mdi-cancel</v-icon>
            </v-btn>
            </template>
            </v-tooltip>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- Confetti Dialog Form -->
      <v-dialog v-model="goalCompleteDialog" max-width="344">
        <v-card class="mx-auto" max-width="344">
          <v-img src="../../assets/trophy.jpg" height="200px"></v-img>
          <v-card-title>
            CONGRATULATIONS!
          </v-card-title>
          <v-card-subtitle>
            You completed your <span><b>{{confettiGoalName}}</b></span> goal!
          </v-card-subtitle>
          <v-card-actions>
            <!-- <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn x-small class="text-light mx-1" color="blue" v-bind="attrs" v-on="on"><v-icon small color="white"> mdi-content-save</v-icon>
                </v-btn>
              </template>
              <span>Save</span>
            </v-tooltip> -->
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn x-small class="text-light mx-1" color="green" v-if="confettiGoal"
                  @click="reuseGoal(confettiGoal.reminders.items)">
                  <v-icon small color="white" v-bind="attrs" v-on="on"> mdi-recycle-variant</v-icon>
                </v-btn>
              </template>
              <span>Do it again!</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn x-small class="text-light mx-1" color="red darken-1" @click="deleteGoal({ id: confettiGoal.id })"
                  v-bind="attrs" v-on="on">
                  <v-icon small color="white"> mdi-trash-can-outline </v-icon>
                </v-btn>
              </template>
              <span>Delete</span>
            </v-tooltip>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>

</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import utilitiesMixin from "../../mixins/utilities-mixin";
import videosMixin from "../../mixins/videos-mixin";
import CurrentGoals from "../../components/CurrentGoals.vue";

export default {
  name: "Goals",
  mixins: [utilitiesMixin, videosMixin],
  components: {
    // GoalCard,
    CurrentGoals,
  },
  data() {
    return {
      goalFormTabs: [
        'Select Improve Goal', 'Create Your Own Goal'
      ],
      tabs: null,
      dialog: false,
      show: false,
      showCompleted: false,
      goalCompleteDialog: false,
      confettiGoalName: '',
      confettiGoal: null,
      improvementGoal: true,
      createOwnGoal: false,
      isFlipped: false,
      valid: true,
      menu: false,
      category: '',
      goal: {
        id: 0,
        title: "",
        category: "",
        dueDate: "",
        progress: 0,
        stepCount: 1,
        isComplete: false,
        completedCount: 0,
        checklist: [{ title: "", isComplete: false }],
      },
    };
  },
  methods: {
    ...mapActions(["addGoal", "fetchGoals", "removeGoal", "updateGoalById"]),
    // log(e) {
    //   console.log(e)
    // },
    goalComplete() {
      this.goalCompleteDialog = true
      console.log("goal completion btn works")
      this.$confetti.start();
    },
    stopCon() {
      this.$confetti.stop();
    },
    async reuseGoal(goalReminders) {
      console.log(goalReminders)
      for (let i = 0; i < goalReminders.length; i++) {
        // console.log(items[i]);
        let filtered = this.watchedVideos.filter(v => v.category == this.capitalizeFirstLet((this.checkForFlex(goalReminders[i].category)).toLowerCase()) && v.level == this.checkForNA(goalReminders[i].level))
        console.log(filtered)
        filtered.forEach(v => {
          this.removeWatchedVideo({ id: v.id })
        })
        this.updateGoalById({
          id: this.confettiGoal.id,
          isComplete: false,
          completedCount: 0,
        });
      }
    },
    async saveGoal() {
      if (!this.$refs.goalform.validate()) {
        return;
      }
      try {
        if (this.goal.id) {
          console.log(this.goal.category)
          await this.updateGoalById({
            id: this.goal.id,
            title: this.goal.title,
            category: this.goal.category,
            dueDate: this.goal.dueDate,
            progress: this.goal.progress,
            checklist: this.goal.checklist,
          });
        } else {
          console.log(this.goal)
          if (this.improvementGoal) {
            this.goal.title = "I want to improve my " + this.goal.category.toLowerCase()
          }
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
    improveGoalToggle() {
      this.createOwnGoal = !this.createOwnGoal
      this.improvementGoal = true
      console.log("default Goal Toggle")
    },
    createGoalToggle() {
      this.improvementGoal = !this.improvementGoal
      this.createOwnGoal = true
      console.log("create Goal Toggle")
    },
    handleClick(e) {
      console.log(e)
    },
    openNewGoalForm() {
      this.dialog = true;
      if (this.$refs.goalform) {
        this.$refs.goalform.resetValidation();
      }
      this.category = this.goal.category.toUpperCase()
      this.goal = {
        category: "",
        dueDate: "",
        progress: 0,
        stepCount: 1,
        completedCount: 0,
        title: "",
        checklist: [{ title: "", isComplete: false }],
      };
    },
    // openGoalForm(goal) {
    //   this.dialog = true;
    //   this.goal = goal;
    // },
    closeGoalForm() {
      this.dialog = false;
    },
    updateSteps(length) {
      let checklistLength = this.goal.checklist.length;

      if (length < 1 || length > 10) {
        return;
      } else if (checklistLength < length) {
        let difference = length - checklistLength;
        this.goal.checklist = [
          ...this.goal.checklist,
          ...this.createChecklist(difference),
        ];
      } else {
        this.goal.checklist = this.goal.checklist.slice(0, length);
      }
    },
    createChecklist(length) {
      let list = [];
      for (let i = 0; i < length; i++) {
        list.push({ isComplete: false, title: "" });
      }
      return list;
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
  },
  computed: {
    ...mapGetters(["completedGoals", "incompleteGoals", "saving", "goals", 'watchedVideos']),
    validCategories() {
      let allSavedGoals = this.goals.map(t => t.category)
      return this.filteredCategories.filter(fC => !allSavedGoals.includes(fC.value))
    }
  },
  async mounted() {
    this.fetchGoals();
  },
  watch: {
    goals() {
      let gReminders = this.goals.filter(t => t && t.reminders.items.length > 0)
      console.log(gReminders)
      for (let i = 0; i < gReminders.length; i++) {
        if (Math.round(this.getGoalProgressValue(gReminders[i].reminders.items)) == 100 &&
          gReminders[i].completedCount == 0) {
          this.goalCompleteDialog = true
          this.confettiGoalName = gReminders[i].category
          this.confettiGoal = gReminders[i]
          this.updateGoalById({
            id: gReminders[i].id,
            isComplete: true,
            completedCount: 1,
          });
          console.log(gReminders[i])
          this.$confetti.start();
          setTimeout(() => { this.$confetti.stop() }, 3500)
        }
      }
    }
  }
};
</script>

<style scoped>
/* .goalCol { transition: all .2s ease-in-out; }
.goalCol:hover { transform: scale(1.02); } */
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
  height: 130px;
  /* background-color: rgba(29,	51,	111,0.85); */
  perspective: 1000px;
  /* Remove this if you don't want the 3D effect */
}

.newGoalCardInner {
  width: 100%;
  height: 100%;
  background-color: rgba(29, 51, 111, 0.40);
  -webkit-backface-visibility: hidden;
  /* Safari */
  backface-visibility: hidden;
  border-radius: 4px;
  box-shadow: 0px 6px 6px -3px rgba(0, 0, 0, 0.2),
    0px 10px 14px 1px rgba(0, 0, 0, 0.14), 0px 4px 18px 3px rgba(0, 0, 0, 0.12) !important;
}


.goalHeaders {
  color: var(--mh-blue);
}

.pic {
  /* background: url('../../assets/goals.jpg'); */
  background-size: 400px;
  background-repeat: no-repeat;
}

.pagePic {
  background: url('../../assets/goals.jpg');
  background-size: 200px;
  width: 200px;
  border-radius: 50%;
  background-repeat: no-repeat;
  height: 150px;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 2fr auto;
}

@media (max-width: 600px) {
  .grid {
    grid-template-columns: 1fr;
  }

  .grid div:first-child {
    grid-column: 1 / 1;
    grid-row-start: 2;
  }

  .grid div:nth-child(2) {
    grid-row-start: 3;
    grid-column: 1 / 1;
  }
}

.goal-progress-text {
  color: gray;
}

.goal-progressbar {
  width: 100%;
}

.placeholder-text {
  color: rgba(0, 0, 0, 0.38);
}

.flip-card {
  background-color: transparent;
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
  background-color: var(--mh-green);
}

/* Style the back side */
.flip-card-back {
  background-color: var(--mh-blue);
  color: white;
  transform: rotateY(180deg);
}

.bg-img {
  /* padding: 20px; */
  background: url(../../assets/goals.jpg) no-repeat center center fixed;
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

.bg-overlay {
  background-color: rgba(255, 255, 255, 0.6) !important;
  min-height: 80vh;
  min-width: 1024px;
  width: 100%;
  height: 100%;
  padding: 20px;
  border-radius: .25rem;
}
</style>
