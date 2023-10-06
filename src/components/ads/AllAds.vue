<template>
  <q-page class="q-pa-md">
    <div class="text-black text-h4">All Ads</div>
    <q-separator />
    <div class="q-gutter-y-md" fullwidth>
     <q-card class="my-ads" v-for="(da, index) in data" :key="index">
        <q-carousel
          transition-prev="slide-right"
          transition-next="slide-left"
          swipeable
          animated
          v-model="slide"
          control-color="primary"
          navigation-icon="radio_button_unchecked"
          navigation
          padding
          height="600px"
          class="bg-white shadow-1 rounded-borders"
        >
          <q-carousel-slide :name="1" class="column no-wrap flex-center">
            <q-img :src="da.picture1" class="my-thumbnail" />
          </q-carousel-slide>
          <q-carousel-slide :name="2" class="column no-wrap flex-center">
            <q-img :src="da.picture2" class="my-thumbnail" />
          </q-carousel-slide>
          <q-carousel-slide :name="3" class="column no-wrap flex-center">
            <q-img :src="da.picture3" class="my-thumbnail" />
          </q-carousel-slide>
          <q-carousel-slide :name="4" class="column no-wrap flex-center">
            <q-img :src="da.picture4" class="my-thumbnail" />
          </q-carousel-slide>
          <q-carousel-slide :name="5" class="column no-wrap flex-center">
            <q-img :src="da.picture5" class="my-thumbnail" />
          </q-carousel-slide>
          <q-carousel-slide :name="6" class="column no-wrap flex-center">
            <q-img :src="da.picture6" class="my-thumbnail" />
          </q-carousel-slide>
          <q-carousel-slide :name="7" class="column no-wrap flex-center">
            <q-img :src="da.picture7" class="my-thumbnail" />
          </q-carousel-slide>
          <q-carousel-slide :name="8" class="column no-wrap flex-center">
            <q-img :src="da.picture8" class="my-thumbnail" />
          </q-carousel-slide>
          <q-carousel-slide :name="9" class="column no-wrap flex-center">
            <q-img :src="da.picture9" class="my-thumbnail" />
          </q-carousel-slide>
          <q-carousel-slide :name="10" class="column no-wrap flex-center">
            <q-img :src="da.picture10" class="my-thumbnail" />
          </q-carousel-slide>
        </q-carousel>
        <div class="text-black text-center text-h4">{{ da.ads_id }}</div>
      </q-card>

    </div>
  </q-page>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { axios, api, base } from 'boot/axios'
import { copyToClipboard, useQuasar } from 'quasar'
import { useAdminStore } from '../../stores/user-store'
import { useRouter } from 'vue-router'
import { HttpStatusCode } from 'axios'

const name= 'AllAds'
const $q = useQuasar()
const useStore = useAdminStore()
const $router = useRouter()
var token = useStore.getToken
var admin_id = useStore.admin_id
const data = ref([])
const slide = ref(1)

const loadData = () => {
  // const token = useStore.getToken
  console.log(token, "token");
  api.get(`/ads/all-ads`,
    { headers: { "Authorization": `Bearer ${token}` }, })
    .then((response) => {
      data.value = response.data.data.reverse()
      console.log(data.value, "ads!")
      $q.notify({
        color: 'green-4',
        position: 'bottom',
        message: 'Ads found!',
        textColor: 'white',
        icon: 'thumb_up'
      })
    })
    .catch(() => {
      // if (HttpStatusCode.Unauthorized) {
      //   $router.push('/');
      //   $router.go();
      // }
      $q.notify({
        color: 'negative',
        position: 'bottom',
        message: 'Messages not found',
        icon: 'report_problem'
      })
    })
}

onMounted(() => {
  loadData()
})
</script>

<style lang="sass" scoped>
.my-ads
  width: 100%
  // height: 450px
.my-thumbnail
  height: 400px
</style>
