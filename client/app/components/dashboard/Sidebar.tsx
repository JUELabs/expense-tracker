"use client";

import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import LogoutIcon from "@mui/icons-material/Logout";

import { useRouter, usePathname } from "next/navigation";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

type SidebarProps = {
  drawerWidth: number;
  mobileOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
};

export default function Sidebar({
  drawerWidth,
  mobileOpen,
  onClose,
  onLogout,
}: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (path: string) => {
    router.push(path);
    onClose();
  };

  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ p: 3 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            color: "primary.main",
          }}
        >
          Expenses
        </Typography>
      </Box>

      <Divider />

      <List sx={{ px: 1.5, pt: 2 }}>
  <ListItemButton
    selected={pathname === "/dashboard"}
    onClick={() => handleNavigation("/dashboard")}
    sx={{
      borderRadius: 2,
      mb: 1,
    }}
  >
    <ListItemIcon>
      <DashboardIcon
        color={pathname === "/dashboard" ? "primary" : "inherit"}
      />
    </ListItemIcon>

    <ListItemText primary="Dashboard" />
  </ListItemButton>

  <ListItemButton
    selected={pathname === "/expenses"}
    onClick={() => handleNavigation("/expenses")}
    sx={{
      borderRadius: 2,
      mb: 1,
    }}
  >
    <ListItemIcon>
      <ReceiptLongIcon
        color={pathname === "/expenses" ? "primary" : "inherit"}
      />
    </ListItemIcon>

    <ListItemText primary="Expenses" />
  </ListItemButton>

  <ListItemButton
    selected={pathname === "/profile"}
    onClick={() => handleNavigation("/profile")}
    sx={{
      borderRadius: 2,
    }}
  >
    <ListItemIcon>
      <AccountCircleIcon
        color={pathname === "/profile" ? "primary" : "inherit"}
      />
    </ListItemIcon>

    <ListItemText primary="Profile" />
  </ListItemButton>
</List>

      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ p: 2 }}>
        <Divider sx={{ mb: 1 }} />

        <ListItemButton
          onClick={onLogout}
          sx={{
            borderRadius: 2,
          }}
        >
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>

          <ListItemText primary="Logout" />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { md: drawerWidth },
        flexShrink: { md: 0 },
      }}
    >
      {/* Mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop */}
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            borderRight: "1px solid #E2E8F0",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}