<template>
  <v-app>
    <Navbar v-if="user" />
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
import { mapActions, mapGetters, mapMutations } from "vuex";
import Navbar from "./components/Navbar.vue";
import WelcomeBanner from "./components/WelcomeBanner.vue";

export default {
  components: { Navbar, WelcomeBanner },
  name: "App",
  data: () => ({
    //
  }),
  methods: {
    ...mapActions(["fetchCurrentUser", "fetchReminders"]),
    ...mapMutations(["CLOSE_SNACKBAR", "TOGGLE_REMINDERS_ON"]),
    checkReminders() {
      // Get current time for check
      const now = new Date();
      const minutes = now.getMinutes();
      const hour = now.getHours();
      // Compare current time with each reminder
      this.filteredReminders.forEach((reminder) => {
        const time = reminder.time.split(":");
        if (time[0] == hour && time[1] == minutes) {
          console.log("Reminder found: Display Notification");
          this.notify(reminder);
        } else {
          console.log("Reminder not found");
        }
      });
    },
    frequencyDays(frequency) {
      if (frequency == "Mon/Wed/Fri") {
        return [1, 3, 5];
      } else if (frequency == "Tues/Thurs") {
        return [2, 4];
      } else {
        return [0, 1, 2, 3, 4, 5, 6];
      }
    },
  },
  computed: {
    ...mapGetters(["reminders", "remindersOn", "snackbar", "user"]),
    filteredReminders() {
      const now = new Date();
      const day = now.getDay();
      // Only return reminders with matching alarm day
      return this.reminders.filter((reminder) =>
        this.frequencyDays(reminder.frequency).includes(day)
      );
    },
  },
  mounted() {
    this.fetchCurrentUser();
    this.fetchReminders();
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
.clickable {
  cursor: pointer;
}
</style>
