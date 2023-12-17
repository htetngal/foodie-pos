import LandingInfo from "@/components/LandingInfo";
import LandingUsers from "@/components/LandingUsers";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PinterestIcon from "@mui/icons-material/Pinterest";
import RedditIcon from "@mui/icons-material/Reddit";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import {
  AppBar,
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Toolbar,
  Typography,
  keyframes,
} from "@mui/material";
import { Dancing_Script } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const dancingScript = Dancing_Script({ subsets: ["latin"] });

const bounceInTop = keyframes`  0% {
  -webkit-transform: translateY(-500px);
          transform: translateY(-500px);
  -webkit-animation-timing-function: ease-in;
          animation-timing-function: ease-in;
  opacity: 0;
}
38% {
  -webkit-transform: translateY(0);
          transform: translateY(0);
  -webkit-animation-timing-function: ease-out;
          animation-timing-function: ease-out;
  opacity: 1;
}
55% {
  -webkit-transform: translateY(-65px);
          transform: translateY(-65px);
  -webkit-animation-timing-function: ease-in;
          animation-timing-function: ease-in;
}
72% {
  -webkit-transform: translateY(0);
          transform: translateY(0);
  -webkit-animation-timing-function: ease-out;
          animation-timing-function: ease-out;
}
81% {
  -webkit-transform: translateY(-28px);
          transform: translateY(-28px);
  -webkit-animation-timing-function: ease-in;
          animation-timing-function: ease-in;
}
90% {
  -webkit-transform: translateY(0);
          transform: translateY(0);
  -webkit-animation-timing-function: ease-out;
          animation-timing-function: ease-out;
}
95% {
  -webkit-transform: translateY(-8px);
          transform: translateY(-8px);
  -webkit-animation-timing-function: ease-in;
          animation-timing-function: ease-in;
}
100% {
  -webkit-transform: translateY(0);
          transform: translateY(0);
  -webkit-animation-timing-function: ease-out;
          animation-timing-function: ease-out;
}`;

const bounceInButton = keyframes`  0% {
  -webkit-transform: translateY(500px);
          transform: translateY(500px);
  -webkit-animation-timing-function: ease-in;
          animation-timing-function: ease-in;
  opacity: 0;
}
38% {
  -webkit-transform: translateY(0);
          transform: translateY(0);
  -webkit-animation-timing-function: ease-out;
          animation-timing-function: ease-out;
  opacity: 1;
}
55% {
  -webkit-transform: translateY(65px);
          transform: translateY(65px);
  -webkit-animation-timing-function: ease-in;
          animation-timing-function: ease-in;
}
72% {
  -webkit-transform: translateY(0);
          transform: translateY(0);
  -webkit-animation-timing-function: ease-out;
          animation-timing-function: ease-out;
}
81% {
  -webkit-transform: translateY(28px);
          transform: translateY(28px);
  -webkit-animation-timing-function: ease-in;
          animation-timing-function: ease-in;
}
90% {
  -webkit-transform: translateY(0);
          transform: translateY(0);
  -webkit-animation-timing-function: ease-out;
          animation-timing-function: ease-out;
}
95% {
  -webkit-transform: translateY(8px);
          transform: translateY(8px);
  -webkit-animation-timing-function: ease-in;
          animation-timing-function: ease-in;
}
100% {
  -webkit-transform: translateY(0);
          transform: translateY(0);
  -webkit-animation-timing-function: ease-out;
          animation-timing-function: ease-out;
}`;

