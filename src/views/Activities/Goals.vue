<template>
<div class="bg-img">
  <div class="bg-overlay">
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
        <span><h2><b class="goalHeaders">MY CURRENT GOALS</b></h2></span>
      </div>
      <v-tooltip :disabled="incompleteGoals.length < 5" max-width="200" bottom>
        <!-- <template v-slot:activator="{ on }">
          <div v-on="on">
            <v-btn
            
              >Add New</v-btn
            >
          </div>
        </template> -->
        <div class="text-center">Active Goals maximum has been met</div>
      </v-tooltip>

    </div>
    <v-divider class="mb-4"></v-divider>
    <!-- Goals Table -->
    <!-- <v-card v-if="incompleteGoals.length == 0" class="pa-4 mb-4">
      <div class="d-flex text-center flex-column">
        <div class="mt-4">
          <v-icon color="grey" x-large>mdi-flag</v-icon>
          <p class="placeholder-text">You currently have no Goals set</p>
        </div>
      </div>
    </v-card> -->
    <div>
       <v-row>
         <v-col        
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
        <div class="newGoalCard">
        <div class="newGoalCardInner"
        >
        <div class="newGoalDiv">
        <v-btn
        @click="openNewGoalForm"             
        class="newGoalBtn"
        outlined
        elevation="2"
        :disabled="!(incompleteGoals.length < 8)"      
      
        ><v-icon class="checkmark"
              >mdi-flag-checkered</v-icon>SET A GOAL...</v-btn
            >
        </div>
       
        </div>
        </div>
         </v-col>
        <v-col
          v-for="(goal, index) in incompleteGoals"
          :key="index"
          cols="12"
          sm="6"
          md="4"
          lg="3"
          class="goalCol"
        >
        <CurrentGoals :goal="goal">

        </CurrentGoals>
        </v-col>
      </v-row>
    </div>  
     
     <!-- <v-expansion-panel v-for="(goal, index) in incompleteGoals" :key="index"> -->
        <!-- <v-expansion-panel-header class="grid">
          <div class="text-subtitle-2 clickable"> -->
            <!-- <div>
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
              <v-chip title="Due Date" color="#2f53b6" outlined small>{{
                shortISODate(goal.dueDate)
              }}</v-chip>
            </div>
          </div> -->
          <!-- Progress Bar -->
          <!-- <div
            class="
              d-flex
              flex-column
              d-sm-flex
              flex-sm-row
              align-sm-center
              mt-3 mt-sm-0
            "
          > -->
            <!-- <div class="d-flex align-center goal-progressbar">
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
            </div> -->
          <!-- </div> -->
        <!-- </v-expansion-panel-header> -->
        <!-- <v-expansion-panel-content>
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
        </v-expansion-panel-content> -->
      <!-- </v-expansion-panel> -->
    <!-- </div> -->
    <!-- Completed Goals -->
    <div v-if="completedGoals.length > 0" class="mt-15">
      <span><h2><b class="goalHeaders">MY COMPLETED GOALS</b></h2></span>
      <v-divider class="mb-4"></v-divider>
      <v-row>
        <v-col
          v-for="(goal, index) in completedGoals"
          :key="index"
          cols="12"
          sm="6"
          md="4"
          lg="3"
          class="goalCol"
        >
          <GoalCard :goal="goal"></GoalCard>
        </v-col>
      </v-row>
    </div>

    <!-- Dialog Form -->
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
    <!-- <v-dialog v-model="dialog" width="750">
      <v-card :disabled="saving" :loading="saving" class="px-5">
      <v-toolbar flat>
       <template v-slot:extension>
        <v-tabs
          v-model="tabs"
          fixed-tabs
          @click="handleClick"
        >
          <v-tabs-slider></v-tabs-slider>
          <v-tab
            href="#mobile-tabs-5-1"
          
              >
            <v-icon>mdi-button-pointer</v-icon>Select Improve Goal
          </v-tab>
        or
          <v-tab
            href="#mobile-tabs-5-2"
          
          >
            <v-icon>mdi-pencil</v-icon>Create Your Own Goal
          </v-tab>        
        </v-tabs>
        </template>
        </v-toolbar>
        <v-tabs-items v-model="tabs">
          <v-tab-item :value="'mobile-tabs-5-1'">
            <v-select
              v-model="goal.category"
              :items="filteredCategories"
              item-text="title"
              item-value="value"
              label="I want to improve my..."
              :rules="[(v) => !!v || 'Improvement category is required']"
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
          
          </v-tab-item>
          <v-tab-item :value="'mobile-tabs-5-2'">
            <v-text-field
              v-model="goal.title"
              label="ex: I want to lose 5 lbs..."
              :rules="[(v) => !!v || 'Goal title is required']"
              required
            ></v-text-field>
              <v-select
              v-model="goal.category"
              :items="filteredCategories"
              item-text="title"
              item-value="value"
              label="Focus Area"
              :rules="[(v) => !!v || 'Focus Area is required']"
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
        </v-tab-item>
         </v-tabs-items>
      
        <v-card-actions class="d-flex justify-end">
          <v-btn
            @click="saveGoal"
            class="px-10 mb-3"
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
    </v-dialog> -->
  </div>
  </div>

