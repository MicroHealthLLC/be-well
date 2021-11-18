<template>
  <v-sheet class="pa-5 welcome-card" dark app>
    <p class="text-h5 font-weight-bold text-center">
      Well-Beeing is here to help change your life for the better!
    </p>
    <p class="text-subtitle-2 text-center">
      Whether reminding you to get moving, check your health, or take a mindful
      moment, Well-Beeing promotes a healthy lifestyle.
    </p>
    <div class="d-flex justify-center">
      <div class="mh-message text-caption text-sm-body-1">
        Remember, a better YOU means a better MicroHealth!
      </div>
    </div>
  </v-sheet>
</template>

<script>
export default {
  name: "WelcomeBanner",
};
</script>

<style scoped>
.welcome-card {
  background: rgb(158, 198, 76);
  background: linear-gradient(
    341deg,
    rgba(158, 198, 76, 1) 0%,
    rgba(29, 51, 111, 1) 100%
  );
}
.mh-message {
  background-color: var(--mh-orange);
  text-align: center;
  padding: 5px 10px;
  border: 1px solid rgb(95, 95, 95);
  border-radius: 15px;
}
</style>
