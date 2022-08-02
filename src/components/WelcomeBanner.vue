<template>
  <v-sheet class="welcome-card" dark app>
    <v-container>
      <v-row>
        <!-- <v-img
              src="../assets/wellness.jpg"
            
            ></v-img> -->
        <v-col cols="12" sm="6" order="2" order-sm="1">
          <div class="cta">
            <span class="header">
              <b>Bee a better version of You.  <span class="brand">Well<span class="mhG">Beeing</span></span>'s got your back!</b>
            </span>
            <!-- <p class="text-subtitle-2 text-center">
              Whether reminding you to get moving, check your health, or take a
              mindful moment, Well-Beeing promotes a healthy lifestyle.
            </p> -->
            <div class="d-flex mt-1 mb-5">
              <button class="mh-message text-caption btn btn-lg" @click="goToGoals">
                <h3>START THE BETTER <span class="mhB">YOU</span> TODAY!</h3>
              </button>
            </div>
          </div> </v-col
        >
        
        <!-- <v-col cols="12" sm="6" order="1" order-sm="2">
          <div class="d-flex justify-center">
            
          </div>
        </v-col> -->
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
export default {
  name: "WelcomeBanner",

  methods: {
    goToGoals() {
      console.log("this works")
      this.$router.push("/activities/goals");
    },
  },
};

</script>

<style scoped>
.welcome-card {
  background: url(../assets/wellness.jpg) no-repeat center center fixed; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  min-height: 100%;
  min-width: 1024px;
  width: 100%;
  height: auto;
}
.mh-message {
  background-color: var(--mh-orange);
  text-align: left;
  padding: 5px 10px;
  border-radius: .25rem;
 }
 .mhG{
  color: var(--mh-green);
 }
 .mhB{
  color: var(--mh-blue);
 }
.cta{
  width: 30%;
  position: absolute;
  bottom: 3%;
  left: 3%;
  -webkit-text-stroke-width: .35px;
  -webkit-text-stroke-color: black;
}
.text-h4{
	-webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
}
.header{
  font-size: 3rem;
  font-family: Arial, Helvetica, sans-serif;
  line-height: normal !important;
}

</style>
