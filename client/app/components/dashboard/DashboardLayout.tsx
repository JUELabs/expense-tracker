"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { Box, Typography } from "@mui/material";

import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";

import { API_URL } from "@/lib/api";

type User = {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
};

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const drawerWidth = 240;

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState<User | null>(null);
  const [message, setMessage] = useState("Loading");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await fetch(`${API_URL}/auth/me`, {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
          router.push("/login");
          return;
        }

        setUser(data.data);
      } catch {
        setMessage(
          "An error occurred while loading user data."
        );
      }
    };

    getCurrentUser();
  }, [router]);

  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      await response.json();

      if (!response.ok) {
        return;
      }

      router.push("/login");
    } catch {}
  };

  if (!user) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "background.default",
        }}
      >
        <Typography color="text.secondary">
          {message}
        </Typography>
      </Box>
    );
  }

  const title =
    pathname === "/expenses"
      ? "Expenses"
      : "Dashboard";

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "background.default",
      }}
    >
      <Sidebar
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onLogout={handleLogout}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,
        }}
      >
        <TopNavbar
          user={user}
          title={title}
          onMenuClick={() => setMobileOpen(true)}
        />

        {children}
      </Box>
    </Box>
  );
}
