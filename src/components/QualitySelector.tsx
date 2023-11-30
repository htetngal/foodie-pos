import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import { Box, IconButton, Typography } from "@mui/material";

interface Props {
  quantity: number;
  increase: () => void;
  decrease: () => void;
}

const QualitySelector = ({ quantity, increase, decrease }: Props) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <IconButton onClick={decrease}>
        <RemoveCircleOutlineOutlinedIcon />
      </IconButton>
      <Typography>{quantity}</Typography>
      <IconButton onClick={increase}>
        <AddCircleOutlineOutlinedIcon />
      </IconButton>
    </Box>
  );
};

export default QualitySelector;
