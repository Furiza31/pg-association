<script setup lang="ts">
import RadioItem from "@/components/settings/language/RadioItem.vue";
import { RadioGroup } from "@/components/ui/radio-group";
import { useAPI } from "@/services/API.service";
import { useTranslation } from "@/services/translation.service";
import { useUserStore } from "@/stores/User";
import { Ref, ref } from "vue";
import { toast } from "vue-sonner";

const { t, availableLocales, locale } = useTranslation();
const api = useAPI();
const userStore = useUserStore();
const isLoading = availableLocales.reduce((acc, locale) => {
  acc[locale] = ref(false);
  return acc;
}, {} as { [key: string]: Ref<boolean> });

const onUpdate = async (value: string) => {
  isLoading[value].value = true;
  try {
    locale.value = value as any;
    userStore.setLanguage(value);
    await api.put("/user/edit", { language: value });
  } catch (error: any) {
    toast.error(t("Language_Update_Error"));
    console.error(error);
    isLoading[value].value = false;
    return;
  }
  toast.success(t("Language_Update_Success"));
  isLoading[value].value = false;
};
</script>

<template>
  <section class="h-full w-full bg-background p-3">
    <RadioGroup :default-value="locale" @update:model-value="onUpdate">
      <RadioItem
        v-for="availableLocale in availableLocales"
        :key="availableLocale"
        :id="availableLocale"
        :value="availableLocale"
        :label="t(availableLocale)"
        :isLoading="isLoading[availableLocale].value"
      />
    </RadioGroup>
  </section>
</template>
