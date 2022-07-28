<template>
  <v-sheet class="welcome-card" dark app>
    <v-container>
      <v-row>
        <!-- <v-img
              src="../assets/wellness.jpg"
            
            ></v-img> -->
        <v-col cols="12" sm="6" order="2" order-sm="1">
          <div class="cta">
            <p class="text-h4 text-sm-h4 font-weight-bold">
              Well-Beeing is here to help change your life for the better!
            </p>
            <!-- <p class="text-subtitle-2 text-center">
              Whether reminding you to get moving, check your health, or take a
              mindful moment, Well-Beeing promotes a healthy lifestyle.
            </p> -->
            <div class="d-flex justify-center mb-5">
              <div class="mh-message text-caption text-sm-body-1">
                START A BETTER YOU TODAY!
              </div>
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
	
  /* Set up proportionate scaling */
  width: 100%;
  height: auto;
  /* background: rgb(158, 198, 76); */
  /* background: linear-gradient(
    341deg,
    rgba(158, 198, 76, 1) 0%,
    rgba(29, 51, 111, 1) 100%
  ); */
}
.mh-message {
  background-color: var(--mh-orange);
  text-align: left;
  padding: 5px 10px;
  border: 1px solid rgb(95, 95, 95);
  border-radius: 15px;
}

.cta{
  width: 33%;
  position: absolute;
  bottom: 5%;
  left: 5%;
}
.text-h4{
	-webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
}
</style>
