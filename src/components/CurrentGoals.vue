<template>
  <div class="flip-card">
    <div class="flip-card-inner" :class="{ 'is-flipped': isFlipped }">
      <div @click="isFlipped = !isFlipped" class="flip-card-front clickable">
       
        <div
          class=" 
            d-flex
            align-center
            justify-center     
            font-weight-bold"
        >
            <v-tooltip
              max-width="200"
              bottom
            >
            <div >{{ categoryString(goal.category) }}</div>
           <template v-slot:activator="{ on }">
            <div v-on="on" class="icon"
              > <v-icon class="mr-1" color="white">{{
                categoryIcon(goal.category)
              }}</v-icon
              ></div
            >
           </template>
          
              </v-tooltip>
     
           <div class="jw"> <h2 class="goalTitle">{{ goal.title }}</h2></div> 
                <!-- Progress Bar -->
    
            <div class="d-flex align-center goal-progressbar px-2">
              <v-progress-linear
                :value="(goal.progress / goal.stepCount) * 100"
                color="white"
                height="5"
                rounded
              ></v-progress-linear>
              <!-- <div class="text-sm-h5 font-weight-bold ml-5 mx-sm-5">
                <span class="goal-progress-text">{{ goal.progress }}</span
                >/{{ goal.stepCount }}
              </div> -->
            </div> 
          
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
            <span class="font-weight-bold">Last Completed: </span
            >{{ new Date(goal.updatedAt).toDateString() }}
          </p>
          <p class="d-flex justify-space-between text-caption">
            <span class="font-weight-bold">Completed Count: </span
            >{{ goal.completedCount }}
          </p>
        </div>

     <v-expansion-panels>
      <v-expansion-panel>
      <v-expansion-panel-header class="grid">
        Activities
        </v-expansion-panel-header>
         <v-expansion-panel-content>
         <v-checkbox
            v-for="(item, index) in goal.checklist"
            v-model="item.isComplete"
            @change="update(goal)"
            :key="index"
            class="mt-1"
            hide-details
            color="var(--mh-orange)"
          >
            <template v-slot:label
              ><div class="text-body-2">{{ item.title }}</div></template
            >
          </v-checkbox>
          <div class="d-block d-sm-flex justify-sm-end mt-5">
            <v-btn
              @click="openGoalForm(goal)"
              color="#2f53b6"
              :block="$vuetify.breakpoint.xsOnly"
              small
              outlined
              ><v-icon small left>mdi-pencil</v-icon>Edit Goal</v-btn
            >
          </div>
         </v-expansion-panel-content>        
       </v-expansion-panel>
     </v-expansion-panels>

         


        <v-tooltip
          :disabled="incompleteGoals.length < 5"
          max-width="200"
          bottom
        >
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
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import utilitiesMixin from "../mixins/utilities-mixin";

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
.icon {
  position: absolute;
  bottom:10%;
  right: 4%;
  color:white !important;
}
.goal-progressbar {
  width: 100%;
  position:absolute;
  bottom:4%;

}
.checkmark {
  font-size: 64px !important;
}
.card-title {
  color: var(--mh-blue);
  font-size: 12px;
  min-height: 50px;
  
}
.goalTitle{
 font-weight: 500;
 color: rgba(255, 255, 255);
 /* text-align: center;
 vertical-align: middle; */
}
.card-body {
  background-color: white;
}
.jw{
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
 background-color: rgba(29,	51,	111,0.75);
  -webkit-backface-visibility: hidden; /* Safari */
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
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
