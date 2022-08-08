<template>
  <v-sheet class="welcome-card" dark app>
    <v-container>
      <v-row>
        <!-- <v-img
              src="../assets/wellness.jpg"
            
            ></v-img> -->
        <v-col cols="12" sm="6" order="2" order-sm="1">
          <div class="cta">
             <!-- <div class="d-flex mt-1 mb-5  ctaBtn">
              <div class="mh-message py-3 px-4" @click="goToGoals">
                <h2 class="font-weight-light">LET'S GET STARTED!</h2>
              </div>
            </div> -->
            <span class="header">
              <b>Bee a better version of <span class="mhG">You</span>.  <span class="brand">Well<span class="mhG">Beeing</span></span>'s got your back!</b>
            </span>
         
          </div> </v-col
        >
          <v-col cols="12" sm="6" order="2" order-sm="1">
          <div class="ctaRight">
             <div class="mb-5">
              <div class="mh-message ctaBtn py-3 d-block" @click="goToGoals">
                <h2>LET'S GET STARTED!</h2>
              </div>
            </div>
          </div> </v-col
            >
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
  text-align: left;
  padding: 5px 10px;
  border-radius: .35rem;
  background-color: rgba(221,	144,	54, 0.15);
  border: solid .5px rgba(221,	144,	54, 0.35);
}
.mh-message:hover {
  background-color: rgba(221,	144,	54, 0.35);
}
 .mhG{
  color: var(--mh-green);
 }
 .mhB{
  color: var(--mh-blue);
 }
.cta{
  width: 40%;
  position: absolute;
  bottom: 3%;
  left: 3%;
  -webkit-text-stroke-width: .35px;
  -webkit-text-stroke-color: black;
}
.ctaRight{
  position: absolute;
  bottom: 2.5%;
  right: 3%;

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

.ctaBtn{
  font-size: 1.55rem;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
  cursor: pointer;
}
</style>
