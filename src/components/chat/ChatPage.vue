<template>
  <q-page class="q-pa-md">
    <div class="text-black text-h4">All Channels(Chats)</div>
    <q-separator />
    <div class="q-gutter-y-md q-pt-md" full-width>
      <!-- <q-table
        class="my-sticky-header-table"
        title="Broker"
        :rows="data"
        row-key="name"
        flat
        bordered
        :visible-columns="[
          'userid',
          'firstname',
          'lastname',
          'email',
          'username',
          'usertype',
          'phone',
          'picture',
          'businessname',
          'gender',
          'dob',
          'address',
          'city',
          'province',
          'country',
        ]"
          :filter="filter"
          >

        <template v-slot:body="props">
          <q-tr :props="props" @click="viewMore(props.row)">
            <q-td key="userid" :props="props">
              <q-badge color="green">
                {{ props.row.userid }}
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
            <q-td key="usertype" :props="props">
              <q-badge color="green">
                {{ props.row.usertype }}
              </q-badge>
            </q-td>
            <q-td key="phone" :props="props">
              {{ props.row.phone }}
            </q-td>
            <q-td key="picture" :props="props">
              <q-avatar
                size="40px"
              >
                <img :src="props.row.picture">
              </q-avatar>
            </q-td>
            <q-td key="businessname" :props="props">
              {{ props.row.businessname }}
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
        <template v-slot:top-right>
          <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
      </q-table> -->

      <div class="q-pa-md row items-start q-gutter-md">
        <q-card
          class="my-card"
          v-for="(channel, index) in channels"
          :key="index"
        >
          <q-card-section class="bg-primary text-white">
            <div class="text-h6 text-center">
              {{ channel.name }}
              <!-- <q-avatar size="100px">
                <img :src="channel.picture">
              </q-avatar> -->
            </div>
            <div class="text-center">
              <div class="text-subtitle2">
                Between - @{{ channel.user1username }}
              </div>
              <div class="text-subtitle2">
                and - @{{ channel.user2username }}
              </div>
              <div class="text-subtitle2">Room ID - {{ channel.roomid }}</div>
            </div>
          </q-card-section>

          <q-separator />

          <q-card-actions align="right">
            <q-btn flat @click="connect(channel)">Join Channel...</q-btn>
            <!-- <q-btn flat @click="joinChannel(channel)">Join Channel...</q-btn> -->
          </q-card-actions>
        </q-card>

        <q-dialog v-model="card">
          <q-card style="width: 100%; max-width: 600px">
            <q-card-section>
              <div class="text-h6">
                Chats between @{{ viewChannelData.user1username }} and @{{
                  viewChannelData.user2username
                }}
              </div>
            </q-card-section>

            <q-separator />

            <q-card-section style="max-height: 50vh" class="scroll">
              <div v-if="messages1.length > 0">
                <q-chat-message
                  v-for="chat in messages1"
                  :key="chat.clientID"
                  :name="chat.name"
                  :text="[chat.data]"
                  :sent="chat.type === 'sent'"
                />
              </div>
              <!-- <div
                v-for="message in messages1"
                :key="message.clientID"
                class="mt-2"
                :class="{ 'text-right justify-end': message.type === 'sent' }"
              >
                <div class="text-sm">{{ message.name }}</div>
                <div>
                  <div
                    class="px-4 py-1 rounded-md inline-block mt-1"
                    :class="{
                      'bg-blue text-white': message.type === 'sent',
                      'bg-grey text-dark-secondary': message.type !== 'sent'
                    }"
                  >
                    {{ message.data }}
                  </div>
                </div>
              </div> -->
            </q-card-section>
            <!-- {{ messages1 }} -->
            <q-separator />

            <q-card-actions>
              <!-- <div class="row">
              </div> -->
              <!-- <form @submit.prevent="publishMessages">
                <div class="row q-pa-sm">
                  <div class="col-md-10">
                    <q-input rounded outlined v-model="messageText" label="Enter your message here" />
                    <q-input id="message-input" rounded outlined v-model="messageText" label="Enter your message here" />
                  </div>
                  <div class="col-md-2 q-pt-sm">
                    <q-btn flat label="Send" type="submit" color="primary" />
                    <q-btn id="send-button" flat label="Send" type="submit" color="primary" />
                  </div>
                </div>
              </form> -->
              <!-- <q-form @submit.prevent="onSubmit"> -->
              <q-toolbar class="bg-primary text-white row">
                <!-- <q-btn round flat icon="insert_emoticon" class="q-mr-sm" /> -->
                <q-input
                  v-model="message1"
                  class="col-grow q-mr-sm"
                  bg-color="white"
                  placeholder="Type a message"
                  dense
                  outlined
                  rounded
                  autofocus
                  ref="inputFocus"
                />
                <q-btn
                  round
                  flat
                  icon="send"
                  type="submit"
                  @click="sendMessage1(viewChannelData.name)"
                />
              </q-toolbar>
              <!-- </q-form> -->
              <!-- <q-footer>
              </q-footer> -->
            </q-card-actions>
          </q-card>
        </q-dialog>

        <!-- <q-dialog v-model="card">
          <q-card class="my-card2">
            <q-img :src="viewMoreData.picture" class="my-thumbnail" />

            <q-card-section>
              <q-btn
                fab
                color="primary"
                icon="place"
                class="absolute"
                style="top: 0; right: 12px; transform: translateY(-50%);"
              />

              <div class="row no-wrap items-center">
                <div class="col text-h4 ellipsis">
                  {{ viewMoreData.firstname }} {{ viewMoreData.lastname }}
                </div>
                <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
                  <q-icon name="place" />
                  city: {{ viewMoreData.city }}
                </div>
              </div>

            </q-card-section>

            <q-card-section class="q-pt-none text-center">
              <div class="text-subtitle1">
                Username:
              </div>
              <div class="text-caption text-grey">
                @{{ viewMoreData.username }}
              </div>
            </q-card-section>

            <q-card-section class="q-pt-none text-center">
              <div class="text-subtitle1">
                Email:
              </div>
              <div class="text-caption text-grey">
                {{ viewMoreData.email }}
              </div>
            </q-card-section>

            <q-card-section class="q-pt-none text-center">
              <div class="text-subtitle1">
                Phone:
              </div>
              <div class="text-caption text-grey">
                {{ viewMoreData.phone }}
              </div>
            </q-card-section>

            <q-card-section class="q-pt-none text-center">
              <div class="text-subtitle1">
                Business Name:
              </div>
              <div class="text-caption text-grey">
                {{ viewMoreData.businessname }}
              </div>
            </q-card-section>

            <q-card-section class="q-pt-none text-center">
              <div class="text-subtitle1">
                Location:
              </div>
              <div class="text-caption text-grey">
                {{ viewMoreData.address }}, {{ viewMoreData.city }}, {{ viewMoreData.province }}, {{ viewMoreData.country }}
              </div>
            </q-card-section>

            <q-card-section class="q-pt-none text-center">
              <div class="text-subtitle1">
                Gender:
              </div>
              <div class="text-caption text-grey">
                {{ viewMoreData.gender }}
              </div>
            </q-card-section>
            <q-card-section class="q-pt-none text-center">
              <div class="text-subtitle1">
                Date of Birth:
              </div>
              <div class="text-caption text-grey">
                {{ viewMoreData.dob }}
              </div>
            </q-card-section>
            <q-card-section class="q-pt-none text-center">
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
                  {{ viewMoreData.walletid }}
                </div>
              </q-card-section>
              <q-card-section class="q-pt-none text-center">
                <div class="text-subtitle1">
                  Wallet Amount:
                </div>
                <div class="text-caption text-grey">
                  {{ viewMoreData.walletamount }}
                </div>
              </q-card-section>

            <q-separator />

            <q-card-actions align="right">
              <q-btn v-close-popup flat color="primary" label="Copy User ID" @click="copyTo(viewMoreData.userid)" />
              <q-btn v-close-popup flat color="primary" round icon="event" />
            </q-card-actions>
          </q-card>
        </q-dialog> -->
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref, watch, computed, onBeforeUnmount } from "vue";
import { axios, api, base } from "boot/axios";
import { copyToClipboard, useQuasar } from "quasar";
import { useAdminStore } from "../../stores/user-store";
import { useRouter } from "vue-router";
// import ably from 'ably';
import Ably from "ably/promises";

