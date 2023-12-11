import user1 from "@/assets/users/user1.jpg";
import user10 from "@/assets/users/user10.jpg";
import user11 from "@/assets/users/user11.jpg";
import user13 from "@/assets/users/user13.jpg";
import user2 from "@/assets/users/user2.jpg";
import user3 from "@/assets/users/user3.jpg";
import user4 from "@/assets/users/user4.jpg";
import user5 from "@/assets/users/user5.jpg";
import user6 from "@/assets/users/user6.jpg";
import user7 from "@/assets/users/user7.jpg";
import user9 from "@/assets/users/user9.jpg";
import { Box, Typography } from "@mui/material";
import { Dancing_Script } from "next/font/google";
const dancingScript = Dancing_Script({ subsets: ["latin"] });

import Image from "next/image";
const userInfo = [
  { id: 1, data: user1 },
  { id: 2, data: user2 },
  { id: 3, data: user3 },
  { id: 4, data: user4 },
  { id: 5, data: user5 },
  { id: 6, data: user6 },
  { id: 7, data: user7 },
  { id: 9, data: user9 },
  { id: 10, data: user10 },
  { id: 11, data: user11 },
  { id: 13, data: user13 },
];

const LandingUsers = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        gap: "80px",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        background: "url(background.svg) no-repeat",
        backgroundSize: "cover",
        p: 10,
      }}
    >
      {userInfo.map((item) => (
        <Box
          sx={{
            width: 150,
            height: 150,
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
          key={item.id}
        >
          <Image src={item.data} alt={""} width={100} height={100} />
        </Box>
      ))}

      <Box
        sx={{
          width: 750,
          height: 200,
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
          position: "absolute",
          borderRadius: 30,
          border: "1px solid #FFE194",
          p: 3,
          color: "primary.main",
        }}
      >
        <Typography variant={"h2"} className={dancingScript.className}>
          "Join 12 million users"
        </Typography>
        <Typography>who grow their business with Foodie Pos.</Typography>
      </Box>

      <Box
        sx={{
          width: "800px",
          backgroundColor: "white",
          borderRadius: 3,
          ml: 3,
          color: "primary.main",
          p: 3,
          border: "1px solid #FFE194",
        }}
      >
        <Typography variant="h5">
          " Foodie POS is very helpful in assisting us in making high-quality
          decisions. It's integrated, user-friendly, and last but not least, it
          offers exceptional value for the price "
        </Typography>
        <Typography sx={{ textAlign: "right" }}>
          Austin <br /> CEO of BurgerKing
        </Typography>
      </Box>
    </Box>
  );
};

export default LandingUsers;
