<template>
  <div>
    <v-row justify=center>
      <v-col cols=4>
        <v-card class="d-flex pa-4 mt-4 mb-2 align-center">
          <div class="text-container">
            <v-text-field class="mt-3"
              label="Enter Photo Title"
              solo
              v-model="photo.title"
            ></v-text-field>
            <!-- solo=shaded raised look -->
            <v-textarea maxlength="25"
              solo
              label="Enter description"
              v-model="photo.description"
            ></v-textarea>
            
            <!-- <v-file-input
              label="Drop Photo File Here"
            ></v-file-input> -->
          </div>

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
        </v-card>
      </v-col>
    </v-row>
    
    <v-row justify=center>
      <v-col cols=5>
        <v-card>
          <v-list dense>
            <v-subheader>PHOTOS</v-subheader>
            <v-list-item-group
              v-model="selectedItem"
              color="primary"
            >
              <v-list-item
                v-for="photo in sortedPhotos"
                :key="photo.createdAt"
              >
                <v-list-item-icon>
                  <v-icon>mdi-image</v-icon>
                </v-list-item-icon>
                <v-list-item-content @click=editPhoto(photo)>
                  <v-list-item-title>{{ photo.title }}</v-list-item-title>
                  <v-list-item-subtitle>{{ photo.description }}</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action @click=fetchPhotoDelete(photo.id)>
                  <v-icon>
                    mdi-close
                  </v-icon>
                </v-list-item-action>

              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col 
        cols=1
        v-for="photo in sortedPhotos"
        :key="photo.id"
      >
        <v-card class="d-flex justify-center" @click=editPhoto(photo)>
          <v-chip class="mt-2 mb-2">
            <v-icon class="mr-2">mdi-image</v-icon>
            {{ photo.title }}
          </v-chip>
        </v-card>
      </v-col>
    </v-row>
    <v-simple-table class="mt-5 mb-5">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Title
          </th>
          <th class="text-left">
            Description
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="photo in sortedPhotos"
          :key="photo.id"
           @click=editPhoto(photo)
           @dblclick="deleteDialog = true"
        >
          <td>{{ photo.title }}</td>
          <td>{{ photo.description }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
  <v-dialog 
    v-model="deleteDialog"
    width="50%">
      <v-card>
        <v-card-title>Delete Photo?</v-card-title>
        <v-card-text>Are you sure you want to delete
          <strong>{{ photo.title }}</strong>?
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn @click="deleteDialog = false" color="secondary" small outlined>Cancel</v-btn>
          <v-btn @click="deletePhoto(photo.id)" class="px-5" color="var(--mh-blue)" small dark>Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Photos',
  data() {
    return {
      selectedItem: "",
      deleteDialog: false,
      //image: "",
    }
  },
  methods: {
    ...mapActions(['addPhoto', 'fetchPhotos', 'removePhoto', 'fetchPhoto', 'updatePhotoById']), //brings method into file
    savePhoto() {
      let data = {  //let is dynamic, const is static
        title: this.photo.title,
        description: this.photo.description,
        //image: this.image,
        //if photo.id is true, then updatePhoto. else addPhoto
      }
      if(this.photo.id) {
        data.id = this.photo.id
        this.updatePhotoById(data)
      } 
      else {
        this.addPhoto(data)
      }
      this.clearForm()
    },
    deletePhoto(id) {
      console.log(id)
      this.removePhoto({ id: id })
      this.deleteDialog = false
      this.clearForm()
    },
    fetchPhotoDelete(id) {
      this.fetchPhoto(id)
      this.deleteDialog = true
    },
    editPhoto(photo) {
      console.log(photo)
      this.fetchPhoto(photo.id)
    },
    clearForm() {
      this.photo.id = "";
      this.photo.title = "";
      this.photo.description = "";
    }
  },
  computed: {
    ...mapGetters(['photos', 'photo']),
    sortedPhotos() {
      let photos = this.photos 
      photos.sort((a,b) => { 
        return new Date(a.createdAt) - new Date(b.createdAt); //sort photo list by ascending createdAt time
      })
      return photos //return the sorted photo list
    }
  },
  mounted() {
    this.fetchPhotos()
  }
}
</script>

<style scoped>
  .text-container {
    width: 100%;
  }
</style>


