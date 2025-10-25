export interface Component {
  id: string;
  name: string;
  category: string;
  copy_count: number;
  code?: string;
  created_at?: any;
  route?: string;
  thumbnail?: string | null;
}
