import { TbReportSearch } from "react-icons/tb";
import { IoLogoBuffer } from "react-icons/io5";
import { MdOutlineDashboard, MdUnsubscribe } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { NavLinksType } from "@/types/nav";

export const adminNavLinks: NavLinksType[] = [
  { id: 1, url: "/admin", label: "Dashboard", icon: MdOutlineDashboard },
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
  { id: 5, url: "#", label: "Category", icon: IoLogoBuffer },
  { id: 6, url: "#", label: "Users", icon: FaUserCircle },
];

export const navLink: NavLinksType[] = [
  { id: 1, url: "/", label: "Home" },
  { id: 2, url: "/profile", label: "Profile" },
  { id: 3, url: "/blog", label: "Blog" },
  { id: 4, url: "/about", label: "About" },
  { id: 5, url: "/contact", label: "Contact" },
  // { id: 6, url: "/login", label: "Login" },
  // { id: 7, url: "/logout", label: "Logout" },
];
