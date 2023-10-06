<template>
  <q-page class="q-pa-md">
    <!-- <div class="text-black text-h4">Create User</div> -->
    <q-separator />
    <div class="q-pt-lg">
      <q-form @submit="onSubmit" @reset="onReset">
        <div class="row q-pt-sm">
          <div class="col-12 col-md-6 q-pl-md">
            <q-input required class="" outlined v-model="parcel_id" hint="Parcel ID" />
          </div>
          <div class="col-12 col-md-6 q-pl-md">
            <q-select :options="optionsSelect" required class="" outlined v-model="water_connection" hint="Water Connection" />
          </div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-12 col-md-6 q-pl-md">
            <q-select :options="optionsSelect" required class="" v-model="electricity_connection" outlined type="text" hint="Electricity Connection" />
          </div>
          <div class="col-12 col-md-6 q-pl-md">
            <q-select :options="optionsSelect" required class="" v-model="road_access" outlined type="text" hint="Road Access" />
          </div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-12 col-md-6 q-pl-md">
            <q-select :options="optionsSelect" required class="" v-model="is_there_structure" outlined type="text" hint="Is There Structure?" />
          </div>
          <div class="col-12 col-md-6 q-pl-md">
            <q-select :options="optionsSelect" required class="" v-model="property_been_flooded_before" type="text" outlined hint="Property been flooded before?" />
          </div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-12 col-md-6 q-pl-md">
            <q-select :options="optionsSelect" required class="" v-model="title_free_and_clear" outlined type="text" hint="Title Free & Clear?" />
          </div>
          <div class="col-12 col-md-6 q-pl-md">
            <q-select :options="optionsSelect" required outlined v-model="hoa_fees"  hint="HOA Fees" />
          </div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-12 col-md-6 q-pl-md">
            <q-input required class="" type="textarea" v-model="property_details" outlined hint="Property Details" />
          </div>
          <div class="col-12 col-md-6 q-pl-md">
            <q-input required outlined type="textarea" v-model="address" hint="Address" />
          </div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-12 col-md-6 q-pl-md">
            <q-input required class="" v-model="state" outlined type="text" hint="State" />
          </div>
          <div class="col-12 col-md-6 q-pl-md">
            <q-input required class="" v-model="country" type="text" outlined hint="Country"/>
          </div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-12 col-md-6 q-pl-md">
            <q-select :options="optionsSelect" required class="" v-model="liens" outlined type="text" hint="Liens?" />
          </div>
          <div class="col-12 col-md-6 q-pl-md">
            <q-select :options="optionsSelect" required class="" v-model="mobile_home_allowed" type="text" outlined hint="Mobile Home Allowed?"/>
          </div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-12 col-md-6 q-pl-md">
            <q-select :options="optionsSelect" required outlined v-model="encumbrances" hint="Encumbrance" />
          </div>
          <div class="col-12 col-md-6 q-pl-md">
            <q-input required outlined v-model="property_taxes_current" hint="Property Taxes" />
          </div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-12 col-md-6 q-pl-md">
            <q-input required outlined type="textarea" v-model="terms_negotiation" hint="Terms & Negotiation" />
          </div>
          <div class="col-12 col-md-6 q-pl-md">
            <q-select :options="optionsStatus" required outlined v-model="status" hint="Status" />
          </div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-12 col-md-6 q-pl-md">
            <q-input required outlined v-model="realtor" hint="Realtor" />
          </div>
          <div class="col-12 col-md-6 q-pl-md">
            <q-input required outlined v-model="price" hint="Price" type="number" />
          </div>
        </div>


        <div class="row q-pt-lg">
          <div class="text-center full-width q-pl-md">
            <q-btn label="Submit" type="submit" color="primary" style="width: 260px" />
          </div>
          <!-- <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" /> -->
        </div>

      </q-form>

    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { axios, api, base } from 'boot/axios'
import { useQuasar } from 'quasar'
import { useAdminStore } from '../../stores/user-store'
import { useRouter } from 'vue-router'

  name: 'CreateAPropertyPage'

  const optionsSelect = [
    'Yes',
    'No'
  ]

  const optionsStatus = [
    'Available',
    'Sold'
  ]


const $q = useQuasar()
const data = ref([])
// const formData = ref({})
// const post_by = ref('')
const parcel_id = ref('')
const country = ref('')
const state = ref('')
const address = ref('')
const property_details = ref('')
const water_connection = ref('')
const electricity_connection = ref('')
const road_access = ref('')
const is_there_structure = ref('')
const property_been_flooded_before = ref('')
const title_free_and_clear = ref('')
const hoa_fees = ref('')
const liens = ref('')
const mobile_home_allowed = ref('')
const encumbrances = ref('')
const property_taxes_current = ref('')
const realtor = ref('')
const picture1 = ref('')
const picture2 = ref('')
const picture3 = ref('')
const picture4 = ref('')
const picture5 = ref('')
const picture6 = ref('')
const terms_negotiation = ref('')
const status = ref('')
const price = ref('')

const useStore = useAdminStore()
const $router = useRouter()

const onSubmit = () => {
  const token = useStore.getToken
  const firstName = useStore.getFirstname
  const lastName = useStore.getLastname
  const admin_id = useStore.getAdminId

  const formData = {
    posted_by_id: admin_id,
    posted_by_name: firstName + " " + lastName,
    parcel_id: parcel_id.value,
    address: address.value,
    state: state.value,
    country: country.value,
    property_details: property_details.value,
    water_connection: water_connection.value,
    electricity_connection: electricity_connection.value,
    road_access: road_access.value,
    is_there_structure: is_there_structure.value,
    property_been_flooded_before: property_been_flooded_before.value,
    title_free_and_clear: title_free_and_clear.value,
    hoa_fees: hoa_fees.value,
    liens: liens.value,
    mobile_home_allowed: mobile_home_allowed.value,
    encumbrances: encumbrances.value,
    property_taxes_current: property_taxes_current.value,
    realtor: realtor.value,
    picture1: picture1.value,
    picture2: picture2.value,
    picture3: picture3.value,
    picture4: picture4.value,
    picture4: picture4.value,
    picture5: picture5.value,
    picture6: picture6.value,
    terms_negotiation: terms_negotiation.value,
    status: status.value,
    price: price.value,
  }

  console.log(formData.value, 'formData')
  axios.post(`${base}/admin/serve/property`, formData,
    { headers: { "Authorization": `Bearer ${token}` }, })
    .then((response) => {
      data.value = response.data
      console.log(data.value, "create property")
      // onReset()
      $q.notify({
        color: 'green',
        position: 'bottom',
        message: data.value.message,
        icon: 'check'
      })
      // $router.push('/properties')
      $router.go();
    })
    .catch(() => {
      $q.notify({
        color: 'negative',
        position: 'bottom',
        message: data.value.message,
        icon: 'report_problem'
      })
    })
}

const onReset = () => {
  parcel_id.value = null
  country.value = null
  state.value = null
  address.value = null
  property_details.value = null
  water_connection.value = null
  electricity_connection.value = null
  road_access.value = null
  is_there_structure.value = null
  property_been_flooded_before.value = null
  title_free_and_clear.value = null
  hoa_fees.value = null
  liens.value = null
  mobile_home_allowed.value = null
  encumbrances.value = null
  property_taxes_current.value = null
  realtor.value = null
  picture1.value = null
  picture2.value = null
  picture3.value = null
  picture4.value = null
  picture5.value = null
  picture6.value = null
  price.value = null
  terms_negotiation.value = null
  status.value = null
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
