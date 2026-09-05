"use client";

import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

type User = {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
};

type TopNavbarProps = {
  user: User;
  onMenuClick: () => void;
  title: string;
};

export default function TopNavbar({
  user,
  onMenuClick,
  title,
}: TopNavbarProps) {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "background.paper",
        color: "text.primary",
        borderBottom: "1px solid #E2E8F0",
      }}
    >
      <Toolbar
        sx={{
          px: {
            xs: 2,
            sm: 3,
            md: 4,
          },
          minHeight: {
            xs: 64,
            sm: 72,
          },
        }}
      >
        <IconButton
          edge="start"
          onClick={onMenuClick}
          sx={{
            display: {
              xs: "inline-flex",
              md: "none",
            },
            mr: 1,
          }}
        >
          <MenuIcon />
        </IconButton>

        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: {
                xs: "1rem",
                sm: "1.15rem",
              },
            }}
          >
            {title}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <AccountCircleIcon
            sx={{
              color: "text.secondary",
              fontSize: {
                xs: 30,
                sm: 34,
              },
            }}
          />

          <Box
            sx={{
              display: {
                xs: "none",
                sm: "block",
              },
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
              }}
            >
              {user.first_name} {user.last_name}
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
            >
              @{user.username}
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}