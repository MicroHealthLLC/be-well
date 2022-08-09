/* export const notification = {
  data() {
    return {
      imageURLs: {
        ENDURANCE: "/img/endurance.jpg",
        ERGONOMICS: "/img/ergonomics.jpg",
        MEDITATION: "/img/meditate.jpg",
        MUSCLE: "/img/weight-training.jpg",
        POSTURE: "/img/posture.jpg",
        STRESS_RELIEF: "/img/stress-relief.jpg",
        STRETCHING: "/img/stretching.jpg",
        YOGA: "/img/yoga.jpg",
      },
      categories: {
        ENDURANCE: "Endurance",
        ERGONOMICS: "Ergonomics",
        MEDITATION: "Meditation",
        MUSCLE: "Muscle Tone/Movement",
        POSTURE: "Posture",
        STRESS_RELIEF: "Stress Relief",
        STRETCHING: "Stretching",
        YOGA: "Yoga",
      },
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
    imageURL(category) {
      return this.imageURLs[category] || "";
    },
    categoryString(category) {
      return this.categories[category] || "";
    },
  },
};
 */