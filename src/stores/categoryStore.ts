import { defineStore } from "pinia";
import { ref } from "vue";
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

  // Add new category
  const addCategory = async (name: string) => {
    try {
      loading.value = true;
      error.value = null;
      const docRef = await addDoc(collection(db, "categories"), {
        name,
        created_at: serverTimestamp(),
      });
      await fetchCategories(); // Refresh list
      return docRef.id;
    } catch (err: any) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Update category
  const updateCategory = async (id: string, name: string) => {
    try {
      loading.value = true;
      error.value = null;
      const categoryRef = doc(db, "categories", id);
      await updateDoc(categoryRef, {
        name,
        updated_at: serverTimestamp(),
      });
      await fetchCategories(); // Refresh list
    } catch (err: any) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Delete category
  const deleteCategory = async (id: string) => {
    try {
      loading.value = true;
      error.value = null;
      const categoryRef = doc(db, "categories", id);
      await deleteDoc(categoryRef);
      await fetchCategories(); // Refresh list
    } catch (err: any) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Fetch all categories (ordered by name)
  const fetchCategories = async () => {
    try {
      loading.value = true;
      error.value = null;
      const q = query(collection(db, "categories"), orderBy("name"));
      const snapshot = await getDocs(q);
      categories.value = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Category[];
    } catch (err: any) {
      error.value = err.message;
      console.error("Error fetching categories:", err);
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
