<template>
  <!-- <div class="text-black text-h4">Login</div> -->
  <div class="">
    <div class="row window-height window-width">
      <!-- <div class="col gt-sm">
        <q-img alt="login image" src="~assets/login-img.png" class="fit">
          <div class="absolute-top bg-transparent">
            <q-item-section>
              <q-img class="" alt="Propfunds.ng Logo" src="~assets/PropfundsNG.png"
                style="max-width: 200px; max-height: 150px" />
            </q-item-section>
          </div>
        </q-img>
      </div> -->
      <div class="col">
        <div class="column full-height">
          <div class="col-2 q-pb-xl q-pt-xl q-pl-md">
            <!-- <q-img class="lt-md" alt="Propfunds.ng Logo" src="~assets/PropfundsNG.png" style="max-width: 200px; " /> -->
          </div>
          <div class="col-10">
            <div class="login">
              <q-card class="my-card text-white" style="max-width: 400px">
                <q-card-section>
                  <div class="text-h4 text-weight-bold q-pa-md text-primary">
                    Login
                  </div>
                  <div
                    class="text-6 q-pl-md q-pr-md q-pt-sm q-pb-sm text-primary"
                  >
                    Welcome to Landtify Admin. let’s access your accounts shall
                    we?
                  </div>
                </q-card-section>
                <q-card-section>
                  <div class="q-pa-md">
                    <q-form @submit="onSubmit" @reset="onReset" class="">
                      <q-input
                        type="email"
                        bottom-slots
                        v-model="email"
                        label="Email"
                        hint="Your email address"
                        lazy-rules
                        :rules="[
                          (val) =>
                            (val && val.length > 0) || 'Please type something',
                        ]"
                      >
                        <template v-slot:prepend>
                          <q-icon name="fa-light fa-at" />
                        </template>
                        <!-- <template v-slot:append>
                        <q-icon name="favorite" />
                      </template> -->

                        <!-- <template v-slot:hint>
                        Field hint
                      </template> -->
                      </q-input>

                      <q-input
                        type="password"
                        bottom-slots
                        v-model="password"
                        label="Password"
                        hint="Your password"
                        lazy-rules
                        :rules="[
                          (val) =>
                            (val && val.length > 0) || 'Please type something',
                        ]"
                      >
                        <template v-slot:prepend>
                          <q-icon name="lock" />
                        </template>
                        <!-- <template v-slot:append>
                        <q-icon name="favorite" />
                      </template> -->

                        <!-- <template v-slot:hint>
                        Field hint
                      </template> -->
                      </q-input>

                      <!-- <q-toggle class="text-primary" v-model="accept" label="I accept the license and terms" /> -->

                      <div class="q-pt-md">
                        <q-btn
                          :loading="loadingLogin"
                          class="full-width"
                          label="Submit"
                          type="submit"
                          color="primary"
                        />
                        <!-- <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" /> -->
                      </div>
                    </q-form>
                    <!-- <div class="text-right q-pa-sm">
                      <q-btn class="text-primary" @click="resetPassword = true" no-caps flat dense>
                        Reset Password
                      </q-btn>

                    </div>
                    <div class="text-primary q-pa-sm text-center">
                      Don't have an account yet?
                      <router-link class="text-primary" to="/signup" style="text-decoration: none">
                        Sign up
                      </router-link>

                    </div> -->
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
          <div>
            <q-dialog v-model="resetPassword">
              <q-card>
                <q-card-section class="row items-center q-pb-none">
                  <div class="text-h6">Reset your password</div>
                  <q-space />
                  <q-btn icon="close" flat round dense v-close-popup />
                </q-card-section>
                <!-- <q-card-section>
                <q-uploader style="max-width: 300px" url="http://localhost:4444/upload" label="" accept=".jpg, image/*"
                  @rejected="onRejected" />
              </q-card-section> -->
                <q-card-section>
                  <q-form @submit.prevent="postReset">
                    <div class="row text-center">
                      <div class="col-12">
                        <q-input
                          type="email"
                          bottom-slots
                          v-model="resetEmail"
                          label="Email"
                          hint="Your email address"
                          lazy-rules
                          :rules="[
                            (val) =>
                              (val && val.length > 0) ||
                              'Please type something',
                          ]"
                        >
                          <template v-slot:prepend>
                            <q-icon name="fa-light fa-at" />
                          </template>
                        </q-input>
                      </div>
                      <div class="col-12 q-mt-md">
                        <q-btn class="bg-primary text-white" type="submit"
                          >Submit</q-btn
                        >
                      </div>
                    </div>
                  </q-form>
                </q-card-section>
              </q-card>
            </q-dialog>
          </div>
        </div>
        <!-- </q-img> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref, computed } from "vue";
import { axios, api, base } from "boot/axios";
import { useRouter } from "vue-router";
import { useAdminStore } from "../stores/user-store";
import jwtDecode from "jwt-decode";
// import { useStore } from 'vuex'
// import store from '../store/index.js'
// import { createLogger, mapMutations } from "pinia";
// import { useAuthStore } from '../stores/AuthStore'
// import { mapActions, mapState } from 'pinia'

name: "LoginPage";
const $q = useQuasar();
const useStore = useAdminStore();

const email = ref("");
const password = ref("");
const loadingLogin = ref(false);
const resetPassword = ref(false);

// mapMutations({
//   setLoggedUser: "auth/setLoggedUser",
// })
const itemsLength = computed(() => {
  return mapState(useAuthStore, ["authUser"]);
});

const $router = useRouter();
const onSubmit = async () => {
  loadingLogin.value = true;
  // Get the token/cookie
  // await useStore.getSanctumCookie()
  // login admin
  const admin = await useStore.login(email.value, password.value);
  // console.log(admin.data, "admin");
  const token = admin.data.token;
  // const secret = 'yourSecret';

  // Decode the token
  const decoded = jwtDecode(token);

  // Access the values in the token
  // console.log(decoded, "decoded");
  // set admin data to localstorage()
  useStore.setAdmin(decoded);
  useStore.setToken(admin.data);
  // useStore.setUser(admin.data)
  // routing to the dashboard
  if (useStore.getAdmintype == "$LandtifySuperAdmin") {
    $router.replace("/dashboard");
    $q.notify({
      color: "green-4",
      textColor: "white",
      icon: "thumb_up",
      message: "Welcome to your Dashboard",
    });
  } else {
    $q.notify({
      color: "negative",
      textColor: "white",
      icon: "thumb_down",
      message:
        "You don't have Permissions to view this page, this page can only be viewed by an admin user",
    });
  }
  loadingLogin.value = false;
};

const resetEmail = ref("");
const resetResponds = ref(null);

const postReset = () => {
  // console.log(this.resetEmail, "reset Email");
  const formData = {
    email: resetEmail.value,
  };
  axios
    .post(`${base}/auth/password/reset/`, formData)
    .then((response) => {
      resetResponds.value = response.data;
      console.log(resetResponds.value, "resetResponds");
      $q.notify({
        color: "green-4",
        textColor: "white",
        icon: "thumb_up",
        message: "Password reset e-mail has been sent.",
      });
      resetPassword.value = false;
    })
    .catch((error) => {
      // console.log(error);
      $q.notify({
        color: "negative",
        textColor: "white",
        icon: "report_problem",
        message: "Please refresh",
      });
    });
};

const onReset = () => {
  email.value = null;
  password.value = null;
};
</script>

<style lang="sass" scoped>
.login
  display: flex
  align-items: center
  justify-content: center
</style>
<!-- .my-card
  width: 100%
  max-width: 250px -->
