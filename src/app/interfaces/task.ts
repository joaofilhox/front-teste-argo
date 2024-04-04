export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  created_at?: string;
  updated_at?: string;
  owner?: number
}
