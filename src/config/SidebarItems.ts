// src/config/sidebarItems.ts
import {
  Calendar,
  Home,
  Inbox,
  MessagesSquareIcon,
  BookText,
  LayoutDashboardIcon,
  NewspaperIcon,
  Landmark,
  ClipboardMinus,
} from "lucide-react";

interface SidebarSubItem {
  title?: string;
  url?: string;
  icon?: any;
}

interface SidebarItem {
  title?: string;
  url?: string;
  menu?: string;
  submenu?: string;
  icon?: any;
  children?: SidebarSubItem[];
}

export const sidebarItems: Record<string, SidebarItem[]> = {
  // Role: daftar menu
  admin: [
    { title: "Home", url: "/admin/home", icon: Home },
    { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboardIcon },
    { title: "Berita Desa", url: "/admin/news", icon: NewspaperIcon },
    { title: "Laporan", url: "/admin/report", icon: ClipboardMinus },
    { title: "Forum Diskusi", url: "/admin/forum", icon: MessagesSquareIcon },
    {
      title: "Panduan",
      icon: BookText,
      children: [
        { title: "Edukasi", url: "/admin/education", icon: BookText },
        {
          title: "Video Pembelajaran",
          url: "/admin/education/videos",
          icon: BookText,
        },
        {
          title: "E-Book Gratis",
          url: "/admin/education/ebooks",
          icon: BookText,
        },
      ],
    },
  ],

  user: [
    { title: "Home", url: "/user/home", icon: Home },
    { title: "Dashboard", url: "/user/dashboard", icon: LayoutDashboardIcon },
    { title: "Berita Desa", url: "/user/news", icon: NewspaperIcon },
    { title: "Laporan", url: "/user/report", icon: ClipboardMinus },
    { title: "E-Gov", url: "/user/e-gov", icon: Landmark },
    { title: "Forum Diskusi", url: "/user/forum", icon: MessagesSquareIcon },
    {
      title: "Panduan",
      icon: BookText,
      children: [
        { title: "Edukasi", url: "/admin/education", icon: BookText },
        {
          title: "Video Pembelajaran",
          url: "/admin/education/videos",
          icon: BookText,
        },
        {
          title: "E-Book Gratis",
          url: "/admin/education/ebooks",
          icon: BookText,
        },
      ],
    },
  ],
};
