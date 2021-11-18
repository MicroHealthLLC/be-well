<template>
  <v-row>
    <v-col>
      <!-- Goals Table -->
      <span class="text-h6 text-sm-h5">Create Your Own Goals</span>
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
                  goal.category
                }}</v-chip>
                <v-chip color="info" outlined small
                  >Due Date: {{ goal.dueDate }}</v-chip
                >
              </div>
            </div>
            <v-slider
              class="d-flex align-center mt-10 mt-sm-0"
              v-model="goal.progress"
              thumb-label="always"
              hide-details
            ></v-slider>
          </div>

          <v-divider v-if="index != goals.length - 1"></v-divider>
        </div>
        <div v-if="goals.length > 0" class="d-flex justify-space-between mt-10">
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
            text
            color="info"
            :small="$vuetify.breakpoint.xsOnly"
            >Schedule Activity Reminders
            <v-icon class="ml-2" small>mdi-arrow-right</v-icon></v-btn
          >
        </div>
      </v-card>

      <!-- Latest Videos -->
      <span class="text-h6 text-sm-h5">Latest Videos</span>
      <v-divider class="mb-4"></v-divider>

      <div class="grid-container mb-6">
        <v-card v-for="(video, index) in videos" :key="index" elevation="5">
          <img class="image" :src="video.img" width="100%" />
          <v-card-title>{{ video.title }}</v-card-title>
          <v-card-subtitle>{{ video.author }}</v-card-subtitle>
          <v-card-text>
            {{ video.text }}
          </v-card-text>
          <v-card-actions class="align-end">
            <v-btn text color="primary">View</v-btn>
            <v-btn text color="primary">Add Reminder</v-btn>
          </v-card-actions>
        </v-card>
      </div>

      <!-- Latest Podcasts -->
      <span class="text-h6 text-sm-h5">Latest Podcasts</span>
      <v-divider class="mb-4"></v-divider>

      <div class="grid-container mb-6">
        <v-card v-for="(podcast, index) in podcasts" :key="index" elevation="5">
          <img class="image" :src="podcast.img" width="100%" />
          <v-card-title>{{ podcast.title }}</v-card-title>
          <v-card-subtitle>{{ podcast.author }}</v-card-subtitle>
          <v-card-text>
            {{ podcast.text }}
          </v-card-text>
          <v-card-actions class="align-end">
            <v-btn text color="primary">View</v-btn>
            <v-btn text color="primary">Add Reminder</v-btn>
          </v-card-actions>
        </v-card>
      </div>

      <!-- Latest Articles -->
      <span class="text-h6 text-sm-h5">Latest Articles</span>
      <v-divider class="mb-4"></v-divider>

      <div class="grid-container">
        <v-card v-for="(article, index) in articles" :key="index" elevation="5">
          <img class="image" :src="article.img" width="100%" />
          <v-card-title>{{ article.title }}</v-card-title>
          <v-card-subtitle>{{ article.author }}</v-card-subtitle>
          <v-card-text>
            {{ article.text }}
          </v-card-text>
          <v-card-actions class="align-end">
            <v-btn text color="primary">View</v-btn>
            <v-btn text color="primary">Add Reminder</v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </v-col>
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
          <v-form ref="form" v-model="valid">
            <v-text-field v-model="goal.title" label="Title"></v-text-field>
            <v-select
              v-model="goal.category"
              :items="categories"
              label="Category"
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
          <v-btn @click="saveGoal" class="px-10" color="var(--mh-blue)" depressed dark
            >Submit</v-btn
          >
          <v-btn @click="removeGoal({ id: goal.id })" outlined>Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      dialog: false,
      valid: true,
      menu: false,
      categories: [
        "Endurance",
        "Ergonomics",
        "Meditation",
        "Muscle Tone/Movement",
        "Posture",
        "Stress Relief",
        "Stretching",
        "Yoga",
      ],
      goal: {
        id: 0,
        title: "",
        category: "",
        dueDate: "",
        progress: 0,
      },
      articles: [
        {
          title: "Title 1",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          author: "First-name Last-name",
          img: "/img/ergonomics.jpg",
        },
        {
          title: "Title 2",
          text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          author: "First-name Last-name",
          img: "/img/meditate.jpg",
        },
        {
          title: "Title 3",
          text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          author: "First-name Last-name",
          img: "/img/nutrition.jpg",
        },
      ],
      videos: [
        {
          title: "Title 4",
          text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          author: "First-name Last-name",
          img: "/img/yoga.jpg",
        },
        {
          title: "Title 5",
          text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          author: "First-name Last-name",
          img: "/img/weight-training.jpg",
        },
        {
          title: "Title 6",
          text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          author: "First-name Last-name",
          img: "/img/endurance.jpg",
        },
      ],
      podcasts: [
        {
          title: "Title 7",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          author: "First-name Last-name",
          img: "/img/challenge.jpg",
        },
        {
          title: "Title 8",
          text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          author: "First-name Last-name",
          img: "/img/posture.jpg",
        },
        {
          title: "Title 9",
          text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          author: "First-name Last-name",
          img: "/img/stretching.jpg",
        },
      ],
    };
  },
  methods: {
    ...mapActions(["addGoal", "fetchGoals", "removeGoal", "updateGoalById"]),
    async saveGoal() {
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
    },
    async deleteGoal(id) {
      try {
        await this.removeGoal(id);
      } catch (error) {
        console.log(error);
      }
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
  mounted() {
    this.fetchGoals();
  },
};
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}
.image {
  max-height: 200px;
  object-fit: cover;
}
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
.clickable {
  cursor: pointer;
}
</style>
