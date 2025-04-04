<script setup lang="ts">
import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { LoaderCircle } from "lucide-vue-next";

const props = defineProps({
  id: String,
  value: String,
  label: String,
  isLoading: Boolean,
});
</script>

<template>
  <div class="flex items-center w-full">
    <Label
      :for="props.id"
      class="cursor-pointer flex items-center justify-start gap-2 w-full bg-primary-foreground border border-muted p-3 rounded"
    >
      <LoaderCircle v-if="props.isLoading" class="animate-spin size-4" />
      <RadioGroupItem
        v-else
        :id="props.id"
        :value="props.value"
        class="size-4"
      />
      <span class="text-base">{{ props.label }}</span>
    </Label>
  </div>
</template>
