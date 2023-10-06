<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Landtify Backend
        </q-toolbar-title>

        <div>landify v0.1</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Menu
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Ads',
    // caption: 'quasar.dev',
    icon: 'school',
    link: '/ads'
  },
  // {
  //   title: 'Github',
  //   // caption: 'github.com/quasarframework',
  //   icon: 'code',
  //   link: 'https://github.com/quasarframework'
  // },
  // {
  //   title: 'Discord Chat Channel',
  //   // caption: 'chat.quasar.dev',
  //   icon: 'chat',
  //   link: 'https://chat.quasar.dev'
  // },
  {
    title: 'Lands',
    // caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: '/lands'
  },
  // {
  //   title: 'Property',
  //   // caption: '@quasarframework',
  //   icon: 'rss_feed',
  //   link: '/properties'
  // },
  {
    title: 'All Users & Admins',
    // caption: '@QuasarFramework',
    icon: 'public',
    link: '/all-users'
  },
  {
    title: 'User',
    // caption: '@QuasarFramework',
    icon: 'public',
    link: '/user'
  },
  {
    title: 'Realtors',
    // caption: '@QuasarFramework',
    icon: 'public',
    link: '/realtors'
  },
  {
    title: 'Private Investor',
    // caption: '@QuasarFramework',
    icon: 'public',
    link: '/privateinvestor'
  },
  {
    title: 'Broker',
    // caption: '@QuasarFramework',
    icon: 'public',
    link: '/broker'
  },
  {
    title: 'Private Lender',
    // caption: '@QuasarFramework',
    icon: 'public',
    link: '/privatelender'
  },
  {
    title: 'Title Company',
    // caption: '@QuasarFramework',
    icon: 'public',
    link: '/titlecompany'
  },
  {
    title: 'Mobile Notary',
    // caption: '@QuasarFramework',
    icon: 'public',
    link: '/mobilenotary'
  },
  {
    title: 'Photographer',
    // caption: '@QuasarFramework',
    icon: 'public',
    link: '/photographer'
  },
  {
    title: 'Drone Operator',
    // caption: '@QuasarFramework',
    icon: 'public',
    link: '/droneoperator'
  },
  {
    title: 'Surveyor',
    // caption: '@QuasarFramework',
    icon: 'public',
    link: '/surveyor'
  },
  {
    title: 'Admin',
    // caption: '@QuasarFramework',
    icon: 'public',
    link: '/admin'
  },
  {
    title: 'User Questions',
    // caption: 'Community Quasar projects',
    icon: 'record_voice_over',
    link: '/contactus-message'
  },
  {
    title: 'My Info',
    // caption: 'Community Quasar projects',
    icon: 'favorite',
    link: '/profile'
  },
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
