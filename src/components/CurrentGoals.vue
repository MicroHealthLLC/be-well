<template>
  <div class="flip-card">
    <div class="flip-card-inner" :class="{ 'is-flipped': isFlipped && !goal.isComplete }">
      <div :class="{ 'completed': goal.isComplete }" class="flip-card-front clickable">
        <span class="newGoalBtn3" :class="{ 'd-none': goal.isComplete }" v-if="!isFlipped">
          <v-tooltip max-width="200" bottom>
            <div v-if="goal && goal.reminders.items.length > 0">Add Activity</div>
            <div v-else>Schedule Your 1st Activity</div>
            <template v-slot:activator="{ on }">
              <div v-on="on" class="activitiesIcon activitiesCount" @click="openNewReminderForm">
                <span v-if="goal && goal.reminders.items && goal.reminders.items.length > 0">
                  <v-icon class="mr-1" color="white" :class="{ 'text-blue': goal.isComplete }">mdi-yoga</v-icon>
                  <v-badge class="completed-count" :content="goal.reminders.items.length" color="success"></v-badge>
                </span>
                <span v-else>
                  <v-icon class="mr-1" color="white" :class="{ 'text-blue': goal.isComplete }">mdi-yoga</v-icon>
                  <v-badge class="completed-count ml-1" :content="'0'" color="error"></v-badge>
                </span>
              </div>
            </template>
          </v-tooltip>
        </span>
        <v-tooltip v-if="!goal.isComplete" max-width="200" bottom>
          <div>Due Date</div>
          <template v-slot:activator="{ on }">
            <div v-on="on" class="dueDate">
              <v-icon color="white" small left class="mr-1" :class="{ 'text-blue': goal.isComplete }">mdi-calendar
              </v-icon>
              <small :class="{ 'text-blue': goal.isComplete }">{{ new Date(goal.dueDate).toLocaleDateString('en-US',
              {timeZone: 'UTC'}) }}</small>
            </div>
          </template>
        </v-tooltip>
        <div @click="isFlipped = !isFlipped">
          <div class="row">
            <div class="col mt-2">
              <h3 class="goalTitle">
                <v-tooltip max-width="200" bottom>
                  <div class="d-inline">{{ categoryString(goal.category) }}</div>
                  <template v-slot:activator="{ on }">
                    <div v-on="on" class="d-inline">
                      <v-icon color="white" :class="{ 'text-blue': goal.isComplete }">
                        {{
                        categoryIcon(goal.category)
                        }}
                      </v-icon>
                    </div>
                  </template>
                </v-tooltip>
                <span :class="{ 'text-blue': goal.isComplete }" v-if="goal.category === 'FLEXIBILITY_MOBILITY'">
                  I want to improve my flexibility & mobility
                </span>
                <span :class="{ 'text-blue': goal.isComplete }" v-else>
                  {{ goal.title }}
                </span>
              </h3>
            </div>
          </div>
          <!-- Progress Bar -->
          <div  class="row mt-0 px-3">
            <div class="col">
              <v-progress-linear
                v-if="!goal.isComplete" :value="getGoalProgressValue(goal.reminders.items) ? Math.round(getGoalProgressValue(goal.reminders.items)) : 0"
                height="10" striped rounded color="lime">
              </v-progress-linear>
              <div v-else class="my-5"></div>
            </div>
          </div>
          <div v-if="goal.isComplete" class="row mt-6 completedGoalBtns">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon @click="openGoalForm(goal)" v-bind="attrs" v-on="on" color="yellow darken-3" class="ml-6">
                  mdi-eye-outline</v-icon>
              </template>
              <span>View</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon class="ml-2" color="green" v-bind="attrs" v-on="on" @click="reuseGoal(goal.reminders.items)">
                  mdi-recycle-variant</v-icon>
              </template>
              <span>Do it again!</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon class="mr-6 ml-auto" color="red darken-1" @click="deleteGoal({ id: goal.id })" v-bind="attrs"
                  v-on="on"> mdi-trash-can-outline </v-icon>
              </template>
              <span>Delete</span>
            </v-tooltip>
          </div>
        </div>
      </div>

      <div class="justify-space-between flip-card-back">

        <span class="cardBtns d-inline-flex">
          <v-tooltip max-width="200" bottom>
            <div>Edit</div>
            <template v-slot:activator="{ on }">
              <div v-on="on">
                <v-icon @click="openGoalForm(goal)" color="var(--mh-green)" class="mr-1">mdi-square-edit-outline
                </v-icon>
              </div>
            </template>
          </v-tooltip>         
        </span>
        <span class="cardBtns2 d-inline-flex">    
          <v-tooltip max-width="200" bottom>
            <div>Delete</div>
            <template v-slot:activator="{ on }">
              <div v-on="on">
                <span>
                  <v-icon @click="deleteGoal({ id: goal.id })" color="red darken-1">mdi-trash-can-outline</v-icon>
                </span>
              </div>
            </template>
          </v-tooltip>
        </span>
       
        <div class="clickable goalActivitiesWrapper pt-1 px-4" >
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
          </div>
          <div class="progressWrapper">
            <div class="row mt-0">
              <div class="col pt-0">
                <span v-if="goal.reminders.items && goal.reminders.items.length > 0">
                  <span v-for="item, i in goal.reminders.items" :key="i">
                    <h5 v-if="item.activity">{{ item.activity }}</h5>
                    <v-tooltip max-width="200" left v-else>
                   <div>{{displayFreq(item.frequency) }} | Time: {{item.time}}</div>   
                      <template v-slot:activator="{ on }" >
                      <span v-on="on">  <h5>{{item.category}}</h5> </span>
                      </template>
                    </v-tooltip>                  
              
                  </span>
                </span>
                <span v-else>
                </span>
              </div>
              <div class="col pt-0 pr-0">
                <!-- The follwoing two span can be replaced once activities are ready to save progress -->
                <span v-if="goal.reminders.items && goal.reminders.items.length > 0">
                  <span v-for="g, i in goal.reminders.items" :key="i">
                    <h5>{{ getCompletedActivities(capitalizeFirstLet((checkForFlex(g.category)).toLowerCase()),
                    checkForNA(g.level)).length
                    }} of {{ getActivities(capitalizeFirstLet((checkForFlex(g.category)).toLowerCase()),
                      checkForNA(g.level)).length
                      }}</h5>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <v-tooltip :disabled="incompleteGoals.length < 5" max-width="200" bottom>
          <div class="text-center">Active Goals maximum has been met</div>
        </v-tooltip>
      </div>
      <v-dialog v-model="activityDialog" max-width="600px">
        <v-card :disabled="saving" :loading="saving">
          <v-card-title>

            <span v-if="goal && goal.reminders.items.length > 0 && !goal.isComplete">Add New Activity</span>
            <span v-else-if="!goal.isComplete">Schedule Your First Activity</span>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="a_valid">
              <span v-if="goal && goal.reminders.items.length > 0">

                <v-select v-model="reminder.category" :items="filteredCategories" item-text="title" item-value="value"
                  label="Select Activity Type" :rules="[(v) => !!v || 'Activity Type required']" required></v-select>
              </span>
              <span v-else class="mb-2">
                <small class="d-block activityT">Activity Type</small>
                <span class="defaultA">{{ defaultActivity }}</span>
              </span>
              <v-select v-model="freqArr"
                :items="['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']"
                label="Frequency" :rules="[(v) => !!v || 'Frequency is required']" required multiple></v-select>
              <v-menu ref="menu" :close-on-content-click="false" :nudge-right="40" :return-value.sync="reminder.time"
                transition="scale-transition" offset-y max-width="290px" min-width="290px">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field v-model="reminder.time" label="Schedule A Reminder"
                    prepend-icon="mdi-clock-time-four-outline" readonly v-bind="attrs" v-on="on"
                    :rules="[(v) => !!v || 'Time is required']" required></v-text-field>
                </template>
                <v-time-picker v-model="reminder.time" ampm-in-title format="ampm"
                  @click:minute="$refs.menu.save(reminder.time)" header-color="var(--mh-blue)"></v-time-picker>
              </v-menu>
            </v-form>
          </v-card-text>
          <v-card-actions class="d-flex justify-end">
            <v-tooltip max-width="200" bottom>
              <div>Save</div>
              <template v-slot:activator="{ on }">
                <v-btn small @click="saveReminder" v-on="on" class="px-4 mr-2" color="var(--mh-blue)" dark>
                  <v-icon>mdi-content-save</v-icon>
                </v-btn>
              </template>
            </v-tooltip>
            <v-tooltip max-width="200" bottom>
              <div>Cancel</div>
              <template v-slot:activator="{ on }">
                <v-btn small @click="activityDialog = false" v-on="on" color="secondary" outlined>
                  <v-icon>mdi-cancel</v-icon>
                </v-btn>
              </template>
            </v-tooltip>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialog" width="450">
        <v-card :disabled="saving" :loading="saving">
          <v-card-title class="text-right pt-4">
          </v-card-title>

          <v-list v-if="goal.isComplete" disabled>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title>
                  <v-icon class="mr-1">mdi-flag-checkered</v-icon>Goal
                </v-list-item-title>
                <v-list-item-subtitle class="ml-7">{{ goal.title }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title>
                  <v-icon class="mr-1">mdi-yoga</v-icon>Activities
                </v-list-item-title>
                <v-list-item-subtitle v-for="r in goal.reminders.items" class="ml-7" :key="r.id">
                  <v-icon>{{ categoryIcon(r.category) }}</v-icon>{{ r.category }} <v-chip class="mb-1" small
                    text-color="white" :color="levelToColor(r.level)">{{levelToString(r.level)}}</v-chip>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title>
                  <v-icon class="mr-1">mdi-calendar</v-icon>Due Date
                </v-list-item-title>
                <v-list-item-subtitle class="ml-7">{{ new Date(goal.dueDate).toLocaleDateString('en-US', {timeZone:
                'UTC'}) }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-card-text v-if="!goal.isComplete">
            <v-form ref="goalform" v-model="valid">
              <v-text-field v-model="goal.title" label="Goal" :rules="[(v) => !!v || 'Goal is required']" required
                :class="{ 'd-none': goal.isComplete }">
              </v-text-field>
              <v-select v-model="goal.category" :items="filteredCategories" item-text="title" item-value="value"
                :class="{ 'd-none': goal.isComplete }" label="Focus Area"
                :rules="[(v) => !!v || 'Improvement category is required']" required></v-select>
              <v-menu :class="{ 'd-none': goal.isComplete }" v-model="menu" :close-on-content-click="false"
                :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field :class="{ 'd-none': goal.isComplete }" v-model="goal.dueDate"
                    label="I want to accomplish this goal by..." prepend-icon="mdi-calendar" readonly v-bind="attrs"
                    v-on="on" :rules="[(v) => !!v || 'Date required']" required></v-text-field>
                </template>
                <v-date-picker v-model="goal.dueDate" @input="menu = false"></v-date-picker>
              </v-menu>
            </v-form>
             <div :class="{ 'd-none': goal.isComplete }" class="mt-2" >
               <label>Goal Activities</label>
               <span v-if="goal.reminders.items.length > 0">              
                <ul v-for="activity, i in goal.reminders.items" :key="i" style="list-style: none" class="pl-0">
                 <li class="mb-1">                
                   <v-icon>{{ categoryIcon(activity.category) }}</v-icon> 
              
                    <span :class="{ 'crossOut': goalActs.length > 0 && goalActs[i] == activity.id }">
                      <v-tooltip max-width="200" left>
                        <div>{{displayFreq(activity.frequency)}} | Time: {{ activity.time}}</div>
                      <template v-slot:activator="{ on }" >
                      <span v-on="on">{{activity.category}} </span>
                      </template>
                    </v-tooltip>
                    </span>
                    <span class="float-right">
                      <v-tooltip max-width="200" left>
                        <div>Remove Activity</div>
                        <template v-slot:activator="{ on }" >
                        <!-- <v-btn 
                          color="green"
                          @click="undoRemove(activity.id)"        
                          outlined                          
                          v-on="on" x-small 
                          v-if="goalActs.length > 0 && goalActs[i] == activity.id" >Undo</v-btn>
                        <v-btn
                          color="error"                        
                          outlined     
                          @click="removeGoalActivity(activity.id)"                         
                          x-small 
                          v-else>Remove</v-btn>                  -->
                          <v-btn   
                          v-on="on"                                           
                          outlined     
                          @click="removeGoalActivity(activity.id)"                         
                          x-small 
                          >Remove</v-btn> 
                        </template>
                      </v-tooltip>
                    </span>
                  </li>
                </ul>
              </span>
              <span v-else>
                <p>You have no activities tied to this goal.</p>
              </span>
            </div>
          </v-card-text>
          <v-card-actions class="d-flex justify-end">
            <v-tooltip max-width="200" bottom>
              <div>Save</div>
              <template v-slot:activator="{ on }">
                <v-btn small @click="saveGoal" v-on="on" class="px-2 mr-2" color="var(--mh-blue)" depressed dark
                  :class="{ 'd-none': goal.isComplete }">
                  <v-icon>mdi-content-save</v-icon>
                </v-btn>
              </template>
            </v-tooltip>
            <v-tooltip max-width="200" bottom>
              <div v-if="!goal.isComplete">Cancel</div>
              <div v-if="goal.isComplete">Close</div>
              <template v-slot:activator="{ on }">
                <v-btn class="px-2" small @click="closeGoalForm" v-on="on" color="secondary" outlined>
                  <v-icon v-if="!goal.isComplete">mdi-cancel</v-icon>
                  <v-icon v-if="goal.isComplete">mdi-close</v-icon>
                </v-btn>
              </template>
            </v-tooltip>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
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
      count: 0,
      ejgs: false, 
      goalActs: [],
      isFlipped: false,
      crossOut: false, 
      goalCompleteDialog: false,
      confettiGoalName: '',
      activityDialog: false,
      dialog: false,
      show: false,
      reuse: false,
      reminder: {
        category: "",
        level: "",
        activity: "",
        frequency: "",
        contentType: "",
        time: null,
      },
      valid: true,
      a_valid: true,
      menu: false,
      freqArr: []
    };
  },
  computed: {
    ...mapGetters(["incompleteGoals", "reminders", "saving", "preferences"]),
    validGoalReminderOptions() {
      if (this.goal.reminders.items.length > 0) {
        let goalReminders = this.goal.reminders.items.map(gR => gR.category)
        return this.filteredCategories.filter(t => !goalReminders.includes(t.value))
      } else return this.filteredCategories
    }, 
    defaultActivity() {
      if (this.goal) {
        return this.filteredCategories.filter(item => item.value == this.goal.category)[0].title
      } else {
        return this.filteredCategories
      }
    },
    userPrefLevel() {
      // return this.reminders
      if (this.preferences && this.preferences[0] && this.goal) {
        //console.log("yes")
        //console.log(this.preferences)
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
    userReminderPrefLevel() {
      // return this.reminders
      if (this.preferences && this.preferences[0] && this.reminder) {
        //console.log("yes")
        //console.log(this.preferences)
        let strength = this.preferences[0].preference_items.map(t => t && t.category == "Strength")
        let flex = this.preferences[0].preference_items.map(t => t && t.category == "Flexibility & Mobility")
        let balance = this.preferences[0].preference_items.map(t => t && t.category == "Balance")
        let nutri = this.preferences[0].preference_items.map(t => t && t.category == "Nutrition")
        let rec = this.preferences[0].preference_items.map(t => t && t.category == "Recovery")
        let erg = this.preferences[0].preference_items.map(t => t && t.category == "Ergonomics")
        let endur = this.preferences[0].preference_items.map(t => t && t.category == "Endurance")
        if (this.reminder.category == 'STRENGTH' && strength) {
          return this.strengthLevel
        }
        if (this.reminder.category == 'BALANCE' && balance) {
          return this.balanceLevel
        }
        if (this.reminder.category == 'ENDURANCE' && endur) {
          return this.enduranceLevel
        }
        if (this.reminder.category == 'NUTRITION' && nutri) {
          return this.nutritionLevel
        }
        if (this.reminder.category == 'RECOVERY' && rec) {
          return this.recLevel
        }
        if (this.reminder.category == 'ERGONOMICS' && erg) {
          return this.ergLevel
        }
        if (this.reminder.category == 'FLEXIBILITY_MOBILITY' && flex) {
          return this.flexLevel
        } else return ""

      } else {
        return ""
      }
    },
  },
  methods: {
    ...mapActions([
      "updateGoalById", 
      "updateReminderById",
      "addGoal", 
      "removeGoal", 
      'deleteReminder',
      "removeReminder",
      "addReminder",
      "fetchReminders",
      'fetchGoals']),
      ...mapMutations([""]),
    // log(e) {  
    //  console.log(e)
    // },
    displayFreq(frequency) {
      let split = frequency.split(",")
      if (split[0] == "") {
        split.shift()
      }
      if (split.length == 7) {
        return "Daily"
      } else if (split.length == 1) {
        return split[0]
      } else if (split.length <= 3) {
        let newFreq = []
        if (split.includes("Sunday")) {
          newFreq.push("Sun")
        }
        if (split.includes("Monday")) {
          newFreq.push("Mon")
        }
        if (split.includes("Tuesday")) {
          newFreq.push("Tue")
        }
        if (split.includes("Wednesday")) {
          newFreq.push("Wed")
        }
        if (split.includes("Thursday")) {
          newFreq.push("Thur")
        }
        if (split.includes("Friday")) {
          newFreq.push("Fri")
        }
        if (split.includes("Saturday")) {
          newFreq.push("Sat")
        }
        let joined = newFreq.join('/')
        return joined
      } else {
        let newFreq = []
        if (split.includes("Sunday")) {
          newFreq.push("Su")
        }
        if (split.includes("Monday")) {
          newFreq.push("M")
        }
        if (split.includes("Tuesday")) {
          newFreq.push("Tu")
        }
        if (split.includes("Wednesday")) {
          newFreq.push("W")
        }
        if (split.includes("Thursday")) {
          newFreq.push("Th")
        }
        if (split.includes("Friday")) {
          newFreq.push("F")
        }
        if (split.includes("Saturday")) {
          newFreq.push("Sa")
        }
        let joined = newFreq.join('/')
        return joined
      }
    },
    stopCon() {
      this.$confetti.stop();
    },
    removeGoalActivity(id){   
     this.goalActs.push(id) 
     console.log(this.goalActs)
    },
    //Not used.  Need to fix logic.  Will be useful to toggle between Remove and Undo buttons.
    undoRemove(id){
      this.goalActs = this.goalActs.filter(t => t !== id)
    },
    openNewReminderForm() {
      //console.log("this works")

      this.fetchReminders()
      this.resetForm();
      this.activityDialog = true;
      if (this.$refs.form) {
        this.$refs.form.reset()
        this.$refs.form.resetValidation();
      }
    },
    resetForm() {
      this.reminder = {
        category: "",
        level: "",
        frequency: "",
        contentType: "",
        time: null,
      };
    },
    openGoalForm(goal) {
      this.goalActs  = [];
      this.fetchGoals()
      this.dialog = true;
      this.goal = goal;
      console.log(this.goal)
    },
    arrayToString(array) {
      return array.toString()
    },
    closeGoalForm() {
      this.goalActs = []
      this.dialog = false;
      this.fetchGoals()
    },
    async reuseGoal(goalReminders) {
      for (let i = 0; i < goalReminders.length; i++) {
        // console.log(items[i]);
        let filtered = this.watchedVideos.filter(v => v.category == this.capitalizeFirstLet((this.checkForFlex(goalReminders[i].category)).toLowerCase()) && v.level == this.checkForNA(goalReminders[i].level))
        console.log(filtered)
        filtered.forEach(v => {
          this.removeWatchedVideo({ id: v.id })
        })
      }
      //  this.reuse = true
      this.updateGoalById({
        id: this.goal.id,
        isComplete: false,
        completedCount: 0,
      });
      this.fetchReminders()

    },
    async saveGoal() {
      if (!this.activityDialog && !this.$refs.goalform.validate()) {       
        return;
      }
      try {
        if (this.goal.id) {  
          if(this.goalActs.length > 0){
              let goalActsArray = this.goal.reminders.items.filter(t => this.goalActs.includes(t.id))
              console.log(goalActsArray)
              await this.updateGoalById({
              id: this.goal.id,
              title: this.goal.title,
              category: this.goal.category,
              dueDate: this.goal.dueDate,
              });  

              for (let i = 0; i < goalActsArray.length; i++) {
                await this.updateReminderById({
                id: goalActsArray[i].id,           
                goalId: null,
              });
             }   
             this.fetchGoals();  
             this.goalActs = [];   
          } else {         
            this.updateGoalById({
            id: this.goal.id,
            title: this.goal.title,  
            category: this.goal.category,
            dueDate: this.goal.dueDate,
            progress: this.goal.progress,
            checklist: this.goal.checklist,
          });  
          }        
        } else {
          // console.log(this.goal)
          await this.addGoal(this.goal);
        }
      } catch (error) {
        console.log(error);
      }
      this.closeGoalForm();
    },
    async deleteReminder(id) {
      await this.removeReminder(id);
      await this.updateGoalById({ id: this.goal.id });
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
      //console.log(this.goal)
      if (!this.$refs.form.validate()) {
        return;
      }
      this.reminder.frequency = this.arrayToString(this.freqArr)
      if (this.goal.reminders.items.length == 0 || !this.goal.reminders.items) {
        this.reminder.category = this.goal.category
        this.reminder.level = this.userPrefLevel
      }
      try {
        this.reminder.level = this.userReminderPrefLevel
        this.reminder.contentType = 'Videos'
        this.reminder.goalId = this.goal.id
        //console.log(this.reminder)
        await this.addReminder(this.reminder);
        this.saveGoal()

        // Close form and reset form values
        this.activityDialog = false;
        this.resetForm();
      } catch (error) {
        console.log(error);
      }
    },
    goToActivities() {
      //console.log("this works")
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
  watch: {
    reminder() {
      if (this.reminder.frequency && this.freqArr.length == 0) {
        let split = this.reminder.frequency.split(",")
        split.forEach((r) => this.freqArr.push(r))
      }
    },
    goalActs(){
      if (this.goalActs.length > 0) {
        return this.goalAct
      }
    }
  }
};
</script>

<style scoped>
.progressWrapper {
  overflow-y: hidden;;
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
  bottom: 8%;
  left: 4%;
  color: white !important;
}

.activitiesIcon {
  position: absolute;
  bottom: 8%;
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
  bottom: 8%;
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
.goalActivitiesWrapper{
 padding-bottom: 25px;
}

.flip-card {
  /* background-color: transparent; */
  min-height: 130px !important;
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
  min-height: 130px;
  overflow-y: hidden;
  overflow-x: hidden !important;
  background-color: rgba(29, 51, 111, 0.75);
  -webkit-backface-visibility: hidden;
  /* Safari */
  backface-visibility: hidden;
  border-radius: 4px;
  box-shadow: 0px 6px 6px -3px rgba(0, 0, 0, 0.2),
    0px 10px 14px 1px rgba(0, 0, 0, 0.14), 0px 4px 18px 3px rgba(0, 0, 0, 0.12) !important;
}

.completed {
  background-color: whitesmoke;
}

.text-blue {
  color: rgb(29, 51, 111) !important;
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
  z-index: 10 !important;
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

.cardBtns {
  position: absolute;
  bottom: 3%;
  left: 3.5%;
  cursor: pointer;
}
.cardBtns2 {
  position: absolute;
  bottom: 3%;
  right: 3.5%;
  cursor: pointer;
}


.activityT {
  color: #1976d2 !important;
  /* font-size:16px */
}

.defaultA {
  font-size: 16px;
  color: rgba(0, 0, 0, 0.87)
}

.centered {
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.crossOut {
  text-decoration: line-through;
}

@media only screen and (max-width: 959px) {
  .completedGoalBtns {
    margin-top: 0px !important;
}
}
@media only screen and (max-width: 600px) {
  .completedGoalBtns {
    margin-top: 30px !important;
}
}

</style>
