<template>
  <q-page class="q-pa-md">
    <div class="text-black text-h4">Lands</div>
      <q-separator />
    <div class="q-gutter-y-md q-pt-md" full-width>
      <div align="right">
        <q-btn :loading="loadingCreateLand" rounded color="blue" class="q-mr-md" to="/create-lands">Post Land</q-btn>
        <q-btn :loading="loadingFindLand" rounded color="blue" @click="goToFindLand()">Find a Land</q-btn>
      </div>
      <q-card class="my-land" v-for="(da, index) in data" :key="index">
        <q-card-section>
          <q-img :src="da.thumbnail" class="my-thumbnail">
            <div class="absolute-bottom text-subtitle2 text-center">
              {{ da.title }}, [{{ da.landtag }}]
            </div>
          </q-img>
        </q-card-section>
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs col-8">
            <div class="text-overline">
              <div v-if="da.approved">
                <q-icon color="green" name="verified" />
                Approved
              </div>
              <div v-else color="yellow">
                <q-icon color="red" name="cancel_schedule_send" />
                Awaiting Approval
              </div>
            </div>
            <q-separator />
            <div class="text-h5 q-mt-sm q-mb-xs">Land Type</div>
            <div class="text-caption text-grey">
              {{ da.landtype }}
            </div>
            <q-separator />
            <div class="text-h5 q-mt-sm q-mb-xs">City, Province & Country</div>
            <div class="text-caption text-grey">
              {{ da.city }}, {{ da.province }}, {{ da.country }}
            </div>
            <q-separator />
            <div class="text-h5 q-mt-sm q-mb-xs">Details</div>
            <div class="text-caption text-grey">
              {{ da.details }}
            </div>
          </q-card-section>

          <q-list class="col-2">
            <q-item>
              <q-item-section avatar>
                <q-icon color="primary" name="pin_drop" />
              </q-item-section>

              <q-item-section>
                <q-item-label>Acreage</q-item-label>
                <q-item-label caption>{{ da.acreage }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon color="primary" name="explore" />
              </q-item-section>

              <q-item-section>
                <q-item-label>Center GPS</q-item-label>
                <q-item-label caption>{{ da.centergps }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon color="primary" name="explore" />
              </q-item-section>

              <q-item-section>
                <q-item-label>Corner GPS</q-item-label>
                <q-item-label caption>{{ da.cornergps }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>

          <q-card-actions vertical class="justify-around col-2">
            <q-btn flat round color="blue" icon="content_copy" @click="viewMore(da)">View More...</q-btn>
            <q-btn v-if="!da.approved" flat round color="accent" icon="check_circle_outline" @click="onApproved(da.landid)">Approve</q-btn>
            <q-btn v-else flat round color="red" icon="cancel" @click="onApproved(da.landid)">Un-approve</q-btn>
          </q-card-actions>
        </q-card-section>
      </q-card>


        <q-dialog v-model="findLand">
          <div class="q-pa-md row items-start q-gutter-md">
            <q-card class="my-card-2 text-primary">
              <q-card-section>
                <div class="row q-pt-sm">
                  <q-form @submit="onFind" @reset="onReset" class="">
                    <div class="col-12 col-md-12 q-pl-md">
                      <q-input label="Land ID" class="" outlined v-model="landid" hint="" />
                    </div>
                    <q-separator dark />
                    <div class="col-12 q-pl-md full-width">
                      <q-btn class="bg-primary text-white" type="submit">Find</q-btn>
                    </div>
                  </q-form>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </q-dialog>

      <q-dialog v-model="card">
        <q-card class="my-card">
          <q-img :src="viewMoreData.thumbnail" class="my-thumbnail" />

          <q-card-section>
            <q-btn
              fab
              color="primary"
              icon="place"
              class="absolute"
              style="top: 0; right: 12px; transform: translateY(-50%);"
            />

            <div class="row no-wrap items-center">
              <div class="col text-h6 ellipsis">
                Title: {{ viewMoreData.title }}
              </div>
              <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
                <q-icon name="place" />
                Acreage: {{ viewMoreData.acreage }}ft
              </div>
            </div>

            <q-rating v-model="stars" :max="5" size="32px" />
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="text-subtitle1">
              Parcel ID:
            </div>
            <div class="text-caption text-grey">
              {{ viewMoreData.parcelid }}
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="text-subtitle1">
              Price:
            </div>
            <div class="text-caption text-grey">
              ${{ viewMoreData.price }}
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="text-subtitle1">
              Location:
            </div>
            <div class="text-caption text-grey">
              {{ viewMoreData.address }}, {{ viewMoreData.city }}, {{ viewMoreData.province }}, {{ viewMoreData.country }}
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="text-subtitle1">
              Details:
            </div>
            <div class="text-caption text-grey">
              {{ viewMoreData.details }}
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <!-- <div class="text-subtitle1">
              Price: ${{ viewMoreData.price }}
            </div> -->
            <div class="text-subtitle1">
              <table class="table-resp full-width">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Land ID</td>
                    <td>{{ viewMoreData.landid }}</td>
                  </tr>
                  <tr>
                    <td>Land Tag</td>
                    <td>{{ viewMoreData.landtag }}</td>
                  </tr>
                  <tr>
                    <td>Land Type</td>
                    <td>{{ viewMoreData.landtype }}</td>
                  </tr>
                  <tr>
                    <td>Posted By ID</td>
                    <td>{{ viewMoreData.postedbyid }}</td>
                  </tr>
                  <tr>
                    <td>Posted By Name</td>
                    <td>{{ viewMoreData.postedbyname }}</td>
                  </tr>
                  <tr>
                    <td>Center GPS</td>
                    <td>{{ viewMoreData.centergps }}</td>
                  </tr>
                  <tr>
                    <td>Corner GPS</td>
                    <td>{{ viewMoreData.cornergps }}</td>
                  </tr>
                  <tr>
                    <td>Water?</td>
                    <td>{{ viewMoreData.water }}</td>
                  </tr>
                  <tr>
                    <td>Electricity?</td>
                    <td>{{ viewMoreData.electricity }}</td>
                  </tr>
                  <tr>
                    <td>Road access?</td>
                    <td>{{ viewMoreData.road }}</td>
                  </tr>
                  <tr>
                    <td>Is there a Structure?</td>
                    <td>{{ viewMoreData.structure }}</td>
                  </tr>
                  <tr>
                    <td>Flooded</td>
                    <td>{{ viewMoreData.flooded }}</td>
                  </tr>
                  <tr>
                    <td>Title Free?</td>
                    <td>{{ viewMoreData.titlefree }}</td>
                  </tr>
                  <tr>
                    <td>HOA?</td>
                    <td>{{ viewMoreData.hoa }}</td>
                  </tr>
                  <tr>
                    <td>Liens?</td>
                    <td>{{ viewMoreData.liens }}</td>
                  </tr>
                  <tr>
                    <td>Encumbrances?</td>
                    <td>{{ viewMoreData.encumbrances }}</td>
                  </tr>
                  <tr>
                    <td>Tax?</td>
                    <td>{{ viewMoreData.tax }}</td>
                  </tr>
                  <tr>
                    <td>Listed By a Realtor?</td>
                    <td>{{ viewMoreData.listedbyrealtor }}</td>
                  </tr>
                  <tr>
                    <td>Terms</td>
                    <td>{{ viewMoreData.terms }}</td>
                  </tr>
                  <tr>
                    <td>Status</td>
                    <td>{{ viewMoreData.status }}</td>
                  </tr>
                  <tr>
                    <td>Approved?</td>
                    <td>{{ viewMoreData.approved }}</td>
                  </tr>
                  <tr>
                    <td>Approved by</td>
                    <td>{{ viewMoreData.approvedby }}</td>
                  </tr>
                  <tr>
                    <td>Realtor Name</td>
                    <td>{{ viewMoreData.realtorname }}</td>
                  </tr>
                  <tr>
                    <td>Realtor ID</td>
                    <td>{{ viewMoreData.realtorid }}</td>
                  </tr>
                  <tr>
                    <td>Realtor Phone</td>
                    <td>{{ viewMoreData.realtorphone }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </q-card-section>
          <q-card-section>
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
              height="400px"
              class="bg-white shadow-1 rounded-borders"
            >
              <q-carousel-slide :name="1" class="column no-wrap flex-center">
                <!-- <q-icon name="style" color="primary" size="56px" /> -->
                <q-img :src="viewMoreData.thumbnail" class="" />
              </q-carousel-slide>
              <q-carousel-slide :name="2" class="column no-wrap flex-center">
                <q-img :src="viewMoreData.picture1" class="my-thumbnail" />
              </q-carousel-slide>
              <q-carousel-slide :name="3" class="column no-wrap flex-center">
                <q-img :src="viewMoreData.picture2" class="my-thumbnail" />
              </q-carousel-slide>
              <q-carousel-slide :name="4" class="column no-wrap flex-center">
                <q-img :src="viewMoreData.picture3" class="my-thumbnail" />
              </q-carousel-slide>
              <q-carousel-slide :name="5" class="column no-wrap flex-center">
                <q-img :src="viewMoreData.picture4" class="my-thumbnail" />
              </q-carousel-slide>
              <q-carousel-slide :name="6" class="column no-wrap flex-center">
                <q-img :src="viewMoreData.picture5" class="my-thumbnail" />
              </q-carousel-slide>
              <q-carousel-slide :name="7" class="column no-wrap flex-center">
                <q-img :src="viewMoreData.picture6" class="my-thumbnail" />
              </q-carousel-slide>
              <q-carousel-slide :name="8" class="column no-wrap flex-center">
                <q-img :src="viewMoreData.picture7" class="my-thumbnail" />
              </q-carousel-slide>
              <q-carousel-slide :name="9" class="column no-wrap flex-center">
                <q-img :src="viewMoreData.picture8" class="my-thumbnail" />
              </q-carousel-slide>
              <q-carousel-slide :name="10" class="column no-wrap flex-center">
                <q-img :src="viewMoreData.picture9" class="my-thumbnail" />
              </q-carousel-slide>
            </q-carousel>
          </q-card-section>

          <q-separator />

          <q-card-actions align="right">
            <!-- <q-btn v-close-popup flat color="primary" label="Reserve" />
            <q-btn v-close-popup flat color="primary" round icon="event" /> -->
            <q-btn v-close-popup flat color="primary" label="Copy Land ID" @click="copyTo(viewMoreData.landid)" />
          </q-card-actions>
        </q-card>
      </q-dialog>

    </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref, watch} from 'vue'
import { axios, api, base } from 'boot/axios'
import { copyToClipboard, useQuasar } from 'quasar'
import { useAdminStore } from '../stores/user-store'
import { useRouter } from 'vue-router'

const name = 'LandsPage'

const findLand = ref(false)
const landid = ref('')
const card = ref(false)
const loadingCreateLand = ref(false)
const loadingFindLand = ref(false)
const slide = ref(1)
const data = ref([])
const viewMoreData = ref({})
const approved = ref([])
const useStore = useAdminStore()
const $q = useQuasar()
const $router = useRouter()
var token = useStore.getToken
var adminid = useStore.adminid

const viewMore = (data) => {
  card.value = true
  viewMoreData.value = data
}

const goToFindLand = () => {
  findLand.value = true;
}

function copyTo(ID) {
  copyToClipboard(ID)
    .then(() => {

      $q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'thumb_up',
        message: 'Copied to clipboard'
      })
    })
    .catch(() => {
      // fail
      $q.notify({
        color: 'negative',
        position: 'bottom',
        message: 'Please refresh page',
        icon: 'report_problem'
      })
    })
}

const loadData = () => {
  // const token = useStore.getToken
  console.log(token, "token");
  api.get(`/admin/serve/lands/all`,
    { headers: { "Authorization": `Bearer ${token}` }, })
    .then((response) => {
      data.value = response.data.data.reverse()
      console.log(data.value, "lands found!")
    })
    .catch(() => {
      // if (HttpStatusCode.Unauthorized) {
      //   $router.push('/');
      //   $router.go();
      // }
      $q.notify({
        color: 'negative',
        position: 'bottom',
        message: 'Lands not found',
        icon: 'report_problem'
      })
    })
}


const onApproved = (landid) => {
  const name = useStore.getFirstname + " " + useStore.getLastname
  // console.log(token)
  var approvedbyid = name + " " + adminid
  const formData = {
    approvedby: approvedbyid,
  }

  api.patch(`/admin/serve/lands/approve/${landid}`, formData,
    { headers: { "Authorization": `Bearer ${token}` }, })
    .then((response) => {
      console.log(response)
      approved.value = response.data.data
      console.log(approved.value)
      $q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'thumb_up',
        message: 'Approved successful'
      })
      // window.location.reload();
    })
    .catch(() => {
      $q.notify({
        color: 'negative',
        position: 'bottom',
        message: 'Action not complete',
        icon: 'report_problem'
      })
      // window.location.reload();
    })
}

