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
      this.loading = true;
      this.error = null;
      try {
        let thumbnailBase64: string | null = null;
        if (thumbnail) {
          thumbnailBase64 = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(thumbnail);
          });
        }
        await addDoc(collection(db, "components"), {
          category,
          name,
          code,
          copy_count: 0,
          created_at: serverTimestamp(),
          route: name.toLowerCase().replace(/\s+/g, "-"),
          thumbnail: thumbnailBase64,
        });
        await this.fetchComponents();
      } catch (err: any) {
        this.error = err.message;
        throw err;
      } finally {
        this.loading = false;
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
      this.loading = true;
      this.error = null;
      try {
        let thumbnailBase64: string | null | undefined = undefined;
        if (updates.thumbnail instanceof File) {
          thumbnailBase64 = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(updates.thumbnail!);
          });
        } else if (updates.thumbnail === null) {
          thumbnailBase64 = null;
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

        await updateDoc(doc(db, "components", id), updateData);
        await this.fetchComponents();
      } catch (err: any) {
        this.error = err.message;
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async fetchComponentById(id: string) {
      this.loading = true;
      this.error = null;
      try {
        const docSnap = await getDoc(doc(db, "components", id));
        if (docSnap.exists()) {
          return { id: docSnap.id, ...docSnap.data() };
        } else {
          throw new Error("Component not found");
        }
      } catch (err: any) {
        this.error = err.message;
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async fetchCategories() {
      this.loading = true;
      this.error = null;
      try {
        const snapshot = await getDocs(collection(db, "categories"));
        this.categories = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      } catch (err: any) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    async fetchComponents() {
      this.loading = true;
      this.error = null;
      try {
        const snapshot = await getDocs(collection(db, "components"));
        this.components = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      } catch (err: any) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    async deleteComponent(id: string) {
      this.loading = true;
      this.error = null;
      try {
        await deleteDoc(doc(db, "components", id));
        await this.fetchComponents();
      } catch (err: any) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
  },
});
