import { StaticImageData } from "next/image";

export type Category = "All" | "Technology" | "Startup" | "Lifestyle";

export interface BlogItemType {
  id: number;
  title: string;
  category: Category;
  image: StaticImageData;
  description: string;
  date: number;
  author: string;
  author_img: StaticImageData;
}
