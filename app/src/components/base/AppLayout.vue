<script setup lang="ts">
import { RouterView } from "vue-router";
import Header from "./Header.vue";
</script>

<template>
  <Header />
  <main class="h-[calc(100%_-_3.5rem)] w-full bg-accent-foreground">
    <RouterView v-slot="{ Component }">
      <Transition name="scale" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </main>
</template>

<style scoped>
.scale-enter-active,
.scale-leave-active {
  transition: all 0.15s ease;
}

.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
  filter: blur(1.5px);
  border-radius: 10px;
}
</style>
