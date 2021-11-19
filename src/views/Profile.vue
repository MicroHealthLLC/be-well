<template>
  <v-row>
    <v-col class="col-12"
      ><span class="text-h6 text-sm-h5">My Profile</span>

      <v-divider class="mb-4"></v-divider>

      <v-card class="px-sm-10"
        ><v-card-text>
          <v-text-field v-model="given_name" label="First Name"></v-text-field>
          <v-text-field v-model="family_name" label="Last Name"></v-text-field>
          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="birthdate"
                label="Date of Birth"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="birthdate"
              @input="menu = false"
            ></v-date-picker>
          </v-menu>
        </v-card-text>
        <v-card-actions class="d-flex justify-end">
          <v-btn
            @click="editProfile"
            class="px-10"
            color="primary"
            :block="$vuetify.breakpoint.xsOnly"
            :loading="saving"
            :disabled="saving"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      menu: false,
      given_name: "",
      family_name: "",
      birthdate: "",
    };
  },
  methods: {
    ...mapActions(["updateUser"]),
    async editProfile() {
      try {
        await this.updateUser({
          given_name: this.given_name,
          family_name: this.family_name,
          birthdate: this.birthdate,
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    ...mapGetters(["saving", "user"]),
  },
  mounted() {
    this.given_name = this.user.attributes.given_name || "";
    this.family_name = this.user.attributes.family_name || "";
    this.birthdate = this.user.attributes.birthdate || "";
  },
};
</script>

<style></style>
