"use client";

import { Container, Box } from "@mui/material";

import DashboardLayout from "@/app/components/dashboard/DashboardLayout";

import ProfileInfo from "./components/ProfileInfo";
import ChangePassword from "./components/ChangePassword";

export default function ProfilePage() {
  return (
    <DashboardLayout>
      <Container
        maxWidth="md"
        sx={{
          py: { xs: 3, sm: 4, md: 5 },
          px: { xs: 2, sm: 3 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <ProfileInfo />

          <ChangePassword />
        </Box>
      </Container>
    </DashboardLayout>
  );
}