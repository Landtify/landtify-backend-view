<template>
  <q-page class="q-pa-md">
    <!-- <div class="text-black text-h4">All Users</div>
    <q-separator /> -->
    <div class="q-gutter-y-md" fullwidth>
      <div align="right">
        <q-btn rounded color="blue" class="q-mr-md" @click="goToCreateAdmin()">Create Admin</q-btn>
        <q-btn rounded color="blue" @click="goToFindAdmin()">Find a Admin</q-btn>
      </div>
      <q-table
        class="my-sticky-header-table"
        title="All User"
        :rows="data"
        row-key="name"
        flat
        bordered
        :visible-columns="[
          'admin_id',
          'firstname',
          'lastname',
          'email',
          'username',
          'admintype',
          'phone',
          'picture',
          // 'wallet_id',
          'gender',
          'dob',
          'address',
          'state',
          'country',
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

      <q-dialog v-model="findAdmin">
        <div class="q-pa-md row items-start q-gutter-md">
          <q-card class="my-card-2 text-primary">
            <q-card-section>
              <div class="row q-pt-sm">
                <q-form @submit="onFind" @reset="onReset" class="">
                  <div class="col-12 col-md-12 q-pl-md">
                    <q-input label="Admin ID" class="" outlined v-model="admin_id" hint="" />
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

      <q-dialog v-model="findAdmin2">
        <div class="q-pa-md row items-start q-gutter-md">
          <q-card class="my-card-2  text-primary">
            <q-card-section>
                <div class="row q-pt-sm">
                  <div class="col-12 col-md-6 q-pl-md">
                    <div class="text-h6">{{ find.admin_id }}</div>
                    <div class="text-subtitle2">User ID</div>
                  </div>
                  <!-- <div class="col-12 col-md-6 q-pl-md">
                    <div class="text-h6">{{ find.wallet_id }}</div>
                    <div class="text-subtitle2">Wallet ID</div>
                  </div> -->
                </div>
                <div class="row q-pt-sm">
                  <div class="col-12 col-md-6 q-pl-md">
                    <div class="text-h6">{{ find.firstname }}</div>
                    <div class="text-subtitle2">First Name</div>
                  </div>
                  <div class="col-12 col-md-6 q-pl-md">
                    <div class="text-h6">{{ find.lastname }}</div>
                    <div class="text-subtitle2">Last Name</div>
                  </div>
                </div>
                <div class="row q-pt-sm">
                  <div class="col-12 col-md-6 q-pl-md">
                    <div class="text-h6">{{ find.email }}</div>
                    <div class="text-subtitle2">Email</div>
                  </div>
                  <div class="col-12 col-md-6 q-pl-md">
                    <div class="text-h6">{{ find.username }}</div>
                    <div class="text-subtitle2">Username</div>
                  </div>
                </div>
                <div class="row q-pt-sm">
                  <div class="col-12 col-md-6 q-pl-md">
                      <div class="text-h6">{{ find.gender }}</div>
                      <div class="text-subtitle2">Gender</div>
                    </div>
                  <div class="col-12 col-md-6 q-pl-md">
                    <div class="text-h6">{{ find.phonenumber }}</div>
                    <div class="text-subtitle2">Phone Number</div>
                  </div>
                </div>
                <div class="row q-pt-sm">
                  <div class="col-12 col-md-6 q-pl-md">
                    <div class="text-h6">{{ find.dob }}</div>
                    <div class="text-subtitle2">Date of Birth</div>
                  </div>
                  <div class="col-12 col-md-6 q-pl-md">
                      <div class="text-h6">{{ find.address }}</div>
                      <div class="text-subtitle2">Address</div>
                    </div>
                </div>
                <div class="row q-pt-sm">
                  <div class="col-12 col-md-6 q-pl-md">
                    <div class="text-h6">{{ find.state }}</div>
                    <div class="text-subtitle2">State</div>
                  </div>
                  <div class="col-12 col-md-6 q-pl-md">
                      <div class="text-h6">{{ find.country }}</div>
                      <div class="text-subtitle2">Country</div>
                    </div>
                </div>
                <div class="row q-pt-sm">

                </div>
              </q-card-section>

              <q-separator dark />

              <q-card-actions align="right">
                <q-btn flat  v-close-popup >Cancel</q-btn>
                <q-btn @click="onDelete()" color="red" flat>Delete Admin</q-btn>
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
import { HttpStatusCode } from 'axios'

const name= 'AllUsersPage'

const findAdmin = ref(false)
const findAdmin2 = ref(false)
const $q = useQuasar()
const data = ref([])
const find = ref([])
const dataDelete = ref([])
const admin_id = ref('')
const useStore = useAdminStore()
const $router = useRouter()
const selectedCustomer = reactive([])
const selectedCustomerPopup1 = ref({})
const selectedCustomerPopup2 = ref({})

const goToCreateAdmin = () => {
  $router.push({ name: 'CreateAdmin' })
}

const goToFindAdmin = () => {
  // $router.push({ name: 'FindUser' })
  findAdmin.value = true;
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
  api.get(`/admin/serve/admin/all`,
    { headers: { "Authorization": `Bearer ${token}` }, })
    .then((response) => {
      // if (HttpStatusCode.Unauthorized) {
      //   $router.push('/');
      // } else {
        data.value = response.data.data.reverse()
        console.log(data.value, "yello!")
      // }
    })
    .catch(() => {
      if (HttpStatusCode.Unauthorized) {
        $router.push('/');
        $router.go();
      }
      $q.notify({
        color: 'negative',
        position: 'bottom',
        message: 'Users not found',
        icon: 'report_problem'
      })
    })
}

const onFind = () => {
  const token = useStore.getToken

  axios.get(`${base}/admin/serve/${admin_id.value}`,
    { headers: { "Authorization": `Bearer ${token}` }, })
    .then((response) => {
      find.value = response.data.data
      console.log(find.value)

      findAdmin.value = false;
      findAdmin2.value = true;
      $q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'thumb_up',
        message: 'User Found'
      })
      // if (find.value.ID != null) {
      //   fixed0.value = true;
      // } else {
      //   fixed0.value = false;
      // }
    })
    .catch(() => {
      if (HttpStatusCode.Unauthorized) {
        $router.push('/');
        $router.go();
      }
      $q.notify({
        color: 'negative',
        position: 'bottom',
        message: 'User not found',
        icon: 'report_problem'
      })
    })
}

const onReset = () => {
  admin_id.value = null
}

const onDelete = () => {
  // const formData = {
  //   admin_id: admin_id.value,
  // }
  const token = useStore.getToken

  axios.delete(`${base}/admin/${admin_id.value}`,
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
      // message: 'User Deleted'
      findAdmin2.value = false;
      $router.go();
      // fixed0.value = true;
    })
    .catch(() => {
      if (HttpStatusCode.Unauthorized) {
        $router.push('/');
        $router.go();
      }
      $q.notify({
        color: 'negative',
        position: 'bottom',
        message: 'User not found',
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
