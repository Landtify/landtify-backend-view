<template>
  <q-page class="q-pa-md">
    <div class="text-black text-h4">
      My Information

      <!-- <q-btn flat dense class="float-right" label="Edit Profile" to="/edit-profile" color="primary" /> -->
    </div>
    <q-separator />
    <div class="q-pt-md">
      <!-- <q-form @submit="onSubmit" @reset="onReset"> -->
      <div class="row q-pt-sm">
        <div class="col-12 col-md-6 q-pl-md">
          <q-input readonly hint="First Name" class="" outlined :label="data.firstname" />
        </div>
        <div class="col-12 col-md-6 q-pl-md">
          <q-input readonly hint="Last Name" class="" outlined :label="data.lastname" />
        </div>
      </div>
      <div class="row q-pt-sm">
        <div class="col-12 col-md-6 q-pl-md">
          <q-input readonly hint="Email" class="" outlined :label="data.email" />
        </div>
        <div class="col-12 col-md-6 q-pl-md">
          <q-input readonly hint="Phone Number" class="" outlined :label="data.phone" />
        </div>
      </div>
      <div class="row q-pt-sm">
        <div class="col-12 col-md-6 q-pl-md">
          <q-input readonly hint="DOB" class="" outlined :label="data.dob" />
        </div>
        <div class="col-12 col-md-6 q-pl-md">
          <q-input readonly hint="Gender" class="" outlined :label="data.gender" />
        </div>
      </div>
      <div class="row q-pt-sm">
        <div class="col-12 col-md-6 q-pl-md">
          <div class="column">
            <div class="col">
              <q-input readonly hint="Username" class="" outlined :label="data.username" />
            </div>
            <div class="col q-pt-xs">
              <q-input readonly hint="City" class="" outlined :label="data.city" />
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6 q-pl-md">
          <q-input type="textarea" readonly hint="Address" class="" outlined :label="data.address" />
        </div>
      </div>
      <div class="row q-pt-sm">
        <div class="col-12 col-md-6 q-pl-md">
          <q-input readonly hint="Province" class="" outlined :label="data.province" />
        </div>
        <div class="col-12 col-md-6 q-pl-md">
          <q-input readonly hint="Country" outlined :label="data.country" />
        </div>
      </div>
      <div class="row q-pt-sm">
        <div class="col-12 col-md-12 q-pl-md">
          <q-img :src="data.picture" class="my-thumbnail" />
        </div>
        <!-- <div class="col-12 col-md-6 q-pl-md">
          <q-input readonly hint="Country" outlined :label="data.country" />
        </div> -->
      </div>


      <!-- <div class="q-mt-md">
          <q-btn label="Submit" type="submit" color="primary" />
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div> -->

      <!-- </q-form> -->
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref, computed, watch } from 'vue'
import { axios, api, base } from 'boot/axios'
import { useQuasar } from 'quasar'
// import { QTabs, QTab, QTabPanels, QTabPanel } from 'quasar'
import { useAdminStore } from '../stores/user-store'
import { useRouter } from 'vue-router'


const useStore = useAdminStore()

const $router = useRouter()

var token = useStore.getToken
var admin_id = useStore.getAdminId

// watch(() => {
//   var decoded = useStore.checkToken(token);
//   console.log(decoded);
//   console.log("decoded");
//   if (decoded == true) {
//     useStore.clearUser();
//     // useStore.logout();
//     $router.replace('/')
// $router.go();
//   }
// })

const name = 'ProfilePage'

const $q = useQuasar()
const data = ref([])


const loadData = () => {
  // const _email = $store.getters['auth/getLoggedUser'].email
  console.log(admin_id, 'admin_id')
  // _email = email
  api.get(`/admin/serve/${admin_id}`,
    { headers: { "Authorization": `Bearer ${token}` }, })
    .then((response) => {
      data.value = response.data.data
      console.log(data.value, "portfolio yello!")
      // $q.notify({
      //   message: data.value.message,
      //   color: 'green-4',
      //   textColor: 'white',
      //   icon: 'thumb_up',
      // })
    })
    .catch(() => {
      if (HttpStatusCode.Unauthorized) {
        $router.push('/');
        $router.go();
      }
      $q.notify({
        color: 'negative',
        position: 'bottom',
        message: 'Loading failed',
        icon: 'report_problem'
      })
    })
}

onMounted(() => {
  loadData()
})


</script>

<style lang="sass" scoped>
.my-thumbnail
  height: 400px
</style>
