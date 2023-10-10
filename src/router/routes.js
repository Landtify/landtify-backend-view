
const routes = [
  {
    path: '/',
    component: () => import('pages/LoginPage.vue'),
  },
  {
    path: '/dashboard',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue'), meta: { requireLogin: true } },
      // { path: '/properties', component: () => import('pages/PropertyPages.vue'), meta: { requireLogin: true } },
      { path: '/profile', component: () => import('pages/ProfilePage.vue'), meta: { requireLogin: true } },
      { path: '/all-users', component: () => import('pages/UsersPages.vue'), meta: { requireLogin: true } },
      { path: '/ads', component: () => import('pages/AdsPage.vue'), meta: { requireLogin: true } },
      { path: '/contactus-message', component: () => import('pages/ContactUsMessagePage.vue'), meta: { requireLogin: true } },
      { path: '/lands', component: () => import('pages/LandsPage.vue'), meta: { requireLogin: true } },
      { path: '/create-lands', component: () => import('pages/CreateLandPage.vue'), meta: { requireLogin: true } },
      { path: '/user', component: () => import('components/user/NormalUserPage.vue'), meta: { requireLogin: true } },
      { path: '/realtors', component: () => import('components/user/RealtorPage.vue'), meta: { requireLogin: true } },
      { path: '/broker', component: () => import('components/user/BrokerPage.vue'), meta: { requireLogin: true } },
      { path: '/privateinvestor', component: () => import('components/user/PrivateInvestorPage.vue'), meta: { requireLogin: true } },
      { path: '/privatelender', component: () => import('components/user/PrivateLenderPage.vue'), meta: { requireLogin: true } },
      { path: '/titlecompany', component: () => import('components/user/TitleCompanyPage.vue'), meta: { requireLogin: true } },
      { path: '/mobilenotary', component: () => import('components/user/MobileNotaryPage.vue'), meta: { requireLogin: true } },
      { path: '/photographer', component: () => import('components/user/PhotographerPage.vue'), meta: { requireLogin: true } },
      { path: '/droneoperator', component: () => import('components/user/DroneOperatorPage.vue'), meta: { requireLogin: true } },
      { path: '/surveyor', component: () => import('components/user/SurveyorPage.vue'), meta: { requireLogin: true } },
      { path: '/admin', component: () => import('components/admin/AdminPage.vue'), meta: { requireLogin: true } },
      { path: '/create-ads', component: () => import('pages/CreateAdsPage.vue'), meta: { requireLogin: true } },
      { path: '/create-user', name: 'CreateUser', component: () => import('components/users/CreateUsersPage.vue'), meta: { requireLogin: true } },
      { path: '/create-admin', name: 'CreateAdmin', component: () => import('components/users/CreateAdminPage.vue'), meta: { requireLogin: true } },
      // { path: '/create-property', name: 'CreateProperty', component: () => import('components/property/CreateAPropertyPage.vue'), meta: { requireLogin: true } },
      { path: '/upload-ads', name: 'UploadAds', component: () => import('components/ads/UploadAds.vue'), meta: { requireLogin: true } },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
