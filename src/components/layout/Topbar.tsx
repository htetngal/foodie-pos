import { useAppSelector } from "@/store/hooks";
import { Box, Button, Typography } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import logo from "../../assets/logo.png";

const Topbar = () => {
  const { data: session } = useSession();
  const { selectedlocation } = useAppSelector((state) => state.location);
  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        padding: 2,
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-between",
        alignItem: "center",
      }}
    >
      <Box
        sx={{
          height: "70px",
          width: "100px",
          ml: { xs: "auto", md: 0 },
          mr: { xs: "auto", md: 0 },
        }}
      >
        <Image src={logo} alt="" style={{ width: "100%", height: "100%" }} />
      </Box>
      <Box>
        <Typography
          sx={{
            color: "secondary.main",
            fontSize: { xs: 50, md: 100 },
            textAlign: "center",
          }}
        >
          Foodie POS
        </Typography>
        {selectedlocation && (
          <Typography
            sx={{
              color: "secondary.main",
              fontSize: { xs: 15, md: 20 },
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
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            onClick={() => signOut({ callbackUrl: "/backoffice" })}
            variant="outlined"
            sx={{ color: "secondary.main" }}
          >
            Sign Out
          </Button>
        </Box>
      ) : (
        <span></span>
      )}
    </Box>
  );
};

export default Topbar;
