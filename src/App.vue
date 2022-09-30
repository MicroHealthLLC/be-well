<template>
  <v-app>
    <Navbar v-if="user"/>
    <!-- Main Content -->
    <v-main class="main-wrapper" app>
      <WelcomeBanner v-if="$route.name == 'Home'" />
      <!-- Router Container -->
      <v-container>
        <router-view />
      </v-container>
    </v-main>
    <!-- Alert Message -->
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" top
      >{{ snackbar.message }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="CLOSE_SNACKBAR">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
  
</template>

<script>
//import { Auth } from "aws-amplify";
import { mapActions, mapGetters, mapMutations } from "vuex";
import Navbar from "./components/Navbar.vue";
import WelcomeBanner from "./components/WelcomeBanner.vue";
import utilitiesMixin from "./mixins/utilities-mixin";

export default {
  components: { Navbar, WelcomeBanner },
  name: "App",
  data(){
    return {
      defaultPreferences: {
        preference_items: [
          {
            category: "Balance",
            l1: true,
            l2: false,
            l3: false,
            l4: false,
            l5: false,
            not_interested: false,
          },
          {
            category: "Endurance",
            l1: true,
            l2: false,
            l3: false,
            l4: false,
            l5: false,
            not_interested: false,
          },
          {
            category: "Flexibility & Mobility",
            l1: true,
            l2: false,
            l3: false,
            l4: false,
            l5: false,
            not_interested: false,
          },
          {
            category: "Strength",
            l1: true,
            l2: false,
            l3: false,
            l4: false,
            l5: false,
            not_interested: false,
          },
          {
            category: "Nutrition",
            not_interested: false,
          },
          {
            category: "Recovery",
            not_interested: false,
          },
          {
            category: "Ergonomics",
            not_interested: false,
          },
        ],
      },
    }
  },
  mixins: [utilitiesMixin],
  methods: {
    ...mapActions(["fetchCurrentUser", "fetchReminders", "fetchPreferences", "addPreferences"]),
    ...mapMutations(["CLOSE_SNACKBAR", "TOGGLE_REMINDERS_ON"]),
    checkReminders() {
      // Get current time for check
      const now = new Date();
      const minutes = now.getMinutes();
      const hour = now.getHours();
      // Compare current time with each reminder
      this.filteredReminders.forEach((reminder) => {
        if (!reminder.isComplete) {
        const time = reminder.time.split(":");
        if (time[0] == hour && time[1] == minutes) {
          console.log("Reminder found: Display Notification");
          this.notify(reminder);
        } else {
          console.log("Reminder not found");
        }
      }
      });
    },
    frequencyDays(frequency) {
      //console.log(frequency)
      let days = []
      if (frequency.includes("Sunday")) {
        days.push(0)
      } if (frequency.includes("Monday")) {
        days.push(1)
      } if (frequency.includes("Tuesday")) {
        days.push(2)
      } if (frequency.includes("Wednesday")) {
        days.push(3)
      } if (frequency.includes("Thursday")) {
        days.push(4)
      } if (frequency.includes("Friday")) {
        days.push(5)
      } if (frequency.includes("Saturday")) {
        days.push(6)
      } 
      //console.log(days)
      return days
      /* if (frequency == "Mon/Wed/Fri") {
        return [1, 3, 5];
      } else if (frequency == "Tues/Thurs/Sat") {
        return [2, 4, 6];
      } else {
        return [0, 1, 2, 3, 4, 5, 6];
      } */
    },
  },
  computed: {
    ...mapGetters(["reminders", "remindersOn", "snackbar", "user", "preferences"]),
    filteredReminders() {
      const now = new Date();
      const day = now.getDay();
      // Only return reminders with matching alarm day
      return this.reminders.filter((reminder) => this.frequencyDays(reminder.frequency).includes(day));
    },
  },
  async mounted() {
    /* if (await Auth.currentSession()) {
      const idToken = await (await Auth.currentSession()).getIdToken()
      const accessToken = await (await Auth.currentSession()).getAccessToken()
      //const creds = await (await Auth.currentCredentials())

      console.log(idToken, accessToken)
    } */
    await this.fetchCurrentUser();
    if (this.user) {
      this.fetchReminders();
      this.fetchPreferences();
    }
    this.TOGGLE_REMINDERS_ON(true);
  },
  watch: {
    remindersOn(newSwitchValue) {
      if (newSwitchValue) {
        this.intervalId = setInterval(this.checkReminders, 60000);
      } else {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    },
    preferences(){  
      if(!this.preferences[0]){
        console.log("Add default preferences works")
        this.addPreferences(this.defaultPreferences)
      }     
    }
  },
};
</script>

<style>
:root {
  --mh-blue: #1d336f;
  --mh-green: #9ec64c;
  --mh-orange: #dd9036;
}
.main-wrapper {
  background-color: #f0f3f7;
  
}
.goalHeaders{
 color: var(--mh-blue);
}

.clickable {
  cursor: pointer;
}

  ::-webkit-scrollbar {
    background: #ededed;
    overflow: hidden;
    border-radius: 4px;
    height: 8px;
    margin:5px !important;
    padding:2px !important;
    width: 8px;
  }  
  ::-webkit-scrollbar-thumb {
    background: lightgray;
    border-radius: 4px;
  }


</style>
