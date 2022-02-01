<template>
  <div>
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
        <span class="text-h6 text-sm-h5">My Goals</span>
      </div>
      <v-tooltip :disabled="incompleteGoals.length < 5" max-width="200" bottom>
        <template v-slot:activator="{ on }">
          <div v-on="on">
            <v-btn
              @click="openNewGoalForm"
              color="#2f53b6"
              class="my-5 my-sm-0"
              :disabled="!(incompleteGoals.length < 5)"
              :dark="incompleteGoals.length < 5"
              :block="$vuetify.breakpoint.xsOnly"
              >Add New</v-btn
            >
          </div>
        </template>
        <div class="text-center">Active Goals maximum has been met</div>
      </v-tooltip>
    </div>
    <v-divider class="mb-4"></v-divider>
    <!-- Goals Table -->
    <v-card class="pa-4 mb-4" elevation="5">
      <div
        v-if="incompleteGoals.length == 0"
        class="d-flex text-center flex-column"
      >
        <div class="mt-4">
          <v-icon color="grey" x-large>mdi-flag</v-icon>
          <p class="placeholder-text">You currently have no Goals set</p>
        </div>
      </div>

      <div v-else v-for="(goal, index) in incompleteGoals" :key="index">
        <div class="grid my-4">
          <div class="text-subtitle-2 clickable">
            <div @click="openGoalForm(goal)">
              <v-icon class="mr-2" color="#2f53b6">mdi-flag</v-icon
              >{{ goal.title }}
            </div>
            <div class="mt-2">
              <v-chip class="mr-2" color="#2f53b6" outlined small
                ><v-icon class="mr-1" small>{{
                  categoryIcon(goal.category)
                }}</v-icon
                >{{ categoryString(goal.category) }}</v-chip
              >
              <v-chip title="Due Date" color="#2f53b6" outlined small>{{ goal.dueDate }}</v-chip>
              <div v-if="goal.progress == 100" class="d-inline text-h5">🎉</div>
            </div>
          </div>
          <!-- Progressbar -->
          <div
            class="
              d-flex
              flex-column
              d-sm-flex
              flex-sm-row
              align-sm-center
              mt-3 mt-sm-0
            "
          >
            <div class="d-flex align-center goal-progressbar">
              <v-progress-linear
                :value="(goal.progress / goal.stepCount) * 100"
                color="var(--mh-green)"
                height="20"
                rounded
              ></v-progress-linear>
              <div class="text-sm-h5 font-weight-bold ml-5 mx-sm-5">
                <span class="goal-progress-text">{{ goal.progress }}</span
                >/{{ goal.stepCount }}
              </div>
            </div>
            <v-btn-toggle
              class="mx-auto mx-sm-0 mt-3 mt-sm-0"
              dense
              rounded
              dark
              background-color="white"
            >
              <v-btn
                @click="updateGoalProgress(goal)"
                color="#2f53b6"
                :small="$vuetify.breakpoint.xsOnly"
                ><v-icon :small="$vuetify.breakpoint.xsOnly"
                  >mdi-plus-circle</v-icon
                ></v-btn
              >
              <v-btn
                @click="decreaseGoalProgress(goal)"
                color="#2f53b6"
                :small="$vuetify.breakpoint.xsOnly"
                ><v-icon>mdi-minus</v-icon></v-btn
              >
            </v-btn-toggle>
          </div>
        </div>
        <v-divider v-if="index != incompleteGoals.length - 1"></v-divider>
      </div>
      <!-- Reminders Link -->
      <div v-if="incompleteGoals.length > 0" class="d-flex justify-end mt-10">
        <v-btn
          to="/activities"
          class="mt-4 mt-sm-0"
          text
          exact-path
          color="info"
          :small="$vuetify.breakpoint.xsOnly"
          >Schedule Activity Reminders
          <v-icon class="ml-2" small>mdi-arrow-right</v-icon></v-btn
        >
      </div>
    </v-card>

    <!-- Completed Goals -->
    <div v-if="completedGoals.length > 0" class="mt-10">
      <span class="text-h6 text-sm-h5">Completed Goals</span>
      <v-divider class="mb-4"></v-divider>
      <v-row>
        <v-col
          v-for="(goal, index) in completedGoals"
          :key="index"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <GoalCard :goal="goal"></GoalCard>
        </v-col>
      </v-row>
    </div>

    <!-- Dialog Form -->
    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-card-title
          ><span v-if="goal.id">Edit Goal</span><span v-else>Add Goal</span>
          <v-spacer></v-spacer>
          <v-btn @click="closeGoalForm" fab depressed x-small outlined
            ><v-icon>mdi-close</v-icon></v-btn
          >
        </v-card-title>
        <v-card-text>
          <v-form ref="goalform" v-model="valid">
            <v-text-field
              v-model="goal.title"
              label="Title"
              :rules="[(v) => !!v || 'Title is required']"
              required
            ></v-text-field>
            <v-select
              v-model="goal.category"
              :items="categories"
              item-text="title"
              item-value="value"
              label="Category"
              :rules="[(v) => !!v || 'Category is required']"
              required
            ></v-select>
            <v-text-field
              :disabled="goal.id != null || goal.id != undefined"
              v-model.number="goal.stepCount"
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
            ></v-text-field>
            <v-menu
              v-model="menu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="goal.dueDate"
                  label="Due Date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  :rules="[(v) => !!v || 'Due Date is required']"
                  required
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="goal.dueDate"
                @input="menu = false"
              ></v-date-picker>
            </v-menu>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-end">
          <v-btn
            @click="saveGoal"
            class="px-10"
            color="var(--mh-blue)"
            depressed
            dark
            >Submit</v-btn
          >
          <v-btn v-if="goal.id" @click="deleteGoal({ id: goal.id })" outlined
            >Delete</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import utilitiesMixin from "../../mixins/utilities-mixin";
