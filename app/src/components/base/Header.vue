<script setup lang="ts">
import BackButton from "@/components/base/BackButton.vue";
import SideBar from "@/components/base/SideBar.vue";
import { useTranslation } from "@/services/translation.service";
import { ArrowLeft } from "lucide-vue-next";
import { useRoute } from "vue-router";

const route = useRoute();
const { t } = useTranslation();
</script>

<template>
  <header
    class="sticky top-0 left-0 h-14 w-full flex flex-row justify-between items-center p-3 backdrop-blur-md rounded-b-xl shadow-sm z-50"
  >
    <div>
      <BackButton
        size="icon"
        variant="ghost"
        class-if-no-previous-route="h-10 w-10"
      >
        <ArrowLeft class="size-7" />
      </BackButton>
    </div>
    <div>
      <Transition name="slide-up" mode="out-in">
        <h1 :key="route.name">
          {{ route.name ? t(route.name.toString()) : "" }}
        </h1>
      </Transition>
    </div>
    <SideBar />
  </header>
</template>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.15s ease;
}

.slide-up-enter-from {
  filter: blur(1.5px);
  opacity: 0;
  transform: translateY(10px);
}
.slide-up-leave-to {
  filter: blur(1.5px);
  opacity: 0;
  transform: translateY(-10px);
}
</style>
