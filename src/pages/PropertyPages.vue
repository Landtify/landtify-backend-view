<template>
  <q-page class="q-pa-md">
    <div class="text-black text-h4">Properties</div>
    <div class="q-gutter-y-md" full-width>
      <q-card>
        <q-tabs v-model="tab" class="text-grey" active-color="primary" indicator-color="primary" align="left"
          narrow-indicator>
          <q-tab name="create_a_property" label="Create A Property" />
          <q-tab name="see_all_properties" label="See All Properties" />
          <q-tab name="get_a_property" label="Get A Property" />
          <q-tab name="get_properties_by_location" label="Properties By Location" />
          <q-tab name="get_properties_posted_by" label="Properties Posted By" />
          <q-tab name="delete_a_property" label="Delete A Property" />
          <!-- <q-tab name="create_user" label="Create User" />
          <q-tab name="search_user" label="Search for a User" /> -->
          <!-- <q-tab name="delete_user" label="Delete a User" /> -->
          <!-- <q-tab name="create_price" label="Create Price" />
          <q-tab name="see_price" label="See All Price" />
          <q-tab name="search_price" label="Get One Price" />
          <q-tab name="delete_intake" label="Delete Intake" />
          <q-tab name="delete_customer" label="Delete Customer" /> -->
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="create_a_property">
            <create-a-property-page></create-a-property-page>
          </q-tab-panel>
          <q-tab-panel name="see_all_properties">
            <all-properties-page></all-properties-page>
          </q-tab-panel>
          <q-tab-panel name="get_a_property">
            <get-one-property></get-one-property>
          </q-tab-panel>
          <q-tab-panel name="get_properties_by_location">
            <get-properties-by-location></get-properties-by-location>
          </q-tab-panel>
          <q-tab-panel name="get_properties_posted_by">
            <get-properties-posted-by></get-properties-posted-by>
          </q-tab-panel>
          <q-tab-panel name="delete_a_property">
            <delete-one-property></delete-one-property>
          </q-tab-panel>
          <!-- <q-tab-panel name="create_user">
            <create-users-page></create-users-page>
          </q-tab-panel> -->
          <!-- <q-tab-panel name="search_user">
            <get-one-user></get-one-user>
          </q-tab-panel>
          <q-tab-panel name="delete_user">
            <delete-one-user></delete-one-user>
          </q-tab-panel> -->
<!--
          <q-tab-panel name="create_price">
            <create-prices-page></create-prices-page>
          </q-tab-panel>
          <q-tab-panel name="see_price">
            <all-prices-page></all-prices-page>
          </q-tab-panel>
          <q-tab-panel name="search_price">
            <get-one-price-page></get-one-price-page>
          </q-tab-panel>

          <q-tab-panel name="delete_customer">
            <delete-one-intake></delete-one-intake>
          </q-tab-panel>

          <q-tab-panel name="delete_intake">
            <delete-one-customer-page></delete-one-customer-page>
          </q-tab-panel> -->

          <!-- <q-tab-panel name="movies">
            <div class="text-h6">Movies</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel> -->
        </q-tab-panels>
      </q-card>

    </div>
  </q-page>
</template>

<script setup>
import { ref, watch} from 'vue'
import {  QTabs, QTab, QTabPanels, QTabPanel } from 'quasar'
import { useAdminStore } from '../stores/user-store'
import { useRouter } from 'vue-router'
import AllPropertiesPage from 'src/components/property/AllPropertiesPage.vue'
import CreateAPropertyPage from 'src/components/property/CreateAPropertyPage.vue'
import GetOneProperty from 'src/components/property/GetOneProperty.vue'
import GetPropertiesByLocation from 'src/components/property/GetPropertiesByLocation.vue'
import GetPropertiesPostedBy from 'src/components/property/GetPropertiesPostedBy.vue'
import DeleteOneProperty from 'src/components/property/DeleteOneProperty.vue'
// import GetOneUser from 'src/components/users/GetOneUser.vue'
// import DeleteOneUser from 'src/components/users/DeleteOneUser.vue'
// import CreatePricesPage from 'src/components/users/prices/CreatePricesPage.vue'
// import AllPricesPage from 'src/components/users/prices/AllPricesPage.vue'
// import GetOnePricePage from 'src/components/users/prices/GetOnePricePage.vue'
// import DeleteOneIntake from 'src/components/users/intakes/DeleteOneIntake.vue'
// import DeleteOneCustomerPage from 'src/components/users/customers/DeleteOneCustomerPage.vue'

const name = 'PropertyPages'

const tab = ref('create_a_property')

const useStore = useAdminStore()

const $router = useRouter()

var token = useStore.getToken

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

</script>

<style lang="sass" scoped>
</style>
