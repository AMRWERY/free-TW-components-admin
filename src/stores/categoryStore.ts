import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "@/firebase";
import type { Category } from "@/types/categories";

export const useCategoryStore = defineStore("categoryStore", () => {
  const categories = ref<Category[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchCategories = async () => {
    loading.value = true;
    error.value = null;
    try {
      const q = query(collection(db, "categories"), orderBy("name"));
      const snapshot = await getDocs(q);
      categories.value = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Category[];
    } catch (err: any) {
      error.value = err.message;
      // Don't rethrow — callers (add/update/delete) already succeeded;
      // a refresh failure shouldn't mask a successful mutation.
    } finally {
      loading.value = false;
    }
  };

  const addCategory = async (name: string) => {
    loading.value = true;
    error.value = null;
    try {
      const docRef = await addDoc(collection(db, "categories"), {
        name,
        created_at: serverTimestamp(),
      });
      await fetchCategories();
      return docRef.id;
    } catch (err: any) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const updateCategory = async (id: string, name: string) => {
    loading.value = true;
    error.value = null;
    try {
      await updateDoc(doc(db, "categories", id), {
        name,
        updated_at: serverTimestamp(),
      });
      await fetchCategories();
    } catch (err: any) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const deleteCategory = async (id: string) => {
    loading.value = true;
    error.value = null;
    try {
      await deleteDoc(doc(db, "categories", id));
      await fetchCategories();
    } catch (err: any) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    categories,
    loading,
    error,
    addCategory,
    updateCategory,
    deleteCategory,
    fetchCategories,
  };
});
