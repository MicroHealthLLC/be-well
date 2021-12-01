<template>
  <v-row>
    <v-col>
      <div class="text-h6 text-sm-h5 mt-2">Resources</div>
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

      <!-- <span class="text-h6 text-sm-h5">Calculators</span>
      <v-divider class="mb-4"></v-divider> -->

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
export default {
  name: "Health",
  data() {
    return {
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
};
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
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
