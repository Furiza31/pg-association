<script setup lang="ts">
import { useForm } from "vee-validate";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RegisterSchema } from "@/schemas/RegisterSchema";
import { useAuth } from "@/services/auth.service";
import { useTranslation } from "@/services/translation.service";
import { Home, LoaderCircle } from "lucide-vue-next";
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { toast } from "vue-sonner";

const { t } = useTranslation();
const auth = useAuth();
const router = useRouter();
const isLoading = ref(false);

const formSchema = RegisterSchema;

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit(async (values) => {
  isLoading.value = true;
  try {
    await auth.register(values);
  } catch (error: any) {
    toast.error(t("Register_Failed"));
    console.error(error);
    isLoading.value = false;
    return;
  }
  toast.success(t("Register_Success"));
  router.push({
    name: "Dashboard",
  });
  isLoading.value = false;
});
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle class="flex flex-row flex-nowrap w-full justify-between mb-2">
        <span> {{ t("Register") }}</span>
        <RouterLink to="/">
          <Home class="size-6 text-primary" />
        </RouterLink>
      </CardTitle>
      <CardDescription class="text-justify">
        {{ t("Register_Description") }}
      </CardDescription>
    </CardHeader>
    <form @submit="onSubmit">
      <CardContent class="space-y-2">
        <FormField v-slot="{ componentField }" name="username">
          <FormItem>
            <FormLabel>{{ t("Username") }}</FormLabel>
            <FormControl>
              <Input type="text" v-bind="componentField" />
            </FormControl>
            <FormMessage :message="t('Register_Username_Error')" />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="email">
          <FormItem>
            <FormLabel>{{ t("Email") }}</FormLabel>
            <FormControl>
              <Input type="text" v-bind="componentField" />
            </FormControl>
            <FormMessage :message="t('Register_Email_Error')" />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="password">
          <FormItem>
            <FormLabel>{{ t("Password") }}</FormLabel>
            <FormControl>
              <Input type="password" v-bind="componentField" />
            </FormControl>
            <FormMessage :message="t('Register_Password_Error')" />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="confirmPassword">
          <FormItem>
            <FormLabel>{{ t("Confirm_Password") }}</FormLabel>
            <FormControl>
              <Input type="password" v-bind="componentField" />
            </FormControl>
            <FormMessage :message="t('Register_Confirm_Password_Error')" />
          </FormItem>
        </FormField>
      </CardContent>
      <CardFooter class="flex flex-row justify-center items-center">
        <Button type="submit" class="w-1/2">
          <span v-if="isLoading"><LoaderCircle class="animate-spin" /></span>
          <span v-else>{{ t("Submit") }}</span>
        </Button>
      </CardFooter>
    </form>
  </Card>
</template>
