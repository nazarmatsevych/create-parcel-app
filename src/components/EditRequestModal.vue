<template>
  <el-dialog v-model="modelValue" title="Edit your request" width="500">
    <div class="p-4">
      <label for="fromCity" class="block mb-2">From City: *</label>
      <input
        type="text"
        id="fromCity"
        v-model="updatedRequest!.fromCity"
        class="border border-gray-300 rounded-md px-3 py-2 w-full mb-4"
      />

      <label for="toCity" class="block mb-2">To City: *</label>
      <input
        type="text"
        id="toCity"
        v-model="updatedRequest!.toCity"
        class="border border-gray-300 rounded-md px-3 py-2 w-full mb-4"
      />

      <template
        v-if="updatedRequest!.selectedRequestType === ERequestType.ORDER"
      >
        <label for="parcelType" class="block mb-2">Parcel Type:</label>
        <input
          type="text"
          id="parcelType"
          v-model="updatedRequest!.parcelType"
          class="border border-gray-300 rounded-md px-3 py-2 w-full mb-4"
        />
      </template>

      <label for="dateOfDispatch" class="block mb-2">Date of Dispatch:</label>
      <input
        type="date"
        id="dateOfDispatch"
        v-model="updatedRequest!.dispatchDate"
        class="border border-gray-300 rounded-md px-3 py-2 w-full mb-4"
      />

      <template
        v-if="updatedRequest!.selectedRequestType === ERequestType.ORDER"
      >
        <label for="parcelDescription" class="block mb-2"
          >Parcel Description:</label
        >
        <input
          type="text"
          id="parcelDescription"
          v-model="updatedRequest!.parcelDescription"
          class="border border-gray-300 rounded-md px-3 py-2 w-full mb-4"
        />
      </template>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button class="mr-4" @click="$emit('close')">Cancel</el-button>

        <el-tooltip
          :disabled="areRequiredFieldsFilled"
          content="Please fill in all required fields"
          placement="top"
        >
          <span>
            <el-button
              :disabled="!areRequiredFieldsFilled"
              type="primary"
              @click="$emit('save')"
            >
              Save changes
            </el-button>
          </span>
        </el-tooltip>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ERequestType } from "@/types/request.enums";
import { computed } from "vue";

import type { IOrderTypeForm, IDeliverTypeForm } from "@/types/request.types";

defineEmits(["close", "save"]);

const modelValue = defineModel<boolean>();

const props = defineProps<{
  updatedRequest?: IOrderTypeForm & IDeliverTypeForm;
}>();

const areRequiredFieldsFilled = computed(() => {
  return !!props.updatedRequest?.fromCity && !!props.updatedRequest?.toCity;
});
</script>
