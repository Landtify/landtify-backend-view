<template>
  <q-page class="q-pa-md">
    <div class="text-black text-h4">Post a Land</div>
    <q-separator />
    <div class="q-pt-lg">
      <q-form @submit="onSubmit" @reset="onReset">
        <div class="row q-pt-sm">
          <div class="col-12 col-md-6 q-pl-md">
            <q-input required class="" outlined v-model="title" hint="Title" />
          </div>
          <div class="col-12 col-md-6 q-pl-md">
            <q-input required class="" outlined v-model="parcelid" hint="Parcel ID" />
          </div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-12 col-md-6 q-pl-md">
            <q-select :options="optionsLandType" required class="" outlined v-model="landtype"
              hint="Land Type" />
          </div>
          <div class="col-12 col-md-6 q-pl-md">
            <q-select :options="optionsLandTag" required class="" outlined v-model="landtag"
              hint="Land Tag" />
          </div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-12 col-md-6 q-pl-md">
            <q-input required class="" outlined v-model="centergps" hint="Center GPS" />
          </div>
          <div class="col-12 col-md-6 q-pl-md">
            <q-input required class="" outlined v-model="cornergps" hint="Corner GPS" />
          </div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-12 col-md-6 q-pl-md">
            <q-input class="" type="text" v-model="address" outlined hint="Address" />
          </div>
          <div class="col-12 col-md-6 q-pl-md">
            <q-input required outlined type="text" v-model="city" hint="City" />
          </div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-12 col-md-6 q-pl-md">
            <q-input required class="" v-model="province" outlined type="text" hint="Province" />
          </div>
          <div class="col-12 col-md-6 q-pl-md">
            <q-input required class="" v-model="country" type="text" outlined hint="Country" />
          </div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-12 col-md-6 q-pl-md">
            <q-input required class="" outlined v-model="acreage" hint="Acreage(Square Feet)" />
          </div>
          <div class="col-12 col-md-6 q-pl-md">
            <q-select :options="optionsStatus" required class="" outlined v-model="status"
                  hint="Status" />
          </div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-12 col-md-6 q-pl-md">
            <q-input outlined type="textarea" v-model="details" hint="Land Details(More about Land...)" />
          </div>
          <div class="col-12 col-md-6 q-pl-md">
            <q-input outlined type="textarea" v-model="terms" hint="Terms of Negotiation" />
          </div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-12 col-md-3 q-pl-md">
            <q-toggle
              v-model="water"
              color="green"
              label="Water Connection?"
              left-label
            />
          </div>
          <div class="col-12 col-md-3 q-pl-md">
            <q-toggle
              v-model="electricity"
              color="green"
              label="Electricity Connection?"
              left-label
            />
          </div>
          <div class="col-12 col-md-3 q-pl-md">
            <q-toggle
              v-model="road"
              color="green"
              label="Road Access?"
              left-label
            />
          </div>
          <div class="col-12 col-md-3 q-pl-md">
            <q-toggle
              v-model="structure"
              color="green"
              label="Is there a structure?"
              left-label
            />
          </div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-12 col-md-3 q-pl-md">
            <q-toggle
              v-model="flooded"
              color="green"
              label="As it been Flooded before?"
              left-label
            />
          </div>
          <div class="col-12 col-md-3 q-pl-md">
            <q-toggle
              v-model="titlefree"
              color="green"
              label="Is the title free and clear?"
              left-label
            />
          </div>
          <div class="col-12 col-md-3 q-pl-md">
            <q-toggle
              v-model="hoa"
              color="green"
              label="HOA Fees?"
              left-label
            />
          </div>
          <div class="col-12 col-md-3 q-pl-md">
            <q-toggle
              v-model="liens"
              color="green"
              label="Lien?"
              left-label
            />
          </div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-12 col-md-3 q-pl-md">
            <q-toggle
              v-model="encumbrances"
              color="green"
              label="Are there any Encumbrances?"
              left-label
            />
          </div>
          <div class="col-12 col-md-3 q-pl-md">
            <q-toggle
              v-model="tax"
              color="green"
              label="Tax current?"
              left-label
            />
          </div>
          <div class="col-12 col-md-3 q-pl-md">
            <q-toggle
              v-model="listedbyrealtor"
              color="green"
              label="Listed by a Realtor?"
              left-label
            />
          </div>
          <div class="col-12 col-md-3 q-pl-md">
            <q-toggle
              v-model="mobilehome"
              color="green"
              label="Mobile Home Allowed?"
              left-label
            />
          </div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-12 col-md-6 q-pl-md">
            <q-input class="" outlined v-model="realtorname" hint="Realtor Name" />
          </div>
          <div class="col-12 col-md-6 q-pl-md">
            <q-input class="" outlined v-model="realtorphone" hint="Realtor Phone" />
          </div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-12 col-md-6 q-pl-md">
            <!-- <q-input class="" outlined v-model="realtorpicture" hint="Realtor Picture" /> -->
            <q-input
              @update:model-value="val => { thumbnail = val[0] }"
              filled
              type="file"
              hint="Thumbnail"
            />
          </div>
          <div class="col-12 col-md-6 q-pl-md">
            <q-input
              @update:model-value="val => { picture1 = val[0] }"
              filled
              type="file"
              hint="Picture1"
            />
          </div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-12 col-md-6 q-pl-md">
            <q-input
              @update:model-value="val => { picture2 = val[0] }"
              filled
              type="file"
              hint="Picture2"
            />
          </div>
          <div class="col-12 col-md-6 q-pl-md">
            <q-input
              @update:model-value="val => { picture3 = val[0] }"
              filled
              type="file"
              hint="Picture3"
            />
          </div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-12 col-md-6 q-pl-md">
            <q-input
              @update:model-value="val => { picture4 = val[0] }"
              filled
              type="file"
              hint="Picture4"
            />
          </div>
          <div class="col-12 col-md-6 q-pl-md">
            <q-input
              @update:model-value="val => { picture5 = val[0] }"
              filled
              type="file"
              hint="Picture5"
            />
          </div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-12 col-md-6 q-pl-md">
            <q-input
              @update:model-value="val => { picture6 = val[0] }"
              filled
              type="file"
              hint="Picture6"
            />
          </div>
          <div class="col-12 col-md-6 q-pl-md">
            <q-input
              @update:model-value="val => { picture7 = val[0] }"
              filled
              type="file"
              hint="Picture7"
            />
          </div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-12 col-md-6 q-pl-md">
            <q-input
              @update:model-value="val => { picture8 = val[0] }"
              filled
              type="file"
              hint="Picture8"
            />
          </div>
          <div class="col-12 col-md-6 q-pl-md">
            <q-input
              @update:model-value="val => { picture9 = val[0] }"
              filled
              type="file"
              hint="Picture9"
            />
          </div>
        </div>
        <div class="row q-pt-sm">
          <div class="col-12 col-md-12 q-pl-md">
            <q-input required outlined v-model="price" hint="Price" type="text" />
          </div>
        </div>


        <div class="row q-pt-lg">
          <div class="text-center full-width q-pl-md">
            <q-btn :loading="loadingCreateLands" label="Submit" type="submit" color="primary" style="width: 260px" />
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

