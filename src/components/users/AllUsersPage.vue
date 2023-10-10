<template>
  <q-page class="q-pa-md">
    <!-- <div class="text-black text-h4">All Users</div>
    <q-separator /> -->
    <div class="q-gutter-y-md" fullwidth>
      <div align="right">
        <q-btn rounded color="blue" class="q-mr-md" @click="goToCreateUser()">Create User</q-btn>
        <q-btn rounded color="blue" @click="goToFindUser()">Find a User</q-btn>
      </div>
      <q-table
        class="my-sticky-header-table"
        title="All User"
        :rows="data"
        row-key="name"
        flat
        bordered
        :visible-columns="[
          'userid',
          'firstname',
          'lastname',
          'email',
          'username',
          'usertype',
          'phone',
          'businessname',
          'picture',
          'walletid',
          'walletamount',
          'gender',
          'dob',
          'address',
          'city',
          'province',
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

      <q-dialog v-model="findUser">
        <div class="q-pa-md row items-start q-gutter-md">
          <q-card class="my-card-2 text-primary">
            <q-card-section>
              <div class="row q-pt-sm">
                <q-form @submit="onFind" @reset="onReset" class="">
                  <div class="col-12 col-md-12 q-pl-md">
                    <q-input label="User ID" class="" outlined v-model="userid" hint="" />
                  </div>
                  <q-separator dark />
                  <div class="col-12 q-pl-md">
                    <q-btn :loading="loadingFindAnyUser" class="bg-primary text-white" type="submit">Find</q-btn>
                  </div>
                </q-form>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </q-dialog>

      <q-dialog v-model="findUser2">
        <div class="q-pa-md row items-start q-gutter-md">
          <q-card class="my-card-2  text-primary">
            <q-img :src="viewMoreData.picture" class="my-thumbnail" />

              <q-card-section>
                <q-btn
                  fab
                  color="primary"
                  icon="place"
                  class="absolute"
                  style="top: 0; right: 12px; transform: translateY(-50%);"
                />

                <div class="row no-wrap items-center">
                  <div class="col text-h4 ellipsis">
                    {{ viewMoreData.firstname }} {{ viewMoreData.lastname }}
                  </div>
                  <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
                    <q-icon name="place" />
                    city: {{ viewMoreData.city }}
                  </div>
                </div>

              </q-card-section>

              <q-card-section class="q-pt-none text-center">
                <div class="text-subtitle1">
                  Username:
                </div>
                <div class="text-caption text-grey">
                  @{{ viewMoreData.username }}
                </div>
              </q-card-section>

              <q-card-section class="q-pt-none text-center">
                <div class="text-subtitle1">
                  Email:
                </div>
                <div class="text-caption text-grey">
                  {{ viewMoreData.email }}
                </div>
              </q-card-section>

              <q-card-section class="q-pt-none text-center">
                <div class="text-subtitle1">
                  Phone:
                </div>
                <div class="text-caption text-grey">
                  {{ viewMoreData.phone }}
                </div>
              </q-card-section>

              <q-card-section class="q-pt-none text-center">
                <div class="text-subtitle1">
                  Business Name:
                </div>
                <div class="text-caption text-grey">
                  {{ viewMoreData.businessname }}
                </div>
              </q-card-section>

              <q-card-section class="q-pt-none text-center">
                <div class="text-subtitle1">
                  Location:
                </div>
                <div class="text-caption text-grey">
                  {{ viewMoreData.address }}, {{ viewMoreData.city }}, {{ viewMoreData.province }}, {{ viewMoreData.country }}
                </div>
              </q-card-section>

              <q-card-section class="q-pt-none text-center">
                <div class="text-subtitle1">
                  Gender:
                </div>
                <div class="text-caption text-grey">
                  {{ viewMoreData.gender }}
                </div>
              </q-card-section>
              <q-card-section class="q-pt-none text-center">
                <div class="text-subtitle1">
                  Date of Birth:
                </div>
                <div class="text-caption text-grey">
                  {{ viewMoreData.dob }}
                </div>
              </q-card-section>
              <q-card-section class="q-pt-none text-center">
                <div class="text-subtitle1">
                  Following:
                </div>
                <div class="text-caption text-grey">
                  {{ viewMoreData.following }}
                </div>
              </q-card-section>
              <q-card-section class="q-pt-none text-center">
                <div class="text-subtitle1">
                  Followers:
                </div>
                <div class="text-caption text-grey">
                  {{ viewMoreData.followers }}
                </div>
              </q-card-section>
                <q-card-section class="q-pt-none text-center">
                  <div class="text-subtitle1">
                    Wallet ID:
                  </div>
                  <div class="text-caption text-grey">
                    {{ viewMoreData.walletid }}
                  </div>
                </q-card-section>
                <q-card-section class="q-pt-none text-center">
                  <div class="text-subtitle1">
                    Wallet Amount:
                  </div>
                  <div class="text-caption text-grey">
                    {{ viewMoreData.walletamount }}
                  </div>
                </q-card-section>

              <q-separator />

              <q-card-actions align="right">
                <q-btn flat  v-close-popup >Cancel</q-btn>
                <q-btn :loading="loadingDeleteAUser" @click="onDelete()" color="red" flat>Delete User</q-btn>
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

const name= 'AllUsersPage'

const loadingFindAnyUser = ref(false)
const loadingDeleteAUser = ref(false)
const findUser = ref(false)
const findUser2 = ref(false)
const $q = useQuasar()
const data = ref([])
const viewMoreData = ref({})
const dataDelete = ref([])
const userid = ref('')
const useStore = useAdminStore()
const $router = useRouter()
const selectedCustomer = reactive([])
const selectedCustomerPopup1 = ref({})
const selectedCustomerPopup2 = ref({})

const goToCreateUser = () => {
  $router.push({ name: 'CreateUser' })
}

const goToFindUser = () => {
  // $router.push({ name: 'FindUser' })
  findUser.value = true;
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
  api.get(`/user/entire-users/all`,
    { headers: { "Authorization": `Bearer ${token}` }, })
    .then((response) => {
      data.value = response.data.data.reverse()
      console.log(data.value, "yello!")
    })
    .catch(() => {
      $q.notify({
        color: 'negative',
        position: 'bottom',
        message: 'Users not found',
        icon: 'report_problem'
      })
    })
}

const onFind = () => {
  loadingFindAnyUser.value = true
  const token = useStore.getToken

  axios.get(`${base}/user/${userid.value}`,
  { headers: { "Authorization": `Bearer ${token}` }, })
    .then((response) => {
      viewMoreData.value = response.data.data
      // console.log(find.value)

      findUser.value = false;
      findUser2.value = true;
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
      $q.notify({
        color: 'negative',
        position: 'bottom',
        message: 'User not found',
        icon: 'report_problem'
      })
    })
    loadingFindAnyUser.value = false
  }

const onReset = () => {
  userid.value = null
}

const onDelete = () => {
  loadingDeleteAUser.value = true
  const token = useStore.getToken

  axios.delete(`${base}/admin/serve/user/r/${userid.value}`,
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
      findUser2.value = false;
      $router.go();
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
    loadingDeleteAUser.value = false
  }

  onMounted(() => {
  loadData()
})

</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
.my-card-2
  width: 100%
  max-width: 550px

.my-thumbnail
  height: 200px
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
