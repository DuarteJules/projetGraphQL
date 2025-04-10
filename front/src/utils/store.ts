// store.js
import { create } from 'zustand'
import { userStoreType, User } from "@/utils/storeInterface.ts";

export const userStore  = create<userStoreType>((set) => ({
   user: null,
   updateUser: (user: User | null) => {
     set({ user })
   },
   token : null,
   updateToken: (token: string | null) => {
      set({ token })
   },
}))

export default userStore;
