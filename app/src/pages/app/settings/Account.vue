<script setup lang="ts">
import { useTranslation } from "@/services/translation.service";

const { t } = useTranslation();
</script>

<template>
  <section class="h-full w-full bg-background p-3">
    <h1>{{ t("Settings") }}</h1>
  </section>
</template>
