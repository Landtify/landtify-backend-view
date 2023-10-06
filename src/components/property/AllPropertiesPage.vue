<template>
  <q-page class="q-pa-md">
    <!-- <div class="text-black text-h4">All Properties</div>
    <q-separator /> -->
    <div class="q-gutter-y-md" fullwidth>
      <div align="right">
        <!-- <q-btn rounded color="blue" class="q-mr-md" @click="goToCreateProperty()">Create a Property</q-btn> -->
        <q-btn rounded color="blue" @click="goToFindProperty()">Find Lands</q-btn>
      </div>
      <q-table
        class="my-sticky-header-table"
        title="All Lands"
        :rows="data"
        row-key="landid"
        flat
        bordered
        :visible-columns="[
          'landid',
  	      'landtag',
  	      'landtype',
  	      'postedbyid',
  	      'postedbyname',
  	      'title',
  	      'parcelid',
  	      'country',
  	      'province',
  	      'city',
  	      'address',
  	      'details',
  	      'centergps',
  	      'cornergps',
  	      'acreage',
  	      'water',
  	      'electricity',
  	      'road',
  	      'structure',
  	      'flooded',
  	      'titlefree',
  	      'hoa',
  	      'liens',
  	      'encumbrances',
  	      'tax',
  	      'listedbyrealtor',
  	      'realtorname',
  	      'realtorphone',
  	      'realtorpicture',
  	      'thumbnail',
  	      'picture1',
  	      'picture2',
  	      'picture3',
  	      'picture4',
  	      'picture5',
  	      'picture6',
  	      'picture7',
  	      'picture8',
  	      'picture9',
  	      'picture10',
  	      'terms',
  	      'status',
  	      'price',
  	      'approved',
  	      'approvedby',
  	      // 'wishlistby',
        ]"
          :filter="filter"
          >
          <!-- :loading="true" -->
        <template v-slot:top-right>
          <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
      </q-table>

      <q-dialog v-model="findProperty">
        <div class="q-pa-md row items-start q-gutter-md">
          <q-card class="my-card-2 text-primary">
            <q-card-section>
              <div class="row q-pt-sm">
                <q-form @submit="onFind" @reset="onReset" class="">
                  <div class="col-12 col-md-12 q-pl-md">
                    <q-input label="Land ID" class="" outlined v-model="landid" hint="" />
                  </div>
                  <q-separator dark />
                  <div class="col-12 q-pl-md">
                    <q-btn class="bg-primary text-white" type="submit">Find</q-btn>
                  </div>
                </q-form>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </q-dialog>

      <q-dialog v-model="findProperty2">
        <div class="q-pa-md row items-start q-gutter-md">
          <q-card class="my-card-2  text-primary">
            <q-card-section>
                <div class="row q-pt-sm">
                  <div class="col-12 col-md-6 q-pl-md">
                    <div class="text-h6">{{ find.landid }}</div>
                    <div class="text-subtitle2">Land ID</div>
                  </div>
                  <div class="col-12 col-md-6 q-pl-md">
                    <div class="text-h6">{{ find.post_by }}</div>
                    <div class="text-subtitle2">Post By</div>
                  </div>
                </div>
                <div class="row q-pt-sm">
                  <div class="col-12 col-md-6 q-pl-md">
                    <div class="text-h6">{{ find.parcel_id }}</div>
                    <div class="text-subtitle2">Parcel ID</div>
                  </div>
                  <div class="col-12 col-md-6 q-pl-md">
                    <div class="text-h6">{{ find.country }}</div>
                    <div class="text-subtitle2">Country</div>
                  </div>
                </div>
                <div class="row q-pt-sm">
                  <div class="col-12 col-md-6 q-pl-md">
                    <div class="text-h6">{{ find.state }}</div>
                    <div class="text-subtitle2">State</div>
                  </div>
                  <div class="col-12 col-md-6 q-pl-md">
                    <div class="text-h6">{{ find.address }}</div>
                    <div class="text-subtitle2">Address</div>
                  </div>
                </div>
                <div class="row q-pt-sm">
                  <div class="col-12 col-md-6 q-pl-md">
                      <div class="text-h6">{{ find.property_details }}</div>
                      <div class="text-subtitle2">Property Details</div>
                    </div>
                  <div class="col-12 col-md-6 q-pl-md">
                    <div class="text-h6">{{ find.water_connection }}</div>
                    <div class="text-subtitle2">Water Connection</div>
                  </div>
                </div>
                <div class="row q-pt-sm">
                  <div class="col-12 col-md-6 q-pl-md">
                    <div class="text-h6">{{ find.electricity_connection }}</div>
                    <div class="text-subtitle2">Electricity Connection?</div>
                  </div>
                  <div class="col-12 col-md-6 q-pl-md">
                      <div class="text-h6">{{ find.road_access }}</div>
                      <div class="text-subtitle2">Road Access?</div>
                    </div>
                </div>
                <div class="row q-pt-sm">
                  <div class="col-12 col-md-6 q-pl-md">
                    <div class="text-h6">{{ find.is_there_structure }}</div>
                    <div class="text-subtitle2">Is there Structure?</div>
                  </div>
                  <div class="col-12 col-md-6 q-pl-md">
                      <div class="text-h6">{{ find.property_been_flooded_before }}</div>
                      <div class="text-subtitle2">Property been flooded before?</div>
                    </div>
                </div>
                <div class="row q-pt-sm">
                  <div class="col-12 col-md-6 q-pl-md">
                    <div class="text-h6">{{ find.title_free_and_clear }}</div>
                    <div class="text-subtitle2">Title Free & Clear?</div>
                  </div>
                  <div class="col-12 col-md-6 q-pl-md">
                      <div class="text-h6">{{ find.hoa_fees }}</div>
                      <div class="text-subtitle2">HOA Fees?</div>
                    </div>
                </div>
                <div class="row q-pt-sm">
                  <div class="col-12 col-md-6 q-pl-md">
                    <div class="text-h6">{{ find.liens }}</div>
                    <div class="text-subtitle2">Liens?</div>
                  </div>
                  <div class="col-12 col-md-6 q-pl-md">
                      <div class="text-h6">{{ find.mobile_home_allowed }}</div>
                      <div class="text-subtitle2">Mobile Home Allowed?</div>
                    </div>
                </div>
                <div class="row q-pt-sm">
                  <div class="col-12 col-md-6 q-pl-md">
                    <div class="text-h6">{{ find.encumbrances }}</div>
                    <div class="text-subtitle2">Encumbrances</div>
                  </div>
                  <div class="col-12 col-md-6 q-pl-md">
                      <div class="text-h6">{{ find.property_taxes_current }}</div>
                      <div class="text-subtitle2">Property Taxes?</div>
                    </div>
                </div>
                <div class="row q-pt-sm">
                  <div class="col-12 col-md-6 q-pl-md">
                    <div class="text-h6">{{ find.realtor }}</div>
                    <div class="text-subtitle2">Realtor</div>
                  </div>
                  <div class="col-12 col-md-6 q-pl-md">
                      <div class="text-h6">{{ find.terms_negotiation }}</div>
                      <div class="text-subtitle2">Terms $ Negotiation</div>
                    </div>
                </div>
                <div class="row q-pt-sm">
                  <div class="col-12 col-md-6 q-pl-md">
                    <div class="text-h6">{{ find.price }}</div>
                    <div class="text-subtitle2">Price</div>
                  </div>
                  <div class="col-12 col-md-6 q-pl-md">
                    <div class="text-h6">{{ find.status }}</div>
                    <div class="text-subtitle2">Status</div>
                  </div>
                </div>
                <div class="row q-pt-sm">
                  <div class="col-12 col-md-6 q-pl-md">
                    <div class="text-h6">{{ find.picture1 }}</div>
                    <div class="text-subtitle2">1</div>
                  </div>
                  <div class="col-12 col-md-6 q-pl-md">
                    <div class="text-h6">{{ find.picture2 }}</div>
                    <div class="text-subtitle2">2</div>
                  </div>
                </div>
                <div class="row q-pt-sm">
                  <div class="col-12 col-md-6 q-pl-md">
                    <div class="text-h6">{{ find.picture3 }}</div>
                    <div class="text-subtitle2">3</div>
                  </div>
                  <div class="col-12 col-md-6 q-pl-md">
                    <div class="text-h6">{{ find.picture4 }}</div>
                    <div class="text-subtitle2">4</div>
                  </div>
                </div>
                <div class="row q-pt-sm">
                  <div class="col-12 col-md-6 q-pl-md">
                    <div class="text-h6">{{ find.picture5 }}</div>
                    <div class="text-subtitle2">5</div>
                  </div>
                  <div class="col-12 col-md-6 q-pl-md">
                    <div class="text-h6">{{ find.picture6 }}</div>
                    <div class="text-subtitle2">6</div>
                  </div>
                </div>
              </q-card-section>

              <q-separator dark />

              <q-card-actions align="right">
                <q-btn flat  v-close-popup >Cancel</q-btn>
                <q-btn @click="onDelete()" color="red" flat>Delete Property</q-btn>
            </q-card-actions>
          </q-card>
        </div>
      </q-dialog>

    </div>
  </q-page>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { axios, api, base } from 'boot/axios'
