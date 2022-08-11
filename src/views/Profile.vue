<template>
  <v-row :load="log(preferences)">
    <v-col class="col-12"
      ><span class="text-h6 text-sm-h5">My Profile</span>

      <v-divider class="mb-4"></v-divider>

      <v-card>
        <v-tabs :vertical="$vuetify.breakpoint.smAndUp">
         <v-tab>
            <v-icon left> mdi-lock </v-icon>
            Account
          </v-tab>
        
          <v-tab>
            <v-icon left> mdi-account </v-icon>
            Personal
          </v-tab>
         
          <v-tab>
          <v-icon left> mdi-account-star</v-icon>
           Preferences
          </v-tab>



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
                      (v) =>
                        v !== oldPassword ||
                        'New password must be different from current',
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
                    * Password must be 8 or more characters long, contain at
                    least 1 number, 1 special character, 1 uppercase letter, and
                    1 lowercase letter
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


          <v-tab-item>
            <v-card class="pl-5 pr-5 pb-5" flat>
              <v-card-title class="pb-0">Details</v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-form ref="profileform" v-model="formValid">
                  <v-text-field
                    v-model="given_name"
                    label="First Name"
                    :rules="[(v) => !!v || 'First Name is required']"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="family_name"
                    label="Last Name"
                    :rules="[(v) => !!v || 'Last Name is required']"
                    required
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
                </v-form>
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
              <v-card-title class="pb-0">Preferences</v-card-title>
              <v-divider></v-divider>
              <v-card-text>
              <template>
              <!-- <v-data-table
              :headers="headers"
              :items="preferences"
              class="elevation-1"
            >
              <template v-slot:[`item.novice`]="{ item }">
                <v-checkbox
                  v-model="item.novice"  
                  :disabled="item.beginner || item.competent || item.proficient || item.expert || item.not_interested"
                  @click="noviceToggle(preferences.indexOf(item), item.novice)"   
                  color="success"   
                 ></v-checkbox>
              </template>
              <template v-slot:[`item.beginner`]="{ item }">
                <v-checkbox
                  v-model="item.beginner"  
                  :disabled="item.novice || item.competent ||  item.proficient || item.expert || item.not_interested"
                  @click="beginnerToggle(preferences.indexOf(item), item.beginner)"                  
                  color="success"   
               ></v-checkbox>
              </template>
              <template v-slot:[`item.competent`]="{ item }">
                <v-checkbox
                  v-model="item.competent"
                  :disabled="item.novice || item.beginner ||  item.proficient || item.expert || item.not_interested"
                  @click="competentToggle(preferences.indexOf(item), item.competent)"     
                  color="success"  
                ></v-checkbox>
              </template>
              <template v-slot:[`item.proficient`]="{ item }">
                <v-checkbox
                  v-model="item.proficient"
                  :disabled="item.novice || item.competent ||  item.beginner || item.expert || item.not_interested"
                  @click="proficientToggle(preferences.indexOf(item), item.proficient)"     
                  color="success"   
                ></v-checkbox>
              </template>
              <template v-slot:[`item.expert`]="{ item }">
                <v-checkbox
                  v-model="item.expert"
                  :disabled="item.novice || item.competent ||  item.proficient || item.beginner || item.not_interested"
                  @click="expertToggle(preferences.indexOf(item), item.expert)"     
                  color="success" 
              ></v-checkbox>
              </template>
              <template v-slot:[`item.not_interested`]="{ item }">
                <v-checkbox
                  v-model="item.not_interested"
                  :disabled="item.novice || item.competent ||  item.proficient || item.expert || item.beginner"
                  @click="nIToggle(preferences.indexOf(item), item.not_interested)"     
                  color="success" 
                ></v-checkbox>
              </template>
          
             </v-data-table> -->
              </template>
              </v-card-text>
              <v-card-actions class="d-flex justify-end">
                <v-btn     
                  @click="savePreferences"            
                  class="px-10"
                  color="primary"
                  :block="$vuetify.breakpoint.xsOnly"         
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
import utilitiesMixin from "../mixins/utilities-mixin";

