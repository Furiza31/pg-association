<script setup lang="ts">
import { useTranslation } from "@/services/translation.service";

const { t } = useTranslation();
</script>

<template>
  <section class="h-full w-full bg-background p-3">
    <div class="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4"></div>
  </section>
</template>
