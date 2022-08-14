self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

self.addEventListener("notificationclick", (event) => {
  console.log(event)
  event.notification.close();
  if (event.action === "view-content") {
    
    let content = contentType(event.notification.data.contentType);
    let category = categoryQuery(event.notification.data.category);
    let level = levelQuery(event.notification.data.level);

    console.log(content, category, level)

    clients.openWindow(
      `/activities/${content}?category=${category}&filter=${level}`
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

  return categories[key] || "balance";
}

function levelQuery(key) {
  const levels = {
    NOVICE: "beginner-1",
    BEGINNER: "beginner-2",
    COMPETENT: "intermediate-1",
    PROFICIENT: "intermediate-2",
    EXPERT: "advanced",
    NOT_APPLICABLE: "na",
  };

  return levels[key] || "beginner-1";
}

function contentType(key) {
  const contentTypes = {
    Articles: "articles",
    Videos: "videos",
  };

  return contentTypes[key] || "videos";
}
