<template>
  <v-row>
    <v-col>
      <h2>Home</h2>
      <p v-if="user">Hello {{ user.attributes.email }}</p>
      <v-btn @click="logOutUser" color="primary">Logout</v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Home",
  methods: {
    ...mapActions(["logout"]),
    async logOutUser() {
      await this.logout();
      this.$router.push("/login");
    },
  },
  computed: {
    ...mapGetters(["user"]),
  },
};
</script>
