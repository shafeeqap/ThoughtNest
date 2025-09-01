export type Category = "All" | "Technology" | "Startup" | "Lifestyle";

export interface BlogItemType {
  _id: string;
  title: string;
  category: Category;
  image: string;
  description: string;
  author: string;
  authorImg: string;
  status: string;
  createdAt: string;
  updatedAt?: string;
}
