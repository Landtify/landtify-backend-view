<template>
  <q-page class="q-pa-md">
    <div class="text-black text-h4">All Ads</div>
    <q-separator />
    <div class="q-gutter-y-md q-pt-md" fullwidth>
      <div align="right">
        <q-btn rounded color="blue" class="q-mr-md" to="/create-ads"
          >Post Ads</q-btn
        >
      </div>
      <q-card v-if="data.length == 0" class="my-card text-center">
        <q-card-section> There is no Ads available yet. </q-card-section>
      </q-card>
      <div v-else>
        <q-card class="my-ads q-mb-md" v-for="(da, index) in data" :key="index">
          <q-carousel
            transition-prev="slide-right"
            transition-next="slide-left"
            swipeable
            animated
            v-model="slide"
            control-color="primary"
            navigation
            arrows
            padding
            height="600px"
            class="bg-white shadow-1 rounded-borders"
          >
            <q-carousel-slide
              v-if="da.picture1 != 'null'"
              :name="1"
              class="column no-wrap flex-center"
            >
              <q-img :src="da.picture1" class="my-thumbnail" />
            </q-carousel-slide>
            <q-carousel-slide
              v-if="da.picture2 != 'null'"
              :name="2"
              class="column no-wrap flex-center"
            >
              <q-img :src="da.picture2" class="my-thumbnail" />
            </q-carousel-slide>
            <q-carousel-slide
              v-if="da.picture3 != 'null'"
              :name="3"
              class="column no-wrap flex-center"
            >
              <q-img :src="da.picture3" class="my-thumbnail" />
            </q-carousel-slide>
            <q-carousel-slide
              v-if="da.picture4 != 'null'"
              :name="4"
              class="column no-wrap flex-center"
            >
              <q-img :src="da.picture4" class="my-thumbnail" />
            </q-carousel-slide>
            <q-carousel-slide
              v-if="da.picture5 != 'null'"
              :name="5"
              class="column no-wrap flex-center"
            >
              <q-img :src="da.picture5" class="my-thumbnail" />
            </q-carousel-slide>
            <q-carousel-slide
              v-if="da.picture6 != 'null'"
              :name="6"
              class="column no-wrap flex-center"
            >
              <q-img :src="da.picture6" class="my-thumbnail" />
            </q-carousel-slide>
            <q-carousel-slide
              v-if="da.picture7 != 'null'"
              :name="7"
              class="column no-wrap flex-center"
            >
              <q-img :src="da.picture7" class="my-thumbnail" />
            </q-carousel-slide>
            <q-carousel-slide
              v-if="da.picture8 != 'null'"
              :name="8"
              class="column no-wrap flex-center"
            >
              <q-img :src="da.picture8" class="my-thumbnail" />
            </q-carousel-slide>
            <q-carousel-slide
              v-if="da.picture9 != 'null'"
              :name="9"
              class="column no-wrap flex-center"
            >
              <q-img :src="da.picture9" class="my-thumbnail" />
            </q-carousel-slide>
            <q-carousel-slide
              v-if="da.picture10 != 'null'"
              :name="10"
              class="column no-wrap flex-center"
            >
              <q-img :src="da.picture10" class="my-thumbnail" />
            </q-carousel-slide>
          </q-carousel>
          <div class="text-black text-center text-h4">{{ da.adsid }}</div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { axios, api, base } from "boot/axios";
import { copyToClipboard, useQuasar } from "quasar";
import { useAdminStore } from "../stores/user-store";
import { useRouter } from "vue-router";
import { HttpStatusCode } from "axios";

const name = "AllAds";
const $q = useQuasar();
const useStore = useAdminStore();
const $router = useRouter();
var token = useStore.getToken;
var adminid = useStore.adminid;
const data = ref([]);
const page = ref("1");
const slide = ref(1);

const loadData = () => {
  // const token = useStore.getToken
  // console.log(token, "token");
  api
    .get(`/ads/all-ads/${page.value}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      data.value = response.data.data.reverse();
      console.log(data.value, "ads!");
      $q.notify({
        color: "green-4",
        position: "bottom",
        message: "Ads found!",
        textColor: "white",
        icon: "thumb_up",
      });
    })
    .catch(() => {
      // if (HttpStatusCode.Unauthorized) {
      //   $router.push('/');
      //   $router.go();
      // }
      $q.notify({
        color: "negative",
        position: "bottom",
        message: "Ads not found",
        icon: "report_problem",
      });
    });
};

onMounted(() => {
  loadData();
});
</script>

<style lang="sass" scoped>
.my-ads
  width: 100%
  // height: 450px
.my-thumbnail
  height: 400px
</style>
