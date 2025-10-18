import { defineStore } from "pinia";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  serverTimestamp,
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
    // ✅ Add new component with HTML and script code
    async addComponent(
      category: string,
      name: string,
      codeHtml: string,
      codeScript: string
    ) {
      try {
        this.loading = true;
        const docRef = await addDoc(collection(db, "components"), {
          category,
          name,
          codeHtml, // Store HTML code
          codeScript, // Store script code
          copy_count: 0,
          created_at: serverTimestamp(),
          route: name.toLowerCase().replace(/\s+/g, "-"),
        });
        console.log("Component added with ID:", docRef.id, "Data:", {
          category,
          name,
          codeHtml,
          codeScript,
        });
        this.loading = false;
        // Refresh components to reflect the new data
        await this.fetchComponents();
      } catch (err: any) {
        this.error = err.message;
        this.loading = false;
        console.error("Error adding component:", err);
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
  },
});
