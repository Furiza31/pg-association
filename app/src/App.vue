<script setup lang="ts">
import { Toaster } from "@/components/ui/sonner";
import { useTranslation } from "@/services/translation.service";
import { useUserStore } from "@/stores/User";
import { onMounted } from "vue";
import { RouterView } from "vue-router";

const { locale } = useTranslation();
const userStore = useUserStore();

onMounted(() => {
  locale.value = (userStore.user.language as any) || "en-US";
});
</script>

<template>
  <Toaster richColors position="bottom-center" />
  <RouterView v-slot="{ Component }">
    <section class="h-full w-full">
      <Component :is="Component" />
    </section>
  </RouterView>
</template>
