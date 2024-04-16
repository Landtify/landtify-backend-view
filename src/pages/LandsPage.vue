<template>
  <q-page class="q-pa-md">
    <div class="text-black text-h4">Lands</div>
    <q-separator />
    <div class="q-gutter-y-md q-pt-md" full-width>
      <div align="right">
        <q-btn
          :loading="loadingCreateLand"
          color="blue"
          class="q-mr-md"
          to="/create-lands"
          >Post Land</q-btn
        >
        <q-btn :loading="loadingFindLand" color="blue" @click="goToFindLand()"
          >Find a Land</q-btn
        >
      </div>
      <q-card v-if="data.length == 0" class="my-card text-center">
        <q-card-section> There is no PROPERTY available yet. </q-card-section>
      </q-card>
      <q-card v-else>
        <q-tabs
          v-model="tab"
          dense
          class="text-black"
          active-color="primary"
          indicator-color="primary"
          align="left"
        >
          <q-tab name="approved" label="Approved" />
          <q-tab name="not-approved" label="Not-Approved" />
        </q-tabs>

        <q-tab-panels v-model="tab" animated class="">
          <q-tab-panel name="approved" class="q-gutter-y-md">
            <q-card v-if="approvedData.length == 0" class="my-card text-center">
              <q-card-section>
                There is no <strong>APPROVED PROPERTY</strong> available yet.
              </q-card-section>
            </q-card>
            <div v-else>
              <q-card
                class="my-land"
                v-for="(da, index) in approvedData"
                :key="index"
              >
                <q-card-section horizontal>
                  <q-img
                    :src="da.thumbnail"
                    class="col-5 my-thumbnail"
                    fit="cover"
                  >
                    <div class="absolute-bottom text-subtitle2 text-center">
                      {{ da.title == null ? "N/A" : da.title }}, [{{
                        da.landtag == null ? "N/A" : da.landtag
                      }}]
                    </div>
                  </q-img>
                  <!-- </q-card-section>
                <q-card-section horizontal> -->
                  <q-card-section class="q-pt-xs col-5">
                    <div class="text-overline">
                      <div v-if="da.approved">
                        <q-icon color="green" name="verified" />
                        Approved
                      </div>
                      <div v-else color="yellow">
                        <q-icon color="red" name="cancel_schedule_send" />
                        Awaiting Approval
                      </div>
                    </div>
                    <q-separator />
                    <div class="text-h5 q-mt-sm q-mb-xs">Land Type</div>
                    <div class="text-caption text-grey">
                      {{ da.landtype == null ? "N/A" : da.landtype }}
                    </div>
                    <q-separator />
                    <div class="text-h5 q-mt-sm q-mb-xs">
                      City, State & Country
                    </div>
                    <div class="text-caption text-grey">
                      {{ da.city == null ? "N/A" : da.city }},
                      {{ da.province == null ? "N/A" : da.province }},
                      {{ da.country == null ? "N/A" : da.country }}
                    </div>
                    <q-separator />
                    <div class="text-h5 q-mt-sm q-mb-xs">Details</div>
                    <div class="text-caption text-grey ellipsis-3-lines">
                      {{ da.details == null ? "N/A" : da.details }}
                    </div>
                  </q-card-section>

                  <q-list class="col-2">
                    <q-item>
                      <q-item-section avatar>
                        <q-icon color="primary" name="pin_drop" />
                      </q-item-section>

                      <q-item-section>
                        <q-item-label>Acreage (Size)</q-item-label>
                        <q-item-label caption>{{
                          da.acreage == null ? "N/A" : da.acreage
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section avatar>
                        <q-icon color="primary" name="explore" />
                      </q-item-section>

                      <q-item-section>
                        <q-item-label>Center GPS</q-item-label>
                        <q-item-label caption>{{
                          da.centergps == null ? "N/A" : da.centergps
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section avatar>
                        <q-icon color="primary" name="explore" />
                      </q-item-section>

                      <q-item-section>
                        <q-item-label>Corner GPS</q-item-label>
                        <q-item-label caption>{{
                          da.cornergps == null ? "N/A" : da.cornergps
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card-section>
                <q-separator />
                <q-card-actions class="justify-around col-2">
                  <q-btn
                    flat
                    color="blue"
                    icon="content_copy"
                    @click="viewMore(da)"
                    >View More...</q-btn
                  >
                  <q-btn
                    v-if="!da.approved"
                    flat
                    color="accent"
                    icon="check_circle_outline"
                    @click="onApproved(da.landid)"
                    >Approve</q-btn
                  >
                  <q-btn
                    v-else
                    flat
                    color="red"
                    icon="cancel"
                    @click="onUnApproved(da.landid)"
                    >Un-approve</q-btn
                  >
                </q-card-actions>
              </q-card>
            </div>
          </q-tab-panel>

          <q-tab-panel name="not-approved" class="q-gutter-y-md">
            <q-card
              v-if="notApprovedData.length == 0"
              class="my-card text-center"
            >
              <q-card-section>
                There is no <strong>UN-APPROVED PROPERTY</strong> available yet.
              </q-card-section>
            </q-card>
            <div v-else>
              <q-card
                class="my-land"
                v-for="(nda, index) in notApprovedData"
                :key="index"
              >
                <q-card-section horizontal>
                  <q-img
                    :src="nda.thumbnail"
                    class="col-5 my-thumbnail"
                    fit="cover"
                  >
                    <div class="absolute-bottom text-subtitle2 text-center">
                      {{ nda.title == null ? "N/A" : nda.title }}, [{{
                        nda.landtag == null ? "N/A" : nda.landtag
                      }}]
                    </div>
                  </q-img>
                  <!-- </q-card-section>
                <q-card-section horizontal> -->
                  <q-card-section class="q-pt-xs col-5">
                    <div class="text-overline">
                      <div v-if="nda.approved">
                        <q-icon color="green" name="verified" />
                        Approved
                      </div>
                      <div v-else color="yellow">
                        <q-icon color="red" name="cancel_schedule_send" />
                        Awaiting Approval
                      </div>
                    </div>
                    <q-separator />
                    <div class="text-h5 q-mt-sm q-mb-xs">Land Type</div>
                    <div class="text-caption text-grey">
                      {{ nda.landtype == null ? "N/A" : nda.landtype }}
                    </div>
                    <q-separator />
                    <div class="text-h5 q-mt-sm q-mb-xs">
                      City, State & Country
                    </div>
                    <div class="text-caption text-grey">
                      {{ nda.city == null ? "N/A" : nda.city }},
                      {{ nda.province == null ? "N/A" : nda.province }},
                      {{ nda.country == null ? "N/A" : nda.country }}
                    </div>
                    <q-separator />
                    <div class="text-h5 q-mt-sm q-mb-xs">Details</div>
                    <div class="text-caption text-grey ellipsis-3-lines">
                      {{ nda.details == null ? "N/A" : nda.details }}
                    </div>
                  </q-card-section>

                  <q-list class="col-2">
                    <q-item>
                      <q-item-section avatar>
                        <q-icon color="primary" name="pin_drop" />
                      </q-item-section>

                      <q-item-section>
                        <q-item-label>Acreage (Size)</q-item-label>
                        <q-item-label caption>{{
                          nda.acreage == null ? "N/A" : nda.acreage
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section avatar>
                        <q-icon color="primary" name="explore" />
                      </q-item-section>

                      <q-item-section>
                        <q-item-label>Center GPS</q-item-label>
                        <q-item-label caption>{{
                          nda.centergps == null ? "N/A" : nda.centergps
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section avatar>
                        <q-icon color="primary" name="explore" />
                      </q-item-section>

                      <q-item-section>
                        <q-item-label>Corner GPS</q-item-label>
                        <q-item-label caption>{{
                          nda.cornergps == null ? "N/A" : nda.cornergps
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card-section>
                <q-separator />
                <q-card-actions class="justify-around col-2">
                  <q-btn
                    flat
                    color="blue"
                    icon="content_copy"
                    @click="viewMore(nda)"
                    >View More...</q-btn
                  >
                  <q-btn
                    v-if="!nda.approved"
                    flat
                    color="accent"
                    icon="check_circle_outline"
                    @click="onApproved(nda.landid)"
                    >Approve</q-btn
                  >
                  <q-btn
                    v-else
                    flat
                    color="red"
                    icon="cancel"
                    @click="onUnApproved(nda.landid)"
                    >Un-approve</q-btn
                  >
                </q-card-actions>
              </q-card>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>

      <q-dialog v-model="findLand">
        <div class="q-pa-md row items-start q-gutter-md">
          <q-card class="my-card-2 text-primary">
            <q-card-section>
              <div class="row q-pt-sm">
                <q-form @submit="onFind" @reset="onReset" class="">
                  <div class="col-12 col-md-12 q-pl-md">
                    <q-input
                      label="Parcel ID (APN)"
                      class=""
                      outlined
                      v-model="parcelid"
                      hint=""
                    />
                  </div>
                  <q-separator dark />
                  <div class="col-12 q-pl-md full-width">
                    <q-btn
                      :loading="loadingLandFindButton"
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

      <q-dialog v-model="card">
        <q-card class="my-card">
          <q-img :src="viewMoreData.thumbnail" class="my-thumbnail" />

          <q-card-section>
            <q-btn
              fab
              color="primary"
              icon="place"
              class="absolute"
              style="top: 0; right: 12px; transform: translateY(-50%)"
            />

            <div class="row no-wrap items-center">
              <div class="col text-h6 ellipsis">
                Title:
                {{ viewMoreData.title == null ? "N/A" : viewMoreData.title }}
              </div>
              <div
                class="col-auto text-grey text-caption q-pt-md row no-wrap items-center"
              >
                <q-icon name="place" />
                Acreage (Size):
                {{
                  viewMoreData.acreage == null ? "N/A" : viewMoreData.acreage
                }}
              </div>
            </div>

            <!-- <q-rating v-model="stars" :max="5" size="32px" /> -->
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="text-subtitle1">Parcel ID [APN]:</div>
            <div class="text-caption text-grey">
              {{
                viewMoreData.parcelid == null ? "N/A" : viewMoreData.parcelid
              }}
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="text-subtitle1">Price:</div>
            <div class="text-caption text-grey">
              ${{ viewMoreData.price == null ? "N/A" : viewMoreData.price }}
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="text-subtitle1">Location:</div>
            <div class="text-caption text-grey">
              {{ viewMoreData.address == null ? "N/A" : viewMoreData.address }},
              {{ viewMoreData.city == null ? "N/A" : viewMoreData.city }},
              {{
                viewMoreData.province == null ? "N/A" : viewMoreData.province
              }},
              {{ viewMoreData.country == null ? "N/A" : viewMoreData.country }}
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="text-subtitle1">Details:</div>
            <div class="text-caption text-grey">
              {{ viewMoreData.details == null ? "N/A" : viewMoreData.details }}
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <!-- <div class="text-subtitle1">
              Price: ${{ viewMoreData.price }}
            </div> -->
            <div class="text-subtitle1">
              <table class="table-resp full-width">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Land ID</td>
                    <td>
                      {{
                        viewMoreData.landid == null
                          ? "N/A"
                          : viewMoreData.landid
                      }}
                    </td>
                  </tr>
                  <tr>
                    <td>Land Tag</td>
                    <td>
                      {{
                        viewMoreData.landtag == null
                          ? "N/A"
                          : viewMoreData.landtag
                      }}
                    </td>
                  </tr>
                  <tr>
                    <td>Land Type</td>
                    <td>
                      {{
                        viewMoreData.landtype == null
                          ? "N/A"
                          : viewMoreData.landtype
                      }}
                    </td>
                  </tr>
                  <tr>
                    <td>Posted By ID</td>
                    <td>
                      {{
                        viewMoreData.postedbyid == null
                          ? "N/A"
                          : viewMoreData.postedbyid
                      }}
                    </td>
                  </tr>
                  <tr>
                    <td>Posted By Name</td>
                    <td>
                      {{
                        viewMoreData.postedbyname == null
                          ? "N/A"
                          : viewMoreData.postedbyname
                      }}
                    </td>
                  </tr>
                  <tr>
                    <td>Center GPS</td>
                    <td>
                      {{
                        viewMoreData.centergps == null
                          ? "N/A"
                          : viewMoreData.centergps
                      }}
                    </td>
                  </tr>
                  <tr>
                    <td>Corner GPS</td>
                    <td>
                      {{
                        viewMoreData.cornergps == null
                          ? "N/A"
                          : viewMoreData.cornergps
                      }}
                    </td>
                  </tr>
                  <tr>
                    <td>Water?</td>
                    <td>{{ viewMoreData.water == false ? "N/A" : "Yes" }}</td>
                  </tr>
                  <tr>
                    <td>Electricity?</td>
                    <td>
                      {{ viewMoreData.electricity == false ? "N/A" : "Yes" }}
                    </td>
                  </tr>
                  <tr>
                    <td>Road access?</td>
                    <td>{{ viewMoreData.road == false ? "N/A" : "Yes" }}</td>
                  </tr>
                  <tr>
                    <td>Is there a Structure?</td>
                    <td>
                      {{ viewMoreData.structure == false ? "N/A" : "Yes" }}
                    </td>
                  </tr>
                  <tr>
                    <td>Flooded</td>
                    <td>{{ viewMoreData.flooded == false ? "N/A" : "Yes" }}</td>
                  </tr>
                  <tr>
                    <td>Title Free?</td>
                    <td>
                      {{ viewMoreData.titlefree == false ? "N/A" : "Yes" }}
                    </td>
                  </tr>
                  <tr>
                    <td>HOA?</td>
                    <td>{{ viewMoreData.hoa == false ? "N/A" : "Yes" }}</td>
                  </tr>
                  <tr>
                    <td>Liens?</td>
                    <td>{{ viewMoreData.liens == false ? "N/A" : "Yes" }}</td>
                  </tr>
                  <tr>
                    <td>Encumbrances?</td>
                    <td>
                      {{ viewMoreData.encumbrances == false ? "N/A" : "Yes" }}
                    </td>
                  </tr>
                  <tr>
                    <td>Tax?</td>
                    <td>{{ viewMoreData.tax == false ? "N/A" : "Yes" }}</td>
                  </tr>
                  <tr>
                    <td>Price Negotiation?</td>
                    <td>
                      {{
                        viewMoreData.pricenegotiation == false ? "N/A" : "Yes"
                      }}
                    </td>
                  </tr>
                  <tr>
                    <td>Listed By a Realtor?</td>
                    <td>
                      {{
                        viewMoreData.listedbyrealtor == false ? "N/A" : "Yes"
                      }}
                    </td>
                  </tr>
                  <tr>
                    <td>Terms</td>
                    <td>
                      {{
                        viewMoreData.terms == null ? "N/A" : viewMoreData.terms
                      }}
                    </td>
                  </tr>
                  <tr>
                    <td>Status</td>
                    <td>
                      {{
                        viewMoreData.status == null
                          ? "N/A"
                          : viewMoreData.status
                      }}
                    </td>
                  </tr>
                  <tr>
                    <td>Approved?</td>
                    <td>{{ viewMoreData.approved == false ? "NO" : "YES" }}</td>
                  </tr>
                  <tr>
                    <td>Approved by</td>
                    <td>
                      {{
                        viewMoreData.approvedby == null
                          ? "N/A"
                          : viewMoreData.approvedby
                      }}
                    </td>
                  </tr>
                  <tr>
                    <td>Realtor Name</td>
                    <td>
                      {{
                        viewMoreData.realtorname == null
                          ? "N/A"
                          : viewMoreData.realtorname
                      }}
                    </td>
                  </tr>
                  <tr>
                    <td>Realtor ID</td>
                    <td>
                      {{
                        viewMoreData.realtorid == null
                          ? "N/A"
                          : viewMoreData.realtorid
                      }}
                    </td>
                  </tr>
                  <tr>
                    <td>Realtor Phone</td>
                    <td>
                      {{
                        viewMoreData.realtorphone == null
                          ? "N/A"
                          : viewMoreData.realtorphone
                      }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </q-card-section>
          <q-card-section>
            <q-carousel
              transition-prev="slide-right"
              transition-next="slide-left"
              swipeable
              animated
              v-model="slide"
              control-color="primary"
              navigation-icon="radio_button_unchecked"
              navigation
              padding
              height="400px"
              class="bg-white shadow-1 rounded-borders"
            >
              <q-carousel-slide
                v-if="viewMoreData.thumbnail != 'null'"
                :name="1"
                class="column no-wrap flex-center"
              >
                <!-- <q-icon name="style" color="primary" size="56px" /> -->
                <q-img :src="viewMoreData.thumbnail" class="" />
              </q-carousel-slide>
              <q-carousel-slide
                v-if="viewMoreData.picture1 != 'null'"
                :name="2"
                class="column no-wrap flex-center"
              >
                <q-img :src="viewMoreData.picture1" class="my-thumbnail" />
              </q-carousel-slide>
              <q-carousel-slide
                v-if="viewMoreData.picture2 != 'null'"
                :name="3"
                class="column no-wrap flex-center"
              >
                <q-img :src="viewMoreData.picture2" class="my-thumbnail" />
              </q-carousel-slide>
              <q-carousel-slide
                v-if="viewMoreData.picture3 != 'null'"
                :name="4"
                class="column no-wrap flex-center"
              >
                <q-img :src="viewMoreData.picture3" class="my-thumbnail" />
              </q-carousel-slide>
              <q-carousel-slide
                v-if="viewMoreData.picture4 != 'null'"
                :name="5"
                class="column no-wrap flex-center"
              >
                <q-img :src="viewMoreData.picture4" class="my-thumbnail" />
              </q-carousel-slide>
              <q-carousel-slide
                v-if="viewMoreData.picture5 != 'null'"
                :name="6"
                class="column no-wrap flex-center"
              >
                <q-img :src="viewMoreData.picture5" class="my-thumbnail" />
              </q-carousel-slide>
              <q-carousel-slide
                v-if="viewMoreData.picture6 != 'null'"
                :name="7"
                class="column no-wrap flex-center"
              >
                <q-img :src="viewMoreData.picture6" class="my-thumbnail" />
              </q-carousel-slide>
              <q-carousel-slide
                v-if="viewMoreData.picture7 != 'null'"
                :name="8"
                class="column no-wrap flex-center"
              >
                <q-img :src="viewMoreData.picture7" class="my-thumbnail" />
              </q-carousel-slide>
              <q-carousel-slide
                v-if="viewMoreData.picture8 != 'null'"
                :name="9"
                class="column no-wrap flex-center"
              >
                <q-img :src="viewMoreData.picture8" class="my-thumbnail" />
              </q-carousel-slide>
              <q-carousel-slide
                v-if="viewMoreData.picture9 != 'null'"
                :name="10"
                class="column no-wrap flex-center"
              >
                <q-img :src="viewMoreData.picture9" class="my-thumbnail" />
              </q-carousel-slide>
            </q-carousel>
          </q-card-section>

          <q-separator />

          <q-card-actions align="right">
            <!-- <q-btn v-close-popup flat color="primary" label="Reserve" />
            <q-btn v-close-popup flat color="primary" round icon="event" /> -->
            <q-btn
              v-close-popup
              flat
              color="primary"
              label="Copy Parcel ID (APN)"
              @click="copyTo(viewMoreData.parcelid)"
            />
            <q-btn
              v-close-popup
              flat
              color="primary"
              label="Copy Land ID"
              @click="copyTo(viewMoreData.landid)"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { axios, api, base } from "boot/axios";
import { copyToClipboard, useQuasar } from "quasar";
import { useAdminStore } from "../stores/user-store";
import { useRouter } from "vue-router";

const name = "LandsPage";

const findLand = ref(false);
const parcelid = ref("");
const card = ref(false);
const loadingCreateLand = ref(false);
const loadingFindLand = ref(false);
const loadingLandFindButton = ref(false);
const slide = ref(1);
const data = ref([]);
const tab = ref("approved");
const page = ref("1");
const approvedData = ref([]);
const notApprovedData = ref([]);
const viewMoreData = ref({});
const approved = ref([]);
const useStore = useAdminStore();
const $q = useQuasar();
const $router = useRouter();
var token = useStore.getToken;
var adminid = useStore.adminid;

const viewMore = (data) => {
  card.value = true;
  viewMoreData.value = data;
};

const goToFindLand = () => {
  findLand.value = true;
};

function copyTo(ID) {
  copyToClipboard(ID)
    .then(() => {
      $q.notify({
        color: "green-4",
        textColor: "white",
        icon: "thumb_up",
        message: "Copied to clipboard",
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
  // console.log(token, "token");
  api
    .get(`/admin/serve/lands/all/${page.value}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      data.value = response.data.data.reverse();
      console.log(response, "response found!");
      console.log(response.data, "response.data found!");
      console.log(data.value, "lands found!");
      approvedData.value = data.value.filter((obj) => obj.approved === true);
      notApprovedData.value = data.value.filter(
        (obj) => obj.approved === false
      );
      // console.log(approvedData.value, "approveData found!")
      // console.log(notApprovedData.value, "notApproveData found!")
    })
    .catch((e) => {
      console.log(e, "e found!");
      // if (HttpStatusCode.Unauthorized) {
      //   $router.push('/');
      //   $router.go();
      // }
      // $q.notify({
      //   color: 'negative',
      //   position: 'bottom',
      //   message: 'Lands not found',
      //   icon: 'report_problem'
      // })
    });
};

const onApproved = (landid_) => {
  const name = useStore.getFirstname + " " + useStore.getLastname;
  var approvedbyid = name + " " + adminid;
  const formData = {
    approved: true,
    approvedby: approvedbyid,
  };
  console.log(formData, "formData");

  console.log(landid_, "landid_");
  api
    .patch(`/admin/serve/lands/approve/${landid_}`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      console.log(response, "approve");
      approved.value = response.data;
      console.log(approved.value, "approve.value");
      $q.notify({
        color: "green-4",
        textColor: "white",
        icon: "thumb_up",
        message: "Approved successful",
      });
      // window.location.reload();
    })
    .catch(() => {
      $q.notify({
        color: "negative",
        position: "bottom",
        message: "Action not complete",
        icon: "report_problem",
      });
    });
  window.location.reload();
};

const onUnApproved = (landid) => {
  const name = useStore.getFirstname + " " + useStore.getLastname;
  // console.log(token)
  var approvedbyid = name + " " + adminid;
  const formData = {
    approved: false,
    approvedby: approvedbyid,
  };

  api
    .patch(`/admin/serve/lands/approve/${landid}`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      console.log(response);
      approved.value = response.data.data;
      // console.log(approved.value)
      $q.notify({
        color: "green-4",
        textColor: "white",
        icon: "thumb_up",
        message: "Unapproved successful",
      });
      // window.location.reload();
    })
    .catch(() => {
      $q.notify({
        color: "negative",
        position: "bottom",
        message: "Action not complete",
        icon: "report_problem",
      });
    });
  window.location.reload();
};

const onFind = () => {
  loadingFindLand.value = true;
  loadingLandFindButton.value = true;
  // api.get(`${base}/admin/serve/lands/${parcelid.value}`,
  api
    .get(`/admin/serve/lands/find/${parcelid.value}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      findLand.value = false;
      card.value = true;
      viewMoreData.value = response.data.data;
      console.log(viewMoreData.value);
      loadingLandFindButton.value = false;

      $q.notify({
        color: "green-4",
        textColor: "white",
        icon: "thumb_up",
        message: "Land Found",
      });
      loadingLandFindButton.value = false;
    })
    .catch(() => {
      $q.notify({
        color: "negative",
        position: "bottom",
        message: "Land not found",
        icon: "report_problem",
      });
    });

  loadingFindLand.value = false;
};

const onReset = () => {
  parcelid.value = null;
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

onMounted(() => {
  loadData();
});
</script>

<style lang="sass" scoped>
.my-land
  width: 100%
  // height: 450px
.my-card
  width: 100%
  // max-width: 350px
.my-thumbnail
  height: 300px
.table-resp
  border-collapse: collapse
  margin-left: 1em
  caption
    text-align: left
    width: 95vw // Screws up table width until positioning below
    // caption-side: top-outside Firefox-only for now

@media (min-width: 768px)  // sm, md, lg
  .table-resp
    margin-top: 3em
    position: relative // Used below to give position: absolute context
    caption
      position: absolute // Fixes table width broken by width: 95vw above
      top: -2em
      margin-bottom: .75em
    thead
      text-align: left
      background-color: #333
      color: white
    tbody
      tr
        &:nth-child(odd)
          // background-color: hsl(0, 0%, 94%)

        &:nth-child(even)
          // background-color: hsl(0, 0%, 88%)
    td, th
      padding: .25em .5em
      &:nth-child(2)
        border-left: 3px solid #fff

@media (max-width: 767px) /* xs */
  thead
    display: none
  .table-resp
    display: block
    margin-top: 1em
  td
    display: block
  td:first-child
    font-weight: 700
    margin-top: .75em
    margin-bottom: 0
  td:nth-child(2)
    margin-top: 0
</style>
