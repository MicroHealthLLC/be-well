<template>
  <v-row>
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
           
              <v-data-table
               v-if="preferences && preferences[0] && preferences[0].preference_items"
              :headers="headers"
              :items="preferences[0].preference_items"
              class="elevation-1"
            >
              <template v-slot:[`item.l1`]="{ item }">
                <v-checkbox
                  v-model="item.l1"  
                  v-if="item.category !== 'Nutrition' && item.category !== 'Ergonomics' && item.category !== 'Recovery'"
                  :disabled="item.l2 || item.l3 || item.l4 || item.l5 || item.not_interested"
                  @click="noviceToggle(preferences[0].preference_items.indexOf(item), item.l1)"   
                  color="success"   
                 ></v-checkbox>
              </template>
              <template v-slot:[`item.l2`]="{ item }">
                <v-checkbox
                  v-model="item.l2"
                  v-if="item.category !== 'Nutrition' && item.category !== 'Ergonomics' && item.category !== 'Recovery'"
                  :disabled="item.l1 || item.l3 || item.l4 || item.l5 || item.not_interested"
                  @click="beginnerToggle(preferences[0].preference_items.indexOf(item), item.l2)"                  
                  color="success"   
               ></v-checkbox>
              </template>
              <template v-slot:[`item.l3`]="{ item }">
                <v-checkbox
                  v-model="item.l3"
                 v-if="item.category !== 'Nutrition' && item.category !== 'Ergonomics' && item.category !== 'Recovery'"
                  :disabled="item.l1 || item.l2 || item.l4 || item.l5 || item.not_interested"
                  @click="competentToggle(preferences[0].preference_items.indexOf(item), item.l3)"     
                  color="success"  
                ></v-checkbox>
              </template>
              <template v-slot:[`item.l4`]="{ item }">
                <v-checkbox
                  v-model="item.l4"
                  v-if="item.category !== 'Nutrition' && item.category !== 'Ergonomics' && item.category !== 'Recovery'"
                  :disabled="item.l1 || item.l2 || item.l3 || item.l5 || item.not_interested"
                  @click="proficientToggle(preferences[0].preference_items.indexOf(item), item.l4)"     
                  color="success"   
                ></v-checkbox>
              </template>
              <template v-slot:[`item.l5`]="{ item }">
                <v-checkbox
                   v-model="item.l5"
                    v-if="item.category !== 'Nutrition' && item.category !== 'Ergonomics' && item.category !== 'Recovery'"
                   :disabled="item.l1 || item.l2 || item.l3 || item.l4 || item.not_interested"
                  @click="expertToggle(preferences[0].preference_items.indexOf(item), item.l5)"     
                  color="success" 
              ></v-checkbox>
              </template>
              <template v-slot:[`item.not_interested`]="{ item }">
                <v-checkbox
                  v-model="item.not_interested"
                    :disabled="item.l1 || item.l2 || item.l3 || item.l4 || item.l5"
                  @click="nIToggle(preferences[0].preference_items.indexOf(item), item.not_interested)"     
                  color="success" 
                ></v-checkbox>
              </template>
          
             </v-data-table>
              <v-data-table
              v-else
              :headers="headers"
              :items="tablePreferences.preference_items"
              class="elevation-1"
            >
              <template v-slot:[`item.l1`]="{ item }">
                <v-checkbox
                   v-if="item.category !== 'Nutrition' && item.category !== 'Ergonomics' && item.category !== 'Recovery'"
                  v-model="item.l1"  
                  :disabled="item.l2 || item.l3 || item.l4 || item.l5 || item.not_interested"
                  @click="noviceToggle(tablePreferences.preference_items.indexOf(item), item.l1)"   
                  color="success"   
                 ></v-checkbox>
              </template>
              <template v-slot:[`item.l2`]="{ item }">
                <v-checkbox
                   v-if="item.category !== 'Nutrition' && item.category !== 'Ergonomics' && item.category !== 'Recovery'"
                   v-model="item.l2"  
                  :disabled="item.l1 || item.l3 || item.l4 || item.l5 || item.not_interested"
                  @click="beginnerToggle(tablePreferences.preference_items.indexOf(item), item.l2)"                  
                  color="success"   
               ></v-checkbox>
              </template>
              <template v-slot:[`item.l3`]="{ item }">
                <v-checkbox
                   v-if="item.category !== 'Nutrition' && item.category !== 'Ergonomics' && item.category !== 'Recovery'"
                   v-model="item.l3"
                  :disabled="item.l1 || item.l2 || item.l4 || item.l5 || item.not_interested"
                  @click="competentToggle(tablePreferences.preference_items.indexOf(item), item.l3)"     
                  color="success"  
                ></v-checkbox>
              </template>
              <template v-slot:[`item.l4`]="{ item }">
                <v-checkbox
                  v-model="item.l4"
                  v-if="item.category !== 'Nutrition' && item.category !== 'Ergonomics' && item.category !== 'Recovery'"
                  :disabled="item.l1 || item.l2 || item.l3 || item.l5 || item.not_interested"
                  @click="proficientToggle(tablePreferences.preference_items.indexOf(item), item.l4)"     
                  color="success"   
                ></v-checkbox>
              </template>
              <template v-slot:[`item.l5`]="{ item }">
                <v-checkbox
                  v-if="item.category !== 'Nutrition' && item.category !== 'Ergonomics' && item.category !== 'Recovery'"
                  v-model="item.l5"
                  :disabled="item.l1 || item.l2 || item.l3 || item.l4 || item.not_interested"
                  @click="expertToggle(tablePreferences.preference_items.indexOf(item), item.l5)"     
                  color="success" 
              ></v-checkbox>
              </template>
              <template v-slot:[`item.not_interested`]="{ item }">
                <v-checkbox
                  v-model="item.not_interested"
                  :disabled="item.l1 || item.l2 || item.l3 || item.l4 || item.l5"
                  @click="nIToggle(tablePreferences.preference_items.indexOf(item), item.not_interested)"     
                  color="success" 
                ></v-checkbox>
              </template>
          
             </v-data-table>
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
      tablePreferences: {
            preference_items: [
            {
              category: "Balance",
              l1: true,
              l2: false,
              l3: false, 
              l4: false, 
              l5: false, 
              not_interested: false, 
            },
            {
              category: "Endurance",
              l1: true,
              l2: false,
              l3: false, 
              l4:false, 
              l5: false, 
              not_interested: false, 
            },           
            {
              category: "Flexibility & Mobility",
              l1: true,
              l2: false,
              l3: false, 
              l4: false, 
              l5: false, 
              not_interested: false, 
            },            
            {
              category: "Strength",
              l1: true,
              l2: false,
              l3: false, 
              l4: false, 
              l5: false, 
              not_interested: false, 
            },
             {
              category: "Nutrition",
              not_interested: false, 
            },
            {
              category: "Recovery",
              not_interested: false, 
            },
             {
              category: "Ergonomics",
              not_interested: false, 
            },
          ],
        },    
        headers: [
          {
            text: 'Focus Area',
            align: 'start',
            sortable: false,
            value: 'category',
          },
          { text: 'Novice', value: 'l1' },
          { text: 'Beginner', value: 'l2' },
          { text: 'Competent', value: 'l3' },
          { text: 'Proficient', value: 'l4' },
          { text: 'Expert', value: 'l5' },
          { text: 'Not Interested', value: 'not_interested' },
        ],
   
    };
  },
  methods: {
    ...mapActions([
      "changePassword", 
      "updateUser", 
      "fetchPreferences", 
      "addPreferences", 
      "addPreferenceItems",
      "updatePreferencesById"
      ]),
    // editPreferences(){
    //   this.isEditing = true;
    // },
    // log(e){
    //   console.log(e)
    // },
    async savePreferences() {
      if(this.preferences && this.preferences[0] && this.preferences[0].id){
         console.log(this.preferences[0].id, "update")
      await this.updatePreferencesById({
        id: this.preferences[0].id,
        preference_items: this.preferences[0].preference_items
        })
     console.log(this.preferences[0])
         console.log("update")
      } else {
      await this.addPreferences(this.tablePreferences)
        //  console.log(this.tablePreferences)
         console.log("this is new" + this.tablePreferences)
      }
      // console.log(this.tablePreferences)
      // console.log(this.preferences[0])
     
    },
    noviceToggle(i, val){
      console.log(i, val) 
      // console.log("novice",  this.tablePreferences.preference_items[i].l1)     
    },
    beginnerToggle(i, val,){     
      console.log(i, val) 
      // console.log("beginner", this.tablePreferences. preference_items[i].l2)     
    },
    competentToggle(i, val){     
       console.log(i, val)   
      //  console.log("competent", this.tablePreferences[i].l3)     
    },
    proficientToggle(i, val){     
      console.log(i, val) 
      // console.log("proficient", this.tablePreferences[i].l5)     
    },
    expertToggle(i, val){     
      console.log(i, val) 
      // console.log("expert", this.tablePreferences[i].l6)     
    },
    nIToggle(i, val){     
       console.log(i, val) 
      //  console.log("not interested", this.tablePreferences[i].not_interested)     
    },
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
  nonLevel(){
    return 'Nutrition' && 'Ergonomics' && 'Recovery'
  },
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
