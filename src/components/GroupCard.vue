<template>
  <div>
    <v-card
      elevation="5"
      width="350px"
      min-height="50px"
      color="var(--mh-blue)"
      class="mb-5"
      :class="isEditor ? 'change-cursor' : ''"
    >
      <div class="d-flex justify-space-between">
        <v-card-title class="groupTitle ml-1">
          {{ group.groupName }}
        </v-card-title>

        <template>
          
          <v-menu open-on-hover right offset-x nudge-right="25" rounded>
            
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="white" v-bind="attrs" v-on="on" class="mr-5">
                mdi-account-group
              </v-icon>
              
            </template>
            <v-app>
            <span class="members" v-if="items.length !== 0">
              <ul v-for="participant in items" :key="participant.id">
                <li
                  style="position: relative; right: 15px; list-style-type: none;"
                >
                  {{ participant.firstName }}
                  {{ participant.lastName }} - {{ participant.score }} points
                </li>
              </ul>
            </span>
            <span class="no-members text-center" v-else>None</span>
            </v-app>
            
          </v-menu>
          
        </template>
        
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "GroupCard",
  props: {
    group: {
      type: Object,
    },
    items: {
      type: Array,
      default: () => [],
    },
    isEditor: {
      type: Boolean,
    },
  },
};
</script>

<style scoped>
.groupTitle {
  color: white;
  vertical-align: middle;
  justify-content: space-between;
  display: inline-flex;
}

.change-cursor {
  cursor: pointer;
}

::v-deep .v-application--wrap {
  min-height: 3vh;
  min-width: 8vh;
  padding: 4px;
}

</style>
