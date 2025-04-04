<script lang="ts" setup>
import { ErrorMessage } from "vee-validate";
import { toValue } from "vue";
import { useFormField } from "./useFormField";

const props = defineProps<{
  message: string;
}>();

const { name, formMessageId } = useFormField();
</script>

<template>
  <ErrorMessage
    :id="formMessageId"
    as="p"
    :name="toValue(name)"
    class="text-sm font-medium text-destructive"
  >
    {{ props.message }}
  </ErrorMessage>
</template>
