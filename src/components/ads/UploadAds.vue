<template>
  <q-page class="q-pa-md">
    <div class="text-black text-h4">Upload Ads</div>
    <q-separator />
    <div class="q-pt-lg">
      <!-- <q-uploader
        label="Upload Images"
        multiple
        :max-files="10"
        @added="filesAdded"
        accept=".jpg, .png, .gif"
      />
      <q-btn label="Submit" @click="uploadFiles" /> -->
      <!-- <q-form @submit="uploadFiles" >


        <div class="row q-pt-lg">
          <div class="text-center full-width q-pl-md">
            <q-btn label="Submit" type="submit" color="primary" style="width: 260px" />
          </div>
        </div>

      </q-form> -->

      <form @submit.prevent="uploadImages" class="d-flex">
        <div class="me-3">
          <input type="file" ref="picture1Ref" @change="previewImage(picture1, $event)" class="form-control">
          <img :src="picture1.src" alt="" v-if="picture1.src" class="img-thumbnail mt-2">
        </div>
        <div class="me-3">
          <input type="file" ref="picture2Ref" @change="previewImage(picture2, $event)" class="form-control">
          <img :src="picture2.src" alt="" v-if="picture2.src" class="img-thumbnail mt-2">
        </div>
        <button type="submit" class="btn btn-primary align-self-end">Upload</button>
      </form>

    </div>
  </q-page>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { axios, api, base } from 'boot/axios'
import { useQuasar } from 'quasar'
import { useAdminStore } from '../../stores/user-store'
import { useRouter } from 'vue-router'

  name: 'UploadAds'
const $q = useQuasar()
const useStore = useAdminStore()
const $router = useRouter()

const picture1Ref = ref(null)
const picture2Ref = ref(null)

const picture1 = reactive({ file: null, src: null })
const picture2 = reactive({ file: null, src: null })

const previewImage = (picture, event) => {
  picture.file = event.target.files[0]
  if (picture.file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      picture.src = e.target.result
    }
    reader.readAsDataURL(picture.file)
  }
}
const uploadImages = async () => {
  const token = useStore.getToken
  // const formData = new FormData()
  // formData.append('picture1', picture1.file)
  // formData.append('picture2', picture2.file)

  const formData = {
    picture1: picture1.file,
    picture2: picture2.file,
  }
  try {
    const response = await axios.post(`${base}/ads/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        "Authorization": `Bearer ${token}`
      }
    })
    console.log('Images uploaded successfully')
    console.log(response.data);
    console.log("response.data");
    $q.notify({
      color: 'green',
      position: 'bottom',
      message: response.data,
      icon: 'check'
    })
  } catch (error) {
    console.error('Failed to upload images', error)
    $q.notify({
      color: 'negative',
      position: 'bottom',
      message: error,
      icon: 'report_problem'
    })
  }
}

const files = ref([]);

const filesAdded = (newFiles) => {
  files.value.push(...newFiles);
};
const uploadFiles = async (files) => {
  const token = useStore.getToken
  const formData = new FormData();

  files.value.forEach((file, index) => {
    formData.append(`picture${index}`, file);
  });

  try {
    const response = await axios.post(`${base}/ads/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        "Authorization": `Bearer ${token}`
      },
    });

    console.log(response.data);
    console.log("response.data");
    $q.notify({
      color: 'green',
      position: 'bottom',
      message: response.data,
      icon: 'check'
    })
  } catch (error) {
    console.error(error);
    $q.notify({
      color: 'negative',
      position: 'bottom',
      message: error,
      icon: 'report_problem'
    })
  }
}

</script>

<style lang="sass" scoped>
.sizzz
  min-width: 300px
  max-width: 500px
.sizz1
  min-width: 275px
  max-width: 475px
</style>
