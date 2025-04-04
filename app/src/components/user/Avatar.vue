<script setup lang="ts">
import { useUserStore } from "@/stores/User";
import { micah } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { HTMLAttributes } from "vue";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();

const userStore = useUserStore();
const avatar = createAvatar(micah, {
  seed: userStore.user.email as string,
}).toDataUri();
</script>

<template>
  <img :class="props.class" :src="avatar" alt="avatar" />
</template>
