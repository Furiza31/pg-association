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
import { LoginSchema } from "@/schemas/LoginSchema";
import { useAuth } from "@/services/auth.service";
import { useTranslation } from "@/services/translation.service";
import { Home, LoaderCircle } from "lucide-vue-next";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue-sonner";

const { t } = useTranslation();

const formSchema = LoginSchema;

const form = useForm({
  validationSchema: formSchema,
});

const auth = useAuth();
const router = useRouter();
const isLoading = ref(false);

const onSubmit = form.handleSubmit(async (values) => {
  isLoading.value = true;
  try {
    await auth.login(values);
  } catch (error: any) {
    toast.error(t("Login_Failed"));
    console.error(error);
    isLoading.value = false;
    return;
  }
  toast.success(t("Login_Success"));
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
        <span> {{ t("Login") }}</span>
        <RouterLink to="/">
          <Home class="size-6 text-primary" />
        </RouterLink>
      </CardTitle>
      <CardDescription>
        {{ t("Login_Description") }}
      </CardDescription>
    </CardHeader>
    <form @submit="onSubmit">
      <CardContent class="space-y-2">
        <FormField v-slot="{ componentField }" name="email">
          <FormItem>
            <FormLabel>{{ t("Email") }}</FormLabel>
            <FormControl>
              <Input type="text" v-bind="componentField" />
            </FormControl>
            <FormMessage :message="t('Login_Email_Error')" />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="password">
          <FormItem>
            <FormLabel>{{ t("Password") }}</FormLabel>
            <FormControl>
              <Input type="password" v-bind="componentField" />
            </FormControl>
            <FormMessage :message="t('Login_Password_Error')" />
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
