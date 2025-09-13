import { TbReportSearch } from "react-icons/tb";
import { IoLogoBuffer } from "react-icons/io5";
import {
  MdOutlineDashboard,
  MdUnsubscribe,
  MdLogout,
  MdPermContactCalendar,
} from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaUserCircle, FaHome, FaUsers } from "react-icons/fa";
import { NavLinksType } from "@/types/nav";
import { CgProfile } from "react-icons/cg";
import { SiMicrodotblog } from "react-icons/si";
import { BsPeopleFill } from "react-icons/bs";
import { dashboardCardType } from "@/types/dashboard";


export const adminNavLinks: NavLinksType[] = [
  {
    id: 1,
    url: "/admin/dashboard",
    label: "Dashboard",
    icon: MdOutlineDashboard,
  },
  {
    id: 2,
    url: "/admin/addBlog",
    label: "AddBlog",
    icon: IoMdAddCircleOutline,
  },
  { id: 3, url: "/admin/blogList", label: "BlogList", icon: TbReportSearch },
  {
    id: 4,
    url: "/admin/subscriptions",
    label: "Subscriptions",
    icon: MdUnsubscribe,
  },
  { id: 5, url: "/admin/categoryList", label: "Category", icon: IoLogoBuffer },
  { id: 6, url: "/admin/users", label: "Users", icon: FaUserCircle },
];

export const navLink: NavLinksType[] = [
  { id: 1, url: "/", label: "Home", icon: FaHome },
  { id: 2, url: "/profile", label: "Profile", icon: CgProfile },
  { id: 3, url: "#", label: "Blogs", icon: SiMicrodotblog },
  { id: 4, url: "/about", label: "About Us", icon: FaUsers },
  { id: 5, url: "/contact", label: "Contact", icon: MdPermContactCalendar },
  { id: 6, url: "#", label: "Logout", icon: MdLogout },
];

export const dashboardCards: Omit<dashboardCardType, "status" | "action" | "value">[] = [
  {
    id: 1,
    title: "blogs",
    icon: TbReportSearch,
    trend: "+20%",
    trendType: "positive",
    period: "This Week",
    url: "/admin/blogList",
  },
  {
    id: 2,
    title: "users",
    icon: BsPeopleFill,
    trend: "+20%",
    trendType: "positive",
    period: "This Month",
    url: "/admin/users",
  },
  {
    id: 3,
    title: "categories",
    icon: IoLogoBuffer,
    trend: "+20%",
    trendType: "positive",
    period: "Today",
    url: "/admin/categoryList",
  },
  {
    id: 4,
    title: "subscribers",
    icon: MdUnsubscribe,
    trend: "+20%",
    trendType: "positive",
    period: "This Week",
    url: "/admin/subscriptions",
  },
];
