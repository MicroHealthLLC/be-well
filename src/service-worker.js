self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  if (event.action === "view-content") {
    clients.openWindow(
      `/activities/videos?category=${categoryQuery(event.notification.data.category)}`
    );
  } else if (event.action == "snooze") {
    console.log("SNOOZE");
  } else {
    console.log("BUTTONS NOT CLICKED");
  }
});

function categoryQuery(key) {
  const categories = {
    Endurance: "endurance",
    Ergonomics: "ergonomics",
    Meditation: "meditation",
    "Muscle Tone/Movement": "muscle-tone-movement",
    Posture: "posture",
    "Stress Relief": "stress-relief",
    Stretching: "stretching",
    Yoga: "yoga",
  };

  return categories[key];
}
