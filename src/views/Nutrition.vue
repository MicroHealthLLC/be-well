<template>
  <v-row>
    <v-col
      ><!-- Latest Videos -->
      <div class="text-h6 text-sm-h5 mt-2">Latest Videos</div>
      <v-divider class="mb-4"></v-divider>

      <div class="grid-container mb-6">
        <v-card v-for="(video, index) in videos" :key="index" elevation="5">
          <img class="image" :src="video.img" width="100%" />
          <v-card-title>{{ video.title }}</v-card-title>
          <v-card-subtitle>{{ video.author }}</v-card-subtitle>
          <v-card-text>
            {{ video.text }}
          </v-card-text>
          <v-card-actions class="align-end">
            <v-btn text color="primary">View</v-btn>
            <v-btn text color="primary">Add Reminder</v-btn>
          </v-card-actions>
        </v-card>
      </div>

      <!-- Latest Blogs -->
      <div class="text-h6 text-sm-h5 mt-2">Latest Blogs</div>
      <v-divider class="mb-4"></v-divider>

      <div class="grid-container mb-6">
        <v-card v-for="(blog, index) in blogs" :key="index" elevation="5">
          <img class="image" :src="blog.img" width="100%" />
          <v-card-title>{{ blog.title }}</v-card-title>
          <v-card-subtitle>{{ blog.author }}</v-card-subtitle>
          <v-card-text>
            {{ blog.text }}
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
  name: "Nutrition",
  data() {
    return {
      videos: [
        {
          title: "Title 4",
          text:
            "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          author: "First-name Last-name",
          img: "/img/yoga.jpg",
        },
        {
          title: "Title 5",
          text:
            "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          author: "First-name Last-name",
          img: "/img/weight-training.jpg",
        },
        {
          title: "Title 6",
          text:
            "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          author: "First-name Last-name",
          img: "/img/endurance.jpg",
        },
      ],
      blogs: [
        {
          title: "Title 10",
          text:
            "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          author: "First-name Last-name",
          img: "/img/stress-relief.jpg",
        },
        {
          title: "Title 11",
          text:
            "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          author: "First-name Last-name",
          img: "/img/challenge.jpg",
        },
        {
          title: "Title 12",
          text:
            "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          author: "First-name Last-name",
          img: "/img/nutrition.jpg",
        },
      ]
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
</style>
