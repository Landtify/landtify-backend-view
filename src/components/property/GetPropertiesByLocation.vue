<template>
  <q-page class="q-pa-md">
    <!-- <div class="text-black text-h4">Search User</div>
    <q-separator /> -->
    <div class="q-gutter-y-md" fullwidth>
      <!-- <div class="row q-pt-sm"> -->
        <q-form @submit="onSubmit" @reset="onReset" class="">
          <div class="col-12 col-md-12 q-pl-md">
            <q-input label="City" class="" outlined v-model="city" hint="" />
          </div>
          <div class="col-12 q-pl-md">
            <q-btn class="bg-primary text-white" type="submit">Search</q-btn>
          </div>
        </q-form>
      <!-- </div> -->

      <div class="" v-if="fixed0">
      <!-- <div class="" > -->
        <MDBTable class="full-width align-middle mb-0 bg-white">
          <thead class="bg-light">
            <tr>
            <th>ID</th>
    	      <th>Parcel Info</th>
    	      <th>Price($)</th>
    	      <th>Posted By</th>
    	      <th>Status</th>
    	      <th>Square-Feet</th>
    	      <th>Bedroom</th>
    	      <th>Bathroom</th>
    	      <th>Country</th>
    	      <th>Province</th>
    	      <th>City</th>
    	      <th>Address</th>
    	      <!-- <th>Details</th> -->
    	      <th>Status info</th>
    	      <th>Other info</th>
    	      <th>Terms of Negotiation</th>
    	      <th>Pictures</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="value in data " :key="key">
              <td>
                <div class="d-flex align-items-center">
                  <img :src="value.thumbnail" alt="" style="width: 45px; height: 45px"
                    class="rounded-circle" />
                  <div class="ms-3">
                    <p class="fw-bold mb-1">Property ID: {{ value.propertyid }}</p>
                    <p class="text-muted mb-0"><MDBBadge badge="success" pill class="d-inline">{{ value.propertytag }}</MDBBadge></p>
                  </div>
                </div>
              </td>
              <td>
                <p class="fw-normal mb-1">{{ value.title }}</p>
                <p class="text-muted mb-0">Parcel ID: {{ value.parcelid }}</p>
              </td>
              <td>{{ value.price }}</td>
              <td>
                <p class="fw-normal mb-1">{{ value.postedbyid }}</p>
                <p class="text-muted mb-0">{{ value.postedbyname }}</p>
              </td>
              <td>
                <MDBBadge badge="success" pill class="d-inline">{{ value.status }}</MDBBadge>
              </td>
              <td>
                <MDBBadge badge="success" pill class="d-inline">{{ value.squarefeet }}</MDBBadge>
              </td>
              <td>
                <MDBBadge badge="success" pill class="d-inline">{{ value.bedroom }}</MDBBadge>
              </td>
              <td>
                <MDBBadge badge="success" pill class="d-inline">{{ value.bathroom }}</MDBBadge>
              </td>
              <td>
                <p class="fw-normal mb-1">{{ value.country }}</p>
              </td>
              <td>
                <p class="fw-normal mb-1">{{ value.province }}</p>
              </td>
              <td>
                <p class="fw-normal mb-1">{{ value.city }}</p>
              </td>
              <td>
                <p class="fw-normal mb-1">{{ value.address }}</p>
              </td>
              <!-- <td>{{ value.details }}</td> -->
              <td>
                <p class="fw-normal mb-1">Water?: <MDBBadge badge="success" pill class="d-inline">{{ value.water }}</MDBBadge></p>
                <p class="fw-normal mb-1">Electricity?: <MDBBadge badge="success" pill class="d-inline">{{ value.electricity }}</MDBBadge></p>
                <p class="fw-normal mb-1">Road Access?: <MDBBadge badge="success" pill class="d-inline">{{ value.road }}</MDBBadge></p>
                <p class="fw-normal mb-1">Structure?: <MDBBadge badge="success" pill class="d-inline">{{ value.structure }}</MDBBadge></p>
                <p class="fw-normal mb-1">Flooded?: <MDBBadge badge="success" pill class="d-inline">{{ value.flooded }}</MDBBadge></p>
              </td>
              <td>
                <p class="fw-normal mb-1">Title Free?: <MDBBadge badge="warning" pill class="d-inline">{{ value.titlefree }}</MDBBadge></p>
                <p class="fw-normal mb-1">HOA?: <MDBBadge badge="warning" pill class="d-inline">{{ value.hoa }}</MDBBadge></p>
                <p class="fw-normal mb-1">Liens?: <MDBBadge badge="warning" pill class="d-inline">{{ value.liens }}</MDBBadge></p>
                <p class="fw-normal mb-1">Encumbrances?: <MDBBadge badge="warning" pill class="d-inline">{{ value.encumbrances }}</MDBBadge></p>
                <p class="fw-normal mb-1">Tax?: <MDBBadge badge="warning" pill class="d-inline">{{ value.tax }}</MDBBadge></p>
              </td>
              <td>{{ value.terms }}</td>
              <td>
                <div class="d-flex align-items-center">
                  <img :src="value.picture1" alt="" style="width: 45px; height: 45px"
                    class="rounded-circle" />
                  <img :src="value.picture2" alt="" style="width: 45px; height: 45px"
                    class="rounded-circle" />
                  <img :src="value.picture3" alt="" style="width: 45px; height: 45px"
                    class="rounded-circle" />
                  <img :src="value.picture4" alt="" style="width: 45px; height: 45px"
                    class="rounded-circle" />
                  <img :src="value.picture5" alt="" style="width: 45px; height: 45px"
                    class="rounded-circle" />
                  <img :src="value.picture6" alt="" style="width: 45px; height: 45px"
                    class="rounded-circle" />
                </div>
              </td>
              <td>
                <MDBBtn color="link" size="sm" rounded>
                  Edit
                </MDBBtn>
              </td>
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
const city = ref("")
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

  axios.get(`${base}/admin/serve/property/location/${city.value}`,
    { headers: { "Authorization": `Bearer ${token}` }, })
    .then((response) => {
      data.value = response.data.data.reverse()
      fixed0.value = true;
      console.log(data.value)
      // if(data.value.propertyid != null){
      //   $q.notify({
      //     color: 'green-4',
      //     textColor: 'white',
      //     icon: 'thumb_up',
      //     message: 'User Found'
      //   })
      // } else {
      //   fixed0.value = false;
      // }
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


const onReset = () => {
  city.value = null
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
