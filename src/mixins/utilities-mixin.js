import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      categories: [
        {
          title: "",
          icon: "",
          query: "all",
          value: "ALL",
          image: "",
        },
        {
          title: "Balance",
          icon: "mdi-human",
          query: "balance",
          value: "BALANCE",
          image: "/img/balance.jpg",
        },
        {
          title: "Endurance",
          icon: "mdi-run",
          query: "endurance",
          // activities: ["walking", "yard word", "dancing", "swimming", "biking", "hiking", "climbing stairs"],
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
          title: "Flexibility & Mobility",
          icon: "mdi-yoga",
          query: "flexibility-mobility",
          value: "FLEXIBILITY_MOBILITY",
          image: "/img/flexibility_mobility.jpg",
        },
        {
          title: "Mind",
          icon: "mdi-head-heart",
          query: "mind",
          value: "MIND",
          image: "/img/mind.jpg",
        },
        {
          title: "Nutrition",
          icon: "mdi-food-apple",
          query: "nutrition",
          value: "NUTRITION",
          image: "/img/nutrition.jpg",
        },
        {
          title: "Recovery",
          icon: "mdi-heart-plus",
          query: "recovery",
          value: "RECOVERY",
          image: "/img/recovery.jpg",
        },
        {
          title: "Strength",
          icon: "mdi-weight-lifter",
          query: "strength",
          value: "STRENGTH",
          image: "/img/strength.jpg",
        },
      ],
      activities: [     
        //Endurance          
        {
          title: "Walking",
          icon: "mdi-human",
          query: "walking",
          category: "ENDURANCE",
          value: "WALKING",
          image: "/img/endurance.jpg",
        },
        {
          title: "Jogging",
          icon: "mdi-human",
          query: "jogging",
          category: "ENDURANCE",
          value: "JOGGING",
          image: "/img/endurance.jpg",
        },
        {
          title: "Yard Work",
          icon: "mdi-human",
          query: "yard_work",
          category: "ENDURANCE",
          value: "YARD_WORK",
          image: "/img/endurance.jpg",
        },
        {
          title: "Dancing",
          icon: "mdi-human",
          query: "dancing",
          category: "ENDURANCE",
          value: "DANCING",
          image: "/img/endurance.jpg",
        },
        {
          title: "Swimming",
          icon: "mdi-human",
          query: "swimming",
          category: "ENDURANCE",
          value: "SWIMMING",
          image: "/img/endurance.jpg",
        },
        {
          title: "Biking",
          icon: "mdi-human",
          query: "biking",
          category: "ENDURANCE",
          value: "BIKING",
          image: "/img/endurance.jpg",
        },
        {
          title: "Climbing stairs",
          icon: "mdi-heart-plus",
          category: "ENDURANCE",
          query: "climbing_stairs",
          value: "CLIMBING_STAIRS",
          image: "/img/endurance.jpg",
        },
        {
          title: "Other, sport",
          icon: "mdi-weight-lifter",
          query: "other",
          category: "ENDURANCE",
          value: "OTHER",
          image: "/img/endurance.jpg",
        },
        //Strength
        {
          title: "Lifting weights",
          icon: "mdi-human",
          query: "lifting_weights",
          category: "STRENGTH",
          value: "LIFTING_WEIGHTS",
          image: "/img/strength.jpg",
        },
        {
          title: "Resistance bands",
          icon: "mdi-human",
          query: "resistance_bands",
          category: "STRENGTH",
          value: "RESISTANCE_BANDS",
          image: "/img/strength.jpg",
        },
        {
          title: "Bodyweight exercises",
          icon: "mdi-human",
          query: "body_weight_exercises",
          category: "STRENGTH",
          value: "body_weight_exercises",
          image: "/img/strength.jpg",
        },
        {
          title: "Other, strength",
          icon: "mdi-weight-lifter",
          query: "other_s",
          category: "STRENGTH",
          value: "OTHER_S",
          image: "/img/strength.jpg",
        },
      ],
      levels: [
        {
          title: "All",
          value: "ALL",
          query: "all",
        },
        {
          title: "Novice",
          value: "L1",
          query: "beginner-1",
        },
        {
          title: "Beginner",
          value: "L2",
          query: "beginner-2",
        },
        {
          title: "Competent",
          value: "L3",
          query: "intermediate-1",
        },
        {
          title: "Proficient",
          value: "L4",
          query: "intermediate-2",
        },
        {
          title: "Expert",
          value: "L5",
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
          title: "All",
          label: "All",
          value: "ALL",
          query: "all",
        },
        {
          title: "Novice",
          label: "Novice",
          value: "L1",
          query: "beginner-1",
        },
        {
          title: "Beginner",
          label: "Beginner",
          value: "L2",
          query: "beginner-2",
        },
        {
          title: "Competent",
          label: "Competent",
          value: "L3",
          query: "intermediate-1",
        },
        {
          title: "Proficient",
          label: "Proficient",
          value: "L4",
          query: "intermediate-2",
        },
        {
          title: "Expert",
          label: "Expert",
          value: "L5",
          query: "advanced",
        },
        // {
        //   title: "Favorite",
        //   label: "My Favorites",
        //   value: "FAVORITE",
        //   query: "favorites",
        // },
      ],
      favFilters: [
       {
          title: "Favorite",
          label: "My Favorites",
          value: "FAVORITE",
          query: "favorites",
        },
      ],
    };
  },
  methods: {
    ...mapActions(["fetchPreferences"]),
    async notify(activity) {
      console.log(activity)
      const reg = await navigator.serviceWorker.getRegistration();
      console.log(reg)
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
        body: "This is your daily be well reminder!",
        image: this.imageURL(activity.category),
        actions: [
          {
            title: "Start Activity",
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
  mounted() {
    this.fetchPreferences()
  },
  computed: {
    ...mapGetters(["preferences"]),
  strengthLevel(){
    if (this.preferences && this.preferences[0]){
      let prefs = this.preferences[0].preference_items.filter(t => t && t.category == 'Strength')         
      if(prefs[0].l1){
        console.log("Strength: L1")
        return 'L1'
      }
      if(prefs[0].l2){
        console.log("Strength: L2")
        return 'L2'
      }
      if(prefs[0].l3){
        console.log("Strength: L3")
        return 'L3'
      }
      if(prefs[0].l4){
        console.log("Strength: L4")
        return 'L4'
      } 
      if(prefs[0].l5){
        console.log("Strength: L5")
        return 'L5'
      }       
    } else if (!this.preferences){
      return 'L1'
   }
  },
  balanceLevel(){
    if (this.preferences && this.preferences[0]){
      let prefs = this.preferences[0].preference_items.filter(t => t && t.category == 'Balance')   
      if(prefs[0].l1){
        console.log("Balance: L1")
        return 'L1'
      }
      if(prefs[0].l2){
        console.log("Balance: L2")
        return 'L2'
      }
      if(prefs[0].l3){
        console.log("Balance: L3")
        return 'L3'
      }
      if(prefs[0].l4){
        console.log("Balance: L4")
        return 'L4'
      }  
      if(prefs[0].l4){
        console.log("Balance: L5")
        return 'L5'
      }  
     } else if (!this.preferences){
      return 'L1'
   }
  },
  enduranceLevel(){
    if (this.preferences && this.preferences[0]){
      //console.log("endurance")
      let prefs = this.preferences[0].preference_items.filter(t => t && t.category == 'Endurance')   
      //console.log(prefs)
      if(prefs[0].l1){
        console.log("Endurance: L1")
        return 'L1'
      }
      if(prefs[0].l2){
        console.log("Endurance: L2")
        return 'L2'
      }
      if(prefs[0].l3){
        console.log("Endurance: L3")
        return 'L3'
      }
      if(prefs[0].l4){
        console.log("Endurance: L4")
        return 'L4'
      }
      if(prefs[0].l5){
        console.log("Endurance: L5")
        return 'L5'
      } 
    } else if (!this.preferences){
      return 'L1'
   }
  },
  nutritionLevel(){
    if (this.preferences && this.preferences[0]){
      let prefs = this.preferences[0].preference_items.filter(t => t && t.category == 'Nutrition')   
      if(!prefs[0].not_interested){
        console.log("Nutrition: I AM INTERESTED")
        return 'NOT_APPLICABLE'
      }
      if(prefs[0].not_interested){
        console.log("Nutrition: I AM NOT INTERESTED")
        return false
      }
    } else if (!this.preferences){
      return 'NOT_APPLICABLE'
   }
  },
  recLevel(){
    if (this.preferences && this.preferences[0]){
      let prefs = this.preferences[0].preference_items.filter(t => t && t.category == 'Recovery')   
      if(!prefs[0].not_interested){
        console.log("Recovery: I AM INTERESTED")
        return 'NOT_APPLICABLE'
      }  
      if(prefs[0].not_interested){
        console.log("RECOVERY: I AM NOT INTERESTED")
        return false
      }
    } else if (!this.preferences){
      return 'NOT_APPLICABLE'
   }
  },
  ergLevel(){
    if (this.preferences && this.preferences[0]){
      let prefs = this.preferences[0].preference_items.filter(t => t && t.category == 'Ergonomics')   
      if(!prefs[0].not_interested){
        console.log("ERGONOMICS: I AM INTERESTED")
        return 'NOT_APPLICABLE'
      }  
      if(prefs[0].not_interested){
        console.log("ERGONOMICS: I AM NOT INTERESTED")
        return false
      }
    } else if (!this.preferences){
      return 'NOT_APPLICABLE'
   }
  },
  flexLevel(){
    if (this.preferences && this.preferences[0]){
      let prefs = this.preferences[0].preference_items.filter(t => t && t.category == 'Flexibility & Mobility')   
      if(prefs[0].l1){
        console.log("Flexibility & Mobility: L1")
        return 'L1'
      }
      if(prefs[0].l2){
        console.log("Flexibility & Mobility: L2")
        return 'L2'
      }
      if(prefs[0].l3){
        console.log("Flexibility & Mobility: L3")
        return 'L3'
      }
      if(prefs[0].l4){
        console.log("Flexibility & Mobility: L4")
        return 'L4'
      }   
      if(prefs[0].l5){
        console.log("Flexibility & Mobility: L5")
        return 'L5'
      }  
    } else if (!this.preferences){
      return 'L1'
   }
   },   
    filteredCategories() {
      if (this.preferences && this.preferences[0]){
        let prefs = this.preferences[0].preference_items 
        let filtered = prefs.filter(c => c.category && c.not_interested == false).map(c => c.category)        
        return this.categories.filter((category) => category.value != "ALL" && filtered.includes(category.title)); 
      } else  return this.categories.filter((category) => category.value != "ALL" );
    },
    filteredLevels() {
      console.log("filteredLevels");
      return this.levels.filter((level) => level.value != "ALL");
    },
  
  },
};
