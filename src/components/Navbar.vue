<template>
  <div>
    <v-app-bar fixed app>
      <!-- Hamburger Menu -->
      <v-app-bar-nav-icon
        v-if="$vuetify.breakpoint.xsOnly"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <v-spacer v-if="$vuetify.breakpoint.xsOnly"></v-spacer>
      <!-- App Logo -->
      <router-link to="/home"
        ><v-img src="../assets/well-being-logo.png" width="125"
      /></router-link>

      <v-spacer v-if="$vuetify.breakpoint.xsOnly"></v-spacer>
      <div v-if="$vuetify.breakpoint.xsOnly" class="hidden-block"></div>

      <!-- Main Navigation Items -->
      <v-tabs
        v-if="!$vuetify.breakpoint.xsOnly"
        color="var(--mh-blue)"
        slider-size="4"
        centered
        optional
        dense
      >
        <v-tabs-slider color="var(--mh-green)"></v-tabs-slider>
        <v-tab to="/home"><v-icon class="mr-1">mdi-home</v-icon>Home</v-tab>
        <v-tab to="/activities"
          ><v-icon class="mr-1">mdi-yoga</v-icon>Activities</v-tab
        >
        <v-tab to="/health"
          ><v-icon class="mr-1">mdi-heart-pulse</v-icon>Health</v-tab
        >
        <v-tab to="/events"
          ><v-icon class="mr-1">mdi-calendar</v-icon>Events</v-tab
        >
      </v-tabs>
      <!-- User Dropdown Menu -->
      <v-menu v-if="!$vuetify.breakpoint.xsOnly" offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <v-list dense>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Signed in as</v-list-item-title>
              <v-list-item-subtitle>{{
                user.attributes.email
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item to="/profile">
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item>
          <v-list-item @click="logOutUser">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <!-- Mobile Side Navigation -->
    <v-navigation-drawer v-model="drawer" temporary app>
      <v-list dense>
        <v-list-item-group color="var(--mh-orange)">
          <v-list-item to="/home" link>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/activities" link>
            <v-list-item-icon>
              <v-icon>mdi-yoga</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Activities</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/health" link>
            <v-list-item-icon>
              <v-icon>mdi-heart-pulse</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Health</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/events" link>
            <v-list-item-icon>
              <v-icon>mdi-calendar</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Events</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <template v-slot:append>
        <v-divider></v-divider>
        <v-list dense>
          <v-list-item to="/profile" color="var(--mh-orange)" link>
            <v-list-item-icon><v-icon>mdi-account</v-icon></v-list-item-icon>
            <v-list-item-content
              ><v-list-item-title>Profile</v-list-item-title>
              <v-list-item-subtitle>{{
                user.attributes.email
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <div class="pa-2">
          <v-btn @click="logOutUser" color="var(--mh-blue)" block dark>
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Navbar",
  data() {
    return {
      drawer: false,
    };
  },
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

<style scoped>
a.v-tab {
  text-transform: capitalize;
}
.hidden-block {
  width: 48px;
}
</style>
