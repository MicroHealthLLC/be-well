<template>
  <v-row>
    <v-col>
      <!-- Healthcare Provider Search Bar -->
      <div class="text-h6 text-sm-h5 mt-2">Find a Healthcare Provider</div>
      <v-divider class="mb-4"></v-divider>
      <div class="search-grid align-start">
        <v-text-field
          v-model="query"
          @keydown.enter="search"
          @click:clear="hasSearched = false"
          placeholder="Search by County or Zip Code"
          filled
          dense
          outlined
          clearable
          prepend-inner-icon="mdi-magnify"
        ></v-text-field>
        <v-select
          v-model="facilityType"
          :items="facilityTypes"
          item-text="text"
          item-value="value"
          placeholder="Facility Type"
          filled
          dense
          outlined
          clearable
          hint="Optional"
          persistent-hint
        ></v-select>
        <v-select
          v-model="state"
          :items="stateAbbreviations"
          placeholder="State"
          filled
          dense
          outlined
          hint="Optional"
          persistent-hint
          clearable
        ></v-select>
        <v-btn @click="search" class="mt-1 ml-2" color="var(--mh-blue)" dark
          >Search</v-btn
        >
      </div>

      <!-- Search Results -->
      <div
        v-if="filteredList.length == 0 && hasSearched"
        class="text-center pt-5"
      >
        No results found
      </div>
      <v-card v-for="(result, index) in pageResults" :key="index" class="my-3">
        <h4 class="pt-5 ml-6">{{ titleCase(result["Facility Name"]) }}</h4>
        <v-card-text class="d-flex justify-space-between pt-0">
          <div>
            <div class="d-flex align-center">
              <v-rating
                color="var(--mh-orange)"
                background-color="var(--mh-orange)"
                :value="rating(result['Hospital overall rating'])"
                readonly
              ></v-rating>
              <div
                v-if="rating(result['Hospital overall rating']) == 0"
                class="text-caption font-italic ml-3"
              >
                (No Rating Data)
              </div>
            </div>
            <div class="d-flex mt-3 mb-3">
              <v-chip class="mr-2" color="var(--mh-green)" small>{{
                result["Hospital Type"]
              }}</v-chip>
              <v-chip color="var(--mh-green)" small
                >{{ titleCase(result["County Name"]) }} County</v-chip
              >
            </div>
            <div>{{ titleCase(result["Address"]) }}</div>
            <div>
              {{ titleCase(result["City"]) }}, {{ result["State"] }}
              {{ result["ZIP Code"] }}
            </div>
            <div>
              <a :href="`tel:${result['Phone Number']}`">{{
                result["Phone Number"]
              }}</a>
            </div>
          </div>
          <!-- Embedded Google Map -->
          <div>
            <iframe
              :src="`https://maps.google.com/maps?&amp;q=${result['Address']}&amp;output=embed`"
              style="border: 0"
              allowfullscreen=""
              loading="lazy"
            ></iframe>
          </div>
        </v-card-text>
      </v-card>
      <div
        v-if="filteredList.length > 0 && hasSearched"
        class="grid-full-width"
      >
        <v-pagination
          v-model="page"
          @input="fetchSelectedPage"
          :length="totalPages"
          color="#2f53b6"
        ></v-pagination>
      </div>

      <!-- Resources -->
      <div class="text-h6 text-sm-h5 mt-6">Resources</div>
      <v-divider class="mb-4"></v-divider>

      <v-card class="mb-6">
        <v-data-table
          :headers="headers"
          :items="items"
          hide-default-footer
          disable-sort
        >
          <template v-slot:item.link="{ item }">
            <a :href="item.href" target="_blank">{{ item.link }}</a>
          </template>
        </v-data-table>
      </v-card>

      <!-- Latest Articles -->
      <span class="text-h6 text-sm-h5">Latest Articles</span>
      <v-divider class="mb-4"></v-divider>

      <div class="grid-container">
        <v-card v-for="(article, index) in articles" :key="index" elevation="5">
          <img class="image" :src="article.img" width="100%" />
          <v-card-title>{{ article.title }}</v-card-title>
          <v-card-subtitle>{{ article.author }}</v-card-subtitle>
          <v-card-text>
            {{ article.text }}
          </v-card-text>
          <v-card-actions class="align-end">
            <v-btn text color="primary">View</v-btn>
            <v-btn text color="primary">Add Reminder</v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import hospitalList from "../apis/hospitals.json";

