self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  if (event.action === "view-content") {
    let category = categoryQuery(event.notification.data.category);
    let level = levelQuery(event.notification.data.level);
    clients.openWindow(
      `/activities/videos?category=${category}&filter=${level}`
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
    BALANCE: "balance",
    ENDURANCE: "endurance",
    ERGONOMICS: "ergonomics",
    FLEXIBILITY_MOBILITY: "flexibility-mobility",
    MIND: "mind",
    NUTRITION: "nutrition",
    RECOVERY: "recovery",
    STRENGTH: "strength",
  };

  return categories[key] || "endurance";
}

function levelQuery(key) {
  const levels = {
    BEGINNER: "beginner",
    INTERMEDIATE: "intermediate",
    ADVANCED: "advanced",
  };

  return levels[key] || "beginner";
}
