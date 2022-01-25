<template>
  <div class="mt-2 mb-2 mb-sm-2 mt-sm-4">
    <!-- Goals Table -->
    <span class="text-h6 text-sm-h5">My Goals</span>
    <v-divider class="mb-4"></v-divider>
    <v-card class="pa-4 mb-4" elevation="5">
      <div v-if="goals.length == 0" class="d-flex text-center flex-column">
        <div class="text-body-1 mb-3">You currently have no goals set!</div>
        <div>
          <v-btn
            @click="openNewGoalForm"
            color="var(--mh-blue)"
            dark
            max-width="300"
            ><v-icon class="mr-2">mdi-flag</v-icon> Add Goal</v-btn
          >
        </div>
      </div>

      <div v-else v-for="(goal, index) in goals" :key="index">
        <div class="grid my-4">
          <div class="text-subtitle-2 clickable">
            <div @click="openGoalForm(goal)">
              <v-icon class="mr-2" color="primary">mdi-flag</v-icon
              >{{ goal.title }}
            </div>
            <div class="mt-2">
              <v-chip class="mr-2" color="info" outlined small>{{
                categoryString(goal.category)
              }}</v-chip>
              <v-chip color="info" outlined small
                >Due Date: {{ goal.dueDate }}</v-chip
              >
              <div v-if="goal.progress == 100" class="d-inline text-h5">🎉</div>
            </div>
          </div>
          <v-slider
            @end="updateGoalProgress(goal)"
            class="d-flex align-center mt-10 mt-sm-0"
            v-model="goal.progress"
            thumb-label="always"
            hide-details
          ></v-slider>
        </div>

        <v-divider v-if="index != goals.length - 1"></v-divider>
      </div>
      <div
        v-if="goals.length > 0"
        class="d-flex flex-column flex-sm-row justify-sm-space-between mt-10"
      >
        <v-btn
          v-if="goals.length < 3"
          @click="openNewGoalForm"
          color="var(--mh-blue)"
          :small="$vuetify.breakpoint.xsOnly"
          dark
          >Add Another Goal</v-btn
        >
        <v-btn
          to="/activities"
          class="mt-4 mt-sm-0 ml-sm-auto"
          text
          exact-path
          color="info"
          :small="$vuetify.breakpoint.xsOnly"
          >Schedule Activity Reminders
          <v-icon class="ml-2" small>mdi-arrow-right</v-icon></v-btn
        >
      </div>
    </v-card>

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

export default {
  name: "Goals",
  mixins: [utilitiesMixin],
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
      try {
        await this.updateGoalById({ id: goal.id, progress: goal.progress });
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
    ...mapGetters(["goals"]),
  },
  async mounted() {
    this.fetchGoals();
  },
};
</script>

<style scoped>
::v-deep .v-slider__thumb {
  height: 20px;
  width: 20px;
}
::v-deep .v-slider--horizontal .v-slider__track-container {
  height: 10px;
}
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
@media (max-width: 600px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
