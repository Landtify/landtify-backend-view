<!-- <template>
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
  {
    title: 'Lands',
    // caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: '/lands'
  },
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
</script> -->



<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-header elevated class="bg-white text-grey-8 q-py-xs" height-hint="58">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="toggleLeftDrawer"
          aria-label="Menu"
          icon="menu"
        />

        <q-btn flat no-caps no-wrap class="q-ml-xs" v-if="$q.screen.gt.xs">
          <!-- <q-icon :name="fabYoutube" color="red" size="28px" /> -->
          <q-avatar>
            <q-img src="../assets/landtify_logo.png"  />
          </q-avatar>
          <q-toolbar-title shrink class="text-weight-bold">
            Landtify
          </q-toolbar-title>
        </q-btn>

        <q-space />

        <!-- <div class="YL__toolbar-input-container row no-wrap">
          <q-input dense outlined square v-model="search" placeholder="Search" class="bg-white col" />
          <q-btn class="YL__toolbar-input-btn" color="grey-3" text-color="grey-8" icon="search" unelevated />
        </div> -->

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <!-- <q-btn round dense flat color="grey-8" icon="video_call" v-if="$q.screen.gt.sm">
            <q-tooltip>Create a video or post</q-tooltip>
          </q-btn>
          <q-btn round dense flat color="grey-8" icon="apps" v-if="$q.screen.gt.sm">
            <q-tooltip>Apps</q-tooltip>
          </q-btn> -->
          <q-btn round dense flat color="grey-8" icon="logout" @click="logOut">
            <q-tooltip>Logout</q-tooltip>
          </q-btn>
          <!-- <q-btn round dense flat color="grey-8" icon="notifications">
            <q-badge color="red" text-color="white" floating>
              2
            </q-badge>
            <q-tooltip>Notifications</q-tooltip>
          </q-btn> -->
          <q-btn round flat to="/profile" >
            <q-avatar size="26px" >
              <img :src="picture">
              <!-- <img src="https://cdn.quasar.dev/img/boy-avatar.png"> -->
            </q-avatar>
            <q-tooltip>Account</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-2"
      :width="240"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item v-for="link in links1" :key="link.text" v-ripple clickable :to="link.link">
            <q-item-section avatar>
              <q-icon color="grey" :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-my-md" />

          <q-item v-for="link in links2" :key="link.text" v-ripple clickable :to="link.link">
            <q-item-section avatar>
              <q-icon color="grey" :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-mt-md q-mb-xs" />

          <q-item-label header class="text-weight-bold text-uppercase">
            More of Users
          </q-item-label>

          <q-item v-for="link in links3" :key="link.text" v-ripple clickable :to="link.link">
            <q-item-section avatar>
              <q-icon color="grey" :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <!-- <q-separator class="q-my-md" />

          <q-item v-for="link in links4" :key="link.text" v-ripple clickable>
            <q-item-section avatar>
              <q-icon color="grey" :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item> -->

          <q-separator class="q-mt-md q-mb-lg" />

          <div class="q-px-md text-grey-9">
            <div class="row items-center q-gutter-x-sm q-gutter-y-xs">
              <a
                v-for="button in buttons1"
                :key="button.text"
                class="YL__drawer-footer-link"
                href="javascript:void(0)"
              >
                {{ button.text }}
              </a>
            </div>
          </div>
          <div class="q-py-md q-px-md text-grey-9">
            <div class="row items-center q-gutter-x-sm q-gutter-y-xs">
              <a
                v-for="button in buttons2"
                :key="button.text"
                class="YL__drawer-footer-link"
                href="javascript:void(0)"
              >
                {{ button.text }}
              </a>
            </div>
          </div>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { onMounted, ref } from 'vue'
import { fabYoutube } from '@quasar/extras/fontawesome-v6'
import { useQuasar } from 'quasar'
import { useAdminStore } from '../stores/user-store'
import { useRouter } from 'vue-router'

export default {
  name: 'MyLayout',

  setup () {
    const leftDrawerOpen = ref(false)
    const search = ref('')
    const picture = ref('')
    const useStore = useAdminStore()
    // const $q = useQuasar()
    const $router = useRouter()

    function toggleLeftDrawer () {
      leftDrawerOpen.value = !leftDrawerOpen.value
    }

    function logOut () {
      $router.replace('/')
      // useStore.clearAdmin;
      useStore.logOut();
    }

    onMounted(() => {

      picture.value = useStore.getPicture;
    });

    return {
      fabYoutube,

      leftDrawerOpen,
      search,
      logOut,
      picture,
      toggleLeftDrawer,

      links1: [
        { icon: 'home', text: 'Dashboard', link: '/dashboard' },
        { icon: 'whatshot', text: 'Lands', link: '/lands' },
        { icon: 'chat', text: 'Chats', link: '/chats' },
        { icon: 'subscriptions', text: 'Ads', link: '/ads' },
        { icon: 'record_voice_over', text: 'User Questions', link: '/contactus-message' }
      ],
      links2: [
        { icon: 'folder', text: 'All Users', link: '/all-users' },
        { icon: 'folder', text: 'All Admin', link: '/all-admin' },
        // { icon: 'restore', text: 'My Info', link: '/profile' },
        // { icon: fabYoutube, text: 'Admin', link: '/admin' },
      ],
      links3: [
        { icon: fabYoutube, text: 'Direct Buyer', link: '/direct-buyer' },
        { icon: fabYoutube, text: 'Direct Seller', link: '/direct-seller' },
        { icon: 'local_movies', text: 'Realtors', link: '/realtors' },
        { icon: 'videogame_asset', text: 'Private Investor', link: '/privateinvestor' },
        { icon: 'live_tv', text: 'Broker', link: '/broker' },
        { icon: 'watch_later', text: 'Private Lender', link: '/privatelender' },
        { icon: 'thumb_up_alt', text: 'Title Company', link: '/titlecompany' },
        { icon: 'settings', text: 'Mobile Notary', link: '/mobilenotary'  },
        { icon: 'flag', text: 'Photographer', link: '/photographer'  },
        { icon: 'help', text: 'Drone Operator', link: '/droneoperator'  },
        { icon: 'feedback', text: 'Surveyor', link: '/surveyor'  },
      ],
      links4: [
      ],
      buttons1: [
        { text: 'About' },
        { text: 'Press' },
        { text: 'Copyright' },
        { text: 'Contact us' },
        { text: 'Creators' },
        { text: 'Advertise' },
        { text: 'Developers' }
      ],
      buttons2: [
        { text: 'Terms' },
        { text: 'Privacy' },
        { text: 'Policy & Safety' },
        { text: 'Test new features' }
      ]
    }
  }
}
</script>

<style lang="sass">
.YL

  &__toolbar-input-container
    min-width: 100px
    width: 55%

  &__toolbar-input-btn
    border-radius: 0
    border-style: solid
    border-width: 1px 1px 1px 0
    border-color: rgba(0,0,0,.24)
    max-width: 60px
    width: 100%

  &__drawer-footer-link
    color: inherit
    text-decoration: none
    font-weight: 500
    font-size: .75rem

    &:hover
      color: #000
</style>
