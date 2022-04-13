<template>
  <v-carousel
    v-model="carousel"
    :show-arrows="categoriesSelected"
    hide-delimiters
  >
    <v-carousel-item
      ><v-sheet
        class="d-flex align-center flex-column px-15 py-10"
        height="100%"
        width="750"
      >
        <h4 class="align-self-start">
          What 3 categories are most interesting to you?
        </h4>

        <v-chip-group
          v-model="favoredCategories"
          class="fill-height"
          active-class="primary"
          max="3"
          column
          multiple
          center-active
          ><v-chip
            v-for="(category, index) in filteredCategories"
            class="ma-3 px-5"
            :key="index"
            filter
            large
            ><v-icon left>{{ category.icon }}</v-icon
            >{{ category.title }}</v-chip
          ></v-chip-group
        >
      </v-sheet></v-carousel-item
    >
    <v-carousel-item>
      <v-sheet
        class="d-flex flex-column justify-space-between px-15 py-5"
        height="100%"
        width="750"
      >
        <h4>
          Please rate your level of expertise from the 3 categories selected:
        </h4>
        <!-- Favored Category 1 -->
        <div v-if="favoredCategories.length >= 3">
          <v-chip color="primary"
            ><v-icon left>{{
              filteredCategories[favoredCategories[0]].icon
            }}</v-icon
            >{{ filteredCategories[favoredCategories[0]].title }}</v-chip
          >
          <v-slider
            v-model="favoredCategory1Level"
            step="1"
            ticks="always"
            tick-size="10"
            height="50"
            max="4"
            :tick-labels="tickLabels"
          ></v-slider>
        </div>
        <!-- Favored Category 2 -->
        <div v-if="favoredCategories.length >= 3">
          <v-chip color="primary"
            ><v-icon left>{{
              filteredCategories[favoredCategories[1]].icon
            }}</v-icon
            >{{ filteredCategories[favoredCategories[1]].title }}</v-chip
          >
          <v-slider
            v-model="favoredCategory2Level"
            step="1"
            ticks="always"
            tick-size="10"
            height="50"
            max="4"
            :tick-labels="tickLabels"
          ></v-slider>
        </div>
        <!-- Favored Category 3 -->
        <div v-if="favoredCategories.length >= 3">
          <v-chip color="primary"
            ><v-icon left>{{
              filteredCategories[favoredCategories[2]].icon
            }}</v-icon
            >{{ filteredCategories[favoredCategories[2]].title }}</v-chip
          >
          <v-slider
            v-model="favoredCategory3Level"
            step="1"
            ticks="always"
            tick-size="10"
            height="50"
            max="4"
            :tick-labels="tickLabels"
          ></v-slider>
        </div>
        <v-btn
          color="var(--mh-blue)"
          :loading="saving"
          :disabled="saving"
          :dark="!saving"
          @click="test"
          >Submit</v-btn
        >
      </v-sheet>
    </v-carousel-item>
    <!-- Override Default Previous and Next -->
    <template v-slot:prev="{ on }">
      <v-btn v-if="carousel > 0" v-on="on" color="info" fab small
        ><v-icon>mdi-chevron-left</v-icon></v-btn
      >
      <div v-else></div>
    </template>
    <template v-slot:next="{ on }">
      <v-btn v-if="carousel == 0" v-on="on" color="info" fab small
        ><v-icon>mdi-chevron-right</v-icon></v-btn
      >
      <div v-else></div>
    </template>
  </v-carousel>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import utilitiesMixin from "../mixins/utilities-mixin";

export default {
  name: "FavoritesQuestionnaire",
  mixins: [utilitiesMixin],
  data() {
    return {
      carousel: 0,
      favoredCategories: [],
      favoredCategory1Level: 0,
      favoredCategory2Level: 0,
      favoredCategory3Level: 0,
      tickLabels: [
        "Beginner-1",
        "Beginner-2",
        "Intermediate-1",
        "Intermediate-2",
        "Advanced",
      ],
    };
  },
  computed: {
    ...mapGetters(["saving", "user"]),
    categoriesSelected() {
      return this.favoredCategories.length === 3;
    },
    firstPage() {
      return this.carousel == 0;
    },
  },
  methods: {
    ...mapActions(["addProfile"]),
    ...mapMutations(["TOGGLE_QUESTIONNAIRE"]),
    async test() {
      let profile = {
        id: this.user.attributes.sub,
        favorite1: {
          category: this.filteredCategories[this.favoredCategories[0]].value,
          level: this.filteredLevels[this.favoredCategory1Level].value,
        },
        favorite2: {
          category: this.filteredCategories[this.favoredCategories[1]].value,
          level: this.filteredLevels[this.favoredCategory2Level].value,
        },
        favorite3: {
          category: this.filteredCategories[this.favoredCategories[2]].value,
          level: this.filteredLevels[this.favoredCategory3Level].value,
        },
      };

      try {
        await this.addProfile(profile);
        this.TOGGLE_QUESTIONNAIRE(false);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
::v-deep .v-chip-group--column .v-slide-group__content {
  justify-content: center;
  align-content: center;
  height: 100%;
}
::v-deep .v-slider__tick-label {
  font-size: 12px;
}
::v-deep .v-slider__tick {
  border: 1px solid #1976d2;
  border-radius: 50%;
  background-color: white;
}
::v-deep .v-slider__tick--filled {
  border: 1px solid #1976d2;
  background-color: #1976d2;
}
</style>
