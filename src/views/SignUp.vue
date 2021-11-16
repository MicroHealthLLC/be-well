<template>
  <v-row>
    <v-col>
      <div class="d-flex justify-center">
        <v-card v-if="!confirm" max-width="600">
          <v-card-title>Sign Up</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field v-model="email" label="Email"></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="attemptSignUp">Sign Up</v-btn>
          </v-card-actions>
        </v-card>
        <v-card v-else max-width="600">
          <v-card-title>Confirm Code</v-card-title>
          <v-card-text>
            <v-text-field
              v-model="code"
              label="Confirmation Code"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="confirmCode">Submit</v-btn>
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
      confirm: false,
      code: "",
      error: "",
    };
  },
  methods: {
    ...mapActions(["confirmSignUp", "login", "signUp"]),
    async attemptSignUp() {
      if (!this.email || !this.password) {
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
          this.$router.push("/");
        } catch (error) {
          console.log(error);
          this.error = error;
        }
      }
    },
  },
};
</script>

<style></style>