name: 'CreateAPropertyPage'

const optionsLandTag = [
  'Land for Lease',
  'Land for Sale'
]

const optionsLandType = [
  'Residential',
  'Commercial'
]

const optionsStatus = [
  'Available',
  'Sold'
]


const $q = useQuasar()
const loadingCreateLands = ref(false)
const data = ref([])
// const formData = ref({})
// const post_by = ref('')
const parcelid = ref('')
const landtag = ref('')
const landtype = ref('')
const title = ref('')
const address = ref('')
const city = ref('')
const province = ref('')
const country = ref('')
const details = ref('')
const acreage = ref('')
const water = ref(false)
const electricity = ref(false)
const road = ref(false)
const structure = ref(false)
const flooded = ref(false)
const titlefree = ref(false)
const hoa = ref(false)
const liens = ref(false)
const mobilehome = ref(false)
const encumbrances = ref(false)
const listedbyrealtor = ref(false)
const tax = ref(false)
const centergps = ref('')
const cornergps = ref('')
const thumbnail = ref(null)
const picture1 = ref(null)
const picture2 = ref(null)
const picture3 = ref(null)
const picture4 = ref(null)
const picture5 = ref(null)
const picture6 = ref(null)
const picture7 = ref(null)
const picture8 = ref(null)
const picture9 = ref(null)
const terms = ref('')
const status = ref('')
const price = ref('')
const postedbyid = ref('')
const postedbyname = ref('')
const realtorname = ref('')
const realtorphone = ref('')
const realtorpicture = ref('')


const useStore = useAdminStore()
const $router = useRouter()

