<template>
  <div>
    <button
      @click="openModal"
      class="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 text-sm"
    >
      {{ $t("form.add_attendance") }}
    </button>
    <div
      v-if="submissionMessage"
      class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4 whitespace-pre-wrap"
      role="alert"
    >
      <strong class="font-bold">{{ $t("form.submitted") }}:</strong>
      <span class="block sm:inline">{{ submissionMessage }}</span>
    </div>

    <DxPopup
      v-model:visible="showModal"
      :width="800"
      :height="600"
      :title="$t('form.add_record')"
      :showCloseButton="true"
      :dragEnabled="true"
      :closeOnOutsideClick="true"
      :scrollingEnabled="true"
    >
      <template #default>
        <div class="p-6 bg-white rounded-lg space-y-4">
          <DxForm :formData="formData" :colCount="1" labelLocation="top" class="space-y-4">
            <DxItem :label="{ text: $t('form.number') }">
              <template #default>
                <DxTextBox
                  v-model="formData.number"
                  :mask="'0000000000000000000000000000000'"
                  class="w-full"
                  placeholder="Enter Number"
                />
              </template>
            </DxItem>

            <DxItem :label="{ text: $t('form.id_card_number') }">
              <template #default>
                <DxTextBox
                  v-model="formData.identityCardNo"
                  class="w-full"
                  placeholder="Enter Identity Card Number"
                  :focusStateEnabled="false"
                />
              </template>
            </DxItem>

            <DxItem :label="{ text: $t('form.start_date_from_home') }">
              <template #default>
                <DxDateBox
                  v-model="formData.startDateFromHome"
                  type="datetime"
                  class="w-full"
                  placeholder="DD/MM/YYYY  HH:MM"
                  display-format="dd/MM/yyyy HH:mm"
                  :focusStateEnabled="false"
                />
              </template>
            </DxItem>

            <DxItem :label="{ text: $t('form.end_employment_date_from_home') }">
              <template #default>
                <DxDateBox
                  v-model="formData.endEmploymentDateFromHome"
                  type="datetime"
                  class="w-full"
                  placeholder="DD/MM/YYYY  HH:MM"
                  display-format="dd/MM/yyyy HH:mm"
                  :focusStateEnabled="false"
                />
              </template>
            </DxItem>

            <DxItem :label="{ text: $t('form.current_address_from_home') }">
              <template #default>
                <DxTextArea
                  class="w-full"
                  :height="100"
                  v-model="formData.currentAddressFromHome"
                  placeholder="Current Address"
                  :focusStateEnabled="false"
                />
              </template>
            </DxItem>

            <DxItem :label="{ text: $t('form.agency_division') }">
              <template #default>
                <DxTextBox
                  v-model="formData.agencyDivision"
                  class="w-full"
                  placeholder="Agency/Division"
                  :focusStateEnabled="false"
                />
              </template>
            </DxItem>

            <DxItem :label="{ text: $t('form.office_entry_time') }">
              <template #default>
                <DxDateBox
                  v-model="formData.entryToWork"
                  type="datetime"
                  class="w-full"
                  placeholder="DD/MM/YYYY  HH:MM"
                  display-format="dd/MM/yyyy HH:mm"
                  :focusStateEnabled="false"
                />
              </template>
            </DxItem>

            <DxItem :label="{ text: $t('form.office_end_time') }">
              <template #default>
                <DxDateBox
                  v-model="formData.endWork"
                  type="datetime"
                  class="w-full"
                  placeholder="DD/MM/YYYY  HH:MM"
                  display-format="dd/MM/yyyy HH:mm"
                  :focusStateEnabled="false"
                />
              </template>
            </DxItem>

            <DxItem :label="{ text: $t('form.geo_coordinates') }">
              <template #default>
                <DxTextBox
                  v-model="formData.geoCoordinates"
                  class="w-full"
                  placeholder="Geocordinates"
                  :focusStateEnabled="false"
                />
              </template>
            </DxItem>
          </DxForm>

          <div class="flex justify-end gap-3 pt-4 border-t mt-6">
            <button
              @click="submitForm"
              class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow"
            >
              {{ $t("form.submit") }}
            </button>
            <button
              @click="cancelForm"
              class="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg shadow"
            >
              {{ $t("form.cancel") }}
            </button>
            <button
              @click="showModal = false"
              class="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg shadow"
            >
              {{ $t("form.return") }}
            </button>
          </div>
        </div>
      </template>
    </DxPopup>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import DxForm, { DxItem } from "devextreme-vue/form";
import DxDateBox from "devextreme-vue/date-box";
import DxTextBox from "devextreme-vue/text-box";
import DxTextArea from "devextreme-vue/text-area";
import DxPopup from "devextreme-vue/popup";
import { useRecordStore } from "@/stores/recordStore";

const showModal = ref(false);

const emptyForm = () => ({
  number: "",
  identityCardNo: "",
  startDateFromHome: null,
  endEmploymentDateFromHome: null,
  currentAddressFromHome: "",
  agencyDivision: "",
  entryToWork: null,
  endWork: null,
  geoCoordinates: "",
});

const formData = reactive(emptyForm());

const recordStore = useRecordStore();
recordStore.loadRecords();

const openModal = () => {
  Object.assign(formData, emptyForm());
  showModal.value = true;
};

const submissionMessage = ref("");

const submitForm = () => {
  const record = { ...formData };
  recordStore.addRecord(record);
  submissionMessage.value = JSON.stringify(record);
  showModal.value = false;

  setTimeout(() => {
    submissionMessage.value = "";
  }, 7000);
};

const cancelForm = () => {
  Object.assign(formData, emptyForm());
  showModal.value = false;
};
</script>
