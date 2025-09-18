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
  totalViews?: number;
  totalBlogs?: number;
  status: string;
  action: string;
}

export type DashboardResponse = {
  blogData: {
    totalBlogs: number;
    blogByStatus: { status: string; count: number }[];
    blogAction: { action: string; count: number }[];
    blogByCategory: { category: string; count: number }[];
  };
  userData: {
    totalUser: number;
    userBystatus: { status: string; count: number }[];
  };
  catData: {
    totalCategory: number;
    catStatus: { status: string; count: number }[];
  };
  subData: {
    totalSub: number;
    subscriberStatus: { status: string; count: number }[];
  };
  authorCount: { role: string; count: number }[];
};
