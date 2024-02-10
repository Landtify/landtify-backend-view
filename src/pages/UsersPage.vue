<template>
  <q-page class="q-pa-md">
    <div class="text-black text-h4">Users</div>
    <div class="q-gutter-y-md" full-width>
      <q-card>
        <all-users-page></all-users-page>
      </q-card>

    </div>
  </q-page>
</template>

<script setup>
import { ref, watch} from 'vue'
// import {  QTabs, QTab, QTabPanels, QTabPanel } from 'quasar'
import { useAdminStore } from '../stores/user-store'
import { useRouter } from 'vue-router'
import AllUsersPage from 'src/components/users/AllUsersPage.vue'
// import AllAdminPage from 'src/components/users/AllAdminPage.vue'
// import CreateUsersPage from 'src/components/users/CreateUsersPage.vue'
// import GetOneUser from 'src/components/users/GetOneUser.vue'
// import DeleteOneUser from 'src/components/users/DeleteOneUser.vue'
// import CreatePricesPage from 'src/components/users/prices/CreatePricesPage.vue'
// import AllPricesPage from 'src/components/users/prices/AllPricesPage.vue'
// import GetOnePricePage from 'src/components/users/prices/GetOnePricePage.vue'
// import DeleteOneIntake from 'src/components/users/intakes/DeleteOneIntake.vue'
// import DeleteOneCustomerPage from 'src/components/users/customers/DeleteOneCustomerPage.vue'

const name = 'UsersPage'

// const tab = ref('see_users')

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
