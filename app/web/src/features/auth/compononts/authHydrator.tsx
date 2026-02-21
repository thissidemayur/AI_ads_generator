//If we don't use a Hydrator, our Sidebar will show "Loading..." or be blank for a second while the browser makes another API call to fetch the same data the server already had.
"use client"
import { ITenantStore, IUserStore, useAuthStore } from "@/store/authStore";
import { useRef } from "react";

export function AuthHydrator({user,tenant}:{user:IUserStore,tenant:ITenantStore}) {
    const initialized = useRef(false)
    if (!initialized.current) {
      // sync data to zustand immeditaley
      useAuthStore.getState().setAuth(user, tenant, "");

      // ensure cookieExist
      if(tenant?.id) {
        setCookie("activeTenantId", tenant.id, { maxAge: 60 * 60 * 24 * 7 });
      }

      initialized.current = true
    } 
}