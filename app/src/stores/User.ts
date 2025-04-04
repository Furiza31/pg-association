import { useLocalStorage } from "@/services/localStorage.service";
import { UserType } from "@/types/UserType";
import { defineStore } from "pinia";
import { computed, Ref, ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const setUserToNull = (): UserType => {
    return {
      id: null,
      username: null,
      email: null,
      language: null,
      createdAt: null,
      updatedAt: null,
      role: null,
    };
  };

  const user: Ref<UserType> = ref(
    useLocalStorage().get("user")
      ? (JSON.parse(useLocalStorage().get("user") as string) as UserType)
      : setUserToNull()
  );
  const isAuthenticated = computed(() => user.value.id !== null);

  const login = (userData: UserType) => {
    useLocalStorage().set("user", JSON.stringify(userData));
    user.value = userData;
  };

  const logout = () => {
    useLocalStorage().remove("user");
    user.value = setUserToNull();
  };

  const setLanguage = (language: string) => {
    user.value.language = language;
    useLocalStorage().set("user", JSON.stringify(user.value));
  };

  return {
    user,
    isAuthenticated,
    login,
    logout,
    setLanguage,
  };
});
