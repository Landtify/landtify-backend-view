<template>
  <q-page class="q-pa-md">
    <!-- <div class="text-black text-h4">All Users</div>
    <q-separator /> -->
    <div class="q-gutter-y-md" fullwidth>
      <div align="right">
        <q-btn rounded color="blue" class="q-mr-md" @click="goToCreateAdmin()"
          >Create Admin</q-btn
        >
        <q-btn rounded color="blue" @click="goToFindAdmin()"
          >Find a Admin</q-btn
        >
      </div>
      <q-table
        class="my-sticky-header-table"
        title="All Admin's"
        :rows="data"
        row-key="adminid"
        flat
        bordered
        :visible-columns="[
          'adminid',
          'firstname',
          'lastname',
          'email',
          'username',
          'admintype',
          'phone',
          'picture',
          'gender',
          'dob',
          'address',
          'city',
          'province',
          'country',
        ]"
        :filter="filter"
        :pagination="pagination"
        @request="handleTableRequest"
      >
        <template v-slot:body="props">
          <q-tr :props="props" @click="onRowClick(props.row)">
            <q-td key="adminid" :props="props">
              <q-badge color="green">
                {{ props.row.adminid }}
              </q-badge>
            </q-td>
            <q-td key="firstname" :props="props">
              {{ props.row.firstname }}
            </q-td>
            <q-td key="lastname" :props="props">
              {{ props.row.lastname }}
            </q-td>
            <q-td key="email" :props="props">
              {{ props.row.email }}
            </q-td>
            <q-td key="username" :props="props">
              {{ props.row.username }}
            </q-td>
            <q-td key="admintype" :props="props">
              <q-badge color="green">
                {{ props.row.admintype }}
              </q-badge>
            </q-td>
            <q-td key="phone" :props="props">
              {{ props.row.phone }}
            </q-td>
            <q-td key="picture" :props="props">
              <q-avatar size="40px">
                <img :src="props.row.picture" />
              </q-avatar>
            </q-td>
            <q-td key="gender" :props="props">
              {{ props.row.gender }}
            </q-td>
            <q-td key="dob" :props="props">
              {{ props.row.dob }}
            </q-td>
            <q-td key="address" :props="props">
              {{ props.row.address }}
            </q-td>
            <q-td key="city" :props="props">
              {{ props.row.city }}
            </q-td>
            <q-td key="province" :props="props">
              {{ props.row.province }}
            </q-td>
            <q-td key="country" :props="props">
              {{ props.row.country }}
            </q-td>
          </q-tr>
        </template>
        <!-- :loading="true" -->
        <template v-slot:top-right>
          <q-input
            borderless
            dense
            debounce="300"
            v-model="filter"
            placeholder="Search"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
      </q-table>

      <div class="text-right full-width q-pl-md">
        <q-btn
          v-if="pagination.page > 1"
          rounded
          color="blue"
          flat
          label="Previous Page"
          @click="handlePreviousPage"
        />
        <q-btn
          v-if="pageEnd == true"
          rounded
          color="blue"
          flat
          label="Next Page"
          @click="handleNextPage"
        />
      </div>

      <q-dialog v-model="findAdmin">
        <div class="q-pa-md row items-start q-gutter-md">
          <q-card class="my-card-3 text-primary">
            <q-card-section>
              <div class="row q-pt-sm">
                <q-form @submit="onFind" @reset="onReset" class="">
                  <div class="col-12 col-md-12 q-pl-md">
                    <q-input
                      label="Admin ID"
                      class=""
                      outlined
                      v-model="adminid"
                      hint=""
                    />
                  </div>
                  <q-separator dark />
                  <div class="col-12 q-pl-md">
                    <q-btn
                      :loading="loadingFindAnyAdmin"
                      class="bg-primary text-white"
                      type="submit"
                      >Find</q-btn
                    >
                  </div>
                </q-form>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </q-dialog>

      <q-dialog v-model="findAdmin2">
        <div class="my-card-2">
          <q-card>
            <q-img :src="viewMoreData.picture" class="my-thumbnail" />

            <q-card-section>
              <q-btn
                fab
                color="primary"
                icon="place"
                class="absolute"
                style="top: 0; right: 12px; transform: translateY(-50%)"
              />

              <div class="row no-wrap items-center">
                <div class="col text-h4 ellipsis">
                  {{ viewMoreData.firstname }} {{ viewMoreData.lastname }}
                </div>
                <div
                  class="col-auto text-grey text-caption q-pt-md row no-wrap items-center"
                >
                  <q-icon name="place" />
                  city: {{ viewMoreData.city }}
                </div>
              </div>
            </q-card-section>

            <q-card-section class="q-pt-none text-center">
              <div class="text-subtitle1">Username:</div>
              <div class="text-caption text-grey">
                @{{ viewMoreData.username }}
              </div>
            </q-card-section>

            <q-card-section class="q-pt-none text-center">
              <div class="text-subtitle1">Email:</div>
              <div class="text-caption text-grey">
                {{ viewMoreData.email }}
              </div>
            </q-card-section>

            <q-card-section class="q-pt-none text-center">
              <div class="text-subtitle1">Phone:</div>
              <div class="text-caption text-grey">
                {{ viewMoreData.phone }}
              </div>
            </q-card-section>

            <!-- <q-card-section class="q-pt-none text-center">
                  <div class="text-subtitle1">
                    Business Name:
                  </div>
                  <div class="text-caption text-grey">
                    {{ viewMoreData.businessname }}
                  </div>
                </q-card-section> -->

            <q-card-section class="q-pt-none text-center">
              <div class="text-subtitle1">Location:</div>
              <div class="text-caption text-grey">
                {{ viewMoreData.address }}, {{ viewMoreData.city }},
                {{ viewMoreData.province }}, {{ viewMoreData.country }}
              </div>
            </q-card-section>

            <q-card-section class="q-pt-none text-center">
              <div class="text-subtitle1">Gender:</div>
              <div class="text-caption text-grey">
                {{ viewMoreData.gender }}
              </div>
            </q-card-section>
            <q-card-section class="q-pt-none text-center">
              <div class="text-subtitle1">Date of Birth:</div>
              <div class="text-caption text-grey">
                {{ viewMoreData.dob }}
              </div>
            </q-card-section>
            <!-- <q-card-section class="q-pt-none text-center">
                  <div class="text-subtitle1">
                    Following:
                  </div>
                  <div class="text-caption text-grey">
                    {{ viewMoreData.following }}
                  </div>
                </q-card-section>
                <q-card-section class="q-pt-none text-center">
                  <div class="text-subtitle1">
                    Followers:
                  </div>
                  <div class="text-caption text-grey">
                    {{ viewMoreData.followers }}
                  </div>
                </q-card-section>
                  <q-card-section class="q-pt-none text-center">
                    <div class="text-subtitle1">
                      Wallet ID:
                    </div>
                    <div class="text-caption text-grey">
                      {{ viewMoreData.walleid }}
                    </div>
                  </q-card-section>
                  <q-card-section class="q-pt-none text-center">
                    <div class="text-subtitle1">
                      Wallet Amount:
                    </div>
                    <div class="text-caption text-grey">
                      {{ viewMoreData.walleamount }}
                    </div>
                  </q-card-section> -->

            <q-separator />

            <q-card-actions align="right">
              <q-btn flat v-close-popup>Cancel</q-btn>
              <q-btn
                :loading="loadingDeleteAnAdmin"
                @click="onDelete(viewMoreData.adminid)"
                color="red"
                flat
                >Delete Admin</q-btn
              >
            </q-card-actions>
          </q-card>
        </div>
      </q-dialog>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { axios, api, base } from "boot/axios";
