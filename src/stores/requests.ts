import { defineStore } from "pinia";
import { ref } from "vue";
import type { IDeliverTypeForm, IOrderTypeForm } from "@/types/request.types";
import { useRoute } from "vue-router";
import { formatDate } from "@/utils/parseDate";
import type { ERequestType } from "@/types/request.enums";

export const useRequestsStore = defineStore("analyticsStore", () => {
  const route = useRoute();

  const storedRequests = localStorage.getItem("requests");
  const initialRequests = storedRequests ? JSON.parse(storedRequests) : [];

  const requests = ref<(IOrderTypeForm | IDeliverTypeForm)[]>(initialRequests);

  const storedRequestType = localStorage.getItem("selectedRequestType");
  const initialRequestType = storedRequestType
    ? JSON.parse(storedRequestType)
    : "";

  const selectedRequestType = ref(initialRequestType);

  const changeSelectedRequestType = (requestType: ERequestType) => {
    selectedRequestType.value = requestType;

    localStorage.setItem(
      "selectedRequestType",
      JSON.stringify(selectedRequestType.value),
    );
  };

  const saveRequestsToStorage = () => {
    localStorage.setItem("requests", JSON.stringify(requests.value));
  };

  const addRequest = (request: IOrderTypeForm | IDeliverTypeForm) => {
    requests.value.push({
      ...request,
      userId: route.params.id as string,
      dateOfCreation: formatDate(new Date()),
      id: requests.value.length + 1,
      selectedRequestType: selectedRequestType.value,
    });

    saveRequestsToStorage();
  };

  return {
    requests,
    selectedRequestType,
    addRequest,
    changeSelectedRequestType,
    saveRequestsToStorage,
  };
});
