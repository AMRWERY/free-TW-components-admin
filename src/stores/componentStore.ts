import { defineStore } from "pinia";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase";

export const useComponentStore = defineStore("componentStore", {
  state: () => ({
    components: [] as any[],
    categories: [] as any[],
    loading: false,
    error: null as string | null,
  }),

  actions: {
    // ✅ Add new component
    async addComponent(category: string, name: string, code: string) {
      try {
        this.loading = true;
        const docRef = await addDoc(collection(db, "components"), {
          category,
          name,
          code,
          copy_count: 0,
          created_at: serverTimestamp(),
          route: name.toLowerCase().replace(/\s+/g, "-"),
        });
        console.log("Component added with ID:", docRef.id);
        this.loading = false;
      } catch (err: any) {
        this.error = err.message;
        this.loading = false;
      }
    },

    // ✅ Fetch all categories
    async fetchCategories() {
      try {
        this.loading = true;
        const snapshot = await getDocs(collection(db, "categories"));
        this.categories = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        this.loading = false;
      } catch (err: any) {
        this.error = err.message;
        this.loading = false;
      }
    },

    // ✅ Fetch all components
    async fetchComponents() {
      try {
        this.loading = true;
        const snapshot = await getDocs(collection(db, "components"));
        this.components = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        this.loading = false;
      } catch (err: any) {
        this.error = err.message;
        this.loading = false;
      }
    },

    // ✅ Fetch single component by ID
    async fetchComponentById(id: string) {
      try {
        this.loading = true;
        const docRef = doc(db, "components", id);
        const docSnap = await getDoc(docRef);
        this.loading = false;
        if (docSnap.exists()) {
          return { id: docSnap.id, ...docSnap.data() };
        } else {
          throw new Error("Component not found");
        }
      } catch (err: any) {
        this.error = err.message;
        this.loading = false;
      }
    },

    async updateComponent(id: string, updates: any) {
      try {
        this.loading = true;
        const docRef = doc(db, "components", id);
        await updateDoc(docRef, updates);
        // Refresh components after update
        await this.fetchComponents();
        this.loading = false;
      } catch (err: any) {
        this.error = err.message;
        this.loading = false;
      }
    },
  },
});