const name = "ChatPage";

const card = ref(false);
const slide = ref(1);
const channels = ref([]);
const viewMoreData = ref({});
const viewChannelData = ref({});
const messageText = ref("");
const messagelist = ref([]);
const approved = ref([]);
const useStore = useAdminStore();
const $q = useQuasar();
const $router = useRouter();
const token = useStore.getToken;
const adminid = useStore.adminid;
const adminusername = ref("Admin");
const page = ref("1");
const client = ref(null);
const clientChannel = ref(null);
const channel = ref();

const viewMore = (data) => {
  card.value = true;
  viewMoreData.value = data;
};

const joinChannel = async (data) => {
  card.value = true;
  viewChannelData.value = data;

  // userId.value = // Generate or retrieve user ID here (e.g., using storage);
  // username.value = // Set username based on user preference;

  // Connect to Ably using your API key
  // client.value = await ably.Realtime({ key: 'hUU_Fg.0mh7Hw:k4Vz2LvudpVyZOU_caFNLyAX9f3h8-pyFwgLHZZYgng' });

  // const channel = client.value.channels.get(data.name);

  // // Optionally: Set client ID with user ID or username
  // try {
  //   await channel.presence.enter(adminid || adminusername.value);
  // } catch (error) {
  //   console.error('Error entering presence:', error);
  // }

  // // Get channel history (adjust timeframe as needed)
  // const history = await channel.history.get(30); // Get recent messagelist
  // messagelist.value = history.items.map((item) => ({ ...item, adminusername }));
  // // messagelist.value = history.items.map((item) => ({ ...item, username }));

  // // Subscribe to messagelist and presence events
  // const messageSubscription = channel.subscribe((message) => {
  //   messagelist.value.push({ ...message, adminusername });
  //   // messagelist.value.push({ ...message, username });
  // });
  // const presenceSubscription = channel.presence.subscribe((event) => {
  //   // Handle presence events (e.g., user joins/leaves)
  //   if (event.action === 'enter') {
  //     console.log(`${event.clientId} has joined the chat.`);
  //   } else if (event.action === 'leave') {
  //     console.log(`${event.clientId} has left the chat.`);
  //   }
  // });

  // // Clean up subscriptions on unmount
  // onBeforeUnmount(async () => {
  //   if (client.value) {
  //     await client.value.close(); // Ensure proper Ably client closure
  //   }
  //   messageSubscription.cancel();
  //   presenceSubscription.cancel();
  // });

  console.log(data.name, "data.name");
  const client = new ably.Realtime({
    key: "hUU_Fg.0mh7Hw:k4Vz2LvudpVyZOU_caFNLyAX9f3h8-pyFwgLHZZYgng",
  });
  // Connect to Ably
  try {
    await client.connect();
    console.log("Connected to Ably!");
  } catch (error) {
    console.error("Error connecting to Ably:", error);
    return;
  }

  // Join the "Chat" channel
  channel.value = client.channels.get(data.name);

  // Enter the channel's presence set
  try {
    await channel.value.presence.enter(adminid);
    // await channel.presence.enter(id);
    console.log("Joined the chat presence!");
  } catch (error) {
    console.error("Error entering presence:", error);
    return;
  }

  // Get channel history
  await getHistory(channel.value);

  // Subscribe to messages and presence events
  subscribe(channel.value);
  subscribePresence(channel.value);

  // Start publishing messages in a loop
  // publishMessages(adminusername.value, channel);
  // clientChannel.value = channel
};