import { copyToClipboard, useQuasar } from 'quasar'
import { useAdminStore } from '../../stores/user-store'
import { useRouter } from 'vue-router'

const name= 'AllPropertiesPage'

const findProperty = ref(false)
const findProperty2 = ref(false)
const $q = useQuasar()
const data = ref([])
const find = ref([])
const dataDelete = ref([])
const landid = ref('')
const useStore = useAdminStore()
const $router = useRouter()
const selectedCustomer = reactive([])
const selectedCustomerPopup1 = ref({})
const selectedCustomerPopup2 = ref({})

const goToCreateProperty = () => {
  $router.push('/create-property')
}

const goToFindProperty = () => {
  // $router.push({ name: 'findProperty' })
  findProperty.value = true;
}


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
      message: 'Username copied to Clipboard',
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


const loadData = () => {
  const token = useStore.getToken
  console.log(token, "token");
  api.get(`/admin/serve/lands/all`,
    { headers: { "Authorization": `Bearer ${token}` }, })
    .then((response) => {
      data.value = response.data.data.reverse()
      console.log(data.value, "yello!")
    })
    .catch(() => {
      // if (HttpStatusCode.Unauthorized) {
      //   $router.push('/');
      //   $router.go();
      // }
      $q.notify({
        color: 'negative',
        position: 'bottom',
        message: 'Properties not found',
        icon: 'report_problem'
      })
    })
}