export default {
  mixins: [utilitiesMixin],
  data() {
    return {
      formValid: true,
      menu: false,
      // isEditing: false, 
      given_name: "",
      family_name: "",
      birthdate: "",
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      hasError: false,
      error: "",
      prefs:{ preference_items:[
        {
        level: "L1", category: "BALANCE"
        },
        {
        level: "L2", category: "ENDURANCE"
        }       
       ]},
      preferencesT: [
         {
          title: "Balance",
          novice: false,
          beginner: false,
          competent: false, 
          proficient:false, 
          expert: false, 
          not_interested: false, 
        },
        {
          title: "Endurance",
          novice: false,
          beginner: false,
          competent: false, 
          proficient:false, 
          expert: false, 
          not_interested: false, 
        },
        {
          title: "Ergonomics",
          novice: false,
          beginner: false,
          competent: false, 
          proficient:false, 
          expert: false, 
          not_interested: false, 
        },
        {
          title: "Flexibility & Mobility",
          novice: false,
          beginner: false,
          competent: false, 
          proficient:false, 
          expert: false, 
          not_interested: false, 
        },
        {
          title: "Mind",
          novice: false,
          beginner: false,
          competent: false, 
          proficient:false, 
          expert: false, 
          not_interested: false, 
        },
        {
          title: "Nutrition",
          novice: false,
          beginner: false,
          competent: false, 
          proficient:false, 
          expert: false, 
          not_interested: false, 
        },
        {
          title: "Recovery",
          novice: false,
          beginner: false,
          competent: false, 
          proficient:false, 
          expert: false, 
          not_interested: false, 
        },
        {
          title: "Strength",
          novice: false,
          beginner: false,
          competent: false, 
          proficient:false, 
          expert: false, 
          not_interested: false, 
        },
      ],
        headers: [
          {
            text: 'Focus Area',
            align: 'start',
            sortable: false,
            value: 'title',
          },
          { text: 'Novice', value: 'novice' },
          { text: 'Beginner', value: 'beginner' },
          { text: 'Competent', value: 'competent' },
          { text: 'Proficient', value: 'proficient' },
          { text: 'Expert', value: 'expert' },
          { text: 'Not Interested', value: 'not_interested' },
        ],
   
    };
  },
  methods: {
    ...mapActions(["changePassword", "updateUser", "fetchPreferences", "addPreferences"]),
    // editPreferences(){
    //   this.isEditing = true;
    // },
    log(e){
      console.log(e)
    },
    async savePreferences() {
      console.log(this.prefs)
      this.addPreferences(this.prefs)
    },
    // noviceToggle(i, val){
    //   console.log(i, val) 
    //   console.log("novice",  this.preferences[i].novice)     
    // },
    // beginnerToggle(i, val,){     
    //   console.log(i, val) 
    //   console.log("beginner", this.preferences[i].beginner)     
    // },
    // competentToggle(i, val){     
    //    console.log(i, val)   
    //    console.log("competent", this.preferences[i].competent)     
    // },
    // proficientToggle(i, val){     
    //   console.log(i, val) 
    //   console.log("proficient", this.preferences[i].proficient)     
    // },
    // expertToggle(i, val){     
    //   console.log(i, val) 
    //   console.log("expert", this.preferences[i].expert)     
    // },
    // nIToggle(i, val){     
    //    console.log(i, val) 
    //    console.log("not interested", this.preferences[i].not_interested)     
    // },
    updatePreferences(){
      this.isEditing = false;
    },
    async editProfile() {
      if (!this.$refs.profileform.validate()) {
        return;
      }

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
    ...mapGetters(["saving", "user", "preferences"]),
  },
  mounted() {
    this.fetchPreferences();
    this.given_name = this.user.attributes.given_name || "";
    this.family_name = this.user.attributes.family_name || "";
    this.birthdate = this.user.attributes.birthdate || "";
  },
};
</script>

<style></style>
