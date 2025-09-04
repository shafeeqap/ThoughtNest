export interface Category {
  _id: string;
  categoryName: string;
  description?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface BlogItemType {
  _id: string;
  title: string;
  category: Category;
  image: string;
  description: string;
  author: string;
  authorImg: string;
  status: "pending" | "approved" | "rejected";
  action: "active" | "blocked";
  createdAt: string;
  updatedAt?: string;
}
