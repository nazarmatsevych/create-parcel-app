<template>
  <div class="text-2xl">
    Order request page

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
        <label for="parcelType" class="block text-white">Parcel Type:</label>
        <select
          class="bg-zinc-900 text-white px-3 py-2 rounded-md w-full"
          id="parcelType"
          v-model="formData.parcelType"
        >
          <option value="gadgets">Gadgets</option>
          <option value="drinks">Drinks</option>
          <option value="clothes">Clothes</option>
          <option value="medicines">Medicines</option>
          <option value="other">Other</option>
        </select>
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
      <div class="mb-4">
        <label for="parcelDescription" class="block text-white"
          >Parcel Description:</label
        >
        <textarea
          class="bg-zinc-900 text-white border border-white rounded-md px-3 py-2 w-full"
          id="parcelDescription"
          v-model="formData.parcelDescription"
        ></textarea>
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
import type { IOrderTypeForm } from "@/types/request.types";
import { useRequestsStore } from "@/stores/requests";

const requestsStore = useRequestsStore();

const formData = ref<IOrderTypeForm>({
  fromCity: "",
  toCity: "",
  parcelType: "",
  dispatchDate: "",
  parcelDescription: "",
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
    parcelType: "",
    dispatchDate: "",
    parcelDescription: "",
  };

  showNotificationMessage();
};
</script>
