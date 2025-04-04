<script setup lang="ts">
import { Button, ButtonVariants } from "@/components/ui/button";
import { historyService } from "@/services/history.service";
import { PrimitiveProps } from "radix-vue";
import { HTMLAttributes, onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";

interface Props extends PrimitiveProps {
  variant?: ButtonVariants["variant"];
  size?: ButtonVariants["size"];
  class?: HTMLAttributes["class"];
  classIfNoPreviousRoute?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
  as: "button",
});
const router = useRouter();
const historyServiceInstance = historyService.getInstance();
const hasPreviousRoute = ref(historyServiceInstance.getHistory().length > 1);

function updateHasPreviousRoute() {
  hasPreviousRoute.value = historyServiceInstance.getHistory().length > 1;
}

function goBack() {
  const previousRoute = historyServiceInstance.pop();
  if (previousRoute) {
    router.push(previousRoute.fullPath);
  }
}

onMounted(() => {
  historyServiceInstance.events.on("update", updateHasPreviousRoute);
});

onUnmounted(() => {
  historyServiceInstance.events.off("update", updateHasPreviousRoute);
});
</script>

<template>
  <Button
    v-if="hasPreviousRoute"
    :as="as"
    :as-child="asChild"
    :class="props.class"
    :variant="props.variant"
    :size="props.size"
    @click="goBack"
  >
    <slot />
  </Button>
  <div v-else :class="props.classIfNoPreviousRoute"></div>
</template>
