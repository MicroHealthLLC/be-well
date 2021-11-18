export const notification = {
  data() {
    return {
      imageURLs: {
        Endurance: "/img/endurance.jpg",
        Ergonomics: "img/ergonomics.jpg",
        Meditation: "/img/meditate.jpg",
        "Muscle Tone/Movement": "/img/weight-training.jpg",
        Posture: "img/posture.jpg",
        "Stress Relief": "/img/stress-relief.jpg",
        Stretching: "/img/stretching.jpg",
        Yoga: "/img/yoga.jpg",
      },
    };
  },
  methods: {
    async notify(activity) {
      const reg = await navigator.serviceWorker.getRegistration();
      console.log(reg);
      // Let's check if the browser supports notifications
      if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
      }
      // Let's check whether notification permissions have already been granted
      else if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        reg.showNotification(activity.category, this.notification(activity));
      }
      // Otherwise, we need to ask the user for permission
      else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function(permission) {
          // If the user accepts, let's create a notification
          if (permission === "granted") {
            reg.showNotification(
              activity.category,
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
      };
    },
    imageURL(category) {
      return this.imageURLs[category] || "";
    },
  },
};