const onFind = () => {
  const token = useStore.getToken

  axios.get(`${base}/admin/serve/lands/${landid.value}`,
    { headers: { "Authorization": `Bearer ${token}` }, })
    .then((response) => {
      find.value = response.data.data
      console.log(find.value)

      findProperty.value = false;
      findProperty2.value = true;
      $q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'thumb_up',
        message: 'Property Found'
      })
      // if (find.value.ID != null) {
      //   fixed0.value = true;
      // } else {
      //   fixed0.value = false;
      // }
    })
    .catch(() => {
      // if (HttpStatusCode.Unauthorized) {
      //   $router.push('/');
      //   $router.go();
      // }
      $q.notify({
        color: 'negative',
        position: 'bottom',
        message: 'Property not found',
        icon: 'report_problem'
      })
    })
}

const onReset = () => {
  landid.value = null
}

const onDelete = () => {
  // const formData = {
  //   landid: landid.value,
  // }
  const token = useStore.getToken

  axios.delete(`${base}/admin/property/${landid.value}`,
    { headers: { "Authorization": `Bearer ${token}` }, })
    .then((response) => {
      dataDelete.value = response.data
      console.log(dataDelete.value)
      $q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'thumb_up',
        message: dataDelete.value.message
      })
      // message: 'Property Deleted'
      findProperty2.value = false;
      $router.go();
      // fixed0.value = true;
    })
    .catch(() => {
      // if (HttpStatusCode.Unauthorized) {
      //   $router.push('/');
      //   $router.go();
      // }
      $q.notify({
        color: 'negative',
        position: 'bottom',
        message: 'Property not found',
        icon: 'report_problem'
      })
    })
}

onMounted(() => {
  loadData()
})

</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
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
</style>
