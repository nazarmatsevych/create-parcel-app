<template>
  <el-dialog v-model="modelValue" title="List Of Matched Requests" width="500">
    <div class="p-4">
      <ul v-if="matchedRequests.length">
        <li v-for="request in matchedRequests" :key="request.id">
          <div class="bg-gray-100 rounded-lg shadow-md p-4 mb-4">
            <div class="text-lg font-semibold mb-2">Request Details</div>
            <div><strong>From City:</strong> {{ request.fromCity }}</div>
            <div><strong>To City:</strong> {{ request.toCity }}</div>
            <div
              v-if="
                request.selectedRequestType === ERequestType.ORDER &&
                request.parcelType
              "
            >
              <strong>Parcel Type:</strong> {{ request.parcelType }}
            </div>
            <div v-if="request.dispatchDate">
              <strong>Dispatch Date:</strong> {{ request.dispatchDate }}
            </div>
            <div
              v-if="
                request.selectedRequestType === ERequestType.ORDER &&
                request.parcelDescription
              "
            >
              <strong>Description:</strong> {{ request.parcelDescription }}
            </div>
            <div>
              <strong>Order Type:</strong> {{ request.selectedRequestType }}
            </div>
          </div>
        </li>
      </ul>

      <p v-else>No matched requests</p>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useRequestsStore } from "@/stores/requests";
import { computed } from "vue";
import type { IOrderTypeForm, IDeliverTypeForm } from "@/types/request.types";
import { ERequestType } from "@/types/request.enums";

const modelValue = defineModel<boolean>();

const props = defineProps<{
  currentRequestId: number;
}>();

const requestsStore = useRequestsStore();

const route = useRoute();
const currentUserId = route.params.id;

const isMatchingRequest = (
  requestA: IDeliverTypeForm | IOrderTypeForm,
  requestB: IDeliverTypeForm | IOrderTypeForm,
) => {
  return (
    requestA.fromCity === requestB.fromCity ||
    requestA.toCity === requestB.toCity ||
    requestA.dispatchDate! <= requestB.dispatchDate!
  );
};

const matchedRequests = computed<(IOrderTypeForm & IDeliverTypeForm)[]>(() => {
  const currentRequest = requestsStore.requests.find(
    (request) => request.id === props.currentRequestId,
  );
  if (!currentRequest) return [];

  return requestsStore.requests.filter((request) => {
    if (request.userId === currentUserId) return false;
    return isMatchingRequest(currentRequest, request);
  });
});
</script>
