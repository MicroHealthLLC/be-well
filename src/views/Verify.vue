<template>
  <v-row>
    <v-col>
      <div class="d-flex justify-center align-center main-container">
        <v-card max-width="600">
          <v-card-title class="d-flex flex-column"
            ><v-img src="../assets/well-being-logo.png" max-width="300"></v-img>
            <p class="text-body-1">Confirm Verification Code</p></v-card-title
          >
          <v-card-text>
            <v-form ref="verifyform">
              <v-text-field
                v-model="email"
                label="Email"
                :rules="[(v) => !!v || 'Email is required']"
                required
              ></v-text-field>
              <v-text-field
                v-model="code"
                label="Confirmation Code"
                :rules="[(v) => !!v || 'Confirmation Code is required']"
                required
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions class="d-flex flex-column">
            <v-btn
              @click="confirmCode"
              color="var(--mh-blue)"
              block
              :loading="loading"
              :disabled="loading"
              :dark="!loading"
              >Submit</v-btn
            >
            <v-btn
              @click="resendCode"
              class="ml-0 mt-2"
              :loading="loading"
              :disabled="loading"
              color="secondary"
              outlined
              block
              >Resend Code</v-btn
            >
          </v-card-actions>
        </v-card>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      email: "",
      password: "",
      code: "",
    };
  },
  methods: {
    ...mapActions(["confirmSignUp", "login", "resendConfirmationCode"]),
    ...mapMutations(["SET_SNACKBAR"]),
    async confirmCode() {
      if (!this.$refs.verifyform.validate()) {
        return;
      } else {
        try {
          await this.confirmSignUp({
            username: this.email,
            code: this.code,
          });

          if (this.password) {
            await this.login({ username: this.email, password: this.password });
            this.$router.push("/home");
          } else {
            this.SET_SNACKBAR({
              show: true,
              message: "Email verified. Please login to your account.",
              color: "var(--mh-green)",
            });
            this.$router.push("/login");
          }
        } catch (error) {
          console.log(error);
          this.error = error;
        }
      }
    },
    async resendCode() {
      if (!this.email) {
        console.log("No email provided");
        return;
      } else {
        await this.resendConfirmationCode(this.email);
      }
    },
  },
  computed: {
    ...mapGetters(["loading"]),
  },
  mounted() {
    if (this.$route.params.email) {
      this.email = this.$route.params.email;
      this.password = this.$route.params.password;
    }
  },
  beforeDestroy() {
    this.email = "";
    this.password = "";
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
