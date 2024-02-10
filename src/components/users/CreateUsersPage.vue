<template>
  <q-page class="q-pa-md">
    <div class="text-black text-h4">Create User</div>
    <q-separator />
    <div class="q-pt-lg">
      <q-form @submit="onSubmit" @reset="onReset">
        <div class="row q-pt-sm">
          <div class="col-12 col-md-6 q-pl-md">
            <q-input required class="" outlined v-model="firstname" hint="First Name" />
          </div>
          <div class="col-12 col-md-6 q-pl-md">
            <q-input required class="" outlined v-model="lastname" hint="Last Name" />
          </div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-12 col-md-6 q-pl-md">
            <q-input required class="" v-model="email" outlined type="email" hint="Email" />
          </div>
          <div class="col-12 col-md-6 q-pl-md">
            <q-input required class="" v-model="username" outlined type="text" hint="Username" />
          </div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-12 col-md-6 q-pl-md">
            <q-input required class="" v-model="password" outlined type="password" hint="Password" />
          </div>
          <div class="col-12 col-md-6 q-pl-md">
            <q-input required class="" v-model="phone" type="tel" outlined hint="Phone number" label="234814585375"/>
          </div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-12 col-md-6 q-pl-md">
            <q-input class="" v-model="dob" outlined type="date" hint="Date of Birth" />
          </div>
          <div class="col-12 col-md-6 q-pl-md">
            <q-select required outlined v-model="gender" :options="optionsGender" hint="Gender" />
          </div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-12 col-md-6 q-pl-md">
            <q-input class="" v-model="businessname" outlined type="text" hint="Business Name" />
          </div>
          <div class="col-12 col-md-6 q-pl-md">
            <q-input
              @update:model-value="val => { picture = val[0] }"
              filled
              type="file"
              hint="Picture"
            />
          </div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-12 col-md-6 q-pl-md">
            <q-input class="" v-model="address" outlined type="textarea" hint="Address" />
          </div>
          <div class="col-12 col-md-6 q-pl-md">
            <div class="column">
              <div class="col">
                <q-input required class="" v-model="city" outlined type="text" hint="City" />
              </div>
              <div class="col q-pt-xs">
                <q-input required class="" v-model="province" outlined type="text" hint="State" />
              </div>
            </div>
          </div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-12 col-md-6 q-pl-md">
            <q-input required class="" v-model="country" outlined type="text" hint="Country" />
          </div>
          <div class="col-12 col-md-6 q-pl-md">
            <q-select outlined v-model="usertype" :options="optionsUserType" hint="User Type"
              :rules="[val => (val && val.length > 0) || 'Please make a selection']"
            />
          </div>
        </div>
        <div class="row q-pt-lg">
          <div class="text-center full-width q-pl-md">
            <q-btn :loading="loadingCreateUser" label="Submit" type="submit" color="primary" style="width: 260px" />
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

  name: 'CreateUserPage'

  const optionsGender = [
    'Male',
    'Female'
  ]
  const optionsUserType = [
    'Direct Buyer',
    'Direct Seller',
    'Realtor',
    'Private Investor',
    'Broker',
    'Private Lender',
    'Title Company',
    'Mobile Notary',
    'Photographer',
    'Drone Operator',
    'Surveyor',
  ]


const $q = useQuasar()
const data = ref([])
const loadingCreateUser = ref(false)

const firstname = ref('')
const lastname = ref('')
const email = ref('')
const username = ref('')
const password = ref('')
const usertype = ref('')
const phone = ref('')
const dob = ref('')
const gender = ref('')
const businessname = ref('')
const address = ref('')
const city = ref('')
const province = ref('')
const country = ref('')
const picture = ref(null)

const useStore = useAdminStore()
const $router = useRouter()

const onSubmit = () => {
  loadingCreateUser.value = true
  // const token = useStore.getToken
  // const id = useStore.getEmail
  const fD = new FormData();
  fD.append("firstname", firstname.value);
  fD.append("lastname", lastname.value);
  fD.append("email", email.value);
  fD.append("phone", phone.value);
  fD.append("password", password.value);
  fD.append("username", username.value);
  fD.append("usertype", usertype.value);
  fD.append("dob", dob.value);
  fD.append("businessname", businessname.value);
  fD.append("gender", gender.value);
  fD.append("address", address.value);
  fD.append("city", city.value);
  fD.append("province", province.value);
  fD.append("country", country.value);
  fD.append("picture", picture.value);
  // console.log(fD.value, 'formData')
  axios.post(`${base}/users/signup`, fD, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
    .then((response) => {
      data.value = response.data
      console.log(data.value, "user")
      // onReset()
      $q.notify({
        color: 'green',
        position: 'bottom',
        message: data.value.message,
        icon: 'check'
      })
      loadingCreateUser.value = false
      $router.push('/all-users')
    })
    .catch(() => {
      $q.notify({
        color: 'negative',
        position: 'bottom',
        message: data.value.message,
        icon: 'report_problem'
      })
      loadingCreateUser.value = false
    })
  }

const onReset = () => {
  email.value = null
  username.value = null
  phone.value = null
  gender.value = null
  firstname.value = null
  lastname.value = null
  businessname.value = null
  password.value = null
  dob.value = null
  address.value = null
  city.value = null
  province.value = null
  country.value = null
  picture.value = null
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