import GoalCard from "../../components/GoalCard.vue";

export default {
  name: "Goals",
  mixins: [utilitiesMixin],
  components: {
    GoalCard,
  },
  data() {
    return {
      dialog: false,
      valid: true,
      menu: false,
      goal: {
        id: 0,
        title: "",
        category: "",
        dueDate: "",
        progress: 0,
        stepCount: 1,
        isComplete: false,
        completedCount: 0,
      },
    };
  },
  methods: {
    ...mapActions(["addGoal", "fetchGoals", "removeGoal", "updateGoalById"]),
    async saveGoal() {
      if (!this.$refs.goalform.validate()) {
        return;
      }
      try {
        if (this.goal.id) {
          await this.updateGoalById({
            id: this.goal.id,
            title: this.goal.title,
            category: this.goal.category,
            dueDate: this.goal.dueDate,
            progress: this.goal.progress,
          });
        } else {
          await this.addGoal(this.goal);
        }
      } catch (error) {
        console.log(error);
      }
      this.closeGoalForm();
    },
    async updateGoalProgress(goal) {
      let updatedProgress = goal.progress + 1;
      let isComplete = updatedProgress == goal.stepCount;
      let completedCount = isComplete ? 1 : 0;

      try {
        await this.updateGoalById({
          id: goal.id,
          progress: updatedProgress,
          isComplete: isComplete,
          completedCount: goal.completedCount + completedCount,
        });
      } catch (error) {
        console.log(error);
      }
    },
    async decreaseGoalProgress(goal) {
      let updatedProgress = goal.progress - 1;
      if (updatedProgress < 0) {
        return;
      }

      try {
        await this.updateGoalById({
          id: goal.id,
          progress: updatedProgress,
        });
      } catch (error) {
        console.log(error);
      }
    },
    async deleteGoal(id) {
      try {
        await this.removeGoal(id);
      } catch (error) {
        console.log(error);
      }
      this.closeGoalForm();
    },
    openNewGoalForm() {
      this.dialog = true;
      this.goal = {
        title: "",
        category: "",
        dueDate: "",
        progress: 0,
        stepCount: 1,
        completedCount: 0,
      };
    },
    openGoalForm(goal) {
      this.dialog = true;
      this.goal = goal;
    },
    closeGoalForm() {
      this.dialog = false;
    },
  },
  computed: {
    ...mapGetters(["completedGoals", "incompleteGoals"]),
  },
  async mounted() {
    this.fetchGoals();
  },
};
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
}
@media (max-width: 600px) {
  .grid {
    grid-template-columns: 1fr;
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
</style>