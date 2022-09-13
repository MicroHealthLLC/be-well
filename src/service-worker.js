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
    NUTRITION: "nutrition",
    RECOVERY: "recovery",
    STRENGTH: "strength",
  };

  return categories[key] || "balance";
}

function levelQuery(key) {
  const levels = {
    L1: "beginner-1",
    L2: "beginner-2",
    L3: "intermediate-1",
    L4: "intermediate-2",
    L5: "advanced",
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