const onSubmit = async () => {
  loadingCreateLands.value = true
  const token = useStore.getToken
  console.log(token, 'token')
  const firstName = useStore.getFirstname
  const lastName = useStore.getLastname
  const adminid = useStore.getAdminId

  let fd = new FormData();
  // fd.append("profile_pic", this.selectedFile);

  fd.append('postedbyid', adminid);
  fd.append('postedbyname', firstName + " " + lastName);
  fd.append('title', title.value);
  fd.append('landtype', landtype.value);
  fd.append('landtag', landtag.value);
  fd.append('parcelid', parcelid.value);
  fd.append('address', address.value);
  fd.append('city', city.value);
  fd.append('province', province.value);
  fd.append('country', country.value);
  fd.append('centergps', centergps.value);
  fd.append('cornergps', cornergps.value);
  fd.append('acreage', acreage.value);
  fd.append('details', details.value);
  fd.append('water', water.value);
  fd.append('electricity', electricity.value);
  fd.append('road', road.value);
  fd.append('structure', structure.value);
  fd.append('flooded', flooded.value);
  fd.append('titlefree', titlefree.value);
  fd.append('hoa', hoa.value);
  fd.append('liens', liens.value);
  fd.append('mobilehome', mobilehome.value);
  fd.append('encumbrances', encumbrances.value);
  fd.append('tax', tax.value);
  fd.append('listedbyrealtor', listedbyrealtor.value);
  fd.append('realtorname', realtorname.value);
  fd.append('realtorphone', realtorphone.value);
  fd.append('realtorpicture', realtorpicture.value);
  fd.append('thumbnail', thumbnail.value);
  fd.append('picture1', picture1.value);
  fd.append('picture2', picture2.value);
  fd.append('picture3', picture3.value);
  fd.append('picture4', picture4.value);
  fd.append('picture5', picture5.value);
  fd.append('picture6', picture6.value);
  fd.append('picture7', picture7.value);
  fd.append('picture8', picture8.value);
  fd.append('picture9', picture9.value);
  fd.append('terms', terms.value);
  fd.append('status', status.value);
  fd.append('price', price.value);

  // const formData = {
  //   postedbyid: admin_id,
  //   postedbyname: firstName + " " + lastName,
  //   title: title.value,
  //   landtype: landtype.value,
  //   landtag: landtag.value,
  //   parcelid: parcelid.value,
  //   address: address.value,
  //   city: city.value,
  //   province: province.value,
  //   country: country.value,
  //   centergps: centergps.value,
  //   cornergps: cornergps.value,
  //   acreage: acreage.value,
  //   details: details.value,
  //   water: water.value,
  //   electricity: electricity.value,
  //   road: road.value,
  //   structure: structure.value,
  //   flooded: flooded.value,
  //   titlefree: titlefree.value,
  //   hoa: hoa.value,
  //   liens: liens.value,
  //   mobilehome: mobilehome.value,
  //   encumbrances: encumbrances.value,
  //   tax: tax.value,
  //   listedbyrealtor: listedbyrealtor.value,
  //   realtorname: realtorname.value,
  //   realtorphone: realtorphone.value,
  //   realtorpicture: realtorpicture.value,
  //   thumbnail: thumbnail.value,
  //   picture1: picture1.value,
  //   picture2: picture2.value,
  //   picture3: picture3.value,
  //   picture4: picture4.value,
  //   picture5: picture5.value,
  //   picture6: picture6.value,
  //   picture7: picture7.value,
  //   picture8: picture8.value,
  //   picture9: picture9.value,
  //   terms: terms.value,
  //   status: status.value,
  //   price: price.value,
  // }
  // console.log(formData.value, 'formData')

  await axios.post(`${base}/admin/serve/lands/`, fd,
    { headers: { "Authorization": `Bearer ${token}`,
        'Content-Type': 'multipart/form-data' }, })
    .then((response) => {
      data.value = response.data
      console.log(data.value, "create Land")
      // onReset()
      $q.notify({
        color: 'green',
        position: 'bottom',
        message: data.value.message,
        icon: 'check'
      })
      $router.push('/lands')
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

    loadingCreateLands.value = false
}

const onReset = () => {
  postedbyid.value = null
    postedbyname.value = null
    title.value = null
    landtype.value = null
    landtag.value = null
    parcelid.value = null
    address.value = null
    city.value = null
    province.value = null
    country.value = null
    centergps.value = null
    cornergps.value = null
    acreage.value = null
    details.value = null
    water.value = null
    electricity.value = null
    road.value = null
    structure.value = null
    flooded.value = null
    titlefree.value = null
    hoa.value = null
    liens.value = null
    mobilehome.value = null
    encumbrances.value = null
    tax.value = null
    listedbyrealtor.value = null
    realtorname.value = null
    realtorphone.value = null
    realtorpicture.value = null
    thumbnail.value = null
    picture1.value = null
    picture2.value = null
    picture3.value = null
    picture4.value = null
    picture5.value = null
    picture6.value = null
    picture7.value = null
    picture8.value = null
    picture9.value = null
    terms.value = null
    status.value = null
    price.value = null
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
