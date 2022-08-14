  <template>
  <div class="flip-card" :load="log(strengthLevel)">
<div class="flip-card-inner" :class="{ 'is-flipped': isFlipped }">
      <div @click="isFlipped = !isFlipped" class="flip-card-front clickable fontWhite">
      <div class="row">
        <div class="col">
           <h2>
            <span class="font-weight-bold text-light">
            <v-icon color="white" class="mr-1">{{ categoryIcon(reminder.category) }}</v-icon>
           <span class="pt-1"> {{ categoryString(reminder.category) }}</span>
            </span>
           </h2> 
         </div>
      </div>
        <div class="row mt-0 mb-2 px-3">
    
        <div class="col">
      <v-progress-linear
        height="10"
        value="50"
        rounded
        striped
        color="lime"
      ></v-progress-linear>
        
            <!-- <span>
             <v-chip small :color="levelColor(reminder.level)" dark>{{
            levelTitle(reminder.level)
            }}</v-chip>
            </span> -->
         </div>
      </div>

        <div class="row mt-0">
        <div class="col">
            <small class="d-block">Frequency</small>
           <span class="text-center">{{reminder.frequency}}</span>
         </div>
         <div class="col">
             <small  class="d-block">Time</small>
            <span class="text-center">{{reminder.time}}</span>
         </div>
         <div class="col">
                <small class="d-block">Content Type</small>
            <span class="text-center">
              <span v-if="reminder.contentType == 'Articles'">
                 <v-icon class="mr-1" color="white">mdi-file-document-outline</v-icon>
              </span>
              <span v-else>
                <v-icon class="mr-1" color="white">mdi-youtube</v-icon>
               </span>
                
            </span>
          </div>
      </div>
    
       
       <!-- {{reminder}} -->
        <!-- <v-data-table :headers="headers" :items="reminders">
        <template v-slot:item.category="{ item }">
          <span
            ><v-icon class="mr-4">{{ categoryIcon(item.category) }}</v-icon>
            {{ categoryString(item.category) }}</span
          >
        </template>
        <template v-slot:item.level="{ item }">
          <v-chip small :color="levelColor(item.level)" dark>{{
            levelTitle(item.level)
          }}</v-chip>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn
            @click="notify(item)"
            class="mr-3"
            color="var(--mh-blue)"
            outlined
            x-small
            title="Test Notification: Prototype Only"
            >Test</v-btn
          >
          <v-btn
            @click="openReminderForm(item)"
            class="mr-3"
            color="var(--mh-blue)"
            outlined
            x-small
            >Edit</v-btn
          >
          <v-btn
            @click="deleteReminder({ id: item.id })"
            color="var(--mh-orange)"
            outlined
            x-small
            depressed
            >Delete</v-btn
          >
        </template>
        <template v-slot:no-data>
          <div class="mt-4">
            <v-icon color="grey" x-large>mdi-alarm</v-icon>
            <p>No Activity Reminders</p>
          </div>
        </template>
      </v-data-table> -->
        <div
          class=" 
            d-flex
            align-center
            justify-center     
            "
         >          
        </div>        
     </div>
   
      <div class="justify-space-between flip-card-back">
      
       <div class="icon" @click="isFlipped = !isFlipped">
        <v-icon class="mr-1" color="var(--mh-orange)">mdi-arrow-u-left-bottom</v-icon>
       </div>

        <div class="clickable py-4 px-4" >
         <div class="row">           
           <div class="col">
            <h5 class="orangeLabel d-flex">
                ACTIVITY PROGRESS 
            </h5>   
             4 of 8 complete              
           </div>
         </div>
         <span class="levelBadge">
             <v-chip small :color="levelColor(reminder.level)" dark>{{
            levelTitle(reminder.level)
            }}</v-chip>
         </span> 
        
       
        
        <div class="row activityActions">
        <div class="col">
            <h5 class="orangeLabel font-weight-bold">
                ACTIVITY ACTIONS
            </h5>
             <span class="d-block">
            <v-btn
            @click="notify(reminder)"
            :load="log(reminder)"
            class="mr-3"
            color="var(--mh-blue)"
            outlined
            small
            title="Test Notification: Prototype Only"
            >Test</v-btn
          >
          <v-btn
            @click="openReminderForm(reminder)"
            class="mr-3"
            color="var(--mh-orange)"
            small
            outlined
            >View/Edit</v-btn
          >
          <v-btn
            @click="deleteReminder({ id: reminder.id })"
            color="error"
            outlined
            small
          > <v-icon>
            mdi-trash-can-outline
           </v-icon></v-btn
          >
            </span>
        </div>
        </div>
      
        </div>
    </div>
  </div>
    <v-dialog v-model="dialog" max-width="600px">
      <v-card :disabled="saving" :loading="saving">
        <v-card-title
          ><span v-if="reminder.id">Edit Activity</span
          ><span v-else>Add New Activity</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-select
              v-model="reminder.category"
              :items="filteredCategories"
              item-text="value"
              item-value="value"
              label="Focus Area"
              :rules="[(v) => !!v || 'Focus Area required']"
              required
            ></v-select>
            <!-- <v-select
              v-model="reminder.level"
              :items="filteredLevels"
              item-text="title"
              item-value="value"
              label="Level"
              :rules="[(v) => !!v || 'Level is required']"
              required
            ></v-select> -->
            <v-select
              v-model="reminder.frequency"
              :items="['Daily', 'Mon/Wed/Fri', 'Tues/Thurs']"
              label="Frequency"
              :rules="[(v) => !!v || 'Frequency is required']"
              required
            ></v-select>
            <v-select
              v-model="reminder.contentType"
              label="Content Type"
              :items="['Articles', 'Videos']"
              :rules="[(v) => !!v || 'Content Type is required']"
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
                  label="Scheduled Reminder"
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
          <v-btn @click="dialog = false" color="secondary" outlined
            >Cancel</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import utilitiesMixin from "../mixins/utilities-mixin";

