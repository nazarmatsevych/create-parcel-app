<template>
  <div>
    <div v-if="userRequests.length">
      <h2 class="text-2xl font-bold mb-4 text-center">Your Requests</h2>
      <div
        class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        <div
          v-for="request in userRequests"
          :key="request.id"
          class="flex flex-col bg-white rounded-lg shadow-lg p-6"
        >
          <p class="text-gray-500 mb-2">
            Type: {{ request.selectedRequestType }}
          </p>
          <p class="text-gray-500 mb-2">From: {{ request.fromCity }}</p>
          <p class="text-gray-500 mb-2">To: {{ request.toCity }}</p>
          <p v-if="request.parcelType" class="text-gray-500 mb-2">
            Parcel Type: {{ request.parcelType }}
          </p>
          <p v-if="request.dispatchDate" class="text-gray-500 mb-2">
            Dispatch Date: {{ request.dispatchDate }}
          </p>
          <p v-if="request.parcelDescription" class="text-gray-500 mb-4">
            Parcel Description: {{ request.parcelDescription }}
          </p>
          <p class="text-gray-500 mb-4">
            Date of creation {{ request.dateOfCreation }}
          </p>

          <button
            @click="showSimilarRequestsModal(request.id as number)"
            class="text-blue-500 px-4 py-2 mb-2.5"
          >
            See Similar Requests
          </button>

          <div class="flex justify-between mt-auto">
            <button
              @click="showEditDialog(request)"
              class="w-[80px] bg-blue-500 text-white px-4 py-2 mb-2.5 rounded-md hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              @click="deleteRequest(request.id as number)"
              class="w-[80px] mt-auto bg-red-500 text-white px-4 py-2 mb-2.5 rounded-md hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
    <h2 v-else class="text-2xl font-bold mb-4 text-center">No requests yet</h2>

    <EditRequestModal
      v-model="isEditModalVisible"
      :updatedRequest="updatedRequest"
      @close="isEditModalVisible = false"
      @save="saveChanges"
    />

    <ListOfSimilarRequestsModal
      :current-request-id="selectedRequestId"
      v-model="isListOfSimilarRequestsModalVisible"
    />
  </div>
</template>

<script setup lang="ts">
import { useRequestsStore } from "@/stores/requests";
import type { IDeliverTypeForm, IOrderTypeForm } from "@/types/request.types";
import { computed, ref } from "vue";
import EditRequestModal from "@/components/EditRequestModal.vue";
import ListOfSimilarRequestsModal from "@/components/ListOfSimilarRequestsModal.vue";

const requestsStore = useRequestsStore();

const updatedRequest = ref<IDeliverTypeForm | IOrderTypeForm>();
const isEditModalVisible = ref(false);
const isListOfSimilarRequestsModalVisible = ref(false);
const selectedRequestId = ref(0);

const userRequests = computed<(IDeliverTypeForm & IOrderTypeForm)[]>(() =>
  requestsStore.requests.filter((request) => request.userId === requestsStore.currentUserId),
);

const showEditNotificationMessage = () => {
  // @ts-ignore
  ElNotification({
    title: "Success",
    message: "Your request was successfully updated!",
    type: "success",
    position: "bottom-right",
  });
};

const showDeleteNotificationMessage = () => {
  // @ts-ignore
  ElNotification({
    title: "Success",
    message: "Your request was successfully deleted!",
    type: "success",
    position: "bottom-right",
  });
};

const showEditDialog = (request: IDeliverTypeForm | IOrderTypeForm) => {
  updatedRequest.value = { ...request };
  isEditModalVisible.value = true;
};

const showSimilarRequestsModal = (requestId: number) => {
  isListOfSimilarRequestsModalVisible.value = true;

  selectedRequestId.value = requestId;
};

const saveChanges = () => {
  if (updatedRequest.value && updatedRequest.value) {
    const index = requestsStore.requests.findIndex(
      (request) => request.id === updatedRequest.value!.id,
    );
    if (index !== -1) {
      requestsStore.requests.splice(index, 1, updatedRequest.value);
    }

    requestsStore.saveRequestsToStorage();

    showEditNotificationMessage();
  }

  isEditModalVisible.value = false;
};

const deleteRequest = (requestId: number) => {
  const index = requestsStore.requests.findIndex(
    (request) => request.id === requestId,
  );

  if (index !== -1) {
    requestsStore.requests.splice(index, 1);

    requestsStore.saveRequestsToStorage();

    showDeleteNotificationMessage();
  }
};
</script>
