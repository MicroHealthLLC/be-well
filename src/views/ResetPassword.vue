<template>
  <v-row>
    <v-col>
      <div class="d-flex justify-center align-center main-container">
        <v-card class="pa-5" max-width="600">
          <v-alert
            v-model="hasError"
            type="error"
            transition="scroll-y-transition"
            dismissible
            >{{ error }}</v-alert
          >
          <v-card-title class="d-flex flex-column"
            ><v-img src="../assets/well-being-logo.png" max-width="300"></v-img>
            <p class="text-body-1">Reset Password</p></v-card-title
          >
          <v-card-text>
            <v-form ref="resetpasswordform">
              <v-text-field
                v-model="email"
                label="Email"
                :readonly="codeSent"
                :rules="[
                  (v) => !!v || 'Email is required',
                  (v) =>
                    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                    'Not a valid email address',
                ]"
                required
                validate-on-blur
              ></v-text-field>
              <div v-if="codeSent">
                <v-text-field
                  v-model="code"
                  label="Reset Code"
                  :rules="[(v) => !!v || 'Reset Code is required']"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="newPassword"
                  label="New Password"
                  type="password"
                  :rules="[(v) => !!v || 'New Password is required']"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="confirmPassword"
                  label="Confirm New Password"
                  type="password"
                  :rules="[
                    (v) => !!v || 'Confirm Password is required',
                    (v) => v === newPassword || 'Passwords must match',
                  ]"
                  required
                  validate-on-blur
                ></v-text-field>
              </div>
            </v-form>
          </v-card-text>
          <v-card-actions class="d-flex flex-column">
            <v-btn
              v-if="!codeSent"
              @click="sendResetCode"
              color="var(--mh-blue)"
              block
              :loading="loading"
              :disabled="loading"
              :dark="!loading"
              >Send Code</v-btn
            >
            <v-btn
              v-else
              @click="submitNewPassword"
              class="ml-0 mt-2"
              :loading="loading"
              :disabled="loading"
              :dark="!loading"
              color="var(--mh-blue)"
              block
              >Submit</v-btn
            >
            <p class="mt-4">
              Return to <router-link to="/login">Login</router-link>
            </p>
          </v-card-actions>
        </v-card>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { Auth } from "aws-amplify";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "ResetPassword",
  data() {
    return {
      email: "",
      code: "",
      newPassword: "",
      confirmPassword: "",
      codeSent: false,
      hasError: false,
      error: "error",
    };
  },
  methods: {
    ...mapActions(["login"]),
    ...mapMutations(["SET_SNACKBAR"]),
    async sendResetCode() {
      if (!this.$refs.resetpasswordform.validate()) {
        return;
      }
      try {
        await Auth.forgotPassword(this.email);
        this.SET_SNACKBAR({
          show: true,
          message: "Code sent. Please check email.",
          color: "var(--mh-green)",
        });
        this.codeSent = true;
      } catch (error) {
        this.error = error.message;
        this.hasError = true;
      }
    },
    async submitNewPassword() {
      if (!this.$refs.resetpasswordform.validate()) {
        return;
      }
      try {
        await Auth.forgotPasswordSubmit(
          this.email,
          this.code,
          this.newPassword
        );
        await this.login({ username: this.email, password: this.newPassword });
        this.SET_SNACKBAR({
          show: true,
          message: "Password successfully changed!",
          color: "var(--mh-green)",
        });
        this.$router.push("/home");
      } catch (error) {
        this.error = error.message;
        this.hasError = true;
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
