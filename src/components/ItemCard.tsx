import { Box, Paper } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  name: string;
  isAvailable: boolean;
}

const ItemCard = ({ icon, name, isAvailable }: Props) => {
  return (
    <Box>
      <Paper
        elevation={4}
        sx={{
          opacity: isAvailable ? 1 : 0.4,
          minWidth: "150px",
          minHeight: "150px",
          pt: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          m: "10px",
        }}
      >
        {icon}
        {name}
      </Paper>
    </Box>
  );
};

export default ItemCard;
