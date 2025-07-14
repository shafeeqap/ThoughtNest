import { IconType } from "react-icons";

export type Category = "All" | "Technology" | "Startup" | "Lifestyle";

export interface BlogItemType {
  _id: string;
  title: string;
  category: Category;
  image: string;
  description: string;
  date: number | number;
  author: string;
  authorImg: string;
}

export type NavLinksType = {
  id: number;
  url: string;
  label: string;
  icon: IconType;
};
