<template>
  <q-page class="q-pa-md">
    <div class="text-black text-h4">Users Inquiry Messages</div>
    <q-separator />
    <div class="q-gutter-y-md q-pt-md" full-width>
      <q-card v-if="data.length == 0" class="my-card text-center">
        <q-card-section> There is no Contact Us Message yet. </q-card-section>
      </q-card>
      <div v-else>
        <q-card class="my-card" v-for="(da, index) in data" :key="index">
          <q-card-section horizontal>
            <q-card-section class="q-pt-xs col-8">
              <div class="text-overline">
                <div v-if="da.replied">
                  <q-icon color="green" name="verified" />
                  Replied
                </div>
                <div v-else color="yellow">
                  <q-icon color="red" name="cancel_schedule_send" />
                  Yet to reply
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <div class="text-h5 q-mt-sm q-mb-xs">Message</div>
                  <div class="text-caption text-grey">
                    {{ da.message }}
                  </div>
                </div>
                <div class="col-6">
                  <div v-show="da.repliedmessage != '' || null">
                    <div class="text-h5 q-mt-sm q-mb-xs">Reply</div>
                    <div class="text-caption text-grey">
                      {{ da.repliedmessage }}
                    </div>
                  </div>
                </div>
              </div>
            </q-card-section>

            <q-list class="col-2">
              <q-item>
                <q-item-section avatar>
                  <q-icon color="primary" name="badge" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>Name</q-item-label>
                  <q-item-label caption
                    >{{ da.lastname }} {{ da.firstname }}</q-item-label
                  >
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  <q-icon color="primary" name="email" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>Email</q-item-label>
                  <q-item-label caption>{{ da.email }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  <q-icon color="primary" name="phone" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>Phone</q-item-label>
                  <q-item-label caption>{{ da.phone }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>

            <q-card-actions vertical class="justify-around col-2">
              <q-btn
                flat
                color="red"
                icon="content_copy"
                @click="copyTo(da.email)"
              >
                Copy Email</q-btn
              >
              <q-btn
                v-if="!da.replied"
                flat
                color="accent"
                icon="reply"
                @click="replyUser()"
                >Reply User</q-btn
              >
            </q-card-actions>

            <q-dialog v-model="replyUser_">
              <q-card class="">
                <q-card-section horizontal>
                  <q-card-section class="q-pt-xs">
                    <div class="row q-pt-sm">
                      <q-form
                        @submit="onReplied(da.contactid)"
                        @reset="onReset"
                        class=""
                      >
                        <div class="q-pa-md">
                          <q-input
                            v-model="repliedmessage"
                            filled
                            type="textarea"
                            hint="Enter your message"
                          />
                          <!-- class="fit" -->
                        </div>
                        <q-separator dark />
                        <div class="col-12 q-pl-md">
                          <q-btn
                            align="right"
                            :loading="loadingReply"
                            class="bg-primary text-white"
                            type="submit"
                            >Send</q-btn
                          >
                        </div>
                      </q-form>
                    </div>
                  </q-card-section>

                  <!-- <q-card-actions vertical class="justify-around col-2">
                    <q-btn v-if="!da.replied" flat round color="accent" icon="reply" @click="onReplied(da.contactid)">Replied?</q-btn>
                  </q-card-actions> -->
                </q-card-section>
              </q-card>
            </q-dialog>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { axios, api, base } from "boot/axios";
import { copyToClipboard, useQuasar } from "quasar";
import { useAdminStore } from "../stores/user-store";
import { useRouter } from "vue-router";

const name = "ContactUsMessagePage";

const data = ref([]);
const replied = ref([]);
const repliedmessage = ref("");
const loadingReply = ref(false);
const replyUser_ = ref(false);
const page = ref("1");
const useStore = useAdminStore();
const $q = useQuasar();
const $router = useRouter();
var token = useStore.getToken;
var adminid = useStore.adminid;

function copyTo(Email) {
  copyToClipboard(Email)
    .then(() => {
      // success!
      $q.notify({
        color: "green-4",
        position: "bottom",
        message: "Username copied to Clipboard",
        icon: "thumb_up",
      });
    })
    .catch(() => {
      // fail
      $q.notify({
        color: "negative",
        position: "bottom",
        message: "Please refresh page",
        icon: "report_problem",
      });
    });
}

const loadData = () => {
  // const token = useStore.getToken
  console.log(token, "token");
  api
    .get(`/contactus/all/${page.value}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      data.value = response.data.data.reverse();
      console.log(data.value, "contact us message!");
    })
    .catch(() => {
      // if (HttpStatusCode.Unauthorized) {
      //   $router.push('/');
      //   $router.go();
      // }
      $q.notify({
        color: "negative",
        position: "bottom",
        message: "Messages not found",
        icon: "report_problem",
      });
    });
};

const replyUser = () => {
  replyUser_.value = true;
};

const onReplied = (contactid) => {
  // const token = useStore.getToken
  loadingReply.value = true;
  console.log(token);
  const formData = {
    repliedbyid: adminid,
    repliedmessage: repliedmessage.value,
  };

  api
    .patch(`${base}/admin/serve/contactus/reply/${contactid}`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      replied.value = response.data.data;
      console.log(replied.value);
      $q.notify({
        color: "green-4",
        textColor: "white",
        icon: "thumb_up",
        message: "Replied successful",
      });
      window.location.reload();
    })
    .catch(() => {
      $q.notify({
        color: "negative",
        position: "bottom",
        message: "Action not complete",
        icon: "report_problem",
      });
      window.location.reload();
    });

  loadingReply.value = false;
  replyUser_.value = false;
};

watch(() => {
  var decoded = useStore.checkToken(token);
  console.log(decoded);
  console.log("decoded");
  if (decoded == true) {
    useStore.clearAdmin();
    // useStore.logout();
    $router.replace("/");
    $router.go();
  }
});

const onReset = () => {
  repliedmessage.value = null;
};

onMounted(() => {
  loadData();
});
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  // max-width: 350px
</style>
