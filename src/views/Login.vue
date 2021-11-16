<template>
  <v-row>
    <v-col>
      <div class="d-flex justify-center">
        <v-card max-width="600">
          <v-card-title>Login</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field v-model="username" label="Email"></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="userLogin">Login</v-btn>
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
    };
  },
  methods: {
    ...mapActions(["login"]),
    async userLogin() {
      try {
        await this.login({
          username: this.username,
          password: this.password,
        });

        this.$router.push("/");
      } catch (error) {
        console.log(error);
        this.error = error;
      }
    },
  },
};
</script>

<style></style>
