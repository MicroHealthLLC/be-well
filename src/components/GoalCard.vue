<template>
  <div class="flip-card">
    <div class="flip-card-inner" :class="{ 'is-flipped': isFlipped }">
      <div @click="isFlipped = !isFlipped" class="flip-card-front clickable">
        <v-badge
          class="completed-count"
          :content="goal.completedCount"
          color="#2f53b6"
        ></v-badge>
        <div
          class="
            d-flex
            align-center
            justify-center
            card-title
            py-1
            px-5
            clamp-two-lines
            font-weight-bold
          "
        >
          <div>{{ goal.title }}</div>
        </div>
        <div class="pa-4 card-body">
          <transition name="fade"
            ><v-icon v-if="!isFlipped" class="checkmark" x-large color="white"
              >mdi-checkbox-marked-circle-outline</v-icon
            ></transition
          >
        </div>
      </div>
      <div class="d-flex flex-column justify-space-between flip-card-back pa-4">
        <div @click="isFlipped = !isFlipped" class="clickable">
          <p class="d-flex justify-space-between text-caption ma-0">
            <span class="font-weight-bold">Category: </span
            ><v-chip x-small color="white"
              ><v-icon class="mr-1" x-small>{{
                categoryIcon(goal.category)
              }}</v-icon
              >{{ categoryString(goal.category) }}</v-chip
            >
          </p>
          <p class="d-flex justify-space-between text-caption ma-0">
            <span class="font-weight-bold">Completed: </span
            >{{ new Date(goal.updatedAt).toDateString() }}
          </p>
          <p class="d-flex justify-space-between text-caption">
            <span class="font-weight-bold">Completed Count: </span
            >{{ goal.completedCount }}
          </p>
        </div>
        <v-tooltip
          :disabled="incompleteGoals.length < 3"
          max-width="200"
          bottom
        >
          <template v-slot:activator="{ on }">
            <div v-on="on" class="d-flex justify-center">
              <v-btn
                @click="repeatGoal(goal)"
                :disabled="incompleteGoals.length > 2"
                outlined
                dark
                >Repeat Goal</v-btn
              >
            </div>
          </template>
          <div class="text-center">Active goals maximum has been met</div>
        </v-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import utilitiesMixin from "./../mixins/utilities-mixin";

export default {
  mixins: [utilitiesMixin],
  props: {
    goal: {
      type: Object,
    },
  },
  data() {
    return {
      isFlipped: false,
    };
  },
  computed: {
    ...mapGetters(["incompleteGoals"]),
  },
  methods: {
    ...mapActions(["updateGoalById"]),
    repeatGoal(goal) {
      this.updateGoalById({
        id: goal.id,
        progress: 0,
        isComplete: false,
      });
    },
  },
};
</script>

<style scoped>
.checkmark {
  font-size: 64px !important;
}
.card-title {
  background-color: #d1f97c;
  font-size: 12px;
  min-height: 50px;
}
.card-body {
  background-color: var(--mh-green);
}
.clamp-two-lines {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.completed-count {
  position: absolute;
  right: 7px;
  top: 7px;
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
