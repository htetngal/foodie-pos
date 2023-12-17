import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
interface Props {
  header: string;
  info: string;
}

const LandingInfo = ({ header, info }: Props) => {
  const [star, setStar] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setStar(true);
    }, 5000);
  }, []);
  return (
    <Box
      sx={{
        width: { xs: 350, md: 500 },
        height: 150,
        backgroundColor: "info.main",
        p: 2,
        mb: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        borderRadius: 3,
        boxShadow: "2px 2px 2px ",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" sx={{ color: "success.main" }}>
          {header}
        </Typography>
        {star && (
          <StarRateRoundedIcon
            sx={{
              color: "secondary.main",
              fontSize: 50,
            }}
          />
        )}
      </Box>

      <Typography>{info}</Typography>
    </Box>
  );
};

export default LandingInfo;
