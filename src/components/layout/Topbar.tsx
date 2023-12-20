import { useAppSelector } from "@/store/hooks";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, Button, Drawer, IconButton, Typography } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import logo from "../../assets/logo.png";
import Sidebar from "./Sidebar";

const Topbar = () => {
  const { data: session } = useSession();
  const { selectedlocation } = useAppSelector((state) => state.location);
  const [open, setOpen] = useState(false);
  const company = useAppSelector((state) => state.company.item);
  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        padding: 2,
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          height: "70px",
          width: "100px",
          // ml: { xs: "auto", sm: 0 },
          // mr: { xs: "auto", scrollMarginBlockEnd: 0 },
          display: { xs: "none", sm: "inherit" },
        }}
      >
        <Image src={logo} alt="" style={{ width: "100%", height: "100%" }} />
      </Box>
      <Box>
        <Typography
          sx={{
            color: "secondary.main",
            fontSize: { xs: 50, sm: 80 },
            textAlign: "center",
          }}
        >
          {company?.name}
        </Typography>
        {selectedlocation && (
          <Typography
            sx={{
              color: "secondary.main",
              fontSize: { xs: 15, sm: 20 },
              textAlign: "center",
            }}
          >
            {selectedlocation.name}
          </Typography>
        )}
      </Box>
      {session ? (
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            onClick={() => signOut({ callbackUrl: "/backoffice" })}
            variant="contained"
            sx={{ color: "secondary.main", backgroundColor: "success.main" }}
          >
            Sign Out
          </Button>
        </Box>
      ) : (
        <span></span>
      )}

      {session && (
        <Box sx={{ display: { xs: "inharit", sm: "none" } }}>
          <IconButton
            onClick={() => setOpen(true)}
            sx={{ color: "secondary.main" }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor={"left"}
            open={open}
            onClose={() => setOpen(false)}
            onClick={() => setOpen(false)}
          >
            <Sidebar />
          </Drawer>
        </Box>
      )}
    </Box>
  );
};

export default Topbar;
