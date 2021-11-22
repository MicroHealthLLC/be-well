import axios from "axios";
const KEY = process.env.VUE_APP_YOUTUBE_API_KEY; // Must be set in .env

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3/playlistItems",
  params: {
    part: "contentDetails,snippet",
    maxResults: 6,
    key: KEY,
  },
});