async function getHistory(channel) {
  const history = await channel.history.getAll(24); // Fetch history for 24 hours
  for (const message of history) {
    const data = {
      status: "history",
      clientID: message.clientId,
      data: message.data,
    };
    const jsonData = JSON.stringify(data);
    console.log(jsonData);
  }
}

function subscribe(channel) {
  channel.subscribeAll((message) => {
    const data = {
      status: "success",
      clientID: message.clientId,
      data: message.data,
      type: message.clientId === adminid ? "sent" : "received",
    };
    const jsonData = JSON.stringify(data);
    console.log(jsonData);
  });
}

function subscribePresence(channel) {
  channel.presence.subscribeAll((event) => {
    const data = {
      status: event.action === "enter" ? "enter" : "exit",
      clientID: event.clientId,
      message:
        event.action === "enter" ? "has entered the chat" : "has left the chat",
    };
    const jsonData = JSON.stringify(data);
    console.log(jsonData);
  });
}

async function publishMessages() {
  // async function publishMessages(username, channel) {
  while (true) {
    const text = messageText.value;
    // const text = await prompt("Enter a message:");
    try {
      await clientChannel.value.publish(adminusername.value, text);
      // await channel.publish(username, text);
      messageInput.value = "";
      console.log("Message published!");
    } catch (error) {
      console.error("Error publishing message:", error);
    }
  }

  // const messageInput = document.getElementById('message-input');
  // const sendButton = document.getElementById('send-button');

  // sendButton.addEventListener('click', async () => {
  //   const text = messageInput.value;
  //   if (!text) {
  //     return; // Handle empty message input
  //   }

  //   try {
  //     await channel.publish(username, text);
  //     // await clientChannel.value.publish(adminusername.value, text);
  //     messageInput.value = ''; // Clear input after sending
  //     console.log("Message published!");
  //   } catch (error) {
  //     console.error('Error publishing message:', error);
  //   }
  // });
}

////////

// import Ably from 'ably/promises';

const ably1 = new Ably.Realtime(
  "hUU_Fg.0mh7Hw:k4Vz2LvudpVyZOU_caFNLyAX9f3h8-pyFwgLHZZYgng",
  {
    clientId: adminid,
  }
);
const channel1 = ref(null);
const messages1 = ref([]);
// const username = ref('');
const message1 = ref("");

