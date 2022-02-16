<template>
  <v-row>
    <v-col>
      <!-- Healthcare Provider Search Bar -->
      <div class="text-h6 text-sm-h5 mt-2">Find a Healthcare Provider</div>
      <v-divider class="mb-4"></v-divider>
      <div class="search-grid align-start">
        <v-combobox
          ref="searchbar"
          v-model="query"
          @keyup.enter="enterSearch"
          @keydown.enter="closeMenu"
          :items="[...cities, ...counties]"
          :menu-props="{ closeOnClick: true }"
          placeholder="Search by City, County or Zip Code"
          filled
          dense
          outlined
          clearable
          hide-no-data
          prepend-inner-icon="mdi-magnify"
          append-icon=""
          class="searchbar"
        ></v-combobox>
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
          class="facility-type"
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
          class="state"
        ></v-select>
        <v-btn @click="search" class="mt-1 submit" color="#2f53b6" dark
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
        <v-card-text
          class="d-flex flex-column flex-md-row justify-md-space-between pt-0"
        >
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
          <div class="mt-5 mt-md-0">
            <iframe
              @load="mapLoaded"
              :src="`https://maps.google.com/maps?&amp;q=${result['Address']}&amp;output=embed`"
              style="border: 0"
              allowfullscreen=""
              loading="lazy"
              width="100%"
            ></iframe>
          </div>
        </v-card-text>
      </v-card>
      <div v-if="filteredList.length > 0" class="grid-full-width">
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
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredList.length / 10);
    },
    counties() {
      return [
        ...new Set(
          this.list.map((item) => this.titleCase(item["County Name"])).sort()
        ),
      ];
    },
    cities() {
      return [
        ...new Set(
          this.list.map((item) => this.titleCase(item["City"])).sort()
        ),
      ];
    },
  },
  methods: {
    search() {
      if (
        this.query &&
        (this.counties.includes(this.titleCase(this.query)) ||
          this.cities.includes(this.titleCase(this.query)) ||
          !isNaN(this.query))
      ) {
        this.page = 1;
        this.start = 0;
        this.filteredList = this.list
          .filter(
            (hospital) =>
              hospital["County Name"]
                .toLowerCase()
                .includes(this.query.trim().toLowerCase()) ||
              hospital["City"]
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
      } else {
        this.filteredList = [];
      }
      // Triggers placeholder for no results
      this.hasSearched = true;
    },
    enterSearch() {
      this.$refs.searchbar.isMenuActive = false;
      this.search();
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
    mapLoaded() {
      console.log("Map Loaded!");
    },
    closeMenu() {
      this.$nextTick(() => {
        this.$refs.searchbar.isMenuActive = false;
      });
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
@media (max-width: 600px) {
  .search-grid {
    grid-template-columns: unset;
    grid-template-areas:
      "searchbar searchbar"
      "facility-type state"
      "submit submit";
  }
  .searchbar {
    grid-area: searchbar;
  }
  .facility-type {
    grid-area: facility-type;
  }
  .state {
    grid-area: state;
  }
  .submit {
    grid-area: submit;
  }
}
.grid-full-width {
  grid-column: 1/-1;
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
