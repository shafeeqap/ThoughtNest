import { NavLinksType } from "@/types/blog";
import { IoHomeOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { TbReportSearch } from "react-icons/tb";
import { IoLogoBuffer } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineMenu, AiOutlineQuestionCircle } from "react-icons/ai";

export const navLinks: NavLinksType[] = [
  { id: 1, url: "#", label: "Home", icon: IoHomeOutline },
  { id: 2, url: "#", label: "About", icon: IoLogoBuffer },
  { id: 3, url: "#", label: "Destination", icon: IoLogoBuffer },
  { id: 4, url: "#", label: "Blog", icon: IoLogoBuffer },
  { id: 5, url: "#", label: "Dashboard", icon: MdOutlineDashboard },
  { id: 6, url: "#", label: "Contact", icon: TbReportSearch },
];
