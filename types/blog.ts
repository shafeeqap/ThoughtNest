import { StaticImageData } from "next/image";
import { IconType } from "react-icons";

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

export type NavLinksType = {
  id: number;
  url: string;
  label: string;
  icon: IconType;
};