export default {
  name: "Health",
  data() {
    return {
      query: "",
      facilityType: null,
      state: null,
      list: hospitalList,
      hasSearched: false,
      filteredList: [],
      page: 1,
      start: 0,
      pageResults: [],
      facilityTypes: [
        {
          text: "Acute Care - Department of Defense",
          value: "department of defense",
        },
        {
          text: "Acute Care - Veterans Administration",
          value: "veterans administration",
        },
        { text: "Acute Care", value: "acute care" },
        { text: "Childrens", value: "childrens" },
        { text: "Critical Access", value: "critical access" },
        { text: "Psychiatric", value: "sychiatric" },
      ],
      stateAbbreviations: [ "AL", "AK", "AS", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FM", "FL", "GA", "GU", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MH", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "MP", "OH", "OK", "OR", "PW", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VI", "VA", "WA", "WV", "WI", "WY", ], // prettier-ignore
      headers: [
        {
          text: "Resource",
          value: "title",
          width: "25%",
        },
        {
          text: "Link",
          value: "link",
        },
      ],
      items: [
        {
          title: "Be Well",
          link: "Microhealth Sharepoint",
          href: "https://microhealth.sharepoint.com/sites/BeWellMovement?OR=Teams-HL&CT=1636389032479",
        },
        {
          title: "USPSTF",
          link: "Preventative Screening Tool",
          href: "https://www.uspreventiveservicestaskforce.org/webview/#!/",
        },
      ],
      articles: [
        {
          title: "Title 1",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          author: "First-name Last-name",
          img: "/img/ergonomics.jpg",
        },
        {
          title: "Title 2",
          text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          author: "First-name Last-name",
          img: "/img/meditate.jpg",
        },
        {
          title: "Title 3",
          text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          author: "First-name Last-name",
          img: "/img/nutrition.jpg",
        },
      ],
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredList.length / 10);
    },
  },
  methods: {
    search() {
      if (this.query) {
        this.hasSearched = true;
        this.filteredList = this.list
          .filter(
            (hospital) =>
              hospital["County Name"]
                .toLowerCase()
                .includes(this.query.trim().toLowerCase()) ||
              hospital["ZIP Code"] == this.query.trim()
          )
          .filter((hospital) =>
            this.facilityType
              ? hospital["Hospital Type"]
                  .toLowerCase()
                  .includes(this.facilityType)
              : true
          )
          .filter((hospital) =>
            this.state ? hospital["State"] == this.state : true
          );
      }
    },
    fetchSelectedPage(page) {
      this.page = page;
      this.start = (page - 1) * 10;
      this.pageResults = this.filteredList.slice(this.start, this.start + 10);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    rating(score) {
      if (isNaN(score)) {
        return 0;
      } else {
        return score;
      }
    },
    titleCase(str) {
      str = str.toLowerCase().split(" ");
      for (var i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
      }
      return str.join(" ");
    },
  },
  watch: {
    filteredList() {
      this.pageResults = this.filteredList.slice(this.start, this.start + 10);
    },
  },
};
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}
.search-grid {
  display: grid;
  grid-template-columns: 3fr 1fr 1fr auto;
  column-gap: 0.5rem;
}
.image {
  max-height: 200px;
  object-fit: cover;
}
::v-deep .text-start:first-child {
  font-weight: 500;
}
a {
  text-decoration: none;
}
</style>
