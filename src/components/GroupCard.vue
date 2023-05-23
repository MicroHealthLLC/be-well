<template>
  <div>
    <v-card
      elevation="5"
      width="350px"
      min-height="50px"
      color="var(--mh-blue)"
      class="mb-5"
    >
      <div class="d-flex justify-space-between">
      <v-tooltip left nudge-left="10" :disabled="!isEditor">
        <template v-slot:activator="{ on, attrs }">
          <v-card-title
            class="groupTitle ml-1"
            v-bind="attrs"
            v-on="on"
            @click="$emit('wasClicked')"
          >
            {{ group.groupName }}
          </v-card-title>
        </template>
        <span>Click to edit</span>
      </v-tooltip>

      <v-tooltip right nudge-right="25">
        <template v-slot:activator="{ on, attrs }">
          <v-icon color="white" v-bind="attrs" v-on="on" class="mr-5">
            mdi-account-group
          </v-icon>
        </template>
        <span v-if="items.length !== 0">
          <ul v-for="participant in items" :key="participant.id">
            <li style="position: relative; right: 15px; list-style-type: none">
              {{ participant.firstName }}
              {{ participant.lastName }}
            </li>
          </ul>
        </span>
        <span v-else>None</span>
      </v-tooltip>
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
    }
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
</style>
