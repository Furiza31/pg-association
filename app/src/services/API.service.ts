import { useLocalStorage } from "./localStorage.service";

class API {
  private static instance: API;
  private readonly apiUrl: string;
  private token: string | null;

  private constructor() {
    this.apiUrl = "/api";
    this.token = useLocalStorage().get("token");
  }

  static getInstance(): API {
    if (!API.instance) {
      API.instance = new API();
    }
    return API.instance;
  }

  async get(path: string): Promise<any> {
    const response = await fetch(`${this.apiUrl}${path}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
    return {
      ...(await response.json()),
      status: response.status,
    };
  }

  async post(path: string, data: any): Promise<any> {
    const response = await fetch(`${this.apiUrl}${path}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    });
    return {
      ...(await response.json()),
      status: response.status,
    };
  }

  async put(path: string, data: any): Promise<any> {
    const response = await fetch(`${this.apiUrl}${path}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    });
    return {
      ...(await response.json()),
      status: response.status,
    };
  }

  async delete(path: string): Promise<any> {
    const response = await fetch(`${this.apiUrl}${path}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
    return {
      ...(await response.json()),
      status: response.status,
    };
  }

  getToken() {
    return this.token;
  }

  setToken(token: string | null) {
    this.token = token;
    useLocalStorage().set("token", token);
  }
}

export const useAPI = () => API.getInstance();
