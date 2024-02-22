<template>
  <div>
    <div v-if="sortedRequests.length">
      <h2 class="text-2xl font-bold mb-4 text-center">All created requests</h2>

      <div class="flex flex-col justify-end mb-4">
        <label class="mr-2">Sort by:</label>
        <el-select v-model="sortKey" placeholder="Sort by" class="w-40 mr-4">
          <el-option
            label="Date of Creation"
            value="dateOfCreation"
          ></el-option>
          <el-option label="Date of Dispatch" value="dispatchDate"></el-option>
        </el-select>
      </div>

      <TransitionGroup name="list" tag="ul">
        <li v-for="request in sortedRequests" :key="request.id" class="fade">
          <div class="bg-gray-100 rounded-lg shadow-md p-4 mb-4">
            <div class="text-lg font-semibold text-gray-600 mb-2">
              Request Details
            </div>
            <div class="text-gray-600">
              <strong>From City:</strong> {{ request.fromCity }}
            </div>
            <div class="text-gray-600">
              <strong>To City:</strong> {{ request.toCity }}
            </div>
            <div
              v-if="
                request.selectedRequestType === ERequestType.ORDER &&
                request.parcelType
              "
              class="text-gray-600"
            >
              <strong>Parcel Type:</strong> {{ request.parcelType }}
            </div>
            <div v-if="request.dispatchDate" class="text-gray-600">
              <strong>Dispatch Date:</strong> {{ request.dispatchDate }}
            </div>
            <div
              v-if="
                request.selectedRequestType === ERequestType.ORDER &&
                request.parcelDescription
              "
              class="text-gray-600"
            >
              <strong>Description:</strong> {{ request.parcelDescription }}
            </div>
            <div class="text-gray-600">
              <strong>Order Type:</strong> {{ request.selectedRequestType }}
            </div>
          </div>
        </li>
      </TransitionGroup>
    </div>

    <h2 v-else class="text-2xl font-bold mb-4 text-center">No requests yet</h2>
  </div>
</template>

<script setup lang="ts">
import { useRequestsStore } from "@/stores/requests";
import { ref, computed } from "vue";
import { ERequestType } from "@/types/request.enums";
import type { IDeliverTypeForm, IOrderTypeForm } from "@/types/request.types";

const requestsStore = useRequestsStore();

const sortKey = ref<string>("dateOfCreation");

enum ESortType {
  sortByCreationDate = "dateOfCreation",
  sortByDispatchDate = "dispatchDate",
}

const sortedRequests = computed<(IOrderTypeForm & IDeliverTypeForm)[]>(() => {
  return [...requestsStore.requests].sort((a, b) => {
    if (sortKey.value === ESortType.sortByCreationDate) {
      return (
        (b.dateOfCreation ? new Date(b.dateOfCreation).getTime() : 0) -
        (a.dateOfCreation ? new Date(a.dateOfCreation).getTime() : 0)
      );
    } else if (sortKey.value === ESortType.sortByDispatchDate) {
      return (
        (b.dispatchDate ? new Date(b.dispatchDate).getTime() : 0) -
        (a.dispatchDate ? new Date(a.dispatchDate).getTime() : 0)
      );
    }
    return 0;
  });
});
</script>

<style lang="css">
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
