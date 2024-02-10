<template>
  <q-page class="q-pa-md">
    <div class="text-black text-h4">Admin</div>
    <div class="q-gutter-y-md" full-width>
      <q-card>
        <all-admin-page></all-admin-page>
        <!-- <q-tabs v-model="tab" class="text-grey" active-color="primary" indicator-color="primary" align="left"
          narrow-indicator>
          <q-tab name="see_users" label="See all Users" />
          <q-tab name="see_admin" label="See all Admins" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="see_users">
            <all-users-page></all-users-page>
          </q-tab-panel>
          <q-tab-panel name="see_admin">
            <all-admin-page></all-admin-page>
          </q-tab-panel>
        </q-tab-panels> -->
      </q-card>

    </div>
  </q-page>
</template>

<script setup>
import { ref, watch} from 'vue'
// import {  QTabs, QTab, QTabPanels, QTabPanel } from 'quasar'
import { useAdminStore } from '../stores/user-store'
import { useRouter } from 'vue-router'
// import AllUsersPage from 'src/components/users/AllUsersPage.vue'
import AllAdminPage from 'src/components/users/AllAdminPage.vue'

const name = 'AdminPage'

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
