<script setup lang="ts">
import { Button } from "@/components/ui/button";
import Avatar from "@/components/user/Avatar.vue";
import { useTranslation } from "@/services/translation.service";
import { Languages } from "lucide-vue-next";
import { RouterLink } from "vue-router";

const { t } = useTranslation();
</script>

<template>
  <section class="h-full w-full bg-background p-3">
    <nav class="h-full w-full flex flex-col items-center justify-start gap-2">
      <div class="flex flex-row items-center justify-center w-full">
        <Button variant="ghost" size="icon" class="rounded-full size-20">
          <Avatar class="size-20" />
        </Button>
      </div>
      <p class="text-muted-foreground text-center text-sm pb-2">
        {{ t("Settings_Description") }}
      </p>
      <RouterLink
        :to="{ name: 'Language' }"
        exactActiveClass="group active"
        class="w-full"
      >
        <Button
          class="flex flex-row items-center justify-start w-full px-2 py-1 gap-3 bg-secondary-foreground group-[.active]:bg-primary"
        >
          <Languages class="size-5" />
          <span> {{ t("Language") }} </span>
        </Button>
      </RouterLink>
    </nav>
  </section>
</template>