const connect = async (data) => {
  // console.log(adminid, "admin id");
  card.value = true;
  viewChannelData.value = data;
  // const client = new ably.Realtime({ key: "hUU_Fg.0mh7Hw:k4Vz2LvudpVyZOU_caFNLyAX9f3h8-pyFwgLHZZYgng" });
  // Connect to Ably
  try {
    // await client.connect();
    await ably1.connect();
    console.log("Connected to Ably!");
  } catch (error) {
    console.error("Error connecting to Ably:", error);
    return;
  }

  // Join the "Chat" channel
  // channel.value = client.channels.get(data.name);

  // channel1.value = ably1.channels.get(data.name);
  try {
    channel1.value = ably1.channels.get(data.name);
    // await channel1.value.presence.enter(adminid);
    // console.log(adminid, "admin id 2");
    // channel1.value = ably1.channels.get('chat');
    // await channel1.value.presence.enter('');
    await getHistory1();
    subscribeToMessages1(data.name);
    subscribeToPresence1(data.name);
    // await subscribeToMessages1();
  } catch (error) {
    console.error("Error connecting to Ably:", error);
  }
};

const getHistory1 = async () => {
  try {
    const history = await channel1.value.history();
    messages1.value = history.items
      .map((msg) => ({
        clientId: msg.data.clientId,
        name: msg.name,
        data: msg.data.message,
        type: msg.data.type || "sent",
      }))
      .reverse();
    // console.log(message1, "History messages1")
  } catch (error) {
    console.error("Error getting history:", error);
  }
};

// const subscribeToMessages1 = () => {
//   channel1.value.subscribe('*', message => {
const subscribeToMessages1 = async (name) => {
  try {
    channel1.value.subscribe(name, (message) => {
      messages1.value.push({
        clientId: message.data.clientId,
        name: message.name,
        data: message.data.message,
        type: message.data.type || "sent",
      });
      // console.log('message received for event ' + message.name);
      // console.log('message data:' + message.data);
    });
  } catch (error) {
    console.error("Error getting Message:", error);
  }
  // console.log(message1, "messages1")
};

const subscribeToPresence1 = (name) => {
  console.log(`Presence start`);
  // try{
  channel1.value.presence.subscribe(name, (presenceMessage) => {
    // const subscribeToPresence1 = () => {
    //   channel1.value.presence.subscribe('*', presenceMessage => {
    console.log(`Presence: k`);
    console.log(`Presence: ${presenceMessage}`);
    console.log(
      `Presence event: ${presenceMessage.action} for ${presenceMessage.clientId}`
    );
    if (presenceMessage.action === "enter") {
      console.log(`${presenceMessage.clientId} has entered the chat`);
    } else if (presenceMessage.action === "leave") {
      console.log(`${presenceMessage.clientId} has left the chat`);
    }
  });
  // } catch (error) {
  //   console.error('Error subscribing to presence:', error);
  // }
  console.log(`Presence end`);
};

const sendMessage1 = async (data) => {
  if (message1.value === "") {
    alert("Please enter a message");
  } else {
    try {
      await channel1.value.publish(adminusername.value, {
        clientId: adminid, // Use your chosen clientId
        message: message1.value,
        type: "sent",
      });
      // await channel1.value.publish(adminusername.value, message1.value);
      // await channel1.value.publish(username.value, message1.value);
      message1.value = "";
      // subscribeToMessages1(data.name)
      // getHistory1()
      //   channel1.value.subscribe(name, message => {
      // // const subscribeToMessages1 = (name) => {
      // //   channel1.value.subscribe(name, message => {
      //     messages1.value.push({
      //       clientId: message.data.clientId,
      //       name: message.name,
      //       data: message.data.message,
      //       type: message.data.type || "sent",
      //     });
      //     // console.log('message received for event ' + message.name);
      //     // console.log('message data:' + message.data);
      //   });
    } catch (error) {
      console.error("Error publishing message:", error);
    }
  }
};

///////

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

const loadChannel = () => {
  // const token = useStore.getToken
  // console.log(token, "token");
  api
    .get(`/chat/entire_channels/all/${page.value}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      channels.value = response.data.data.reverse();
      console.log(channels.value, "All Channels!");
    })
    .catch(() => {
      $q.notify({
        color: "negative",
        position: "bottom",
        message: "Channels not found",
        icon: "report_problem",
      });
    });
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

// async function sendMessage() {
//   if (!message.value) {
//     return;
//   }

//   try {
//     await channel.value.publish(adminusername.value, message.value);
//     message.value = ''; // Clear message input after sending
//   } catch (error) {
//     console.error('Error sending message:', error);
//   }
// }

onMounted(async () => {
  loadChannel();
});
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px

.my-card2
  width: 100%
  // max-width: 350px
.my-thumbnail
  height: 200px
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
