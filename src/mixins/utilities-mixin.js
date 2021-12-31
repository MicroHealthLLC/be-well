export default {
  data() {
    return {
      categories: [
        {
          title: "Endurance",
          icon: "mdi-run",
          query: "endurance",
          value: "ENDURANCE",
        },
        {
          title: "Ergonomics",
          icon: "mdi-seat-recline-extra",
          query: "ergonomics",
          value: "ERGONOMICS",
        },
        {
          title: "Meditation",
          icon: "mdi-meditation",
          query: "meditation",
          value: "MEDITATION",
        },
        {
          title: "Muscle Tone/Movement",
          icon: "mdi-weight-lifter",
          query: "muscle-tone-movement",
          value: "MUSCLE",
        },
        {
          title: "Posture",
          icon: "mdi-human-male",
          query: "posture",
          value: "POSTURE",
        },
        {
          title: "Stress Relief",
          icon: "mdi-head-heart",
          query: "stress-relief",
          value: "STRESS_RELIEF",
        },
        {
          title: "Stretching",
          icon: "mdi-human",
          query: "stretching",
          value: "STRETCHING",
        },
        {
          title: "Yoga",
          icon: "mdi-yoga",
          query: "yoga",
          value: "YOGA",
        },
      ],
      levels: [
        {
          title: "Beginner",
          value: "BEGINNER",
        },
        {
          title: "Intermediate",
          value: "INTERMEDIATE",
        },
        {
          title: "Advanced",
          value: "ADVANCED",
        },
        {
          title: "N/A",
          value: "NOT_APPLICABLE",
        },
      ],
    };
  },
  methods: {
    async notify(activity) {
      const reg = await navigator.serviceWorker.getRegistration();
      // Let's check if the browser supports notifications
      if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
      }
      // Let's check whether notification permissions have already been granted
      else if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        reg.showNotification(
          this.categoryString(activity.category),
          this.notification(activity)
        );
      }
      // Otherwise, we need to ask the user for permission
      else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {
          // If the user accepts, let's create a notification
          if (permission === "granted") {
            reg.showNotification(
              this.categoryString(activity.category),
              this.notification(activity)
            );
          }
        });
      }
    },
    // Helper method for notify - Provides Notification options
    notification(activity) {
      return {
        icon: "/img/icons/android-chrome-192x192.png",
        body: "This is your daily Well Beeing reminder!",
        image: this.imageURL(activity.category),
        actions: [
          {
            title: "View Content",
            action: "view-content",
          },
          {
            title: "Snooze",
            action: "snooze",
          },
        ],
        data: { ...activity },
      };
    },
    categoryIcon(value) {
      if (value) {
        return (
          this.categories.find((category) => category.value == value).icon || ""
        );
      } else {
        return "";
      }
    },
    categoryString(value) {
      if (value) {
        return (
          this.categories.find((category) => category.value == value).title ||
          ""
        );
      } else {
        return "";
      }
    },
    levelTitle(value) {
      return this.levels.find((level) => level.value == value).title || "";
    },
  },
};
