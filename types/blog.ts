interface Category {
  _id: string;
  categoryName: string;
  description?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type BlogStatus = "approved" | "rejected";
export interface BlogItemType {
  _id: string;
  userId: string;
  title: string;
  category: Category;
  image: File | null;
  description: string;
  author: string;
  authorImg: string;
  status: BlogStatus;
  action: "active" | "blocked";
  createdAt: string;
  updatedAt?: string;
}