import { copyToClipboard, useQuasar } from "quasar";
import { useAdminStore } from "../../stores/user-store";
import { useRouter } from "vue-router";
import { HttpStatusCode } from "axios";

const name = "AllUsersPage";

const loadingFindAnyAdmin = ref(false);
const loadingDeleteAnAdmin = ref(false);
const findAdmin = ref(false);
const findAdmin2 = ref(false);
const $q = useQuasar();
const data = ref([]);
const viewMoreData = ref({});
const dataDelete = ref([]);
const adminid = ref("");
const filter = ref("");
const pageEnd = ref(false);
const useStore = useAdminStore();
const $router = useRouter();
const selectedCustomer = reactive([]);
const selectedCustomerPopup1 = ref({});
const selectedCustomerPopup2 = ref({});

const goToCreateAdmin = () => {
  $router.push({ name: "CreateAdmin" });
};

const goToFindAdmin = () => {
  // $router.push({ name: 'FindUser' })
  findAdmin.value = true;
};

function formatDate(date) {
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

function copyTo(ID) {
  copyToClipboard(ID)
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

function popup1(selectedCustomer) {
  fixed1.value = true;
  console.log(selectedCustomer, "selectedCustomer");
  selectedCustomerPopup1.value = selectedCustomer;
  console.log(selectedCustomerPopup1.value, "selectedCustomerpopup1 value");
}

const pagination = ref({
  sortBy: "adminid", // Set default sort field
  descending: false,
  page: 1,
  rowsPerPage: 10,
});

const loadData = (pageNumber) => {
  const token = useStore.getToken;
  // console.log(token, "token");
  axios
    .get(
      `${base}/admin/serve/admin/all/${pageNumber}`,
      // api.get(`/admin/serve/admin/all/${page.value}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((response) => {
      // if (HttpStatusCode.Unauthorized) {
      //   $router.push('/');
      // } else {
      data.value = response.data.data.reverse();
      console.log(response.data);
      pageEnd.value = response.data.has_next == true ? true : false;
      console.log(data.value, "yello!");
      // }
    })
    .catch(() => {
      // if (HttpStatusCode.Unauthorized) {
      //   $router.push('/');
      //   $router.go();
      // }
      $q.notify({
        color: "negative",
        position: "bottom",
        message: "Users not found",
        icon: "report_problem",
      });
    });
};

const handleTableRequest = (params) => {
  pagination.value = { ...params.pagination, rowsPerPage: 10 }; // Ensure rowsPerPage is 10
  fetchData(pagination.value.page);
};

const handlePreviousPage = () => {
  if (pagination.value.page > 1) {
    pagination.value.page--;
    loadData(pagination.value.page);
  }
};

const handleNextPage = () => {
  if (pageEnd.value == true) {
    pagination.value.page++;
    loadData(pagination.value.page);
  }
};

const onRowClick = (row) => {
  findAdmin2.value = true;
  viewMoreData.value = row;
};

const onFind = () => {
  loadingFindAnyAdmin.value = true;
  const token = useStore.getToken;

  axios
    .get(`${base}/admin/serve/${adminid.value}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      viewMoreData.value = response.data.data;
      // console.log(find.value)

      findAdmin.value = false;
      findAdmin2.value = true;
      $q.notify({
        color: "green-4",
        textColor: "white",
        icon: "thumb_up",
        message: "User Found",
      });
      // if (find.value.ID != null) {
      //   fixed0.value = true;
      // } else {
      //   fixed0.value = false;
      // }
    })
    .catch(() => {
      // if (HttpStatusCode.Unauthorized) {
      //   $router.push('/');
      //   $router.go();
      // }
      $q.notify({
        color: "negative",
        position: "bottom",
        message: "User not found",
        icon: "report_problem",
      });
    });
  loadingFindAnyAdmin.value = false;
};

const onReset = () => {
  adminid.value = null;
};

const onDelete = (admin_id) => {
  loadingDeleteAnAdmin.value = true;
  const token = useStore.getToken;

  axios
    .delete(`${base}/admin/serve/admin/${admin_id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      dataDelete.value = response.data;
      console.log(dataDelete.value);
      $q.notify({
        color: "green-4",
        textColor: "white",
        icon: "thumb_up",
        message: dataDelete.value.message,
      });
      // message: 'User Deleted'
      findAdmin2.value = false;
      $router.go();
      // fixed0.value = true;
    })
    .catch(() => {
      // if (HttpStatusCode.Unauthorized) {
      //   $router.push('/');
      //   $router.go();
      // }
      $q.notify({
        color: "negative",
        position: "bottom",
        message: "User not found",
        icon: "report_problem",
      });
    });
  loadingDeleteAnAdmin.value = false;
};

onMounted(() => {
  loadData(pagination.value.page);
});
</script>

<style lang="sass" scoped>
// .my-card
//   width: 100%
//   max-width: 250px
.my-thumbnail
  height: 200px

.my-card-2
  // width: 100%
  width: 650px
  // max-width: 850px
.my-card-3
  width: 100%
  max-width: 550px
.siz
  width: 100%
  max-width: 250px
  height: 100%
.siz1
  width: 250px
  max-width: 250px
  height: 150px
  margin-top: -8px
.bgPropfunds
  background-color: $landtify
select
  margin-top: 10px
  margin-right: 10px
  padding: 15px 10px
  background: rgba(196, 196, 196, 0.1)
  border: 2px solid grey
  border-radius: 4px
  outline: none
  width: 540px
.btn2
  border: none
  border-radius: 3px
  font-weight: 500
  font-size: 18px
  height: 40px
  margin-right: 10px
  background-color: #001951
  color: white
  cursor: pointer
.is-s
  background-color: #001951
  color: white
</style>
