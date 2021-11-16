<template>
  <v-row>
    <v-col>
      <div class="d-flex justify-center align-center main-container">
        <v-card max-width="600">
          <v-card-title class="d-flex flex-column"
            ><v-img src="../assets/well-being-logo.png" max-width="300"></v-img
          ><p class="text-body-1">Sign in to Well Beeing</p></v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-text-field
                v-model="username"
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
            </v-form>
          </v-card-text>
          <v-card-actions class="d-flex flex-column">
            <v-btn color="var(--mh-blue)" @click="userLogin" block dark
              >Login</v-btn
            >
            <p class="mt-4">
              No account? <router-link to="/signup">Create Account</router-link>
            </p>
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
      username: "",
      password: "",
      email: "",
      error: "",
      valid: true,
    };
  },
  methods: {
    ...mapActions(["login"]),
    async userLogin() {
      if (!this.$refs.form.validate()) {
        return;
      }

      try {
        await this.login({
          username: this.username,
          password: this.password,
        });

        this.$router.push("/home");
      } catch (error) {
        console.log(error);
        this.error = error;
      }
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}
.main-container {
  height: 100vh;
}
</style>
