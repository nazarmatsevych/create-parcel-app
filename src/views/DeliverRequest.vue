<template>
  <div class="text-2xl">
    DeliverRequest page

    <form
      @submit.prevent="submitForm"
      class="max-w-md mx-auto mt-8 p-4 bg-gray-800 rounded-lg"
    >
      <div class="mb-4">
        <label for="fromCity" class="block text-white">From City:</label>
        <input
          class="bg-zinc-900 text-white px-3 py-2 rounded-md w-full"
          type="text"
          id="fromCity"
          v-model="formData.fromCity"
          required
        />
      </div>
      <div class="mb-4">
        <label for="toCity" class="block text-white">To City:</label>
        <input
          class="bg-zinc-900 text-white px-3 py-2 rounded-md w-full"
          type="text"
          id="toCity"
          v-model="formData.toCity"
          required
        />
      </div>
      <div class="mb-4">
        <label for="dispatchDate" class="block text-white"
          >Date of Dispatch:</label
        >
        <input
          class="bg-zinc-900 text-white px-3 py-2 rounded-md w-full"
          type="date"
          id="dispatchDate"
          v-model="formData.dispatchDate"
        />
      </div>
      <button
        type="submit"
        class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Create
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { IDeliverTypeForm } from "@/types/request.types";
import { useRequestsStore } from "@/stores/requests";

const requestsStore = useRequestsStore();

const formData = ref<IDeliverTypeForm>({
  fromCity: "",
  toCity: "",
  dispatchDate: "",
});

const showNotificationMessage = () => {
  // @ts-ignore
  ElNotification({
    title: "Success",
    message: "Your request was successfully created!",
    type: "success",
    position: "bottom-right",
  });
};

const submitForm = () => {
  requestsStore.addRequest(formData.value);

  formData.value = {
    fromCity: "",
    toCity: "",
    dispatchDate: "",
  };

  showNotificationMessage();
};
</script>
