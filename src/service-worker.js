self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

self.addEventListener("notificationclick", (event) => {
  console.log(event);
  event.notification.close();
  if (event.action === "view-content") {
    clients.openWindow(
      `/activities/videos?category=${categoryQuery(
        event.notification.data.category
      )}`
    );
  } else if (event.action == "snooze") {
    console.log("SNOOZE");
  } else {
    console.log("BUTTONS NOT CLICKED");
  }
});

function categoryQuery(key) {
  const categories = {
    ENDURANCE: "Endurance",
    ERGONOMICS: "Ergonomics",
    MEDITATION: "Meditation",
    MUSCLE: "Muscle Tone/Movement",
    POSTURE: "Posture",
    STRESS_RELIEF: "Stress Relief",
    STRETCHING: "Stretching",
    YOGA: "Yoga",
  };

  return categories[key];
}
