self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  if (event.action === "view-content") {
    clients.openWindow(
      `/activities/videos?category=${categoryQuery(
        event.notification.data.category
      )}`
    );
    console.log(event);
  } else if (event.action == "snooze") {
    console.log("SNOOZE");
  } else {
    console.log("BUTTONS NOT CLICKED");
  }
});

function categoryQuery(key) {
  const categories = {
    ENDURANCE: "endurance",
    ERGONOMICS: "ergonomics",
    MEDITATION: "meditation",
    MUSCLE: "muscle-tone-movement",
    POSTURE: "posture",
    STRESS_RELIEF: "stress-relief",
    STRETCHING: "stretching",
    YOGA: "yoga",
  };

  return categories[key] || "endurance";
}
