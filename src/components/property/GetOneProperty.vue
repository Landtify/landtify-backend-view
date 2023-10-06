<template>

  <q-page class="q-pa-md">
    <!-- <div class="text-black text-h4">Search User</div>
      <q-separator /> -->
      <div class="q-pt-lg" fullwidth>
        <!-- <div class="row q-pt-sm"> -->
          <q-form @submit="onSubmit" @reset="onReset" class="">
            <div class="col-12 col-md-12 q-pl-md">
              <q-input label="Property ID" class="" outlined v-model="property_id" hint="" />
            </div>
            <div class="col-12 col-md-12 q-pl-md">
              <q-btn class="bg-primary text-white" type="submit">Search</q-btn>
          </div>
        </q-form>
        <!-- </div> -->

        <div v-if="fixed0">
          <MDBTable class="full-width">
            <thead>
              <tr>
                <th scope="col">#Tag</th>
                <th scope="col">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(value, key) in data" :key="key">
                <th scope="row">{{ key }}</th>
                <td>{{ value }}</td>
              </tr>
            </tbody>
          </MDBTable>
        </div>


    </div>
  </q-page>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { axios, api, base } from 'boot/axios'
import { copyToClipboard, useQuasar } from 'quasar'
import { useAdminStore } from '../../stores/user-store'
import { useRouter } from 'vue-router'

const name= 'GetOneUserPage'

const fixed0 = ref(false)
const fixed1 = ref(false)
const $q = useQuasar()
const data = ref([])
const property_id = ref("")
const useStore = useAdminStore()
const selectedCustomer = reactive([])
const selectedCustomerPopup1 = ref({})
const selectedCustomerPopup2 = ref({})

function formatDate(date) {
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

function copyTo(ID){
  copyToClipboard(ID)
  .then(() => {
    // success!
    $q.notify({
      color: 'green-4',
      position: 'bottom',
      message: 'User ID copied to Clipboard',
      icon: 'thumb_up'
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


function popup1(selectedCustomer) {
  fixed1.value = true
  console.log(selectedCustomer, 'selectedCustomer')
  selectedCustomerPopup1.value = selectedCustomer
  console.log(selectedCustomerPopup1.value, 'selectedCustomerpopup1 value')
}


const onSubmit = () => {
  const token = useStore.getToken

  axios.get(`${base}/prop/property/${property_id.value}`,
    { headers: { "Authorization": `Bearer ${token}` }, })
    .then((response) => {
      data.value = response.data
      console.log(data.value)
      if(data.value.ID != null){
        $q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'thumb_up',
          message: 'User Found'
        })
        fixed0.value = true;
      } else {
        fixed0.value = false;
      }
    })
    .catch(() => {
      $q.notify({
        color: 'negative',
        position: 'bottom',
        message: 'Please Refresh',
        icon: 'report_problem'
      })
    })
}


const onDelete = () => {
  // const formData = {
  //   user_id: user_id.value,
  // }
  const token = useStore.getToken

  axios.delete(`${base}/admin/serve/property/${property_id.value}`,
    { headers: { "Authorization": `Bearer ${token}` }, })
    .then((response) => {
      data.value = response.data
      console.log(data.value)
      $q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'thumb_up',
        message: 'User Deleted'
      })
      // fixed0.value = true;
    })
    .catch(() => {
      $q.notify({
        color: 'negative',
        position: 'bottom',
        message: 'User not found',
        icon: 'report_problem'
      })
    })
}

const onReset = () => {
  property_id.value = null
}


</script>

<!-- <style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
.my-card-2
  width: 100%
.siz
  width: 100%
  max-width: 250px
  height: 100%
.siz1
  width: 250px
  max-width: 250px
  height: 150px
  margin-top: -8px
.bgPropfunds
  background-color: $landtify
select
  margin-top: 10px
  margin-right: 10px
  padding: 15px 10px
  background: rgba(196, 196, 196, 0.1)
  border: 2px solid grey
  border-radius: 4px
  outline: none
  width: 540px
.btn2
  border: none
  border-radius: 3px
  font-weight: 500
  font-size: 18px
  height: 40px
  margin-right: 10px
  background-color: #001951
  color: white
  cursor: pointer
.is-s
  background-color: #001951
  color: white
</style> -->
