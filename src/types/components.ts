export interface Component {
  id: string;
  name: string;
  category: string;
  copy_count: number;
  code?: string; // Optional if not always present
  created_at?: any; // Timestamp from Firestore
  route?: string;
}
