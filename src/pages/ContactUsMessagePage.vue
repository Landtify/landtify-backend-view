<template>
  <q-page class="q-pa-md">
    <div class="text-black text-h4">Users Inquiry Messages</div>
      <q-separator />
    <div class="q-gutter-y-md q-pt-md" full-width>
      <q-card class="my-card" v-for="(da, index) in data" :key="index">
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs col-8">
            <div class="text-overline">
              <div v-if="da.replied">
                <q-icon color="green" name="verified" />
                Replied
              </div>
              <div v-else color="yellow">
                <q-icon color="red" name="cancel_schedule_send" />
                Yet to reply
              </div>
            </div>
            <div class="text-h5 q-mt-sm q-mb-xs">Message</div>
            <div class="text-caption text-grey">
              {{ da.message }}
            </div>
          </q-card-section>

          <q-list class="col-2">
            <q-item>
              <q-item-section avatar>
                <q-icon color="primary" name="badge" />
              </q-item-section>

              <q-item-section>
                <q-item-label>Name</q-item-label>
                <q-item-label caption>{{ da.lastname}} {{ da.firstname }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon color="primary" name="email" />
              </q-item-section>

              <q-item-section>
                <q-item-label>Email</q-item-label>
                <q-item-label caption>{{ da.email }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon color="primary" name="phone" />
              </q-item-section>

              <q-item-section>
                <q-item-label>Phone</q-item-label>
                <q-item-label caption>{{ da.phone }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>

          <q-card-actions vertical class="justify-around col-2">
            <q-btn flat round color="red" icon="content_copy" @click="copyTo(da.email)"> Copy Email</q-btn>
            <q-btn v-if="!da.replied" flat round color="accent" icon="reply" @click="onReplied(da.contactid)">Replied?</q-btn>
          </q-card-actions>
        </q-card-section>
      </q-card>

    </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref, watch} from 'vue'
import { axios, api, base } from 'boot/axios'
import { copyToClipboard, useQuasar } from 'quasar'
import { useAdminStore } from '../stores/user-store'
import { useRouter } from 'vue-router'

const name = 'ContactUsMessagePage'

const data = ref([])
const replied = ref([])
const useStore = useAdminStore()
const $q = useQuasar()
const $router = useRouter()
var token = useStore.getToken
var adminid = useStore.adminid


function copyTo(Email) {
  copyToClipboard(Email)
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

const loadData = () => {
  // const token = useStore.getToken
  console.log(token, "token");
  api.get(`/contactus/all`,
    { headers: { "Authorization": `Bearer ${token}` }, })
    .then((response) => {
      data.value = response.data.data.reverse()
      console.log(data.value, "contact us message!")
    })
    .catch(() => {
      // if (HttpStatusCode.Unauthorized) {
      //   $router.push('/');
      //   $router.go();
      // }
      $q.notify({
        color: 'negative',
        position: 'bottom',
        message: 'Messages not found',
        icon: 'report_problem'
      })
    })
}


const onReplied = (contactid) => {
  // const token = useStore.getToken
  console.log(token)
  const formData = {
    repliedbyid: adminid,
  }

  api.patch(`${base}/admin/serve/contactus/approve/${contactid}`, formData ,
    { headers: { "Authorization": `Bearer ${token}` }, })
    .then((response) => {
      replied.value = response.data.data
      console.log(replied.value)
      $q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'thumb_up',
        message: 'Replied successful'
      })
      window.location.reload();
    })
    .catch(() => {
      $q.notify({
        color: 'negative',
        position: 'bottom',
        message: 'Action not complete',
        icon: 'report_problem'
      })
      window.location.reload();
    })
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
.my-card
  width: 100%
  // max-width: 350px
</style>
