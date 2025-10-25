import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
  deleteDoc,
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
    async addComponent(
      category: string,
      name: string,
      code: string,
      thumbnail: File | null
    ) {
      try {
        this.loading = true;
        let thumbnailBase64: string | null = null;
        if (thumbnail) {
          thumbnailBase64 = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
              const result = reader.result as string;
              resolve(result);
            };
            reader.onerror = (error) => {
              console.error("Error converting thumbnail:", error);
              reject(error);
            };
            reader.readAsDataURL(thumbnail);
          });
        } else {
        }
        const docRef = await addDoc(collection(db, "components"), {
          category,
          name,
          code,
          copy_count: 0,
          created_at: serverTimestamp(),
          route: name.toLowerCase().replace(/\s+/g, "-"),
          thumbnail: thumbnailBase64,
        });
        await this.fetchComponents();
        this.loading = false;
      } catch (err: any) {
        this.error = err.message;
        this.loading = false;
        throw err;
      }
    },

    async updateComponent(
      id: string,
      updates: {
        category: string;
        name: string;
        code: string;
        thumbnail?: File | null | undefined;
      }
    ) {
      try {
        this.loading = true;
        let thumbnailBase64: string | null | undefined = undefined;
        if (updates.thumbnail instanceof File) {
          thumbnailBase64 = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
              const result = reader.result as string;
              resolve(result);
            };
            reader.onerror = (error) => {
              console.error("Error converting thumbnail:", error);
              reject(error);
            };
            reader.readAsDataURL(updates.thumbnail!);
          });
        } else if (updates.thumbnail === null) {
          thumbnailBase64 = null;
        } else {
        }
        const updateData: {
          category: string;
          name: string;
          code: string;
          thumbnail?: string | null;
        } = {
          category: updates.category,
          name: updates.name,
          code: updates.code,
        };
        if (thumbnailBase64 !== undefined) {
          updateData.thumbnail = thumbnailBase64;
        }
        const docRef = doc(db, "components", id);
        await updateDoc(docRef, updateData);
        await this.fetchComponents();
        this.loading = false;
      } catch (err: any) {
        this.error = err.message;
        this.loading = false;
        throw err;
      }
    },

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
        throw err;
      }
    },

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

    async deleteComponent(id: string) {
      try {
        this.loading = true;
        const docRef = doc(db, "components", id);
        await deleteDoc(docRef);
        await this.fetchComponents();
        this.loading = false;
      } catch (err: any) {
        this.error = err.message;
        this.loading = false;
      }
    },
  },
});
