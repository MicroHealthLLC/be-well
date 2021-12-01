<template>
  <v-row>
    <v-col>
      <div class="d-flex justify-center align-center main-container">
        <v-card class="pt-0 pr-5 pb-5 pl-5" max-width="600" :loading="loading">
          <v-alert
            v-model="hasError"
            type="error"
            transition="scroll-y-transition"
            dismissible
            >{{ error }}</v-alert
          >
          <v-card-title class="d-flex flex-column"
            ><v-img src="../assets/well-being-logo.png" max-width="300"></v-img>
            <p class="text-body-1">Please sign up below</p></v-card-title
          >
          <v-card-text>
            <v-form ref="signupform" v-model="valid">
              <v-text-field
                v-model="email"
                label="Email"
                :rules="[
                  (v) => !!v || 'Email is required',
                  (v) =>
                    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                    'Not a valid email address',
                ]"
                required
                validate-on-blur
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
              <v-text-field
                v-model="phoneNumber"
                label="Phone Number"
                :rules="[
                  (v) => !!v || 'Phone Number is required',
                  (v) => v.length === 12 || 'Incorrect phone number format',
                  (v) =>
                    v.match(/[0-9]{3}-[0-9]{3}-[0-9]{4}/) != null ||
                    'Incorrect phone number format',
                ]"
                required
                validate-on-blur
                hint="Format: 123-456-7890"
                persistent-hint
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions class="d-flex flex-column">
            <v-btn
              @click="attemptSignUp"
              color="var(--mh-blue)"
              :disabled="loading"
              :loading="loading"
              :dark="!loading"
              block
              >Sign Up</v-btn
            >
            <p class="mt-4">
              Already have an account?
              <router-link to="/login">Login</router-link>
            </p>
          </v-card-actions>
        </v-card>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      email: "",
      password: "",
      phoneNumber: "",
      confirmPassword: "",
      error: "",
      valid: true,
      hasError: false,
    };
  },
  methods: {
    ...mapActions(["login", "signUp"]),
    async attemptSignUp() {
      if (!this.$refs.signupform.validate()) {
        return;
      } else {
        try {
          await this.signUp({
            username: this.email,
            email: this.email,
            password: this.password,
            phoneNumber: "+1" + this.phoneNumber.split("-").join(""),
          });

          this.$router.push({
            name: "Verify",
            params: { email: this.email, password: this.password },
          });
        } catch (error) {
          this.hasError = true;
          this.error = error.message;
        }
      }
    },
  },
  computed: {
    ...mapGetters(["loading"]),
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
