
export type Category = "All" | "Technology" | "Startup" | "Lifestyle";

export interface BlogItemType {
  _id: string;
  title: string;
  category: Category;
  image: string;
  description: string;
  date: number ;
  author: string;
  authorImg: string;
}