export default {
  mixins: [utilitiesMixin],
  props: {
    reminder: {
      type: Object,
    },
  },
  data() {
    return {
    isFlipped: false,
    dialog: false,
    intervalId: null,
    valid: true,
    // reminder: {
    // category: "",
    // level: "",
    // frequency: "",
    // contentType: "",
    // time: null,
    //   },
  
    };
  },
  computed: {
    ...mapGetters(["incompleteGoals", "reminders", "saving"]),
  },
 mounted() {
    this.fetchReminders();
    this.fetchGoals();
  },
  methods: {
    ...mapActions([ "updateReminderById", "fetchReminders", "removeReminder", "fetchGoals"]),
    log(e){
      console.log(e)
    }, 
    openReminderForm(reminder) {
      this.reminder = reminder;
      this.dialog = true;
    },
    async saveReminder() {
      if (!this.$refs.form.validate()) {
        return;
      }

      try {
        if (this.reminder.id) {
          await this.updateReminderById({
            id: this.reminder.id,
            category: this.reminder.category,
            level: this.reminder.level,
            frequency: this.reminder.frequency,
            contentType: this.reminder.contentType,
            time: this.reminder.time,
          });
        } else {
          // Call Vuex action to add reminder
          await this.addReminder(this.reminder);
        }
        // Close form and reset form values
        this.dialog = false;
        this.resetForm();
      } catch (error) {
        console.log(error);
      }
    },
    async deleteReminder(id) {
      await this.removeReminder(id);
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
    levelColor(level) {
      return level == "L1" || level == "L2"
        ? "var(--mh-green)"
        : level == "L3" || level == "L4"
        ? "var(--mh-orange)"
        : level == "L5"
        ? "error"
        : "primary";
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
.orangeLabel{
 color: var(--mh-orange)
}
.fontWhite{
 color:white;
}
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
  bottom:10%;
  left: 4%;
  color:white !important;
}
.activitiesIcon {
  position: absolute;
  bottom:10%;
  right: 15%;
  color:white !important;
}
.activitiesCount {transition: all .2s ease-in-out;}
.activitiesCount:hover { transform: scale(1.2); }
.newGoalBtn{
  color: white !important; 
  top: 55%;
  border: .8px solid white;
  border-radius: .25rem;
  background-color: rgba(29,	51,	111,0.40) !important;
  margin: 5px auto 5px auto;
  position:absolute;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%); 
}
.icon {
  position: absolute;
  bottom:5%;
  right:2.5%;
  color: var(--mh-orange)!important;
}
.levelBadge {
  position: absolute;
  top:5%;
  right:2.5%;
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
  overflow-y: hidden !important;
  overflow-x: hidden !important; 
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
  overflow-y: hidden !important; /* Hide vertical scrollbar */
  overflow-x: hidden !important; 
}

/* Style the back side */
.flip-card-back {
  color: var(--mh-blue);
  background-color: white;
  transform: rotateY(180deg);
  overflow-y: auto;
  overflow-x: hidden !important; 
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.font-weight-bold{
 color: white;
}
.activityActions{
  position: absolute;
  bottom: 5%;
}
</style>
