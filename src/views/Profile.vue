<template>
  <v-row>
    <v-col class="col-12"
      ><span class="text-h6 text-sm-h5">My Profile</span>

      <v-divider class="mb-4"></v-divider>

      <v-card>
        <v-tabs :vertical="$vuetify.breakpoint.smAndUp">
          <v-tab>
            <v-icon left> mdi-account </v-icon>
            Personal
          </v-tab>
          <v-tab>
            <v-icon left> mdi-lock </v-icon>
            Account
          </v-tab>
          <v-tab-item>
            <v-card class="pl-5 pr-5 pb-5" flat>
              <v-card-title class="pb-0">Details</v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-text-field
                  v-model="given_name"
                  label="First Name"
                ></v-text-field>
                <v-text-field
                  v-model="family_name"
                  label="Last Name"
                ></v-text-field>
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
          </v-tab-item>
          <v-tab-item>
            <v-card class="pl-5 pr-5 pb-5" flat>
              <v-alert
                v-model="hasError"
                class="mt-2"
                type="error"
                dismissible
                >{{ error }}</v-alert
              >
              <v-card-title class="pb-0">Change Password</v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-form ref="changepasswordform">
                  <v-text-field
                    v-model="oldPassword"
                    label="Old Password"
                    type="password"
                    :rules="[(v) => !!v || 'Password is required']"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="newPassword"
                    label="New Password"
                    type="password"
                    :rules="[
                      (v) => !!v || 'Password is required',
                      (v) => v !== oldPassword || 'New password must be different from current',
                    ]"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="confirmPassword"
                    label="Confirm New Password"
                    type="password"
                    :rules="[
                      (v) => !!v || 'Password is required',
                      (v) => v === newPassword || 'Passwords must match',
                    ]"
                    required
                    validate-on-blur
                  ></v-text-field>
                  <p class="mt-2">
                    * Password must be 8 or more characters long, contain at least
                    1 number, 1 special character, 1 uppercase letter, and 1
                    lowercase letter
                  </p>
                </v-form>
              </v-card-text>
              <v-card-actions class="d-flex justify-end">
                <v-btn
                  @click="updatePassword"
                  class="px-10"
                  color="primary"
                  :block="$vuetify.breakpoint.xsOnly"
                  :loading="saving"
                  :disabled="saving"
                  >Save</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-tab-item>
        </v-tabs>
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
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      hasError: false,
      error: "",
    };
  },
  methods: {
    ...mapActions(["changePassword", "updateUser"]),
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
    async updatePassword() {
      if (!this.$refs.changepasswordform.validate()) {
        return;
      }

      try {
        await this.changePassword({
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
        });
      } catch (error) {
        this.error = error.message;
        this.hasError = true;
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
