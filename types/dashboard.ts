import { IconType } from "react-icons";

export interface dashboardCardType {
  id: number;
  title: string;
  icon: IconType;
  value: number;
  trend: string;
  trendType: string;
  period: string;
  url: string;
  mostViewedBlog?: string;
  totalViews?:number,
  totalBlogs?:number,
  status: string;
  action: string;
}
