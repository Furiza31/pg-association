class LocalStorage {
  static set(key: string, value: any) {
    if (value === null) {
      localStorage.removeItem(key);
      return;
    }
    localStorage.setItem(key, value);
  }

  static get(key: string) {
    return localStorage.getItem(key) || null;
  }

  static remove(key: string) {
    localStorage.removeItem(key);
  }

  static clear() {
    localStorage.clear();
  }
}

export const useLocalStorage = () => LocalStorage;
