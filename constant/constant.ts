import { NavLinksType } from "@/types/blog";
import { TbReportSearch } from "react-icons/tb";
import { IoLogoBuffer } from "react-icons/io5";
import { MdOutlineDashboard, MdUnsubscribe } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";

export const navLinks: NavLinksType[] = [
  { id: 1, url: "/admin", label: "Dashboard", icon: MdOutlineDashboard },
  { id: 2, url: "/admin/addProduct", label: "AddBlog", icon: IoMdAddCircleOutline },
  { id: 3, url: "/admin/blogList", label: "BlogList", icon: TbReportSearch },
  { id: 4, url: "/admin/subscriptions", label: "Subscriptions", icon: MdUnsubscribe },
  { id: 5, url: "#", label: "Category", icon: IoLogoBuffer },
  { id: 6, url: "#", label: "Users", icon: FaUserCircle },
];
