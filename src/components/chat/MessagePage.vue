<template>
  <q-page>
    <div class="q-pa-md">
      <div class="q-pa-md row justify-center">
      <div style="width: 100%; max-width: 600px">
        <q-chat-message
          v-for="chat in data.messages"
          :key="chat.roomId"
          :name="chat.username"
          :text="[chat.content]"
          :sent="chat.type === 'sent'"
        />
      </div>
    </div>

    <div>
      <q-footer>
        <!-- <q-form @submit.prevent="onSubmit"> -->
          <q-toolbar class="bg-primary text-white row">
            <!-- <q-btn round flat icon="insert_emoticon" class="q-mr-sm" /> -->
            <q-input
              v-model="message"
              class="col-grow q-mr-sm"
              bg-color="white"
              placeholder="Type a message"
              dense
              outlined
              rounded
              autofocus
              ref="inputFocus"
            />
            <q-btn round flat icon="send" type="submit" @click="sendMessage" />
          </q-toolbar>
        <!-- </q-form> -->
      </q-footer>
  </div>
    </div>
    <!-- <q-separator /> -->
    
  </q-page>
</template>

<script setup>
import { defineProps } from 'vue'

// Define the props
const props = defineProps({
  data: {
    type: Array,
    required: true
  }
})

console.log(props , "props");

</script>

<style lang="sass" scoped>

</style>
