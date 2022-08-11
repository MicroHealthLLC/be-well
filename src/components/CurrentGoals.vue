<template>
  <div class="flip-card">
    <div class="flip-card-inner" :class="{ 'is-flipped': isFlipped }">
      <div @click="isFlipped = !isFlipped" class="flip-card-front clickable">
       
        <div
          class=" 
            d-flex
            align-center
            justify-center     
            "
         >       
            <v-tooltip
              max-width="200"
              bottom
            >
            <div>Due Date</div>
              <template v-slot:activator="{ on }">               
                <div v-on="on" class="dueDate">
                  <v-icon color="white" small left>mdi-calendar</v-icon>{{new Date(goal.dueDate).toLocaleDateString()}}
                </div>
              </template>          
            </v-tooltip>
          
              <v-tooltip
              max-width="200"
              bottom
            >
            <div>Activities</div>
              <template v-slot:activator="{ on }">               
                <div v-on="on" class="activitiesIcon activitiesCount">
                 <v-icon class="mr-1" color="white" left>mdi-yoga</v-icon> 
                 <v-badge
                  v-if="reminders.filter(t => t.category == goal.category).length > 0"
                  class="completed-count"
                  :content="reminders.filter(t => t.category == goal.category).length"
                  color="success"
                 ></v-badge>
               <v-badge
                  v-else
                  class="completed-count"
                  :content="'0'"
                  color="error"
              ></v-badge>
                </div>
              </template>          
            </v-tooltip>            
            

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
     
           <div class="jw font-weight-bold pt-3"> <h3 class="goalTitle">{{ goal.title  }} <span class="lowerCase">{{ goal.category }}</span></h3></div> 
                <!-- Progress Bar -->
           <span
           v-if="reminders.filter(t => t.category == goal.category).length < 1"
            @click="goToActivities"       
            class="newGoalBtn px-2 py-1"
            ><small>Click here to achieve your goal!</small></span
            >
            <div class="d-flex align-center goal-progressbar pt-2 px-2">
               <v-progress-linear
                height="10"
                :value="(goal.progress / goal.stepCount) * 100"
                striped
                rounded
                color="lime"
              ></v-progress-linear>
             </div> 
          
        </div>
        
      </div>
      <div class="justify-space-between flip-card-back">
        <div class="arrowIcon" @click="isFlipped = !isFlipped">
        <v-icon class="mr-1" color="var(--mh-orange)">mdi-arrow-u-left-bottom</v-icon>
       </div>
          <div class="clickable py-4 px-4" >
         <div class="row">           
           <div class="col">
            <h5 class="orangeLabel d-flex">
               PROGRESS TOWARDS GOAL
            </h5>   
           {{ goal.completedCount }} of {{goal.stepCount}}
           </div>
          <div class="col">
          <v-progress-circular
              :rotate="360"
              :size="100"
              :width="15"
              :value="(goal.progress / goal.stepCount) * 100"
              color="primary"
            >
              {{ (goal.progress / goal.stepCount) * 100 }}%
            </v-progress-circular>
          </div>              
         </div>         
        <div class="row activityActions">
        <div class="col">
            <v-btn
              @click="openGoalForm(goal)"
              color="#2f53b6"
              :block="$vuetify.breakpoint.xsOnly"
              small
              outlined
              ><v-icon small left>mdi-pencil</v-icon>Edit Goal</v-btn
            >
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
      <v-dialog v-model="dialog" width="750">
      <v-card :disabled="saving" :loading="saving">
        <v-card-title class="text-right pt-2 pb-0" 
          >
          <!-- <span v-if="goal.id">Edit Goal</span><span v-else><h2><b class="goalHeaders">Set A Goal...</b></h2></span>
          <v-spacer></v-spacer> -->
          <v-btn  @click="closeGoalForm" fab depressed x-small outlined
            ><v-icon>mdi-close</v-icon></v-btn
          >
        </v-card-title>
        <v-card-text>
          <v-form ref="goalform" v-model="valid">
            <!-- <v-text-field
              v-model="goal.title"
              label="My Goal is..."
              :rules="[(v) => !!v || 'Goal title is required']"
              required
            ></v-text-field> -->
            <v-select
              v-model="goal.category"
              :items="filteredCategories"
              item-text="title"
              item-value="value"
              label="I want to improve my..."
              :rules="[(v) => !!v || 'Improvement category is required']"
              required
            ></v-select>
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
                  label="I want to accomplish this goal by..."
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  :rules="[(v) => !!v || 'Date required']"
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
            >Save</v-btn
          >
          <v-btn 
            v-if="goal.id" 
            color="error" 
            @click="deleteGoal({ id: goal.id })" 
            outlined
            ><v-icon>
            mdi-trash-can-outline
           </v-icon></v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      dialog: false,
      valid: true,
      menu: false,
    };
  },
  computed: {
    ...mapGetters(["incompleteGoals", "reminders", "saving"]),
  },
  methods: {
    ...mapActions(["updateGoalById", "addGoal", "removeGoal"]),
    // log(e){
    //   console.log(e)
    // },
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
          await this.updateGoalById({
            id: this.goal.id,
            title: this.goal.title,
            category: this.goal.category,
            dueDate: this.goal.dueDate,
            progress: this.goal.progress,
            checklist: this.goal.checklist,
          });
        } else {
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
.turnOver{
  position:absolute;
  right:4%;
  bottom:5%
}
.lowerCase{
  text-transform: lowercase;
}
.dueDate {
  position: absolute;
  bottom:12%;
  left: 4%;
  color:white !important;
}
.activitiesIcon {
  position: absolute;
  bottom:12%;
  right: 15%;
  color:white !important;
}
.activitiesCount {transition: all .2s ease-in-out;}
.activitiesCount:hover { transform: scale(1.2); }
.newGoalBtn{
  color: white !important; 
  top: 50%;
  border: .8px solid white;
  border-radius: .25rem;
  background-color: rgba(29,	51,	111,0.30) !important;
  margin: 5px auto 5px auto;
  position:absolute;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%); 
}
.icon {
  position: absolute;
  bottom:13%;
  right:4%;
  color:white !important;
}
.arrowIcon {
  position: absolute;
  bottom:5%;
  right:2.5%;
  color: var(--mh-orange)!important;
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
  overflow-y: hidden;
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
.activityActions{
  position: absolute;
  bottom: 5%;
}
.text-right{
  justify-content: right;
}
.orangeLabel{
 color: var(--mh-orange)

}
</style>
