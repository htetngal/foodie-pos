import { Box, Button, Typography } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import logo from "../../assets/logo.png";

const Topbar = () => {
  const { data: session } = useSession();
  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        padding: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItem: "center",
      }}
    >
      <Box sx={{ height: "70px", width: "100px" }}>
        <Image src={logo} alt="" style={{ width: "100%", height: "100%" }} />
      </Box>
      <Box>
        <Typography variant="h1" sx={{ color: "secondary.main" }}>
          Foodie POS
        </Typography>
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
            variant="contained"
            color="success"
          >
            SignOut
          </Button>
        </Box>
      ) : (
        <span></span>
      )}
    </Box>
  );
};

export default Topbar;
