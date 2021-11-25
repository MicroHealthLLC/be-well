<template>
  <v-row>
    <v-col>
      <div class="d-flex justify-center align-center main-container">
        <v-card v-if="!confirm" max-width="600">
          <v-card-title class="d-flex flex-column"
            ><v-img src="../assets/well-being-logo.png" max-width="300"></v-img>
            <p class="text-body-1">Please sign up below</p></v-card-title
          >
          <v-card-text>
            <v-form ref="signupform" v-model="valid">
              <v-text-field
                v-model="email"
                label="Email"
                :rules="[(v) => !!v || 'Email is required']"
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                :rules="[(v) => !!v || 'Password is required']"
                required
              ></v-text-field>
              <v-text-field
                v-model="confirmPassword"
                label="Confirm Password"
                type="password"
                :rules="[
                  (v) => !!v || 'Confirm Password is required',
                  (v) => v === password || 'Passwords must match',
                ]"
                required
                validate-on-blur
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions class="d-flex flex-column">
            <v-btn @click="attemptSignUp" color="var(--mh-blue)" block dark
              >Sign Up</v-btn
            >
            <p class="mt-4">
              Already have an account?
              <router-link to="/login">Login</router-link>
            </p>
          </v-card-actions>
        </v-card>
        <v-card v-else max-width="600">
          <v-card-title class="d-flex flex-column"
            ><v-img src="../assets/well-being-logo.png" max-width="300"></v-img>
            <p class="text-body-1">Confirm Verification Code</p></v-card-title
          >
          <v-card-text>
            <v-text-field
              v-model="code"
              label="Confirmation Code"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="confirmCode" color="var(--mh-blue)" block dark
              >Submit</v-btn
            >
          </v-card-actions>
        </v-card>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      confirm: false,
      code: "",
      error: "",
      valid: true,
    };
  },
  methods: {
    ...mapActions(["confirmSignUp", "login", "signUp"]),
    async attemptSignUp() {
      if (!this.$refs.signupform.validate()) {
        return;
      } else {
        try {
          await this.signUp({
            username: this.email,
            email: this.email,
            password: this.password,
          });
          this.confirm = true;
        } catch (error) {
          console.log(error);
          this.error = error;
        }
      }
    },
    async confirmCode() {
      if (!this.email || !this.code) {
        return;
      } else {
        try {
          await this.confirmSignUp({
            username: this.email,
            code: this.code,
          });
          await this.login({ username: this.email, password: this.password });
          this.$router.push("/home");
        } catch (error) {
          console.log(error);
          this.error = error;
        }
      }
    },
  },
};
</script>

<style scoped>
.main-container {
  height: 100vh;
}
a {
  text-decoration: none;
}
</style>
