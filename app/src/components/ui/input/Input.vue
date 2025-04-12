<script setup lang="ts">
import { cn } from "@/lib/utils";
import { useVModel } from "@vueuse/core";
import { Eye, EyeOff } from "lucide-vue-next";
import type { HTMLAttributes } from "vue";
import { computed, ref } from "vue";

const props = defineProps<{
  type?: string;
  defaultValue?: string | number;
  modelValue?: string | number;
  class?: HTMLAttributes["class"];
}>();

const emits = defineEmits<{
  (e: "update:modelValue", payload: string | number): void;
}>();

const modelValue = useVModel(props, "modelValue", emits, {
  passive: true,
  defaultValue: props.defaultValue,
});

const showPassword = ref(false);

const inputType = computed(() => {
  if (props.type === "password") {
    return showPassword.value ? "text" : "password";
  }
  return props.type || "text";
});

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};
</script>

<template>
  <div class="relative flex items-center w-full">
    <input
      v-model="modelValue"
      :type="inputType"
      :class="
        cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          props.class
        )
      "
    />
    <button
      v-if="props.type === 'password'"
      type="button"
      @click="togglePassword"
      class="absolute right-3 flex items-center text-muted-foreground focus:outline-none bg-none border-none cursor-pointer"
    >
      <component :is="showPassword ? EyeOff : Eye" class="w-5 h-5" />
    </button>
  </div>
</template>
