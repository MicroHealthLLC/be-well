export default {
  data() {
    return {
      categories: [
        {
          title: "Endurance",
          icon: "mdi-run",
          query: "endurance",
          value: "ENDURANCE",
          image: "/img/endurance.jpg",
        },
        {
          title: "Ergonomics",
          icon: "mdi-seat-recline-extra",
          query: "ergonomics",
          value: "ERGONOMICS",
          image: "/img/ergonomics.jpg",
        },
        {
          title: "Meditation",
          icon: "mdi-meditation",
          query: "meditation",
          value: "MEDITATION",
          image: "/img/meditate.jpg",
        },
        {
          title: "Muscle Tone/Movement",
          icon: "mdi-weight-lifter",
          query: "muscle-tone-movement",
          value: "MUSCLE",
          image: "/img/weight-training.jpg",
        },
        {
          title: "Posture",
          icon: "mdi-human-male",
          query: "posture",
          value: "POSTURE",
          image: "/img/posture.jpg",
        },
        {
          title: "Stress Relief",
          icon: "mdi-head-heart",
          query: "stress-relief",
          value: "STRESS_RELIEF",
          image: "/img/stress-relief.jpg",
        },
        {
          title: "Stretching",
          icon: "mdi-human",
          query: "stretching",
          value: "STRETCHING",
          image: "/img/stretching.jpg",
        },
        {
          title: "Yoga",
          icon: "mdi-yoga",
          query: "yoga",
          value: "YOGA",
          image: "/img/yoga.jpg",
        },
      ],
      levels: [
        {
          title: "Beginner",
          value: "BEGINNER",
          query: "beginner",
        },
        {
          title: "Intermediate",
          value: "INTERMEDIATE",
          query: "intermediate",
        },
        {
          title: "Advanced",
          value: "ADVANCED",
          query: "advanced",
        },
        {
          title: "N/A",
          value: "NOT_APPLICABLE",
          query: "not-applicable",
        },
      ],
      filters: [
        {
          title: "Beginner",
          value: "BEGINNER",
          query: "beginner",
        },
        {
          title: "Intermediate",
          value: "INTERMEDIATE",
          query: "intermediate",
        },
        {
          title: "Advanced",
          value: "ADVANCED",
          query: "advanced",
        },
        {
          title: "Favorite",
          value: "FAVORITE",
          query: "favorites",
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
    imageURL(value) {
      return (
        this.categories.find((category) => category.value == value).image || ""
      );
    },
  },
  computed: {
    filteredLevels() {
      return this.levels.filter((level) => level.value != "NOT_APPLICABLE");
    },
  },
};