export default function Home() {
  const [bounce, setBounce] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setBounce(true);
    }, 2000);
  }, []);
  return (
    <Box
      sx={{ display: "flex", flexDirection: "Column", height: "fit-content" }}
    >
      <Box sx={{ mb: 5 }}>
        <AppBar sx={{ backgroundColor: "info.main", color: "primary.main" }}>
          <Toolbar>
            <Typography>Htet Nge</Typography>
            <Typography
              sx={{
                fontSize: { xs: "20px", md: "25px" },
                ml: "auto",
                mr: "auto",
              }}
              className={dancingScript.className}
            >
              Foodie Pos
            </Typography>
            <Button
              variant="contained"
              onClick={() => router.push("/backoffice")}
            >
              Try it free
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", md: "row" },
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <Image src={"chef.svg"} alt="" width={300} height={250} />
        <Box
          sx={{
            width: { xs: "100vw", md: "60%" },
            p: 3,
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "primary.main",
          }}
        >
          <Typography
            className={dancingScript.className}
            sx={{
              mb: 3,
              textAlign: "center",
              animation: `${bounceInButton} 1.5s both`,
              fontSize: { xs: "50px", md: "100px" },
            }}
          >
            Serving Perfection:
          </Typography>
          <Typography
            className={dancingScript.className}
            sx={{
              mb: 3,
              textAlign: "center",
              animation: `${bounceInTop} 1.5s both`,
              fontSize: { xs: "50px", md: "100px" },
            }}
          >
            <span style={{ color: "#1B9C85" }}>all in one </span>
            foodie POS
          </Typography>

          <Typography variant={"h5"} sx={{ mb: 3, textAlign: "center" }}>
            Foodie Point of Sale is the perfect solution to provide seamless
            service in any type of restaurant, from a food truck to a concept
            cocktail bar.
          </Typography>

          <Button
            onClick={() => router.push("/backoffice")}
            variant="contained"
            color="success"
            sx={{ mb: 2 }}
          >
            Start Now-it&apos;s free
          </Button>
          <Typography>Free, Forever with unlimited users.</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          background: `url(blob.svg) no-repeat fixed`,
          backgroundSize: "cover",
          color: "primary.main",
          p: 5,
        }}
      >
        {bounce && (
          <>
            <Typography
              variant={"h3"}
              className={dancingScript.className}
              sx={{
                mb: 3,
                textAlign: "center",
                animation: `${bounceInButton} 1.5s both`,
              }}
            >
              All the features done right.{" "}
            </Typography>
          </>
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <LandingInfo
              header={"Compatible with any device"}
              info={
                "Swift setup on any tablet, desktop, laptop, smartphone, kiosks, and more."
              }
            />
            <LandingInfo
              header={"Kitchen printing"}
              info={
                "Send the order instructions to the bar and kitchen printers according to the product category."
              }
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <LandingInfo
              header={"Offline payments"}
              info={
                "Payments made offline are automatically synchronized when you are reconnected."
              }
            />
            <LandingInfo
              header={"Great User Experience"}
              info={"Users can easily order with user familiar interfaces."}
            />
          </Box>
        </Box>
      </Box>

      <Box>
        <LandingUsers />
      </Box>

      <Box
        sx={{
          backgroundColor: "#322F46",
          color: "info.main",
          display: "flex",
          justifyContent: "space-between",
          p: 3,
        }}
      >
        <Box sx={{ width: 500 }}>
          <Typography color={"secondary.main"}>©FoodiePOS</Typography>
          <Typography sx={{ fontSize: 14 }}>
            FoodiePOS is a suite of open source business apps that cover all
            your company needs: CRM, eCommerce, accounting, inventory, point of
            sale, project management, etc.
          </Typography>
        </Box>
        <Box sx={{ width: 500 }}>
          <Typography color={"secondary.main"} sx={{ mb: 2 }}>
            Contact Us
          </Typography>
          <ButtonGroup
            sx={{ display: "flex", flexWrap: { xs: "wrap", md: "nowrap" } }}
          >
            <IconButton sx={{ color: "info.main" }}>
              <FacebookIcon />
            </IconButton>
            <IconButton sx={{ color: "info.main" }}>
              <InstagramIcon />
            </IconButton>
            <IconButton sx={{ color: "info.main" }}>
              <LinkedInIcon />
            </IconButton>
            <IconButton sx={{ color: "info.main" }}>
              <PinterestIcon />
            </IconButton>
            <IconButton sx={{ color: "info.main" }}>
              <YouTubeIcon />
            </IconButton>
            <IconButton sx={{ color: "info.main" }}>
              <TwitterIcon />
            </IconButton>
            <IconButton sx={{ color: "info.main" }}>
              <RedditIcon />
            </IconButton>
            <IconButton sx={{ color: "info.main" }}>
              <EmailIcon />
            </IconButton>
            <IconButton sx={{ color: "info.main" }}>
              <GitHubIcon />
            </IconButton>
          </ButtonGroup>
        </Box>
      </Box>
    </Box>
  );
}
