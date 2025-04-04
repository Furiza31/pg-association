import { useUserStore } from "@/stores/User";
import { UserType } from "@/types/UserType";
import { useAPI } from "./API.service";

class Auth {
  static async login({ email, password }: { email: string; password: string }) {
    return new Promise(async (resolve, reject) => {
      await useAPI()
        .post("/auth/login", { email, password })
        .then((response) => {
          if (response.data.token) useAPI().setToken(response.data.token);
          if (response.data.user)
            useUserStore().login(response.data.user as UserType);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static async register({
    username,
    email,
    password,
    confirmPassword,
  }: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) {
    return new Promise(async (resolve, reject) => {
      await useAPI()
        .post("/auth/register", { username, email, password, confirmPassword })
        .then((response) => {
          if (response.data.token) useAPI().setToken(response.data.token);
          if (response.data.user)
            useUserStore().login(response.data.user as UserType);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static async isAuthenticated() {
    try {
      const response = await useAPI().get("/auth/validate");
      if (response.status !== 200) {
        this.logout();
        return false;
      }
      return useAPI().getToken() !== null && useUserStore().isAuthenticated;
    } catch (error) {
      this.logout();
      return false;
    }
  }

  static async logout() {
    useAPI().setToken(null);
    useUserStore().logout();
  }
}

export const useAuth = () => Auth;
