import { defineStore } from 'pinia';
import { api, base, axios } from 'src/boot/axios';
import jwtDecode from 'jwt-decode';

export const useAdminStore = defineStore('admin', {
  state: () => ({
    admintype: null,
    firstname: null,
    lastname: null,
    email: null,
    token: null,
    adminid: null,
    phone: null,
    picture: null,
    admin_details: null
  }),
  // persist: true, // Note that we are using a persisted state here
  getters: {
    getAdmintype: (state) => state.admintype,
    getFirstname: (state) => state.firstname,
    getLastname: (state) => state.lastname,
    getEmail: (state) => state.email,
    getToken: (state) => state.token,
    getAdminId: (state) => state.adminid,
    getPhoneNumber: (state) => state.phone,
    getPicture: (state) => state.picture,
    getAdminDetails: (state) => state.admin_details
  },
  actions: {
    // async getSanctumCookie() {
    //   try {
    //     await api.get('sanctum/csrf-cookie')
    //   } catch (error) {
    //     if (error) throw error
    //   }
    // },

    async login(email, password) {
      try {
        // return await axios.post('/users/login/', { email, password })
        return await api.post('/admin/login/', { email, password })
      } catch (error) {
        if (error) throw error
      }
    },

    async fetchAdmin() {
      try {
        return await api.get('api/admin')
      } catch (error) {
        if (error) throw error
      }
    },

    setAdmin(payload) {
      if(payload.admintype) this.admintype = payload.admintype;
      if(payload.firstname) this.firstname = payload.firstname;
      if(payload.lastname) this.lastname = payload.lastname;
      if(payload.email) this.email = payload.email;
      if(payload.adminid) this.adminid = payload.adminid;
      if (payload.phone) this.phone = payload.phone;
      if (payload.picture) this.picture = payload.picture;
      if (payload.admin_details) this.admin_details = payload.admin_details;
    },

    setToken(payload) {
      if(payload.token) this.token = payload.token;
    },

    clearAdmin(){
      this.admintype = null,
      this.firstname = null,
      this.lastname = null,
      this.email = null,
      this.token = null,
      this.adminid = null,
      this.phone = null,
      this.picture = null,
      this.admin_details = null
    },

    checkToken() {
      // if (!this.token) {
        // const decodedToken = JSON.parse(atob(this.token.split('.')[1]));
        // const expirationTime = decodedToken.exp * 1000;
        // return Date.now() > expirationTime;
      const decodedToken = jwtDecode(this.token);
      const expirationTime = decodedToken.exp * 1000;
      return Date.now() > expirationTime;
        // this.logout()
      // }
    },

    logout() {
      // Clear token and redirect to login page
      clearAdmin()
      this.token = null
      router.push('/')
    },
  },
  persist: true,
});
// function isTokenExpired(token) {
//   const decodedToken = JSON.parse(atob(token.split('.')[1]));
//   const expirationTime = decodedToken.exp * 1000;
//   return Date.now() > expirationTime;
// }
