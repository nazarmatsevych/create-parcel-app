<template>
  <h1 class="mb-2.5">Choose order type</h1>

  <div class="flex gap-1.5">
    <div
      class="border-2 border-gray-200 rounded p-1.5 cursor-pointer hover:bg-gray-600"
      @click="selectOrderType"
    >
      Order Type
    </div>

    <div
      class="border-2 border-gray-200 rounded p-1.5 cursor-pointer hover:bg-gray-600"
      @click="selectDeliverType"
    >
      Deliver Type
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { ERequestType } from "@/types/request.enums";
import { useRequestsStore } from "@/stores/requests";

const router = useRouter();

const requestsStore = useRequestsStore();

const selectOrderType = () => {
  requestsStore.changeSelectedRequestType(ERequestType.ORDER);

  router.push(`/${requestsStore.currentUserId}/create/order`);
};

const selectDeliverType = () => {
  requestsStore.changeSelectedRequestType(ERequestType.DELIVER);

  router.push(`/${requestsStore.currentUserId}/create/deliver`);
};
</script>
