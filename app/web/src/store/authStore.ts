import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface IUserStore {
  id: string;
  email: string;
  firstName: string;
  lastName:string
}

export interface ITenantStore {
  id: string;
  name: string;
  role: string;
}

interface AuthState {
  user: IUserStore | null;
  tenant: ITenantStore | null;
  isAuthenticated: boolean;
  accessToken: string | null;

  // actions
  setAuth: (user: IUserStore, tenant: ITenantStore, token: string) => void;
  setAccessToken: (token: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      tenant: null,
      accessToken: null,
      isAuthenticated: false,

      setAuth: (user, tenant, accessToken) =>
        set({ user, tenant, accessToken, isAuthenticated: true }),
      setAccessToken: (token) => set({ accessToken: token }),
      clearAuth: () => set({
        user: null,
        tenant: null,
        accessToken: null,
        isAuthenticated: false,
      }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
      //   we are not persisting token
      partialize: (state) => ({
        user: state.user,
        tenant: state.tenant,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
