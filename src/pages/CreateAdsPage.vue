<template>
  <q-page class="q-pa-md">
    <div class="text-black text-h4">Post an Ad</div>
    <q-separator />
    <div class="q-pt-lg">
      <q-form @submit="onSubmit" @reset="onReset">
        <div class="row q-pt-sm">
          <div class="col-12 col-md-6 q-pl-md">
            <q-input
              @update:model-value="val => { picture1 = val[0] }"
              filled
              type="file"
              hint="Picture1"
            />
          </div>
          <div class="col-12 col-md-6 q-pl-md">
            <q-input
              @update:model-value="val => { picture2 = val[0] }"
              filled
              type="file"
              hint="Picture2"
            />
          </div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-12 col-md-6 q-pl-md">
            <q-input
              @update:model-value="val => { picture3 = val[0] }"
              filled
              type="file"
              hint="Picture3"
            />
          </div>
          <div class="col-12 col-md-6 q-pl-md">
            <q-input
              @update:model-value="val => { picture4 = val[0] }"
              filled
              type="file"
              hint="Picture4"
            />
          </div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-12 col-md-6 q-pl-md">
            <q-input
              @update:model-value="val => { picture5 = val[0] }"
              filled
              type="file"
              hint="Picture5"
            />
          </div>
          <div class="col-12 col-md-6 q-pl-md">
            <q-input
              @update:model-value="val => { picture6 = val[0] }"
              filled
              type="file"
              hint="Picture6"
            />
          </div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-12 col-md-6 q-pl-md">
            <q-input
              @update:model-value="val => { picture7 = val[0] }"
              filled
              type="file"
              hint="Picture7"
            />
          </div>
          <div class="col-12 col-md-6 q-pl-md">
            <q-input
              @update:model-value="val => { picture8 = val[0] }"
              filled
              type="file"
              hint="Picture8"
            />
          </div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-12 col-md-6 q-pl-md">
            <q-input
              @update:model-value="val => { picture9 = val[0] }"
              filled
              type="file"
              hint="Picture9"
            />
          </div>
          <div class="col-12 col-md-6 q-pl-md">
            <q-input
              @update:model-value="val => { picture10 = val[0] }"
              filled
              type="file"
              hint="Picture10"
            />
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
import { useAdminStore } from '../stores/user-store'
import { useRouter } from 'vue-router'

name: 'CreateAdsPage'

const $q = useQuasar()
const data = ref([])
const picture1 = ref(null)
const picture2 = ref(null)
const picture3 = ref(null)
const picture4 = ref(null)
const picture5 = ref(null)
const picture6 = ref(null)
const picture7 = ref(null)
const picture8 = ref(null)
const picture9 = ref(null)
const picture10 = ref(null)


const useStore = useAdminStore()
const $router = useRouter()

const onSubmit = async () => {
  const token = useStore.getToken
  console.log(token, 'token')
  // const firstName = useStore.getFirstname
  // const lastName = useStore.getLastname
  // const admin_id = useStore.getAdminId

  let fd = new FormData();
  // fd.append("profile_pic", this.selectedFile);

  fd.append('picture1', picture1.value);
  fd.append('picture2', picture2.value);
  fd.append('picture3', picture3.value);
  fd.append('picture4', picture4.value);
  fd.append('picture5', picture5.value);
  fd.append('picture6', picture6.value);
  fd.append('picture7', picture7.value);
  fd.append('picture8', picture8.value);
  fd.append('picture9', picture9.value);
  fd.append('picture10', picture10.value);

  await axios.post(`${base}/ads/upload/`, fd,
    { headers: { "Authorization": `Bearer ${token}`,
        'Content-Type': 'multipart/form-data' }, })
    .then((response) => {
      data.value = response.data
      console.log(data.value, "ads created")
      // onReset()
      $q.notify({
        color: 'green',
        position: 'bottom',
        message: data.value.message,
        icon: 'check'
      })
      $router.push('/ads')
      // $router.go();
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
    picture1.value = null
    picture2.value = null
    picture3.value = null
    picture4.value = null
    picture5.value = null
    picture6.value = null
    picture7.value = null
    picture8.value = null
    picture9.value = null
    picture10.value = null
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
