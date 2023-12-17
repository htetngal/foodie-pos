import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box, Paper } from "@mui/material";
import { useRouter } from "next/router";
import { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  name: string;
  isAvailable: boolean;
  clickFunction?: () => void;
  selected?: boolean;
}

const ItemCard = ({
  icon,
  name,
  isAvailable,
  clickFunction,
  selected,
}: Props) => {
  const router = useRouter();

  return (
    <Box>
      <Paper
        elevation={4}
        sx={{
          opacity: isAvailable ? 1 : 0.4,
          minWidth: "150px",
          minHeight: "150px",
          p: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          m: "10px",
          position: "relative",
        }}
        onClick={() => clickFunction && clickFunction()}
      >
        {router.pathname.includes("/locations") && selected && (
          <CheckCircleIcon
            sx={{
              color: "success.main",
              position: "absolute",
              top: 10,
              right: 10,
            }}
          />
        )}

        {icon}
        {name}
      </Paper>
    </Box>
  );
};

export default ItemCard;
