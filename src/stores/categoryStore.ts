import { defineStore } from "pinia";
import { ref } from "vue";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/firebase";

export const useCategoryStore = defineStore("categoryStore", () => {
  const categories = ref<any[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // ✅ Add new category
  const addCategory = async (name: string) => {
    try {
      loading.value = true;
      error.value = null;
      const docRef = await addDoc(collection(db, "categories"), {
        name,
        created_at: serverTimestamp(),
      });
      console.log("Category added with ID:", docRef.id);
      categories.value.push({ id: docRef.id, name });
    } catch (err: any) {
      error.value = err.message;
      console.error("Error adding category:", err);
    } finally {
      loading.value = false;
    }
  };

  // ✅ Fetch all categories
  const fetchCategories = async () => {
    try {
      loading.value = true;
      const snapshot = await getDocs(collection(db, "categories"));
      categories.value = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (err: any) {
      error.value = err.message;
      console.error("Error fetching categories:", err);
    } finally {
      loading.value = false;
    }
  };

  return { categories, loading, error, addCategory, fetchCategories };
});
