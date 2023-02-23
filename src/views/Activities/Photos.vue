<template>
  <div>
    <v-text-field
      label="Enter Photo Title"
      solo
      v-model="title"
    ></v-text-field>
    
    <v-file-input
      label="Drop Photo File Here"
      v-model="file"
    ></v-file-input>

    <v-btn
      class="mx-2"
      fab
      dark
      color="indigo"
      @click=savePhoto
    >
      <v-icon dark>
        mdi-plus
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Photos',
  data() {
    return {
      id: 0,
      image: "",
      title: "",
    }
  },
  methods: {
    ...mapActions(["addPhoto"]), //brings method into file
    async savePhoto() {
      // let data = {  //let is dynamic, const is static
      //   // id: this.id,
      //   // image: this.image,
      //   // title: this.title,
      // };
      await this.addPhoto({id: 0, image: this.image, title: this.title})
    },
  },
  computed: {

  }
}
</script>