</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import dateMixin from "../../mixins/date-mixin";
import utilitiesMixin from "../../mixins/utilities-mixin";
import GoalCard from "../../components/GoalCard.vue";
import CurrentGoals from "../../components/CurrentGoals.vue";

export default {
  name: "Goals",
  mixins: [dateMixin, utilitiesMixin],
  components: {
    GoalCard,
    CurrentGoals,
  },
  data() {
    return {
      goalFormTabs: [
          'Select Improve Goal', 'Create Your Own Goal'
      ],
      tabs: null, 
      dialog: false,
      improvementGoal: true, 
      createOwnGoal: false, 
      isFlipped: false,
      valid: true,
      menu: false,
      category:'',
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
    log(e) {
      console.log(e)
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
            if(this.improvementGoal){
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
    improveGoalToggle(){
      this.createOwnGoal = !this.createOwnGoal
      this.improvementGoal = true
      console.log("default Goal Toggle")
    },
    createGoalToggle(){
      this.improvementGoal = !this.improvementGoal
      this.createOwnGoal = true
      console.log("create Goal Toggle")
    },
    handleClick(e){
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
    ...mapGetters(["completedGoals", "incompleteGoals", "saving"]),
  },
  async mounted() {
    this.fetchGoals();
  },
};
</script>

<style scoped>

/* .goalCol { transition: all .2s ease-in-out; }
.goalCol:hover { transform: scale(1.02); } */
.text-right{
  justify-content: right;
}
.newGoalDiv{
  height:100%;  
}
.newGoalBtn{
  color: white !important; 
  top: 50%;
  margin:0 auto;
  display:block;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%); 
}
.newGoalCard {
  height: 150px;
 /* background-color: rgba(29,	51,	111,0.85); */
  perspective: 1000px; /* Remove this if you don't want the 3D effect */
}
.newGoalCardInner{ 
  width: 100%;
  height: 100%;
  background-color: rgba(29,	51,	111,0.40);
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
  border-radius: 4px;
  box-shadow: 0px 6px 6px -3px rgba(0, 0, 0, 0.2),
    0px 10px 14px 1px rgba(0, 0, 0, 0.14), 0px 4px 18px 3px rgba(0, 0, 0, 0.12) !important;
}


.goalHeaders{
 color: var(--mh-blue); 
}
.pic{
  /* background: url('../../assets/goals.jpg'); */
  background-size: 400px;
  background-repeat: no-repeat;
}
.pagePic{
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

.bg-img{
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
.bg-overlay{
  background-color: rgba(255, 255, 255,0.6) !important;
  min-height: 80vh;
  min-width: 1024px;
  width: 100%;
  height: 100%;
  padding: 20px;
  border-radius: .25rem;
}

</style>