const onFind = () => {
  loadingFindLand.value = true
  // api.get(`${base}/admin/serve/lands/${landid.value}`,
  api.get(`/admin/serve/lands/${landid.value}`,
    { headers: { "Authorization": `Bearer ${token}` }, })
    .then((response) => {
      findLand.value = false;
      card.value = true;
      viewMoreData.value = response.data.data
      console.log(viewMoreData.value)

      $q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'thumb_up',
        message: 'Land Found'
      })
    })
    .catch(() => {
      $q.notify({
        color: 'negative',
        position: 'bottom',
        message: 'Land not found',
        icon: 'report_problem'
      })
    })

    loadingFindLand.value = false
}

watch(() => {
  var decoded = useStore.checkToken(token);
  console.log(decoded);
  console.log("decoded");
  if (decoded == true) {
    useStore.clearAdmin();
    // useStore.logout();
    $router.replace('/')
    $router.go();
  }
})

onMounted(() => {
  loadData()
})

</script>

<style lang="sass" scoped>
.my-land
  width: 100%
  // height: 450px
.my-card
  width: 100%
  // max-width: 350px
.my-thumbnail
  height: 200px
.table-resp
  border-collapse: collapse
  margin-left: 1em
  caption
    text-align: left
    width: 95vw // Screws up table width until positioning below
    // caption-side: top-outside Firefox-only for now

@media (min-width: 768px)  // sm, md, lg
  .table-resp
    margin-top: 3em
    position: relative // Used below to give position: absolute context
    caption
      position: absolute // Fixes table width broken by width: 95vw above
      top: -2em
      margin-bottom: .75em
    thead
      text-align: left
      background-color: #333
      color: white
    tbody
      tr
        &:nth-child(odd)
          // background-color: hsl(0, 0%, 94%)

        &:nth-child(even)
          // background-color: hsl(0, 0%, 88%)
    td, th
      padding: .25em .5em
      &:nth-child(2)
        border-left: 3px solid #fff

@media (max-width: 767px) /* xs */
  thead
    display: none
  .table-resp
    display: block
    margin-top: 1em
  td
    display: block
  td:first-child
    font-weight: 700
    margin-top: .75em
    margin-bottom: 0
  td:nth-child(2)
    margin-top: 0



</style>
